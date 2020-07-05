function ArrayList(array = []) {
    // 属性
    this.array = array;

    // 方法
    ArrayList.prototype.insert = function (value) {
        this.array.push(value);
    }

    ArrayList.prototype.toString = function (f = "-") {
        this.array.join(f);
    }

    // 交换两个位置的数据
    ArrayList.prototype.swap = function (m, n) {
        var temp = this.array[m];
        this.array[m] = this.array[n];
        this.array[n] = temp;

        // 两种交换位置的方法，在100万数据快排中，差别40ms-50ms
        // [this.array[m], this.array[n]] = [this.array[n], this.array[m]];
    }

    /**
     * 实现冒泡排序算法
     * 冒泡排序，从小到大排序
     * 让数组中的当前项和后一项进行比较，如果当前项比后一项大，则两项交换位置
     */
    ArrayList.prototype.bubbleSort = function () {
        var length = this.array.length;
        for (var j = length - 1; j >= 0; j--) {
            for (var i = 0; i < j; i++) {
                if (this.array[i] > this.array[i + 1]) {

                    this.swap(i, i + 1);
                }
            }
        }
    }

    /**
     * 实现冒泡排序算法
     * 设置一标志性变量 pos,用于记录每趟排序中最后一次进行交换的位置。 
     * 由于 pos 位置之后的记录均已交换到位,故在进行下一趟排序时只要扫描到 pos 位置即可。
     * 
     * 原则从小到二排序
     * 思想1 
     * 冒泡排序 bubbleSort2 方法和快速排序结合
     * 如果我们传入的数组足够大，设置标志位 pos，且在外层循环小于(举例)10次， 那么冒泡排序时间复杂度比较次数大O表示法接近 O(n)
     * 如果外层循环超过(举例)10次， 再启用快排
     * 
     * 思想2
     * bubbleSort2 ，在比较数组时，取出第一个R1和第最后元素Rn做比较，如果 
     *      R1 > Rn 则 reverse 一下，(必须无限制调用排序)，这样做即使无限制调用冒泡排序，大O表示法也是在 O(n)
     *      R1 < Rn 正常排序
     */
    ArrayList.prototype.bubbleSort2 = function () {
        var i = this.array.length - 1;
        while (i > 0) {
            var pos = 0;    // 减少循环次数
            for (var j = 0; j < i; j++) {
                if (this.array[j] > this.array[j + 1]) {
                    pos = j;
                    this.swap(j, j + 1);
                }
            }
            i = pos;
        }
    }

    /**
     * 实现冒泡排序算法
     * 传统冒泡排序中每一趟排序操作只能找到一个最大值或最小值, 
     * 我们可以 在每趟排序中进行正向和反向两遍冒泡 ， 
     * 一次可以得到两个最终值（最大和最小） , 从而使外排序趟数几乎减少了一半。
     * 
     * 缺点增加了内循环
     */
    ArrayList.prototype.bubbleSort3 = function () {
        var start = 0;
        var end = this.array.length - 1;
        while (start < end) {
            for (var i = start; i < end; i++) {
                if (this.array[i] > this.array[i + 1]) {
                    this.swap(i, i + 1);
                }
            }
            end -= 1;

            for (var j = end; j > start; j--) {
                if (this.array[j] < this.array[j - 1]) {
                    this.swap(j, j - 1);
                }
            }
            start += 1;
        }
    }

    ArrayList.prototype.bubbleSort4 = function () {
        var start = 0;
        var end = this.array.length - 1;
        while (start < end) {
            var startPos = 0;
            var endPos = 0;

            for (var i = start; i < end; i++) {
                if (this.array[i] > this.array[i + 1]) {
                    endPos = i;
                    this.swap(i, i + 1);
                }
            }
            end = endPos;

            for (var j = end; j > start; j--) {
                if (this.array[j] < this.array[j - 1]) {
                    startPos = j;
                    this.swap(j, j - 1);
                }
            }
            start = startPos;
        }
    }

    // 普通选择排序
    ArrayList.prototype.selectSort = function () {
        var length = this.array.length;

        // 默认第一个最小
        for (var j = 0; j < length - 1; j++) {
            var min = j;
            for (var i = min + 1; i < length; i++) {
                if (this.array[min] > this.array[i]) {
                    min = i;
                }
            }
            if (min !== j) {
                this.swap(min, j);
            }
        }
    }

    /**
     * 插入排序
     * 局部有序
     */
    ArrayList.prototype.insertSort = function () {
        var length = this.array.length;

        // 外层循环，从第一个位置开始获取数据，向前面局部有序的插入
        for (var i = 1; i < length; i++) {
            var temp = this.array[i];
            var j = i;
            // 局部排序
            while (this.array[j - 1] > temp && j > 0) {
                // 如果比取值大就随位往后移动一位
                this.array[j] = this.array[j - 1];
                j--;
            }

            // 将j位置的数据，放置temp就可以
            this.array[j] = temp;
        }
    }

    ArrayList.prototype.insertSort2 = function () {
        var newArray = [];
        // 插入排序先插入第一个
        newArray.push(this.array[0]);

        for (var i = 1; i < this.array.length; i++) {
            var insertValue = this.array[i];
            for (var j = newArray.length - 1; j >= 0; j--) {
                var compareValue = newArray[j];
                if (insertValue > compareValue) {
                    newArray.splice(j + 1, 0, insertValue);
                    break;
                }
                if (j === 0) {
                    newArray.unshift(insertValue);
                }
            }
        }

        this.array = newArray;
    }

    // 希尔排序
    ArrayList.prototype.shellSort = function () {
        // const len = this.array.length;
        // var gap = 1;

        // while (gap < len / 3) {
        //     gap = gap * 3 + 1;
        // }
        var length = this.array.length;

        // 初始化增量, 增量序列
        var gap = Math.floor(length / 2);

        // 增量为1时结束, while循环，gap间隔不断减小
        while (gap >= 1) {
            for (var i = gap; i < length; i++) {
                var temp = this.array[i];
                var j = i;
                // while (this.array[j - gap] > temp && j > gap - 1) {
                while (this.array[j - gap] > temp && j > 0) {
                    this.array[j] = this.array[j - gap];
                    j -= gap;
                }

                this.array[j] = temp;
            }

            gap = Math.floor(gap / 2);
        }
    }

    // 快速排序， 选择枢纽
    ArrayList.prototype.median = function (left, right) {
        var center = Math.floor((left + right) / 2);

        // 判断大小并且交换位置
        if (this.array[left] > this.array[center]) {
            this.swap(left, center);
        }
        if (this.array[center] > this.array[right]) {
            this.swap(center, right);
        }
        if (this.array[left] > this.array[center]) {
            this.swap(left, center);
        }

        // 将center 位置换到right-1的位置
        this.swap(center, right - 1);

        return this.array[right - 1];
    }

    /**
     * 快速排序
     * 比如打高尔夫球，先大致方向，再小方向打球
     */
    ArrayList.prototype.quickSort = function () {
        this.quick(0, this.array.length - 1);
    }

    ArrayList.prototype.quick = function (left, right) {
        if (left >= right) {
            return false;
        }

        // 找到枢纽值
        var pivot = this.median(left, right);

        // 定义变量，用于记录当前找到的位置
        var i = left;
        var j = right - 1;

        while (i < j) {
            while (this.array[++i] < pivot) { };
            while (this.array[--j] > pivot) { };
            if (i < j) {
                this.swap(i, j);
            } else {
                break;
            }
        }

        // 交换位置
        this.swap(i, right - 1);

        this.quick(left, i - 1);
        this.quick(i + 1, right);
    }

    ArrayList.prototype.quickSort2 = function () {
        this.array = fn(this.array);

        function fn(array) {
            if (array.length <= 1) {
                return array;
            }
            var middleIndex = Math.floor(array.length / 2);
            var middleValue = array.splice(middleIndex, 1)[0];
            var arrLeft = [];
            var arrRight = [];
            for (let i = 0; i < array.length; i++) {
                var item = array[i];
                item < middleValue ? arrLeft.push(item) : arrRight.push(item);
            }

            return fn(arrLeft).concat(middleValue, fn(arrRight));
        }
    }

    // 归并排序
    ArrayList.prototype.mergeSort = function () {
        this.array = this.merge(this.array);
    }

    ArrayList.prototype.merge = function (array) {
        var length = array.length;
        if (length < 2) {
            return array;
        }

        var middleIndex = Math.floor(length / 2);
        var left = array.splice(0, middleIndex);
        var right = array;
        return this.mergeCompare(this.merge(left), this.merge(right));
    }

    ArrayList.prototype.mergeCompare = function (left, right) {
        var result = [];
        while (left.length > 0 && right.length > 0) {
            result.push(left[0] < right[0] ? left.shift() : right.shift());
        }

        return result.concat(left, right);
    }
}

function sum(m, n) {
    return Math.floor(Math.random() * (m - n) + n);
}

var arr = [];
for (var i = 0; i < 100000; i++) {
    arr.push(sum(1, 1000000));
}
var list = new ArrayList(arr);
list.insert(178);
list.insert(278);
list.insert(23);
list.insert(2);
list.insert(43);
list.insert(5);
list.insert(15);
list.insert(78);
list.insert(178);
list.insert(278);

// console.time("a");
// list.mergeSort();
// console.timeEnd("a");
// list.selectSort();
// console.log(list.array);
