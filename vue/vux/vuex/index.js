let Vue;

let forEach = (obj, callback) => {
    Object.keys(obj).forEach(key => {
        callback(key, obj[key]);
    })
}

class ModuleCollection {
    constructor(options) {
        // 深度遍历，将所有的子模块遍历一遍
        this.register([], options);
    }

    register(path, rootModule) {
        let rawModule = {
            _raw: rootModule,
            _children: {},
            state: rootModule.state
        }

        if (!this.root) {
            this.root = rawModule;
        } else {
            let parentModule = path.slice(0, -1).reduce((root, current) => {
                return root._children[current];
            }, this.root);

            parentModule._children[path[path.length - 1]] = rawModule;
        }

        if (rootModule.modules) {
            forEach(rootModule.modules, (moduleName, module) => {
                this.register(path.concat(moduleName), module)
            })
        }
    }
}

function installModule(store, rootState, path, rawModule) {
    let getters = rawModule._raw.getters;

    // 如果有命名空间, 则作为前缀
    let root = store.modules.root;
    let namespace = path.reduce((str, current) => {
        root = root._children[current];
        str = str + (root._raw.namespaced ? current + "/" : "");
        return str;
    }, "");

    // 说有有子模块
    if (path.length > 0) {
        let parentState = path.slice(0, -1).reduce((root, current) => {
            return rootState[current];
        }, rootState);
        Vue.set(parentState, path[path.length - 1], rawModule.state);
    }

    if (getters) {
        forEach(getters, (getterName, value) => {
            Object.defineProperty(store.getters, namespace + getterName, {
                get: () => {
                    return value(getState(store, path)) // 模块中的状态
                }
            })
        })
    }

    let mutations = rawModule._raw.mutations;
    if (mutations) {
        forEach(mutations, (mutationName, value) => {
            let arr = store.mutations[namespace + mutationName] || (store.mutations[namespace + mutationName] = []);
            arr.push(payload => {
                value(getState(store, path), payload);
                store.subs.forEach(fn => fn({
                    type: namespace + mutationName,
                    payload
                }, store.state))
            });
        })
    }

    let actions = rawModule._raw.actions;
    if (actions) {
        forEach(actions, (actionName, value) => {
            let arr = store.actions[namespace + actionName] || (store.actions[namespace + actionName] = []);
            arr.push(payload => {
                value(store, payload)
            });
        })
    }

    // 递归遍历所有 children
    forEach(rawModule._children, (moduleName, rawModule) => {
        installModule(store, rootState, path.concat(moduleName), rawModule);
    })
}

function getState(store, path) {
    let local = path.reduce((newState, current) => {
        return newState[current];
    }, store.state);

    return local;
}

class Store {
    constructor(options) {
        this.strict = options.strict || false;
        this._committing = false; // 同步执行的标志

        this.vm = new Vue({
            data: {
                state: options.state // 被监控
            }
        });
        this.getters = {};
        this.mutations = {};
        this.actions = {};

        this.subs = [];

        /*
        单层 state 操作
        let getters = options.getters;
        forEach(getters, (getterName, value) => {
            Object.defineProperty(this.getters, getterName, {
                get: () => {
                    return value(this.state)
                },
            })
        })

        // 将用户定义的 mutations 放到  store上，将函数订阅到一个数组中，发布时让对象中的函数依次执行
        let mutations = options.mutations;
        forEach(mutations, (mutationName, value) => {
            this.mutations[mutationName] = payload => {
                value(this.state, payload)
            }
        })

        let actions = options.actions;
        forEach(actions, (actionName, value) => {
            this.actions[actionName] = payload => {
                value(this, payload)
            }
        })
        */

        // ----------------------
        //格式化 将用户传入的数据格式化操作
        this.modules = new ModuleCollection(options);

        // 递归安装模块
        installModule(this, this.state, [], this.modules.root);

        let plugins = options.plugins;
        plugins.forEach(fn => fn(this));

        // 监控数据变化
        this.vm.$watch(() => {
            return this.vm.state;
        }, () => {
            console.assert(this._committing, "不能调用")
        }, {
            deep: true,
            sync: true
        })
    }

    _withCommit(fn){
        const committing = this._committing;
        this._committing = true;
        typeof fn === "function" && fn();
        this._committing = committing;
    }

    subscribe = (fn) => {
        this.subs.push(fn);
    }

    replaceState = (state) => {
        this._withCommit(() => {
            this.vm.state = state;
        })
    }

    // 获取实例上的 state 属性就会执行此方法
    get state() {
        return this.vm.state;
    }

    commit = (mutationName, payload) => {
        this._withCommit(() => { // 装饰切片
            this.mutations[mutationName].forEach(fn => fn(payload));
        })
    }

    dispatch = (actionName, payload) => {
        this.actions[actionName].forEach(fn => fn(payload));
    }
}

const install = (_Vue) => {
    Vue = _Vue; // Vue的构造函数

    Vue.mixin({
        beforeCreate() {
            if (this.$options.store) { // 只有跟实例上才有 store 属性
                this.$store = this.$options.store;
            } else {
                this.$store = this.$parent && this.$parent.$store;
            }

            // 传入公共数据
            this.$anker = { name: "Tom" }
        }
    })
}

export const mapState = (stateArray) => {
    let obj = {};
    stateArray.forEach(stateName => {
        obj[stateName] = function () {
            return this.$store.state[stateName];
        }
    });
    return obj;
}

export const mapGetters = gettersArray => {
    let obj = {};
    gettersArray.forEach(getterName => {
        obj[getterName] = function () {
            return this.$store.getters[getterName];
        }
    })
    return obj;
}

export const mapMutations = (obj) => {
    let res = {};
    Object.entries(obj).forEach(([key, value]) => {
        res[key] = function (...args) {
            this.$store.commit(value, ...args);
        }
    })
    return res;
}

export const mapActions = (obj) => {
    let res = {};
    Object.entries(obj).forEach(([key, value]) => {
        res[key] = function (...args) {
            this.$store.dispatch(value, ...args);
        }
    })
    return res;
}

export default {
    Store,
    install,
    version: "1.0.0"
}