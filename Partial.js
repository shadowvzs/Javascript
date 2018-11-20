// ES5 - Partial
// Description: reuse an existing function with different context & arguments

function partial(func, ...argsBound) {
	return function(...args) { // (*)
	    	return func.call(this, ...argsBound, ...args);
  	}
}

// Usage:
let user = {
  	firstName: "John",
  	say(time, phrase) {
    		alert(`[${time}] ${this.firstName}: ${phrase}!`);
  	}
};

// add a partial method that says something now by fixing the first argument
user.sayNow = partial(user.say, new Date().getHours() + ':' + new Date().getMinutes());

user.sayNow("Hello"); // [10:00] John: Hello!
user.sayNow("How are you?"); // [10:00] John: How are you?