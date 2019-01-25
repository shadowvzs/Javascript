// ES6 function generator and yield
// Why usefull:
// 1. pause/resume function during execution and make it iterable with call .next()
// 2. could be used for make async functions executed in order (how to inject data with yield into funciton)

// 1) Simple pause function at yield then invoke it again, function execution continued

function* myGenerator() {
	yield 1;
}

// in console.log it is {[Iterator]}
const i = myGenerator();
i.next();

// fist time call will return {value: 1, done: false }
// second time call will return {value: undefined, done: false }


//-----------------------------------


// 2) Create a simple loop with .next()

function* myGenerator2() {
	for(let i = 0; i < 3; i++) {
		yield i;
	}
}

const b = myGenerator2();
b.next();	// {value: 0, done: false}
b.next();	// {value: 1, done: false}
b.next();	// {value: 2, done: false}
b.next();	// {value: undefined, done: true}


//-----------------------------------

// 3) Create fibonacci numbers with using .next(param) and pass value to function generator

function* fibonacci () {
	let n1 = 0;
	let n2 = 1;
	while (true) {
		let current = n1;
		n1 = n2;
		n2 = current + n1;
		// argument from .next()
		let reset = yield current;
		if (reset) {
			n1 = 0;
			n2 = 1;
		}
	}

} 

const iter = fibonacci();
iter.next();
iter.next();
iter.next(true); // in function generator, reset will be true


// -------------------------------------

// 4) Shorthand and yield array directly

// same than a loop 1 - 3
const obj = {
	* myGenerator() {
		yield* [1,2,3];
		yield "hello";
	}
}

const iter = obj.myGenerator();
console.log([...iter]); // run iter.next multiple times, result: [1,2,3,"hello"]


// ------------------------------------------------

// 5) Create function which sync async functions
// Note: in function generator, at yield will be paused the function
// when our getName() async function pass value name with .next(param)
// then execution continued till next yield which will wait for getAge()
// async function, which also give value via .next() 
// so you can see nboth data in console.log


function getName() {
	setTimeout(() => {
		iter.next('Julcsa');
	}, 1000)
}

function getAge() {
	setTimeout(() => {
		iter.next(10);
	}, 2000)
}

var iter = (function* () {
	const name = yield getName();
	const age = yield getAge();
	console.log(name, age);
}());