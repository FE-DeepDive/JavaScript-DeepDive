var Caculator = function() {
    this.initialize = 0;
};

// add
Caculator.prototype.add = function(add) {
    this.initialize += add;
    return this;
}

// multiply
Caculator.prototype.multiply = function(mul) {
    this.initialize *= mul;
    return this;
}

// divide
Caculator.prototype.divide = function(div) {
    this.initialize /= div;
    return this;
}

// substract
Caculator.prototype.substract = function(sub) {
    this.initialize -= sub;
    return this;
}

// run
Caculator.prototype.run = function() {
    console.log(this.initialize);
}

// result = 5 * 6 / 2 - 8 = 7
var result = new Caculator();
result.add(5).multiply(6).divide(2).substract(8).run();