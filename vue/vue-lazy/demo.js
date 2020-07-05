import Vue from 'vue'
import Demo from "./Demo.vue"
import VueLazyload from "./index";
import load from "./load.gif";

Vue.use(VueLazyload, {
    preLoad: 1.3,  // 屏幕的多少倍开始加载图片
    loading: load // 加载时的动画图片
})

new Vue({
    el: '#app',
    render: h => h(Demo)
})
