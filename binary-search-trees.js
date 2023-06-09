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

// Inorder function returns the foremost left node then its root and then its sibling
function inOrder(root) {
    // base case: empty tree
    if (root === null) return [];
    const leftValues = inOrder(root.left);
    const rightValues = inOrder(root.right);
    return [...leftValues, root.val, ...rightValues];
}

// preOrder function returns the root node followed by all left items and then right items
function preOrder(root) {
    if (root === null) return [];
    const leftValues = preOrder(root.left);
    const rightValues = preOrder(root.right);
    return [root.val, ...leftValues, ...rightValues];
}

// Inorder function returns the foremost left node then its sibling and its root
function postOrder(root) {
    if (root === null) return [];
    let leftValues = postOrder(root.left);
    let rightValues = postOrder(root.right);
    return [...leftValues, ...rightValues, root.val];
}

// Height is defined as the number of edges in longest path from a given node to a leaf node.
function height(root) {
    if (root === null) return 0;
    let right = height(root.right);
    let left = height(root.left);
    return Math.max(right, left) + 1;
}

// Depth is defined as the number of edges in path from a given node to the tree’s root node.
function depth(node, root) {
    if (root === null) return 0;
    if (node > root.val) return 1 + depth(node, root.right);
    if (node < root.val) return 1 + depth(node, root.left);
    return 0;
}

// A balanced tree is one where the difference between heights of left subtree and right subtree of every node is not more than 1.
function isBalanced(root) {
    let rightHeight = height(root.right);
    let leftHeight = height(root.left);
    if (rightHeight === leftHeight) return true;
    return rightHeight - leftHeight === 1 || leftHeight - rightHeight === 1
        ? true
        : false;
}

function rebalance(root) {
    const newArr = preOrder(root);
    let newRoot = new Node(newArr.shift());
    let queue = [newRoot];
    while (newArr.length > 0) {
        let current = queue.shift();
        current.left = new Node(newArr.shift());
        current.right = new Node(newArr.shift());
        queue.push(current.left);
        queue.push(current.right);
    }
    return newRoot;
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

// Script

function randomArr(len) {
    let arr = [];
    for (let i = 0; i < len; i++) {
        arr.push(Math.floor(Math.random() * 1000));
    }
    return arr;
}

let array = randomArr(11);
let tree = new Tree(array);
prettyPrint(tree.root);
console.log(isBalanced(tree.root));
console.log(inOrder(tree.root));
console.log(preOrder(tree.root));
console.log(postOrder(tree.root));

for (let i = 0; i < 120; i++) {
    let value = Math.floor(Math.random() * 1000);
    insertValue(tree.root, value);
}

console.log(isBalanced(tree.root));
console.log(inOrder(tree.root));
