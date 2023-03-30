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

function find(root, value) {
    // Returns node if found, returns null if not
    if (root === null) return null;
    if (root.val === value) return root;
    return value > root.val ? find(root.right, value) : find(root.left, value);
}

// LevelOrder function traverses through a tree in BFS way and returns an array with the node values by level
function levelOrder(root) {
    let queue = [root];
    let result = [];
    while (queue.length > 0) {
        let current = queue.shift();
        result.push(current.val);
        if (current.left !== null) queue.push(current.left);
        if (current.right !== null) queue.push(current.right);
    }
    return result;
}

// Inorder function returns the foremost left node then its root and then root.right
function inOrder(root) {
    // base case: empty tree
    if (root === null) return [];
    const leftValues = inOrder(root.left);
    const rightValues = inOrder(root.right);
    return [...leftValues, root.val, ...rightValues];
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
