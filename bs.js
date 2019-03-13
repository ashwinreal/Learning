function Animal(name){
  this.name = name;
  this.genFn = function(){
    console.log("genFn");
  }
}

function Dog(name){
  Animal.call(this, name);
}
Dog.prototype = new Animal();

let d = new Dog('abc');
console.log(d);