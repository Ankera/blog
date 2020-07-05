<template>
    <el-submen :key="data.id" v-if="data.children">
        <template slot="title">{{data.title}}</template>
        <template v-for="d in data.children">
            <el-resub :key="d.id" :data="d"></el-resub>
        </template>
    </el-submen>
    <el-menu-item :key="data.id" v-else>{{data.title}}</el-menu-item>
</template>

<script>
// 递归处理
import elMenuItem from "./el-menu-item";
import elSubmen from "./el-submen";
export default {
    name: "el-resub",  
    props: {
        data: {}
    },
    components: {
        "el-menu-item": elMenuItem,
        "el-submen": elSubmen
    }
}
</script>