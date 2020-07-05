function isNotDefine(param) {
    return param === undefined || param === null;
}

/**
 * 判断传入是否是质数
 * @param {*} num 
 */
function isPrime(num) {
    for (var i = 2; i < num; i++) {
        if (num % 2 === 0) {
            return false;
        }
    }
    return true;
}

/**
 * 高效判断传入是否是质数
 * @param {*} num 
 */
function isPrimeGao(num) {
    var temp = parseInt(Math.sqrt(num));
    for (var i = 2; i <= temp; i++) {
        if (temp % i === 0) {
            return false;
        }
    }
    return true;
}



/**
 * 链地址法实现哈希表
 */
function HashTable(limit) {
    // 存储哈希表
    this.storage = []; // 链地址法存储
    // 当前哈希表存储的元素
    this.count = 0;
    /**
     * 装载因子, 
     * 如果 loadFactor < 0.25 缩小数组
     * 如果 loadFactor > 0.75 需要扩容
     */
    this.loadFactor = 0;
    // 数组的总长度, 数组长度最好为质数
    this.limit = limit || 7;

    HashTable.prototype.isPrime = function (num) {
        var temp = parseInt(Math.sqrt(num));
        for (var i = 2; i <= temp; i++) {
            if (temp % i === 0) {
                return false;
            }
        }
        return true;
    }

    // 获取质数
    HashTable.prototype.getPrmie = function (num) {
        while (!this.isPrime(null)) {
            num++;
        }
        return num;
    }

    // 哈希哈数
    HashTable.prototype.hashFunc = function (str, size, code = 37) {
        var hashCode = 0;
        for (var i = 0; i < str.length; i++) {
            hashCode = code * hashCode + str.charCodeAt(i);
        }

        return hashCode % size;
    }

    HashTable.prototype.hashCode = function (key) {
        return this.hashFunc(key, this.limit);
    }

    // 哈希插入或修改
    HashTable.prototype.put = function (key, value) {
        //1. 根据 key 获取对应的index
        var index = this.hashCode(key);

        //2. 根据 index 获取对应的 bucket
        var bucket = this.storage[index];

        //3. 如果 bucket 为 null，则添加
        if (isNotDefine(bucket)) {
            bucket = [];
            this.storage[index] = bucket;
        }

        //4. 判断是否是修改数据
        for (var i = 0; i < bucket.length; i++) {
            var tuple = bucket[i];
            if (tuple[0] === key) {
                tuple[1] = value;
                return;
            }
        }

        //5. 追加新数据
        bucket.push([key, value]);
        this.count += 1;

        //6. 判断是否需要扩容
        if (this.count > this.limit * 0.75) {
            var newPrmise = this.getPrmie(this.limit * 2)
            this.resize(newPrmise);
        }
    }

    // 获取元素
    HashTable.prototype.get = function (key) {
        //1. 根据 key 获取对应的index
        var index = this.hashCode(key);

        //2. 根据 index 获取对应的 bucket
        var bucket = this.storage[index];
        if (isNotDefine(bucket)) {
            return null;
        }

        for (var i = 0; i < bucket.length; i++) {
            var tuple = bucket[i];
            if (tuple[0] === key) {
                return tuple[1];
            }
        }

        return null;
    }

    // 删除
    HashTable.prototype.remove = function (key) {
        var index = this.hashCode(key);
        var bucket = this.storage[index];
        if (isNotDefine(bucket)) {
            return null;
        }

        for (var i = 0; i < bucket.length; i++) {
            var tuple = bucket[i];
            if (tuple[0] === key) {
                bucket.splice(i, 1);
                this.count -= 1;

                // 判断是否需要缩容
                if (this.limit > 7 && this.count < this.limit * 0.25) {
                    var newPrmise = this.getPrmie(this.limit / 2)
                    this.resize(newPrmise);
                }
                return bucket[1];
            }
        }

        return null;
    }

    // 判断哈希表是否为空
    HashTable.prototype.isEmpty = function () {
        return this.count == 0;
    }

    // 获取哈希表中的个数
    HashTable.prototype.size = function () {
        return this.count;
    }

    // 哈希扩容
    HashTable.prototype.resize = function (newLimit) {
        // 保存老数组
        var oldStorage = this.storage;

        // 重置所有属性
        this.storage = [];
        this.count = 0;
        this.limit = newLimit;

        // 遍历所有 oldStorage
        for (var i = 0; i < oldStorage.length; i++) {
            var bucket = oldStorage[i];
            if (isNotDefine(bucket)) {
                continue;
            }

            // 重新插入
            for (var j = 0; j < bucket.length; j++) {
                var tuple = bucket[j];
                this.put(tuple[0], tuple[1]);
            }
        }

    }
}

var ht = new HashTable();
ht.put("Tom", {
    name: "wuhan"
});
ht.put("mba", "1234");
ht.put("NBA", "8685");
ht.put("CBA", "4574");

console.log(ht.get("Tom"))
ht.put("CBA", "kkkk");
console.log(ht.get("CBA"))