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

function deleteValue(root, value) {
    if (root === null) return null;
    // Value is greater than root.val, go right
    if (value > root.val) {
        root.right = deleteValue(root.right, value);
        return root;
        // Else go left
    } else if (value < root.val) {
        root.left = deleteValue(root.left, value);
        return root;
        // Else, if root.val === value:
    } else {
        // First two cases: node to be deleted is a leaf or has 1 chiild:
        if (root.left === null) {
            root = root.right;
            return root;
        } else if (root.right === null) {
            root = root.left;
            return root;
        } else {
            // node has 2 children
            // get the minimum value of node's right branch:
            let min = new Node(getMin(root.right));
            let childrenR = root.right;
            let childrenL = root.left;
            deleteValue(childrenR, min.val);
            min.right = childrenR;
            min.left = childrenL;
            return min;
        }
    }
}

function getMin(root) {
    if (root === null) return Infinity;
    const leftMin = getMin(root.left);
    const rightMin = getMin(root.right);
    return Math.min(root.val, leftMin, rightMin);
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
