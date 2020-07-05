<template>
    <div>
        <button @click="add">按钮</button>
    </div>
</template>

<script>
    import { Message } from "./message.js";
    export default {
        methods: {
            add(){
                Message.success({
                    message: "这是描述符1"
                })

                Message({
                    message: "这是描述符2",
                    type: "error",
                });
            }
        }
    };
</script>

<style>

</style>
