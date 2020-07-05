<template>
    <div>
        <label v-if="label">{{label}}</label>
        <slot></slot>
        {{errMessage}}
    </div>
</template>

<script>
import Schema from "async-validator";

export default {
    name: "el-form-item",
    inject: ["elForm"],
    props: {
        label: {
            type: String,
            default: ""
        },
        prop: String // 校验的属性名称
    },
    data() {
        return {
            errMessage: ""
        }
    },
    mounted(){
        this.$on("validate", function(){
            this.validate(); // 校验是否符合
        })
    },
    methods: {
        validate(){
            if(this.prop){
                
                let rule = this.elForm.rules[this.prop];
                let newValue = this.elForm.model[this.prop];

                // 当前属性的描述
                let descriptor = {
                    [this.prop]: rule
                }
                
                let schema = new Schema(descriptor);
                return schema.validate({[this.prop]: newValue}, (err, res) => {
                    if(err){
                        this.errMessage = err[0].message;
                    } else {
                        this.errMessage = "";
                    }
                })
            }
        }
    }
}
</script>