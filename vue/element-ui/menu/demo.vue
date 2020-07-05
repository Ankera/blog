<template>
  <div>
        <my-menu :data="data"></my-menu>
  </div>
  
</template>

<script>
import MyMenu from "./my-menu";
export default {
    data(){
        return {
            data: [
                {title: "根 111", id: 1},
                {title: "根 222", id: 2, children: [
                    {title: "根 2-1", id: 21},
                    {title: "根 2-2", id: 22},
                    {title: "根 2-3", id: 23, children: [
                        {title: "根 2-3-1", id: 231},
                        {title: "根 2-3-2", id: 232},
                    ]},
                ]},
                {title: "根 3", id: 3},
                {title: "根 4", id: 4, children: [
                    {title: "根 4-1", id: 41},
                    {title: "根 4-2", id: 42},
                    {title: "根 4-3", id: 43, children: [
                        {title: "根 4-3-1", id: 431},
                        {title: "根 4-3-2", id: 432},
                    ]},
                ]},
            ]
        }
    },
    components: {
        "my-menu": MyMenu
    }
};
</script>