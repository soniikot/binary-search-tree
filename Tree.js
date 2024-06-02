import { Node } from "./Node.js";
import { prettyPrint } from "./prettyPrint.js";
export class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
    this.array = array;
  }

  buildTree(array) {
    if (!array.length) return null;

    array = [...new Set(array)].sort((a, b) => a - b);

    const build = (start, end) => {
      if (start > end) return null;

      const mid = Math.floor((start + end) / 2);
      const node = new Node(array[mid]);

      node.leftChild = build(start, mid - 1);
      node.rightChild = build(mid + 1, end);

      return node;
    };

    return build(0, array.length - 1);
  }

  insertRec(root, key) {
    if (root === null) {
      root = new Node(key);
      array.push(key);
      return root;
    }
    if (key < root.data) {
      root.leftChild = this.insertRec(root.leftChild, key);
    } else if (key > root.data)
      root.rightChild = this.insertRec(root.rightChild, key);
    array.push(key);
    return root;
  }
  delete(root, key) {
    if (root === null) return root;

    if (key < root.data) root.leftChild = this.delete(root.leftChild, key);
    else if (key > root.data)
      root.rightChild = this.delete(root.rightChild, key);
    else {
      if (root.leftChild === null) return root.rightChild;
      else if (root.rightChild === null) return root.leftChild;

      root.data = this.minValue(root.rightChild);

      root.rightChild = this.delete(root.rightChild, root.key);
    }
    return root;
  }

  minValue(node) {
    let current = node;
    while (current.leftChild !== null) {
      current = current.leftChild;
    }
    return current.data;
  }

  find(data, root = this.root) {
    if (root === null) {
      return "value not found";
    } else if (root.data !== data) {
      if (root.data > data) {
        return this.find(data, root.leftChild);
      } else {
        return this.find(data, root.rightChild);
      }
    }

    return root;
  }

  levelOrder(callback) {
    if (!this.root) return [];
    const queue = [this.root];
    const arr = [];
    while (queue.length) {
      let level = [];
      let size = queue.length;
      for (let i = 0; i < size; i++) {
        const node = queue.shift();
        level.push(node);
        if (node.leftChild) queue.push(node.leftChild);
        if (node.rightChild) queue.push(node.rightChild);
        if (callback) callback(node);
      }

      arr.push(level);
    }

    if (!callback) return arr;
  }
  inOrder(root = this.root, callback, arr = []) {
    if (!this.root) return [];
    if (!root) return;
    this.inOrder(root.leftChild, callback, arr);
    callback ? callback(root) : arr.push(root.data);
    this.inOrder(root.rightChild, callback, arr);
    if (!callback) return arr;
  }

  preOrder(root = this.root, callback, arr = []) {
    if (!this.root) return [];
    if (!root) return;
    if (callback) callback(root);
    arr.push(root.data);
    this.preOrder(root.leftChild, callback, arr);
    this.preOrder(root.rightChild, callback, arr);
    if (!callback) return arr;
  }

  postOrder(root = this.root, callback, arr = []) {
    if (!this.root) return [];
    if (!root) return;
    this.postOrder(root.leftChild, callback, arr);
    this.postOrder(root.rightChild, callback, arr);
    if (callback) callback(root);
    arr.push(root.data);
    if (!callback) return arr;
  }

  depth(node, root = this.root, depth = 0) {
    if (!this.root) return -1;
    if (root.data === node) return depth;
    if (node < root.data) return this.depth(node, root.leftChild, depth + 1);
    if (node > root.data) return this.depth(node, root.rightChild, depth + 1);
  }

  height(root = this.root, node, height = -1) {
    if (!root) return -1;

    const left = this.height(root.leftChild, node);
    const right = this.height(root.rightChild, node);

    const ans = Math.max(left, right) + 1;

    if (node === root.data) {
      height = ans;
      return height;
    }

    return ans;
  }

  isBalanced(root = this.root) {
    const left = this.height(root.leftChild);
    const right = this.height(root.rightChild);

    if (
      left - right == 0 ||
      left - right == 1 ||
      right - left == 0 ||
      right - left == 1
    ) {
      return true;
    }

    return false;
  }

  rebalance() {
    const values = this.inOrder();
    this.root = this.buildTree(values);
  }
}

const array = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
const tree = new Tree(array);

tree.insertRec(tree.root, 32);
tree.insertRec(tree.root, 10);
tree.insertRec(tree.root, 100);

//console.log(tree.insertRec(tree.root, 120));
prettyPrint(tree.root);
console.log(tree.find(32));

console.log(tree.levelOrder());
console.log(tree.isBalanced());
tree.rebalance();
console.log(tree.isBalanced());
