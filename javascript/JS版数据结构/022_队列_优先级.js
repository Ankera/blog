function PriorityQueue() {
    /**
     * 
     * @param {*} element 队列中的元素
     * @param {*} priority 优先级
     */
    function QueueElement(element, priority) {
        this.element = element;
        this.priority = priority;
    }

    // 封装属性
    this.items = [];

    // 往队列中插入元素，并确定优先级
    PriorityQueue.prototype.enqueue = function (element, priority) {
        // 创建 QueueElement 对象
        var queueElement = new QueueElement(element, priority);
        if (this.isEmpty()) {
            this.items.push(queueElement);
        } else {
            var added = false;
            for (let i = 0; i < this.items.length; i++) {
                if (queueElement.priority > this.items[i].priority) {
                    this.items.splice(i, 0, queueElement);
                    added = true;
                    break;
                }
            }
            if (!added) {
                this.items.push(queueElement);
            }
        }
    }

    /**
     * 移除队列中的元素
     * isPriority 如果为true，则移除权限最高的元素
     */
    PriorityQueue.prototype.dequeue = function (isPriority = false) {
        // if (!isPriority) {
        //     return this.items.shift();
        // }
        // // 找出权限最高的下标
        // var maxPriority = this.items[i].priority;
        // var maxIndex = 0;
        // for (var i = 0; i < this.items.length; i++) {
        //     if (maxIndex < this.items[i].priority) {
        //         maxPriority = this.items[i].priority;
        //         maxIndex = i;
        //     }
        // }
        // this.items.splice(maxIndex, 1);
        // return this.items[maxIndex];

        return this.items.shift();
    }

    // 返回队列中第一个元素 
    PriorityQueue.prototype.front = function () {
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
}