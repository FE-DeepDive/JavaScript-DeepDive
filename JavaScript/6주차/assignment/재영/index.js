const Caculator = function (val = 0) {  
  if (!new.target) {
    return new Caculator(val);
  }

  this.initialize = (val) => {
    this.val = isNaN(Number(val)) ? 0 : val;
    
    return this;
  }

  this.add = (val) => {
    this.val += val
    
    return this;
  }

  this.substract = (val) => {
    this.val -= val;

    return this;
  }

  this.multiply = (val) => {
    this.val *= val;

    return this;
  }

  this.divide = (val) => {
    this.val /= val;

    return this;
  }

  this.run = () => {
    const result = this.val;

    return result;
  }

  this.initialize(val);
}

const caculator = Caculator(2);

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
  
    set() {
    }
  });

  this.toBeEqual = (val) => {
    const res =  cb();
    const result = this.isNot ? res !== val : res === val;

    const nowIsNot = this.isNot;

    this.isNot = false;
    
    console.log({ command: string, result, ...(!result ? { expectedValue: `${nowIsNot ? 'not ' : ''}${val}`, actualValue: res } : {}) });
  }
}

expect("new 함수를 호출하지 않더라도, 정상적인 인스턴스가 나와야 한다.", () => Caculator(123).val).toBeEqual(new Caculator(123).val)
expect("이 값은 4.2가 나와야 한다.", () => caculator.add(5).multiply(3).divide(5).run()).toBeEqual(4.2);
expect("나누기를 0으로 하면 무한이 나온다.", () => caculator.divide(0).run()).toBeEqual(Infinity);
expect("초기화를 하면 0이 나온다.", () => caculator.initialize().run()).toBeEqual(0);
expect("음수더라도 정상적으로 값이 출력된다.", () => caculator.substract(5).divide(2).run()).toBeEqual(-2.5);
expect("문자열이 주어진다면 일반적인 연산의 기댓값이 나오지 않는다.", () => caculator.add("1").run()).not.toBeEqual(-2.51);
