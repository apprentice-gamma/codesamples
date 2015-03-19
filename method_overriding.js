//Parent Class
function Animal(type) {
  this._animalType = type;
  this.getType = function () {
    return this._animalType;
  };
}

Animal.prototype.doStuff = function () {
  return "doing stuff from the parent class";
};

//Child class inherits from Parent 'Animal' class
function BabyAnimal(type, name) {
  Animal.call(this, type);
  this._name = name;
}

BabyAnimal.prototype = new Animal();


//Test Parent class
var oneAnimal = new Animal("cheese");
console.log(oneAnimal._animalType + " is and instanceof Animal: " + (oneAnimal instanceof Animal));
console.log(oneAnimal.doStuff());


console.log("\n");
//Test Child class
var twoAnimal = new BabyAnimal("taco", "Ted");
console.log(twoAnimal._name + " is and instanceof BabyAnimal: " + (twoAnimal instanceof BabyAnimal));
console.log(twoAnimal._name + " is: " + twoAnimal.doStuff());

//override the Parent class(Animal) method 'doStuff'
BabyAnimal.prototype.doStuff = function () {
  return "doing stuff from the CHILD class";
};
console.log(twoAnimal._name + " is: " + twoAnimal.doStuff());