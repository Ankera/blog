function LinkedList() {

    function Node(data) {
        this.data = data;
        this.next = null;
    }

    // 头结点
    this.head = null;
    // 记录链表的长度
    this.length = 0;

    // 向链表中追加元素
    LinkedList.prototype.append = function (data) {
        var newNode = new Node(data);
        if (this.length === 0) {    // 第一个节点
            this.head = newNode;
        } else {
            var currentNode = this.head;
            // 找出最有一个节点
            while (currentNode.next) {
                currentNode = currentNode.next;
            }
            currentNode.next = newNode;
        }
        this.length += 1;
    }

    // 向链表中特定位置插入元素
    LinkedList.prototype.insert = function (position, data) {
        if (position < 0 || position > this.length) {
            return false;
        }

        // 创建节点
        var newNode = new Node(data);
        if (position === 0) {
            newNode.next = this.head;
            this.head = newNode;
        } else {
            var index = 0;
            var oldNode = this.head;
            // 获取要替换的节点前一个节点
            var previous = null;
            while (index < position) {
                index++;
                previous = oldNode;
                oldNode = oldNode.next;
            }
            previous.next = newNode;
            newNode.next = oldNode;
        }

        this.length += 1;
        return true;
    }

    // 获取对应位置的元素
    LinkedList.prototype.get = function (position) {
        if (position < 0 || position >= this.length) {
            return false;
        }
        var index = 0;
        var currentNode = this.head;
        while (index < position && currentNode) {
            index++;
            currentNode = currentNode.next;
        }
        return currentNode;
    }

    // 通过 data 获取下标
    LinkedList.prototype.indexOf = function (data) {
        var index = 0;
        var currentNode = this.head;
        if (currentNode === null) {
            return -1;
        }
        
        while (!(currentNode.data === data)) {
            if (currentNode.next === null) {
                return -1;
            }
            index++;
            currentNode = currentNode.next;
        }

        return index;
    }

    // 修改某些位置的元素
    LinkedList.prototype.update = function (position, data) {
        var currentNode = this.get(position);
        currentNode.data = data;
    }

    // 从特定位置移除元素
    LinkedList.prototype.removeAt = function (position) {
        if (position < 0 || position >= this.length) {
            return false;
        }

        var currentNode = this.head;
        if (position === 0) {
            currentNode = currentNode.next;
            this.head = currentNode;
        } else {
            // 获取要替换的节点前一个节点
            var previous = null;
            var index = 0;
            while (index < position) {
                index++;
                previous = currentNode;
                currentNode = currentNode.next;
            }
            previous.next = currentNode.next;
        }
        this.length--;
        return true;
    }

    // 从列表中移除元素
    LinkedList.prototype.remove = function (data) {
        var index = this.indexOf(data);
        if(index === -1){
            return;
        }
        return this.removeAt(index);
    }

    // 判断是否为空
    LinkedList.prototype.isEmpty = function () {
        return this.length === 0;
    }

    // 返回链表元素个数
    LinkedList.prototype.size = function () {
        return this.length;
    }

    LinkedList.prototype.toString = function () {
        var currentNode = this.head;
        var listString = "";
        if (currentNode === null) {
            return "";
        }
        while (currentNode) {
            listString += currentNode.data + "  ";
            currentNode = currentNode.next;
        }
        return listString;
    }
}

var list = new LinkedList();
list.append("Tom");
list.append("MBA");
list.append("Anker");
// list.insert(2, "rrrr");
// console.log(list.get(2));
// list.update(0, "NNNNN");
list.remove("Anker");
// list.removeAt(2);
console.log(list.indexOf("Anker"));
console.log(list.toString());