// Description:
// 1. We create a Bug and Butterfly class
// 2. Butterfly class extends Bug
// 3. Butterfly constructor invoke Bug constructor
// 4. Invoke eat method from Bug class
// 5. Create static method which callable directly from class (before instantied)


// ES5 version

function Bug (color = "red", food = 10) {
	this.color = color;
	this.food = food;
}

Bug.prototype.eat = function () {
	this.food--;
	console.log('food '+this.food);
}

Bug.jump = function () {
	console.log('jumping');
}

function ButterFly(color = "blue", food = 15, type = "flying") {
	Bug.call(this, color, food);
	this.type = type;	
}

ButterFly.prototype = Object.create(Bug.prototype);
ButterFly.prototype.eat = function () {
	Bug.prototype.eat.call(this);
}

ButterFly.prototype.constructor = ButterFly;

const butterfly = new ButterFly()


// ES6 version

class Bug {
	constructor (color = "red", food = 10) {
		this.color = color;
		this.food = food;
	}
	eat() {
		this.food--;
		console.log('food '+this.food);
	}

	static jump() {
		console.log('jumping');		
	}
}

class ButterFly extends Bug {
	constructor (color = "red", food = 15, type = "flying") {
		super(color, food);
		this.type = type;
	}

	eat() {
		super.eat();
	}

}

const butterfly = new ButterFly()