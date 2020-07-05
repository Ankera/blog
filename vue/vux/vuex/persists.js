import { locale } from "core-js";

// 数据持久化
let localPersists = "VUEX:STATE";

export default function (store) {
    let local = localStorage.getItem(localPersists);
    if(local){
        store.replaceState(JSON.parse(local));
    }

    store.subscribe((mutation, newState) => {
        localStorage.setItem(localPersists, JSON.stringify(newState));
    })
}