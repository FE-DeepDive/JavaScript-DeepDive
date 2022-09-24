const Caculator = function (val = 0) {  
  this.initialize = (val) => {
    this.val = isNaN(Number(val)) ? 0 : val;
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
    return this.val;
  }

  this.initialize(val);
}

const caculator = new Caculator(2);

console.log(caculator.add(5).multiply(3).divide(5).run());