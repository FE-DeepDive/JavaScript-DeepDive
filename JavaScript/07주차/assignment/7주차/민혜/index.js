/**
 * 양방향 연결리스트는 각 노드의 prev와 next로 이동할 수 있어야 한다.
 */
class Node {
  constructor(value) {
    this.prev = null;
    this.value = value;
    this.next = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  /** 
  * push를 통해 양방향 연결리스트 꼬리에 값을 추가할 수 있다.
  */
  push(value) {
    let newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
    this.length++;
    return this;
  }
  /**
   * insert를 통해 특정 인덱스의 노드에 삽입할 수 있어야 한다.
   */
  insert(index, value) {
    if (index < 0 || index > index.length) return false;
    if (index === this.length - 1) return !!this.push(value);

    let newNode = new Node(value);
    let previousNode = this.get(index);

    newNode.next = previousNode.next;
    newNode.prev = previousNode;
    previousNode.next = newNode;
    this.length++;

    return true;
  }
  
/**
 * get을 통해 원하는 인덱스의 노드를 가져온다.
 */
  get(index) {
    let counter = 0;
    let currentNode = this.head;
    while (counter < index) {
      currentNode = currentNode.next;
      counter++;
    }
    return currentNode;
  }

  /**
   * shift를 통해 머리 노드를 가져온다.
   */
  shift() {
    const shiftedHead = this.head;
    this.head = shiftedHead.next;
    this.head.prev = null;
    this.length--;
    
    return shiftedHead;
}

  /**
   * remove를 통해 원하는 인덱스의 노드를 삭제한다.
   */
  remove(index) {
    let currentNode = this.get(index);
    let previousNode = currentNode.prev;
    let afterNode = currentNode.next;

    previousNode.next = afterNode;
    afterNode.prev = previousNode;
    this.length--;

    return currentNode;
  }

  /**
   * pop 메서드를 통해 꼬리 노드를 꺼낸다.
   */
  pop() {
    const poppedTail = this.tail;
    this.tail = poppedTail.prev;
    this.tail.next = null;
    
    this.length--;

    return poppedTail;
  }

  /**
   * update를 통해 원하는 인덱스의 노드를 수정할 수 있다.
   */
  update(index, value) {
    if (index < 0 || index > this.length) return false;

    let currentNode = this.get(index);
    currentNode.value = value;

    return true;
  }
}

const list = new DoublyLinkedList();

module.exports = DoublyLinkedList;
