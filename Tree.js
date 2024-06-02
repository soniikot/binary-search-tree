import { Node } from "./Node.js";
import { prettyPrint } from "./prettyPrint.js";
export class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
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
      return root;
    }
    if (key < root.data) {
      root.leftChild = this.insertRec(root.leftChild, key);
    } else if (key > root.data)
      root.rightChild = this.insertRec(root.rightChild, key);

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
}
const array = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
const tree = new Tree(array);

tree.insertRec(tree.root, 32);
tree.insertRec(tree.root, 10);
prettyPrint(tree.root);
tree.delete(tree.root, 32);
prettyPrint(tree.root);
