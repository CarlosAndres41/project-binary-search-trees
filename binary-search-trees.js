class Node {
    constructor(value) {
        this.val = value;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(array) {
        this.root = buildTree(array);
    }
}

const buildTree = (array) => {
    let filteredArray = [...new Set(array)];
    filteredArray.sort((a, b) => {
        return a < b ? -1 : 1;
    });
    console.log(filteredArray);
    let root = new Node(filteredArray.shift());
    let queue = [root];
    while (filteredArray.length > 0) {
        let current = queue.shift();
        current.left = new Node(filteredArray.shift());
        current.right = new Node(filteredArray.shift());
        queue.push(current.left);
        queue.push(current.right);
    }
    return root;
};
