<template>
    <form @submit.prevent>
        <slot></slot>
    </form>
</template>

<script>
export default {
    name: "el-form",
    provide() {
        return {
            elForm: this
        }
    },
    props: {
        model: {
            type: Object,
            default: () => ({})
        },
        rules: Object
    },
    methods: {
        async validate(cb){
            let children = this.$children;
            let arr = [];

            function findFormItem(children){
                children.forEach(child => {
                    if(child.$options.name === "el-form-item"){
                        arr.push(child);
                    }
                    if(child.$children){
                        findFormItem(child.$children)
                    }
                })
            }

            findFormItem(children);
            
            try {
                // 异步的
                await Promise.all(arr.map(child => child.validate()));
                cb && cb(true);
            } catch (error) {
                // console.log(error);
                cb && cb(false)
            }
        }
    }
}
</script>