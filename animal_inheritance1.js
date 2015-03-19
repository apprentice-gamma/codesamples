function Animal(type){
	this._AnimalType = type;
}

Animal.prototype.get = function getAnimalType() {
	return this._AnimalType;
};

function BabyAnimal(type) {
	Animal.call(this, type);
}

BabyAnimal.prototype = Object.create(Animal.prototype);
BabyAnimal.prototype.constructor = BabyAnimal;

BabyAnimal.prototype.get = function getAnimalType() {
	return Animal.prototype.get.call(this) + "!!";
};

var oneAnimal = new Animal("cheese");
var twoAnimal = new BabyAnimal("taco");

console.log(oneAnimal.get());
console.log(twoAnimal.get());