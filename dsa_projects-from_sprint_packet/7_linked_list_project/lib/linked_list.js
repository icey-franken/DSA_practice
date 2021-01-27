// ============================================================================
// Implementation Exercise: Singly Linked List
// ============================================================================
//
// -------
// Prompt:
// -------
//
// Implement a Singly Linked List and all of its methods below!
//
// ------------
// Constraints:
// ------------
//
// Make sure the time and space complexity of each is equivalent to those
// in the table provided in the Time and Space Complexity Analysis section
// of your Linked List reading!
//
// -----------
// Let's Code!
// -----------

// TODO: Implement a Linked List Node class here
class Node {
  constructor(val) {
    this.value = val;
    this.next = null;
  }
}

// TODO: Implement a Singly Linked List class here
class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  // TODO: Implement the addToTail method here
  addToTail(val) {
    const newTailNode = new Node(val);
    // if tail node present, update it's next value before overwriting
    if (this.tail) {
      this.tail.next = newTailNode;
    }
    this.tail = newTailNode;
    // if no head, then new tail node is head
    if (!this.head) {
      this.head = newTailNode;
    }
    // update length
    this.length++;
    // return new linked list
    return this;
  }

  // TODO: Implement the removeTail method here
  // 1) Should remove tail node from the list when removeTail is called
  // 2) Should reassign the new tail's next pointer to null
  // 3) Should update the length property after removing the tail node
  // 4) Should reassign both the head and tail pointers to null when tail is removed from a list of only one node
  // 5) Should return the removed tail node when removeTail is called
  removeTail() {
    const oldTail = this.tail;

    if (!this.head) {
      return;
    } else if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      // find second to last node
      let currentNode = this.head;
      while (currentNode.next && currentNode.next.next) {
        currentNode = currentNode.next;
      }
      // set this node as tail and remove its next property
      this.tail = currentNode;
      currentNode.next = null;
    }

    this.length--;
    return oldTail;
  }

  // TODO: Implement the addToHead method here
  addToHead(val) {
    // create new node
    const newHead = new Node(val);
    // if no head node, then new head is also new tail
    if (!this.head) {
      this.tail = newHead;
    } else {
      newHead.next = this.head;
    }
    this.head = newHead;
    this.length++;
    return this;
  }

  // TODO: Implement the removeHead method here
  removeHead() {
    const oldHead = this.head;
    if (!this.head) {
      return;
    } else if (this.head === this.tail) {
      this.tail = null;
    }
    this.head = this.head.next;
    this.length--;
    return oldHead;
  }

  // TODO: Implement the contains method here
  contains(target) {
    let currentNode = this.head;
    while (currentNode) {
      if (currentNode.value === target) {
        return true;
      } else {
        currentNode = currentNode.next;
      }
    }
    return false;
  }

  // TODO: Implement the get method here
  get(index) {
    if (index >= this.length) {
      return null;
    }
    let count = 0;
    let currentNode = this.head;
    while (count < index) {
      currentNode = currentNode.next;
      count++;
    }
    return currentNode;
  }

  // TODO: Implement the set method here
  set(index, val) {}

  // TODO: Implement the insert method here
  insert(index, val) {}

  // TODO: Implement the remove method here
  remove(index) {}

  // TODO: Implement the size method here
  size() {}
}

exports.Node = Node;
exports.LinkedList = LinkedList;
