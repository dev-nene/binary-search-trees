class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

export default class Tree {
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

  inOrderForEach(callback, node = this.root) {
    if (typeof callback !== "function") {
      throw new Error("Error: Callback must be a function");
    }

    if (node === null) return;

    this.inOrderForEach(callback, node.left);
    callback(node.data);
    this.inOrderForEach(callback, node.right);
  }

  preOrderForEach(callback, node = this.root) {
    if (typeof callback !== "function") {
      throw new Error("Error: Callback must be a function");
    }

    if (node === null) return;

    callback(node.data);
    this.preOrderForEach(callback, node.left);
    this.preOrderForEach(callback, node.right);
  }

  postOrderForEach(callback, node = this.root) {
    if (typeof callback !== "function") {
      throw new Error("Error: Callback must be a function");
    }

    if (node === null) return;

    this.postOrderForEach(callback, node.left);
    this.postOrderForEach(callback, node.right);
    callback(node.data);
  }

  #getHeight(node) {
    if (node === null) return -1;
    const leftHeight = this.#getHeight(node.left);
    const rightHeight = this.#getHeight(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }

  height(value, node = this.root) {
    if (node === null) return undefined;

    if (value < node.data) {
      return this.height(value, node.left);
    }
    if (value > node.data) {
      return this.height(value, node.right);
    }
    if (value === node.data) {
      return this.#getHeight(node);
    }
  }

  depth(value, node = this.root, count = 0) {
    if (node === null) return undefined;

    if (value < node.data) {
      return this.depth(value, node.left, count + 1);
    }
    if (value > node.data) {
      return this.depth(value, node.right, count + 1);
    }
    if (value === node.data) {
      return count;
    }
  }

  isBalanced(node = this.root) {
    if (node === null) return true;

    const leftHeight = this.#getHeight(node.left);
    const rightHeight = this.#getHeight(node.right);

    const diff = Math.abs(leftHeight - rightHeight);

    if (diff > 1) return false;

    return this.isBalanced(node.left) && this.isBalanced(node.right);
  }

  rebalance() {
    const values = [];

    this.inOrderForEach((value) => {
      values.push(value);
    });

    this.root = this.#buildTree(values);
  }
}
