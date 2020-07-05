function Dictionay() {
    // 字典属性
    this.items = {};

    // 设置属性
    Dictionay.prototype.set = function (key, value) {
        this.items[key] = value;
    }

    // 判断字典中是否存在某个key
    Dictionay.prototype.has = function (key) {
        return this.items.hasOwnProperty(key);
    }

    // 从字典中移除元素
    Dictionay.prototype.remove = function (key) {
        if (!this.has(key)) {
            return false;
        }

        delete this.items[key];
        return;
    }

    // 根据key获取值
    Dictionay.prototype.get = function (key) {
        return this.has(key) ? this.items[key] : undefined;
    }

    // 获取所有的keys
    Dictionay.prototype.keys = function () {
        return Object.keys(this.items);
    }

    // 获取所有的values
    Dictionay.prototype.values = function () {
        return Object.values(this.items);
    }

    // 获取字典的长度
    Dictionay.prototype.size = function () {
        return this.keys.length;
    }

    // 清空
    Dictionay.prototype.clear = function () {
        this.items = {};
    }
}