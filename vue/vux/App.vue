<template>
    <div>
        <h1>单模块</h1>
        <div>组件age值--{{$store.state.age}}</div>
        <div>computed -- {{age}}</div>
        <div>getters -- {{myAge}}</div>
        <p>{{$store.getters.myAge}}</p>
        <button @click="syncChange">+</button>
        <button @click="asyncChange">异步</button>
        <hr>
        <h1>多模块</h1>
        <div>a--- {{$store.state.a.age}}</div>
        <div>b--- {{$store.state.b.age}}</div>
        <div>c--- {{$store.state.b.c.age}}</div>
    </div> 
</template>

<script>
    import { mapState,  mapGetters, mapMutations } from "./vuex";
    export default {
        name: "app",
        beforeCreate(){
            // console.log("组件")
        },
        computed:{
            ...mapState(['age']),
            ...mapGetters(['myAge'])
            // c_age: () => {
            //     return this.$store.state.age
            // }
        },
        mounted(){
            console.log(this.$store)
        },
        methods: {
            ...mapMutations({
                aaa: "syncChange",
            }),
            syncChange(){
                // this.$store.commit("syncChange", 10)
                this.aaa(11);
            },
            asyncChange(){
                this.$store.dispatch("asyncChange", 5)
            }
        }
    }
</script>

<style>

</style>
