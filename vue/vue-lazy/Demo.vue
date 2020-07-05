<template>
    <div class="box">
        <li v-for="(img,i) in imgs" :key="i">
            <img v-lazy="img" >
        </li>
    </div>
</template>
<script>
import axios from "axios";
export default {
    data(){
        return {
            imgs: []
        }
    },
    async created(){
        let data = await axios.get("http://127.0.0.1:8081/static/a.json");
        this.imgs = data.data.data;
    }

    /**
     * a.json 返回值
     
            {
            "data": [
                "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=204471953,2683458197&fm=26&gp=0.jpg",
                "https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2567670815,24101428&fm=26&gp=0.jpg",
                "https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2474359490,1160804813&fm=26&gp=0.jpg",
                "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1625401628,4069989450&fm=26&gp=0.jpg",
                "https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2279055805,3887160486&fm=26&gp=0.jpg",
                "https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1501580859,1123208511&fm=26&gp=0.jpg",
                "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1625401628,4069989450&fm=26&gp=0.jpg",
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593431877138&di=6ae55051a51e71b8711697f299fc9ec8&imgtype=0&src=http%3A%2F%2Fp2.so.qhimgs1.com%2Ft01dfcbc38578dac4c2.jpg",
                "https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1501580859,1123208511&fm=26&gp=0.jpg",
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593431877138&di=b2468a027d37bfbd9c43d64248eb7c2f&imgtype=0&src=http%3A%2F%2Fa2.att.hudong.com%2F36%2F48%2F19300001357258133412489354717.jpg",
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593431877138&di=6ae55051a51e71b8711697f299fc9ec8&imgtype=0&src=http%3A%2F%2Fp2.so.qhimgs1.com%2Ft01dfcbc38578dac4c2.jpg",
                "https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1501580859,1123208511&fm=26&gp=0.jpg",
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593431877138&di=b2468a027d37bfbd9c43d64248eb7c2f&imgtype=0&src=http%3A%2F%2Fa2.att.hudong.com%2F36%2F48%2F19300001357258133412489354717.jpg",
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593431877138&di=18b23b8c3605fa9007673ec1daccebdd&imgtype=0&src=http%3A%2F%2Fa0.att.hudong.com%2F64%2F76%2F20300001349415131407760417677.jpg",
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593431877138&di=6ae55051a51e71b8711697f299fc9ec8&imgtype=0&src=http%3A%2F%2Fp2.so.qhimgs1.com%2Ft01dfcbc38578dac4c2.jpg",
                "https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1501580859,1123208511&fm=26&gp=0.jpg",
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593431877138&di=b2468a027d37bfbd9c43d64248eb7c2f&imgtype=0&src=http%3A%2F%2Fa2.att.hudong.com%2F36%2F48%2F19300001357258133412489354717.jpg",
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593431877138&di=6ae55051a51e71b8711697f299fc9ec8&imgtype=0&src=http%3A%2F%2Fp2.so.qhimgs1.com%2Ft01dfcbc38578dac4c2.jpg",
                "https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1501580859,1123208511&fm=26&gp=0.jpg",
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593431877138&di=b2468a027d37bfbd9c43d64248eb7c2f&imgtype=0&src=http%3A%2F%2Fa2.att.hudong.com%2F36%2F48%2F19300001357258133412489354717.jpg",
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593431877138&di=18b23b8c3605fa9007673ec1daccebdd&imgtype=0&src=http%3A%2F%2Fa0.att.hudong.com%2F64%2F76%2F20300001349415131407760417677.jpg",
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593431877137&di=c90c78c3684c19473376824a16863e98&imgtype=0&src=http%3A%2F%2Fa0.att.hudong.com%2F27%2F10%2F01300000324235124757108108752.jpg",
                "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1625401628,4069989450&fm=26&gp=0.jpg",
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593431877138&di=6ae55051a51e71b8711697f299fc9ec8&imgtype=0&src=http%3A%2F%2Fp2.so.qhimgs1.com%2Ft01dfcbc38578dac4c2.jpg",
                "https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1501580859,1123208511&fm=26&gp=0.jpg",
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593431877138&di=b2468a027d37bfbd9c43d64248eb7c2f&imgtype=0&src=http%3A%2F%2Fa2.att.hudong.com%2F36%2F48%2F19300001357258133412489354717.jpg",
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593431877138&di=6ae55051a51e71b8711697f299fc9ec8&imgtype=0&src=http%3A%2F%2Fp2.so.qhimgs1.com%2Ft01dfcbc38578dac4c2.jpg",
                "https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1501580859,1123208511&fm=26&gp=0.jpg",
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593431877138&di=b2468a027d37bfbd9c43d64248eb7c2f&imgtype=0&src=http%3A%2F%2Fa2.att.hudong.com%2F36%2F48%2F19300001357258133412489354717.jpg",
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593431877138&di=18b23b8c3605fa9007673ec1daccebdd&imgtype=0&src=http%3A%2F%2Fa0.att.hudong.com%2F64%2F76%2F20300001349415131407760417677.jpg",
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593431877138&di=376a28f481185fc3ff565fd31afdfec9&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F68%2F61%2F300000839764127060614318218_950.jpg",
                "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1625401628,4069989450&fm=26&gp=0.jpg",
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593431877138&di=6ae55051a51e71b8711697f299fc9ec8&imgtype=0&src=http%3A%2F%2Fp2.so.qhimgs1.com%2Ft01dfcbc38578dac4c2.jpg",
                "https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1501580859,1123208511&fm=26&gp=0.jpg",
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593431877138&di=b2468a027d37bfbd9c43d64248eb7c2f&imgtype=0&src=http%3A%2F%2Fa2.att.hudong.com%2F36%2F48%2F19300001357258133412489354717.jpg",
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593431877138&di=6ae55051a51e71b8711697f299fc9ec8&imgtype=0&src=http%3A%2F%2Fp2.so.qhimgs1.com%2Ft01dfcbc38578dac4c2.jpg",
                "https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1501580859,1123208511&fm=26&gp=0.jpg",
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593431877138&di=b2468a027d37bfbd9c43d64248eb7c2f&imgtype=0&src=http%3A%2F%2Fa2.att.hudong.com%2F36%2F48%2F19300001357258133412489354717.jpg",
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593431877138&di=18b23b8c3605fa9007673ec1daccebdd&imgtype=0&src=http%3A%2F%2Fa0.att.hudong.com%2F64%2F76%2F20300001349415131407760417677.jpg",
                "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1625401628,4069989450&fm=26&gp=0.jpg",
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593431877138&di=6ae55051a51e71b8711697f299fc9ec8&imgtype=0&src=http%3A%2F%2Fp2.so.qhimgs1.com%2Ft01dfcbc38578dac4c2.jpg",
                "https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1501580859,1123208511&fm=26&gp=0.jpg",
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593431877138&di=b2468a027d37bfbd9c43d64248eb7c2f&imgtype=0&src=http%3A%2F%2Fa2.att.hudong.com%2F36%2F48%2F19300001357258133412489354717.jpg",
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593431877138&di=6ae55051a51e71b8711697f299fc9ec8&imgtype=0&src=http%3A%2F%2Fp2.so.qhimgs1.com%2Ft01dfcbc38578dac4c2.jpg",
                "https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1501580859,1123208511&fm=26&gp=0.jpg",
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593431877138&di=b2468a027d37bfbd9c43d64248eb7c2f&imgtype=0&src=http%3A%2F%2Fa2.att.hudong.com%2F36%2F48%2F19300001357258133412489354717.jpg",
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593431877138&di=18b23b8c3605fa9007673ec1daccebdd&imgtype=0&src=http%3A%2F%2Fa0.att.hudong.com%2F64%2F76%2F20300001349415131407760417677.jpg"
            ]
        }
     */
}
</script>
<style>
    .box {
        width: 240px;
        height: 300px;
        border: 1px solid #cccccc;
        overflow: scroll;
    }
    .box img {
        width: 240px;
        height: 240px;
    }
</style>

