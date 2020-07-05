import Vue from "vue";
import Vuex from "./vuex";
import logger from "./vuex/logger";
import persists from "./vuex/persists";

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [
        // createLogger()
        logger,
        persists
    ],
    modules: {
        a: {
            namespaced: true,
            state: {
                age: "a100"
            },
            mutations: {
                syncChange(state, payload){
                    console.log("a-syncChange")
                }
            }
        },
        b: {
            namespaced: true,
            state: {
                age: "b100"
            },
            mutations: {
                syncChange(state, payload){
                    console.log("b-syncChange")
                }
            },
            modules: {
                c: {
                    namespaced: true,
                    state: {
                        age: "c100"
                    }, 
                    mutations: {
                        syncChange(state, payload){
                            console.log("c-syncChange")
                        }
                    },
                }
            }
        }
    },
    state: {
        age: 110
    },
    strict: true, // 格式模式
    getters: {
        myAge: state => {
            return state.age + 10;
        }
    },
    mutations: {
        syncChange(state, payload){
            state.age += payload;
        }
    },
    actions: {
        asyncChange({commit}, payload){
            setTimeout(() => {
                commit("syncChange", payload)
            }, 1000);
        }
    }
})