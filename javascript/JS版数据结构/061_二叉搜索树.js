/**
 * BST 封装
 * 二叉搜索树优势
 * 
 */
function BinarySearchTree() {
    // 属性
    this.root = null;

    function Node(key) {
        this.key = key;
        this.left = null;
        this.right = null;
    }

    // 插入
    BinarySearchTree.prototype.insert = function (key) {
        //1. 创建节点
        var newNode = new Node(key);

        //2. 判断根节点是否有值
        if (this.root === null) {
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode);
        }
    }

    /**
     *  内部递归插入
     */
    BinarySearchTree.prototype.insertNode = function (node, newNode) {
        // 向左遍历
        if (newNode.key < node.key) {
            if (node.left === null) {
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode);
            }
        } else {
            if (node.right === null) {
                node.right = newNode;
            } else {
                this.insertNode(node.right, newNode);
            }
        }
    }

    // 查询
    BinarySearchTree.prototype.search = function (key) {
        var node = this.root;

        while (node !== null) {
            if (key < node.key) {
                node = node.left;
            } else if (key > node.key) {
                node = node.right;
            } else {
                return true;
            }
        }

        return false;
    }

    /**
     * 删除
     * 删除叶子节点
     * 删除只有一个叶子节点的节点
     * 删除有两个叶子节点的节点
     */
    BinarySearchTree.prototype.remove = function (key) {
        //1. 设置属性
        var current = this.root;
        var parent = null;  // 当前节点的父节点
        var isLeftChild = true; // 默认current是parent的左节点

        //1.2 寻找要删除的节点
        while (current.key !== key) {
            parent = current;
            if (key < current.key) {
                isLeftChild = true;
                current = current.left;
            } else {
                isLeftChild = false;
                current = current.right;
            }

            // 循环遍历到底部，依然没有找到，则退出
            if (current === null) {
                return false;
            }
        }

        //2. 根据对应的情况删除
        //2.1 删除的是叶子节点
        if (current.left === null && current.right === null) {
            if (current === this.root) {
                this.root = null;
            } else if (isLeftChild) {
                parent.left = null;
            } else {
                parent.right = null;
            }
            //2.2 删除只有一个叶子节点的节点
        } else if (current.right === null) {
            if (current === this.root) {
                this.root = current.left;
            } else if (isLeftChild) {
                parent.left = current.left;
            } else {
                parent.right = current.left;
            }
        } else if (current.left === null) {
            if (current === this.root) {
                this.root = current.right;
            } else if (isLeftChild) {
                parent.left = current.right;
            } else {
                parent.right = current.right;
            }
            // 删除有两个叶子节点的节点
        } else {
            var successor = this.getSuccessor(current);

            if (current === this.root) {
                this.root = successor;
            } else if (isLeftChild) {
                parent.left = successor;
            } else {
                parent.right = successor;
            }

            // 将删除节点的左子树
            successor.left = current.left;
        }
    }

    // 找到前驱
    BinarySearchTree.prototype.getPrecursor = function (delNode) {
        var precursor = delNode;
    }

    // 找到后继
    BinarySearchTree.prototype.getSuccessor = function (delNode) {
        // 定义变量，保存找到的后继
        var successor = delNode;
        var currentNode = delNode.right;
        var successorParent = delNode;

        while (currentNode !== null) {
            successorParent = successor;
            successor = currentNode;
            currentNode = currentNode.left;
        }

        if (successor != delNode.right) {
            successorParent.left = successor.right;
            successor.right = delNode.right;
        }

        return successor;
    }

    /**
     * 先序遍历
     * 先访问根节点，先序遍历左子树，先序遍历右子树
     */
    BinarySearchTree.prototype.preOrderTraverse = function (handler) {
        this.preOrderTraverseNode(this.root, handler);
    }

    BinarySearchTree.prototype.preOrderTraverseNode = function (node, handler) {
        if (node !== null) {
            //1. 处理经历过的 key节点
            handler(node.key);

            //2. 处理左节点
            this.preOrderTraverseNode(node.left, handler);

            //3. 处理右节点
            this.preOrderTraverseNode(node.right, handler);
        }
    }

    /**
     * 中序遍历
     * 先中序访问左子树，再中序遍历根节点，再中序访问右子树
     */
    BinarySearchTree.prototype.inOrderTraverse = function (handler) {
        this.inOrderTraverseNode(this.root, handler)
    }

    BinarySearchTree.prototype.inOrderTraverseNode = function (node, handler) {
        if (node !== null) {
            //1. 处理经历过的 key节点
            this.inOrderTraverseNode(node.left, handler);

            //2. 处理左节点
            handler(node.key);

            //3. 处理右节点
            this.inOrderTraverseNode(node.right, handler);
        }
    }

    /**
     * 后序遍历
     * 先后序访问左子树，再后序访问右子树，再后序遍历根节点，
     */
    BinarySearchTree.prototype.postOrderTraverse = function (handler) {
        this.postOrderTraverseNode(this.root, handler)
    }

    BinarySearchTree.prototype.postOrderTraverseNode = function (node, handler) {
        if (node !== null) {
            //1. 处理经历过的 key节点
            this.postOrderTraverseNode(node.left, handler);

            //2. 处理左节点
            this.postOrderTraverseNode(node.right, handler);

            //3. 处理右节点
            handler(node.key);
        }
    }

    // 最小二叉树值
    BinarySearchTree.prototype.min = function () {
        if (this.root === null) {
            return null;
        }
        var currentNode = this.root;
        while (currentNode !== null && currentNode.left !== null) {
            currentNode = currentNode.left;
        }
        return currentNode.key;
    }

    // 最大二叉树值
    BinarySearchTree.prototype.max = function () {
        if (this.root === null) {
            return null;
        }
        var currentNode = this.root;
        var key = null;
        while (currentNode !== null) {
            key = currentNode.key;
            currentNode = currentNode.right;
        }
        return key;
    }
}

var tree = new BinarySearchTree();
tree.insert(11);
tree.insert(7);
tree.insert(15);
tree.insert(5);
tree.insert(3);
tree.insert(9);
tree.insert(8);
tree.insert(10);
tree.insert(13);
tree.insert(12);
tree.insert(14);
tree.insert(20);
tree.insert(18);
tree.insert(25);
tree.insert(6);
// console.log(tree);
var prevKey = "";
tree.preOrderTraverse(function (key) {
    prevKey += key + " ";
});
console.log(prevKey);

var inKey = "";
tree.inOrderTraverse(function (key) {
    inKey += key + " ";
});
console.log(inKey);

var postKey = "";
tree.postOrderTraverse(function (key) {
    postKey += key + " ";
});
console.log(postKey);

console.log(tree.min());

console.log(tree.max());

console.log("search", tree.search(6));