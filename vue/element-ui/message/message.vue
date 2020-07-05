<template>
    <div v-if="visible">
        {{message}} {{type}}
    </div>
</template>
<script>
export default {
    data(){
        return {
            message: "",
            type: "",
            visible: false,
            duration: 3000
        }
    },
    mounted(){
        if(this.duration > 0){
            setTimeout(() => {
                this.$destroy();
                this.$el.parentNode.removeChild(this.$el);
            }, this.duration);
        }
    }
}
</script>