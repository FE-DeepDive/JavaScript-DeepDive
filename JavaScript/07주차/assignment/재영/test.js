import { DoubleLinkedList } from "./index.js";

function expect(string = "", cb) {
  if (!new.target) {
    return new expect(string, cb);
  }

  this.isNot = false;

  Object.defineProperty(this, 'not', {
    get() {
      this.isNot = !this.isNot;
      return this;
    },
  });

  this.toBeEqual = (val) => {
    const res =  cb();
    const result = this.isNot ? res !== val : res === val;

    const nowIsNot = this.isNot;

    this.isNot = false;
    
    console.log({ command: string, result, ...(!result ? { expectedValue: `${nowIsNot ? 'not ' : ''}${val}`, actualValue: res } : {}) });
    return result;
  }
}

try {
  const tests = [
    expect("3개를 추가한 후 현재를 반환하면, 길이가 3개가 나와야 한다.", () => {
      const doubleLinkedList = new DoubleLinkedList();
      return doubleLinkedList.insert(1).insert(2).insert(3).length;
    }).toBeEqual(3),
    expect("마지막을 삭제하면, 마지막은 첫번째 머리 노드가 나와야 한다.", () => {
      const doubleLinkedList = new DoubleLinkedList();
      return doubleLinkedList.insert(1).insert(2).insert(3).remove().nowNode.val;
    }).toBeEqual(1),
    expect("첫번째 머리 노드를 삭제하면, 추출 시 다음 노드의 앞은 꼬리 노드가 나와야 한다.", () => {
      const doubleLinkedList = new DoubleLinkedList();
      return doubleLinkedList.insert(1).insert(2).insert(3).goPrev().goPrev().remove().nowNode.val;
    }).toBeEqual(2),
    expect("첫번째 머리 노드를 삭제하면, 다음 머리는 다음 노드가 되어야 한다.", () => {
      const doubleLinkedList = new DoubleLinkedList();
      return doubleLinkedList.insert(1).insert(2).insert(3).goPrev().goPrev().remove().head.val;
    }).toBeEqual(2),
    expect("getNthNodeFromHead 메서드로 순회를 한다면 머리 노드를 기준으로 나와야 한다", () => {
      const doubleLinkedList = new DoubleLinkedList();
      return doubleLinkedList
        .insert(1)
        .insert(2)
        .insert(3)
        .insert(4)
        .insert(5)
        .insert(6)
        .insert(7)
        .insert(8)
        .insert(9)
        .getNthNode(8)
        .val
    }).toBeEqual(8)
  ];

  const res = tests.filter(v => v).length;
  if (res === tests.length) {
    console.log(`✅ CHECKED ${tests.length} TESTS SUCCEED!`)
  } else {
    throw new Error(`🔥 ${res}/${tests.length} TESTS SUCCEED. FAILED 😖`)
  }

} catch(e) {
  console.error("🤯 FAILED TEST!\n")
  console.error(e)
}