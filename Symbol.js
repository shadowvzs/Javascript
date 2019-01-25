// ES6 Symbol - unique & immutable data type

// Useage: Often used to identify object properties
// also could be used like object meta data (non-enumeratible)
// Note: 
// 1. don't use new keyword, just simple Symbol() or Symbol('pista')
// 2. string have only descriptive role, can't use to identify the symbol itself
// 3. symbol always unique
// 4. symbol not shown if you use for in/for of/Object.getOwnProperty(obj);
// 5. not privatem, can access the symbol properties with 
// 	Object.getOwnPropertySymbols(obj) - Object.getOwnSymbols()
// 		out ex.: [Symbol(pista)] - you can get the length aswell
// 6. you need use with [] if you want use it like object key
// 7. with .for() you can create non unqiue symbols

// Primitive or Object? 
// In some ways, symbols are like primitive values, in other ways, they are like objects
// - Symbols are like strings (primitive values) w.r.t. what they are used for: as representations of concepts and as property keys.
// - Symbols are like objects in that each symbol has its own identity.

// 1) In action

const bowl = {
  [Symbol('apple')]: { color: 'red', weight: 136.078 },
  [Symbol('banana')]: { color: 'yellow', weight: 183.15 },
  [Symbol('orange')]: { color: 'orange', weight: 170.097 },
  [Symbol('banana')]: { color: 'yellow', weight: 176.845 }
};
console.log(bowl); // output list it like normal object and both 'banana' will be there
const a = Symbol.for('not unique');
const b = Symbol.for('not unique');
Symbol.keyFor(a); // not unique
typeof a === "symbol"; 	// true
const obj = [];
obj[a] = 1;
obj[b] = 2;
obj[a] === obj[b] // true
obj[a] // 2 - because a and b is same key because we used .for()
a === b; // true
new Symbol();   // give error because Symbol isn't a constructor

// 2) Symbol.iterator

class Collection {
	*[Symbol.iterator]() {
		var i = 0;
		while(this[i] !== undefined) {
			yield this[i];
			++i;
		}
	}

}

var myCollection = new Collection();
myCollection[0] = 1;
myCollection[1] = 2;
for(var value of myCollection) {
    console.log(value); // 1, then 2
}

// 3) next Symbol.iterator example

const iterable = {
    [Symbol.iterator]() {
        let data = ['foo','bar']
        return { // Iterator
            next() {
                return {
                    done: data.length === 0,
                    value: data.pop()
                }
            }
        }
    }
}

for(let e of iterable) {
    console.log(e)
    // 'foo'
    // 'bar'
}

// 4) next one 

var foo = {
	[Symbol.iterator]: () => ({
		items: ['p', 'o', 'n', 'y', 'f', 'o', 'o'],
		next: function next () {
			return {
				done: this.items.length === 0,
				value: this.items.shift()
			}
		}
	})
}

for (let pony of foo) {
  console.log(pony)
  // <- 'p'
  // <- 'o'
  // <- 'n'
  // <- 'y'
  // <- 'f'
  // <- 'o'
  // <- 'o'
}