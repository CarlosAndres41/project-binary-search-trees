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
    let filteredArr = [...new Set(array)];
    let root = new Node(filteredArr.shift());
    filteredArr.forEach((value) => {
        insertValue(root, value);
    });
    return root;
};

function insertValue(root, value) {
    if (root === null) root = new Node(value);
    if (value < root.val) root.left = insertValue(root.left, value);
    if (value > root.val) root.right = insertValue(root.right, value);
    return root;
}

//This function will expect to receive the root of your tree as the value for the node parameter.
const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.val}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
};
