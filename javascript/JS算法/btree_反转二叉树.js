class NodeTree {
    constructor(value) {
        this.left = null;
        this.right = null;
        this.value = value;
    }
}

function reverseBTree(node) {
    if (!node) {
        return;
    }
    let temp = node.left;
    node.left = node.right;
    node.right = temp;
    reverseBTree(node.left);
    reverseBTree(node.right);
}