import Lazy from "./lazy";

export default {
    install(Vue, options){
        let LazyClass = Lazy(Vue);
        let lazy = new LazyClass(options);

        Vue.directive("lazy", {
            bind: lazy.add.bind(lazy)
        })
    }
}