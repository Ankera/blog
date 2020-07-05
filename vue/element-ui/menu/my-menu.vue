<template>
  <div>
        <el-menu>
            <template v-for="d in data">
                <el-resub :data="d" :key="d.id"></el-resub>
            </template>
        </el-menu>
  </div>
  
</template>

<script>
import elMenu from "./el-menu";
import elMenuItem from "./el-menu-item";
import elSubmen from "./el-submen";
import elResub from "./el-resub";
export default {
    props: {
        data: {
            type: Array,
            default: () => ({})
        }
    },
    components: {
        "el-menu": elMenu,
        "el-menu-item": elMenuItem,
        "el-submen": elSubmen,
        "el-resub": elResub
    }
};
</script>