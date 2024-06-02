import { Tree } from "./Tree.js";
import { Node } from "./Node.js";
import { prettyPrint } from "./prettyPrint.js";
import { createRandomArray } from "./randomArray.js";

const tree = new Tree(createRandomArray(25));

prettyPrint(tree.root);

console.log(tree.isBalanced());

tree.insertRec(tree.root, 150);
tree.insertRec(tree.root, 110);
tree.insertRec(tree.root, 101);

console.log(tree.isBalanced());

tree.rebalance();
console.log(tree.isBalanced());
console.log("Lever Order =>", tree.levelOrder());
console.log("Preorder =>", tree.preOrder());
console.log("In-order =>", tree.inOrder());
console.log("Post-order =>", tree.postOrder());
