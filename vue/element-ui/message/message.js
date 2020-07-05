import Vue from "vue";
import MessageComponent from "./message.vue";

let MessageConstructor = Vue.extend(MessageComponent);
let Message = (options) => {
    let instance = new MessageConstructor({
        data: options
    });

    instance.$mount();

    document.body.appendChild(instance.$el);

    instance.visible = true; // 显示属性
}

["success", "error", "warning"].forEach(type => {
    Message[type] = function(options){
        options.type = type;
        return Message(options);
    }
});

export {
    Message
}