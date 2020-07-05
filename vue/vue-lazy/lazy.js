// 存放懒加载的核心文件
import { throttle } from "lodash";

export default (Vue) => {

    class ReactiveListener {
        constructor({ el, src, elRenderer, options }) {
            this.el = el;
            this.src = src;
            this.elRenderer = elRenderer;
            this.options = options;
            this.state = {
                loading: false, // 默认没有加载
            }
        }

        checkInView() {
            let { top } = this.el.getBoundingClientRect();
            // console.log(this.options.preLoad)
            return top < window.innerHeight * this.options.preLoad;
        }

        load() {
            this.elRenderer(this, "loading");
            loadImageAsync(this.src, () => {
                this.state.loading = true; // 加载完毕
                this.elRenderer(this, "loaded");
            }, () => {
                this.elRenderer(this, "error");
            })
        }
    }

    function loadImageAsync(src, resolve, reject) {
        let image = new Image();
        image.src = src;
        image.onload = resolve;
        image.onerror = reject;
    }

    return class LazyClass {
        constructor(options) {
            this.options = options;
            this.bindHanlder = false; // 事件默认只加载一次

            // 存储图片的队列
            this.listenerQueue = [];

            this.lazyLoadHandler = throttle(() => { // 节流
                let catIn = false;
                this.listenerQueue.forEach(listenr => {
                    if (listenr.state.loading) {
                        return;// 如果已经渲染过的图片就不再渲染
                    }

                    catIn = listenr.checkInView();
                    // 可见范围就加载图片
                    catIn && listenr.load();
                })
            }, 200)
        }

        add(el, bindings, vnode) {
            Vue.nextTick(() => {
                function scrollParent() {
                    let parent = el.parentNode;
                    while (parent) {
                        if (/scroll|atuo/.test(getComputedStyle(parent)["overflow"])) {
                            return parent;
                        }
                        parent = parent.parentNode;
                    }
                    return parent;
                }
                let parent = scrollParent();

                // 判断当前图片是否要加载
                let listener = new ReactiveListener({
                    el, // 真实DOM
                    src: bindings.value,
                    elRenderer: this.elRenderer.bind(this),
                    options: this.options
                });

                this.listenerQueue.push(listener);

                if (!this.bindHanlder) {
                    this.bindHanlder = true; // 事件绑定一次就可以
                    parent.addEventListener("scroll", this.lazyLoadHandler);

                    // 默认进行一次渲染
                    this.lazyLoadHandler();
                }
            })
        }

        elRenderer(listener, state) {
            let { el } = listener;
            let src = "";
            switch (state) {
                case "loading":
                    src = listener.options.loading || "";
                    break;
                case "error":
                    src = listener.options.error || "";
                    break;
                default:
                    src = listener.src
                    break;
            }

            el.setAttribute("src", src);
        }
    }
}