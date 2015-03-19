function Pizza(type){
	this._pizzaType = type;
}

Pizza.prototype.get = function getPizzaType() {
	return this._pizzaType;
};

function BabyPizza(type) {
	Pizza.call(this, type);
}

BabyPizza.prototype = Object.create(Pizza.prototype);
BabyPizza.prototype.constructor = BabyPizza;

BabyPizza.prototype.get = function getPizzaType() {
	return Pizza.prototype.get.call(this) + "!!";
};

var onePizza = new Pizza("cheese");
var twoPizza = new BabyPizza("taco");

console.log(onePizza.get());
console.log(twoPizza.get());