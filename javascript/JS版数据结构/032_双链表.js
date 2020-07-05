function DoublyLinkedList() {
    // 首节点
    this.head = null;
    // 未节点
    this.tail = null;
    // 链表场地
    this.length = 0;

    // 节点
    function Node(data) {
        this.data = data;
        this.prev = null;
        this.next = null;
    }

    // 向链表中追加元素
    DoublyLinkedList.prototype.append = function (data) {
        var newNode = new Node(data);
        if (this.length === 0) { // 首节点
            this.head = newNode;
        } else {
            newNode.prev = this.tail;
            this.tail.next = newNode;
        }
        this.tail = newNode;
        this.length += 1;
    }

    // 向链表中特定位置插入元素
    DoublyLinkedList.prototype.insert = function (position, data) {
        if (position < 0 || position > this.length) {
            return false;
        }

        // 创建新节点
        var newNode = new Node(data);

        if (this.length === 0) {
            this.head = newNode;
            this.tail = newNode;
        } else if (position === 0) {
            this.head.prev = newNode;
            newNode.next = this.head;
            this.head = newNode;
        } else if (this.length === position) {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        } else {
            // 找出替换的当前节点和前一个节点
            var currentNode = this.head;
            var prevNode = null;
            var index = 0;
            while (index < position) {
                prevNode = currentNode;
                currentNode = currentNode.next;
                index++;
            }

            prevNode.next = newNode;
            newNode.prev = prevNode;
            newNode.next = currentNode;
            currentNode.prev = newNode;
        }
        this.length += 1;
        return true;
    }

    // 获取对应位置的元素
    DoublyLinkedList.prototype.get = function (position) {
        if (position < 0 || position >= this.length) {
            return false;
        }

        var currentNode = this.head;
        var index = 0;
        while (index < position) {
            currentNode = currentNode.next;
            index++;
        }
        return currentNode;
    }

    // 通过 data 获取下标
    DoublyLinkedList.prototype.indexOf = function (data) {
        var currentNode = this.head;
        var index = 0;
        if (currentNode === null) {
            return -1;
        }

        while (!(currentNode.data === data)) {
            if (currentNode.next === null) {
                return -1;
            }
            currentNode = currentNode.next;
            index++;
        }
        return index;
    }

    // 修改某些位置的元素
    DoublyLinkedList.prototype.update = function (position, data) {
        if (position < 0 || position >= this.length) {
            return false;
        }

        var currentNode = this.head;
        var index = 0;
        while (index < position) {
            currentNode = currentNode.next;
            index++;
        };
        currentNode.data = data;
        return true;
    }

    // 从特定位置移除元素
    DoublyLinkedList.prototype.removeAt = function (position) {
        if (position < 0 || position >= this.length) {
            return false;
        }

        if (!this.head) {
            return false;
        }
        if (this.length === 1) {
            this.head = this.tail = null;
        } else if (position === 0) {
            this.head.next.prev = null;
            this.head = this.head.next;
        } else if (position === this.length - 1) {
            var prevNode = this.tail.prev;
            prevNode.next = null;
            this.tail = prevNode;
        } else {
            var currentNode = this.head;
            var prevNode = null;
            var index = 0;
            while (index < position) {
                prevNode = currentNode;
                currentNode = currentNode.next;
                index++;
            }
            prevNode.next = currentNode.next;
            currentNode.next.prev = prevNode;
        }
        this.length -= 1;
        return true;
    }

    // 从列表中移除元素
    DoublyLinkedList.prototype.remove = function (data) {
        let index = this.indexOf(data);
        return this.removeAt(index);
    }

    // 判断是否为空
    DoublyLinkedList.prototype.isEmpty = function () {
        return this.length === 0;
    }

    // 返回链表元素个数
    DoublyLinkedList.prototype.size = function () {
        return this.length;
    }

    DoublyLinkedList.prototype.toString = function (f = "") {
        return this.backwardString(f);
    }

    // 返回正向遍历的字符串, 从后往前
    DoublyLinkedList.prototype.forwardString = function (f = "") {
        var currentNode = this.tail;
        var resultString = "";

        // 依次向前遍历获取每个值
        while (currentNode) {
            resultString += currentNode.data + f;
            currentNode = currentNode.prev;
        }
        return resultString;
    }

    // 返回反向遍历的字符串, 从前往后
    DoublyLinkedList.prototype.backwardString = function (f = "") {
        var currentNode = this.head;
        var resultString = "";

        // 依次向后遍历获取每个值
        while (currentNode) {
            resultString += currentNode.data + f;
            currentNode = currentNode.next;
        }
        return resultString;
    }

    // 获取链表第一个元素
    DoublyLinkedList.prototype.getHead = function () {
        return this.head && this.head.data || null;
    }

    // 获取链表最后一个元素
    DoublyLinkedList.prototype.getTail = function () {
        return this.tail && this.tail.data || null;
    }
}

var list = new DoublyLinkedList();

list.append("Tom");
list.append("Anker");
list.append("Wuhan");
list.append("Hangzhou");
// list.insert(4, "Zhangji");
// list.update(3, "Yuyayong");
// console.log(list.indexOf("Zhangji"));
list.removeAt(2);
console.log(list.toString(" "));