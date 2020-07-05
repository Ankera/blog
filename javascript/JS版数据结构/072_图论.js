// 封装无相图

function Graph() {
    // 保存顶点
    this.vertexes = [];

    // 保存边
    this.edges = new Dictionay();

    // 添加方法
    // 添加顶点
    Graph.prototype.addVertex = function (v) {
        this.vertexes.push(v);
        this.edges.set(v, []);
    }

    /**
     * 添加边
     * A-->B
     * B-->A
     */
    Graph.prototype.addEdge = function (v1, v2) {
        this.edges.get(v1).push(v2);
        this.edges.get(v2).push(v1);
    }

    /**
     * 图的遍历
     * 将图中每个顶点访问一遍，并且不能有重复的访问， 有两种方法
     *      广度优先搜索(Breadth-First Search) BFS
     *      深度优先搜索(Depth-First Search) DFS
     * 两种遍历算法，都需要指明第一个被访问的顶点
     * 
     * 两种算法的思想
     * 1. BFS，基于队列，入队列的顶点被探索
     * 2. DFS，基于栈或使用递归，通过将顶点存入栈中，顶点是沿着路径被探索的，存在新的相邻顶点就去访问
     * 
     * 为了记录顶点是否被访问过，我们使用三种颜色来标识
     * 1. 白色，表示该顶点没有被访问过
     * 2. 灰色，表示该顶点被访问过，但并没有被探索过
     * 3. 黑色，表示该顶点被访问过也被探索过
     */
    Graph.prototype.bfs = function (initV, handler) {
        //1. 初始化颜色
        var colors = this.initialzeColors();

        //2. 创建队列
        var queue = new Queue();

        //3. 将顶点加入到队列
        queue.enqueue(initV);

        //4. 循环从队列中取出元素
        while (!queue.isEmpty()) {
            //4.1 从队列中取出第一个顶点
            var v = queue.dequeue();

            //4.2 获取和顶点相连的另外顶点
            var vList = this.edges.get(v);

            //4.3 将v的颜色设置为灰色
            colors[v] = "gray";

            //4.4 遍历所有的顶点，并加入到队列中
            for (var i = 0; i < vList.length; i++) {
                var e = vList[i];
                if (colors[e] === "white") {
                    colors[e] = "gray";
                    queue.enqueue(e);
                }
            }

            //4.5 访问节点
            handler && handler(v);

            //4.6 将顶点置为黑色
            colors[v] = "black";
        }
    }

    Graph.prototype.dfs = function (initV, handler) {
        var colors = this.initialzeColors();

        this.dfsVisit(initV, colors, handler);
    }

    Graph.prototype.dfsVisit = function (v, colors, handler) {
        //1. 将颜色置为灰色
        colors[v] = "gray";

        //2. 处理v点
        handler && handler(v);

        //3. 访问v相连的顶点
        var vList = this.edges.get(v);
        for (var i = 0; i < vList.length; i++) {
            var e = vList[i];
            if (colors[e] === "white") {
                this.dfsVisit(e, colors, handler);
            }
        }

        //4. 将v设置黑色
        colors[v] = "black";
    }

    Graph.prototype.initialzeColors = function (color = "white") {
        var colors = [];
        for (var i = 0; i < this.vertexes.length; i++) {
            colors[this.vertexes[i]] = color;
        }
        return colors;
    }

    Graph.prototype.toString = function () {
        var resultString = "";

        // 遍历所有的顶点，及顶点对应的边
        for (var i = 0; i < this.vertexes.length; i++) {
            resultString += this.vertexes[i] + "->";
            var vEdges = this.edges.get(this.vertexes[i]);
            for (var j = 0; j < vEdges.length; j++) {
                resultString += vEdges[j] + " ";
            }
            resultString += "\n";
        }

        return resultString;
    }
}


var graph = new Graph();
// 顶点集合
var myVertexes = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
for (var i = 0; i < myVertexes.length; i++) {
    graph.addVertex(myVertexes[i]);
}

// 添加边
graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("A", "D");
graph.addEdge("C", "D");
graph.addEdge("C", "G");
graph.addEdge("D", "G");
graph.addEdge("D", "H");
graph.addEdge("B", "E");
graph.addEdge("B", "F");
graph.addEdge("E", "I");

// console.log(graph.toString());
console.log(graph.vertexes)
var resultString2 = "";
graph.bfs(graph.vertexes[0], function (v) {
    resultString2 += v + " ";
});
console.log(resultString2);

var resultString3 = "";
graph.dfs(graph.vertexes[0], function (v) {
    resultString3 += v + " ";
});
console.log(resultString3);




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
        return this.items.length == 0;
    }

    // 判断多少个元素
    Queue.prototype.size = function () {
        return this.items.length;
    }

    Queue.prototype.toString = function (f = "") {
        return this.items.join(f)
    }
}

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