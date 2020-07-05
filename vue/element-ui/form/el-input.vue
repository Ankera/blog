<template>
    <input type="text" :value="value" @input="handleInput"/>
</template>

<script>
export default {
    name: "el-input",
    props: {
        value: String
    },
    methods: {
        handleInput(e){
            this.$emit("input", e.target.value);

            let parent = this.$parent;
            while(parent){
                name = parent.$options.name;
                if(name === "el-form-item"){
                    break;
                }else{
                    parent = parent.$parent;
                }
            }

            // 触发 el-form-item 的 validate 校验事件
            if(parent){
                parent.$emit("validate");
            }
        }
    }
}
</script>