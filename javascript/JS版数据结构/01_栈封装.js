function Stack() {
    // 栈的属性
    this.items = [];

    // 栈的操作
    // 往栈顶添加新元素
    Stack.prototype.push = function (val) {
        this.items.push(val);
    }

    // 从栈中取出元素
    Stack.prototype.pop = function () {
        return this.items.pop();
    }

    // 查看一下栈顶元素
    Stack.prototype.peek = function () {
        return this.items[this.items.length - 1];
    }

    // 判断栈是否为空
    Stack.prototype.isEmpty = function () {
        return this.items.length == 0 ? true : false;
    }

    // 获取栈中元素个数
    Stack.prototype.size = function () {
        return this.items.length;
    }

    /**
     * toString 方法
     * 默认一个空格
     */
    Stack.prototype.toString = function (f = "") {
        return this.items.join(f)
    }
}

// 将十进制封装成二进制
function decTobin(decNumber) {
    var stack = new Stack();

    while(decNumber > 0) {
        // 获取余数push到栈中
        stack.push(decNumber%2);

        // 取出下次计算
        decNumber = Math.floor(decNumber / 2);
    }

    // 二进制从低位到高位反转
    stack.items.reverse();
    return stack.toString();
}

console.log(decTobin(4234));