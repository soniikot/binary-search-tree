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
}

const array = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
const tree = new Tree(array);

tree.insertRec(tree.root, 33);
prettyPrint(tree.root);
