import Vue from 'vue'
import App from './App'
import store from "./store.js";

Vue.config.productionTip = false;

// Vue.mixin({
//     beforeCreate() {
//         console.log("ss")
//     },
//     mounted(){
//         console.log("tt")
//     }
// })

new Vue({
    name: "root",
    mounted() {
        // console.log("...this.$store...", this.$store)
    },
    store,
    render: h => h(App)
}).$mount('#app')