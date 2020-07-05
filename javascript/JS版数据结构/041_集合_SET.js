/**
 * 封装集合
 * 集合是由一组无序且唯一(即不能重复)的项组成的，
 * 可以想象成集合是一个既没有重复元素，也没有顺序概念的数组
 */
function Set(array = []) {
    // 属性
    this.items = {};
    this.size = 0;

    // 添加
    Set.prototype.add = function (value) {
        if (this.has(value)) {
            return false;
        }
        this.items[value] = value;
        return true;
    }

    // 删除
    Set.prototype.remove = function (value) {
        if (!this.has(value)) {
            return false;
        }

        delete this.items[value];
        return true;
    }

    // 判断是否有某个值
    Set.prototype.has = function (value) {
        return this.items.hasOwnProperty(value);
    }

    // 清空
    Set.prototype.clear = function () {
        this.items = {};
    }

    // 返回元素个数
    Set.prototype.size = function () {
        return Object.keys(this.items).length;
    }

    // 返回一个集合中所有值的数组
    Set.prototype.values = function () {
        return Object.keys(this.items);
    }

    Set.prototype.forEach = function (fn, context = this) {
        for (var i = 0; i < this.size; i++) {
            var item = Object.keys(items)[i];
            fn.call(context, item, item, items);
        }
    }

    // 集合的并集
    Set.prototype.union = function (otherSet) {
        var unionSet = new Set();
        var values = this.values();
        for (var i = 0; i < this.size(); i++) {
            unionSet.add(values[i]);
        }

        // 取出 otherSet 判断加入 unionSet集合中
        values = otherSet.values();
        for (var j = 0; j < values.length; j++) {
            unionSet.add(values[j]);
        }
        return unionSet;
    }

    // 交集
    Set.prototype.intersection = function (otherSet) {
        var intersection = new Set();
        var values = this.values();
        for (let i = 0; i < values.length; i++) {
            if (otherSet.has(values[i])) {
                intersection.add(values[i]);
            }
        }
        return intersection;
    }

    // 差集
    Set.prototype.difference = function (otherSet) {
        var difference = new Set();
        var values = this.values();
        for (var i = 0; i < values.length; i++) {
            if (!otherSet.has(values[i])) {
                difference.add(values[i]);
            }
        }
        return difference;
    }

    // 子集 otherSet 是否是 this 的子集
    Set.prototype.subset = function (otherSet) {
        var values = this.values();
        for (var i = 0; i < values.length; i++) {
            if (!otherSet.has(values[i])) {
                return false;
            }
        }
        return true;
    }
}

var set1 = new Set();
set1.add("Tom");
set1.add("Tom2");

var set2 = new Set();
set2.add("Anker");
set2.add("Tom2");

console.log(set2.difference(set1).values())