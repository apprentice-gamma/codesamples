function Animal(type){
	this._AnimalType = type;
}

Animal.prototype.get = function getAnimalType() {
	return this._AnimalType;
};

function BabyAnimal(type) {
	Animal.call(this, type);
}

BabyAnimal.prototype = new Animal();

var oneAnimal = new Animal("cheese");
var twoAnimal = new BabyAnimal("taco");

console.log(oneAnimal.get());
console.log(twoAnimal.get());