const DoublyLinkedList = require("./index");

describe("양방향 연결리스트", () => {
  let doublyLinkedList;
  // 1,2,3이 순서대로 양방향 연결리스트에 들어있습니다.
  beforeEach(() => {
    doublyLinkedList = new DoublyLinkedList();
    doublyLinkedList.push(1).push(2).push(3);
  });
  test("push 메서드로 3개를 추가하면 양방향 연결리스트의 길이는 3이다.", () => {
    expect(doublyLinkedList.length).toBe(3);
  });
  test("1,2,3을 차례대로 추가했을 때 머리노드 값은 1이고 꼬리노드 값은 3이다.", () => {
    expect(doublyLinkedList.head.value).toBe(1);
    expect(doublyLinkedList.tail.value).toBe(3);
  });
  // 첫번째 머리노드(head)의 인덱스 번호는 0입니다. 두번째 노드의 인덱스 번호는 1입니다.
  test("get 메서드로 두번째 노드를 추출한 값은 2이다.", () => {
    const extractedNode = doublyLinkedList.get(1);
    expect(extractedNode.value).toBe(2);
  });
  test("insert 메서드로 두번째 노드 뒤에 2.5를 추가할 수 있다.", () => {
    doublyLinkedList.insert(1, 2.5);
    expect(doublyLinkedList.get(1).value).toBe(2);
    expect(doublyLinkedList.get(2).value).toBe(2.5);
    expect(doublyLinkedList.get(3).value).toBe(3);
    expect(doublyLinkedList.length).toBe(4);
  });
  test("remove 메서드로 원하는 인덱스의 값을 삭제할 수 있다.", () => {
    doublyLinkedList.remove(1);
    expect(doublyLinkedList.get(1).value).toBe(3);
    expect(doublyLinkedList.length).toBe(2);
  });
  test("pop 메서드로 꼬리 노드를 꺼낼 수 있다.", () => {
    expect(doublyLinkedList.pop().value).toBe(3);
    expect(doublyLinkedList.length).toBe(2);
  });
  test("shift 메서드로 머리 노드를 꺼낼 수 있다.", () => {
    expect(doublyLinkedList.shift().value).toBe(1);
    expect(doublyLinkedList.length).toBe(2);
  });
  test("update 메서드로 두번째 노드의 값을 변경할 수 있다.", () => {
    doublyLinkedList.update(1, 10);
    expect(doublyLinkedList.get(1).value).toBe(10);
  });
});
