import Tree from "./tree.js";

function randomArray(size = 10) {
  return Array.from(
    { length: size },
    () => Math.floor(Math.random() * 100)
  );
}

const tree = new Tree(randomArray());

console.log("Balanced:", tree.isBalanced());

console.log("Level Order:");
tree.levelOrderForEach((value) => console.log(value));

console.log("Pre Order:");
tree.preOrderForEach((value) => console.log(value));

console.log("Post Order:");
tree.postOrderForEach((value) => console.log(value));

console.log("In Order:");
tree.inOrderForEach((value) => console.log(value));

tree.insert(101);
tree.insert(120);
tree.insert(150);
tree.insert(170);
tree.insert(200);

console.log("Balanced after insertions:", tree.isBalanced());

tree.rebalance();

console.log("Balanced after rebalance:", tree.isBalanced());

console.log("Level Order:");
tree.levelOrderForEach((value) => console.log(value));

console.log("Pre Order:");
tree.preOrderForEach((value) => console.log(value));

console.log("Post Order:");
tree.postOrderForEach((value) => console.log(value));

console.log("In Order:");
tree.inOrderForEach((value) => console.log(value));