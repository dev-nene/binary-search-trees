class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arr) {
    const uniq = [...new Set(arr)].sort((a, b) => a - b);
    this.root = this.#buildTree(uniq);
  }

  #buildTree(array) {
    if (array.length === 0) return null;

    const mid = Math.floor(array.length / 2);
    const root = new Node(array[mid]);
    root.left = this.#buildTree(array.slice(0, mid));
    root.right = this.#buildTree(array.slice(mid + 1));

    return root;
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null || node === undefined) return;

    this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }

  includes(value, node = this.root) {
    if (node === null) return false;

    if (node.data === value) {
      return true;
    }
    if (value < node.data) {
      return this.includes(value, node.left);
    } else {
      return this.includes(value, node.right);
    }
  }

  insert(value, node = this.root) {
    if (value === node.data) return;

    if (value < node.data) {
      if (node.left === null) {
        node.left = new Node(value);
        return;
      }
      return this.insert(value, node.left);
    }

    if (node.right === null) {
      node.right = new Node(value);
      return;
    }
    return this.insert(value, node.right);
  }

  getSuccessor(curr) {
    curr = curr.right;
    while (curr.left !== null) {
      curr = curr.left;
    }
    return curr;
  }

  deleteItem(value, node = this.root) {
    if (node === null) return;

    if (value < node.data) {
      node.left = this.deleteItem(value, node.left);
    } else if (value > node.data) {
      node.right = this.deleteItem(value, node.right);
    } else {
      if (node.left === null) {
        return node.right;
      }
      if (node.right === null) {
        return node.left;
      }
      const successorNode = this.getSuccessor(node);
      node.data = successorNode.data;
      node.right = this.deleteItem(successorNode.data, node.right);
    }
    return node;
  }

  levelOrderForEach(callback, node = this.root) {
    if (typeof callback !== "function") {
      throw new Error("Error: Callback is required");
    }

    if (node === null) return;

    const queue = [];
    queue.push(node);
    while (queue.length !== 0) {
      const curr = queue.shift();
      callback(curr.data);
      if (curr.left !== null) queue.push(curr.left);
      if (curr.right !== null) queue.push(curr.right);
    }
  }
}

const test = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
test.prettyPrint();
