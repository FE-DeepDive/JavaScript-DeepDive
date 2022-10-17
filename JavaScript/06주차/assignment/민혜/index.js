function Caculator(val){
  this.val = val;
  this.add = function(val){
    this.val += val;
    return this;
  }
  this.multiply = function(val){
    this.val *= val;
    return this;
  }
  this.divide = function(val){
    this.val /= val;
    return this;
  }
  this.substract = function(val){
    this.val -= val;
    return this;
  }
    this.run = function(){
    return this.val;
  }
        
}
const answer = new Caculator(2);
console.log(answer.add(2).divide(2).substract(1).multiply(10).run()) // 2+2/2-1*10 = 10