// [x] 양방향 연결리스트는 각 노드의 prev와 next로 이동할 수 있어야 합니다. 
class Node {
  constructor(val, prev = null, next = null) {
    this.val = val;
    this.prev = prev;
    this.next = next;
  }
}

export class DoubleLinkedList {
  constructor(val) {
    this.node = val ? new Node(val) : null;
    this.head = val ? this.node : null;
    this.tail = val ? this.node : null;
    
    this.cnt = val ? 1 : 0;
  }

  // [x] insert메서드를 통해 특정 인덱스의 노드에 삽입할 수 있어야 해요.
  insert(val) {
    if (val === null) throw new Error('값은 null이 될 수 없습니다.');

    if (!this.cnt) {
      const nowNode = new Node(val);
      this.node = nowNode;
      this.head = nowNode;
      this.tail = nowNode;

      this.cnt += 1;

      return this;
    }

    const nowNode = new Node(val, this.node, this.node.next ?? this.head);
    this.node.next = nowNode;
    this.node = nowNode;

    if (this.node.next === this.head) this.tail = nowNode;

    this.cnt += 1;
    return this;
  }

  //  [x] get를 통해 원하는 인덱스의 노드를 가져올 수 있어야 해요.
  getNthNode(order) {
    let i = 0;
    let now = this.head;
    while (i < order) {
      now = now.next;
    }

    return now;
  }

  get nowNode() {
    return this.node;
  }

  // [x] update를 통해 해당 인덱스의 노드를 수정할 수 있어야 해요.
  update(val) {
    this.node.val = val;
    
    return this;
  }

  // [x] remove를 통해 해당 인덱스의 노드를 삭제할 수 있어야 해요.
  remove() {
    if (!this.cnt) return this;

    if (this.cnt === 1) {
      this.node = null;
      this.head = null;
      this.tail = null;

      this.cnt -= 1;
      return this;
    }

    this.node.next.prev = this.node.prev;
    this.node.prev.next = this.node.next;

    this.node = this.node.next;

    this.cnt -= 1;
    return this;
  }

  get length() {
    return this.cnt;
  }
}

const doubleLinkedList = new DoubleLinkedList();
