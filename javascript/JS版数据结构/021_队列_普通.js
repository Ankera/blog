function Queue() {
    // 属性
    this.items = [];

    // 向队列中添加元素
    Queue.prototype.enqueue = function (element) {
        this.items.push(element);
    }

    // 移除队列中的元素
    Queue.prototype.dequeue = function () {
        return this.items.shift();
    }

    // 返回队列中第一个元素
    Queue.prototype.front = function () {
        return this.items[0];
    }

    // 判断队列是否为空
    Queue.prototype.isEmpty = function () {
        return this.items.length == 0 ? true : false;
    }

    // 判断多少个元素
    Queue.prototype.size = function () {
        return this.items.length;
    }

    Queue.prototype.toString = function (f = "") {
        return this.items.join(f)
    }
}

// 击鼓传花 数字游戏
function passGame(nameList, num) {
    // 创建一个队列
    var queue = new Queue();

    // 将所有人依次加入队列, i, 依次代表每个人
    nameList.forEach(i => {
        queue.enqueue(i);
    });

    while(queue.size() > 1) {
        // 不是num，则依次加入队列，是队列，则删除
        for (let i = 0; i < num - 1; i++) {
            queue.enqueue(queue.dequeue());
        }
        queue.dequeue();
    }

    // 返回队列中最后一个
    return queue.front();
}

console.log(passGame([1,2,3,4,5,6,8], 3));