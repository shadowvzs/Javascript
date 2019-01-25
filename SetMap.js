// ES6 Set

// Note: 
// 1. Set need constructor
// 2. Set is an Array like
// 3. can't have dublicates
// 4. collection of unique values
// 5. reduce the chance for memory leak

// ES6 - Map 
// 1. Map need constructor
// 2. Map is an Object like
// 3. collection of key-value pairs
// 4. advantage the quick lookup times
// 5. reduce the chance for memory leak
// ex.: bunch of user id, a location in db or fs

// ES6 WeakSet, WeakMap

// Note: 
// Similiar like set/map but the differences:
// 1. cannot iterate
// 2. don't have .clear() method
// 3. WeakSet store only object, WeakMap use only object key
// *if key was nulled outside, then element will be 
// removed in WeakMap/Set too,so reduced chance for memory leak

//----------------------------------------------------------

// 1) Set

const set = new Set([1, 2, 3, 3]); // 1,2,3

set.add(10); // {1, 2, 3, 10}
set.has(10); // true
set.size; // 4
//set.delete(10);
//set.clear();

const keys = set.keys(); // 1, 2, 3, 10
const values = set.values(); // 1, 2, 3, 10

set.forEach(value => console.log(value)); //1, 2, 3, 10

const entries = set.entries();

for (let [value] of entries) {
	console.log(value); //1, 2, 3, 10
}

const entries1 = [...set.entries()]; // [1,1], [2,2], [3,3], [10, 10] 

//----------------------------------------------------------

// 2) WeakSet

let student1 = { name: 'James', age: 26, gender: 'male' };
let student2 = { name: 'Julia', age: 27, gender: 'female' };
let student3 = { name: 'Richard', age: 31, gender: 'male' };

const roster = new WeakSet([student1, student2, student3]);
console.log(roster); // WeakSet { Object { name: 'Julia', ........}}
roster.add('Amanda');	// error because value must be object!
student3 = null; // weakset not block it, so simple disappear from weakset too


//----------------------------------------------------------

// 3) Map

const map = new Map([
	['my key', 10],
	['key2', {} ]
]);

console.log(map); // Map {'my key' => 10, 'key2' => {} }

map.clear();
map.set('keys 3', 133);
map.has('keys 3'); // true
map.get('keys 3'); // 133
map.delete('keys 3'); // true
console.log(map.size); // 1
const entries = map.entries();
const keys = [...map.keys()];
const values = [...map.values()];

for (let [key, value] of entries) {
	console.log(key, value); // key3, 133
}

map.forEach((value, key) => console.log(value, key)); // key3, 133


// ------------------------------------------

// 4) Map & WeakMap


const map = new Map();
const weakmap = new WeakMap();

(function(){
	const a = {x: 12};
	const b = {y: 12};

	// key could be reference or primitive but primitive let us delete easier
	map.set(a, 1);
	// key must be onject else it give error
	weakmap.set(b, 1);
})();

console.log([...map.keys()]); // output {x: 12}
console.log([...map.entries()]); // output [{x: 12}, 1]
// became ineffective because reference was made in iife
// garbage collector fail because this private reference issue
// for map you could use primitives (for weakmap only object ref key)
// you need reference and not values !
map.delete({x: 12});  // not work because this is a new object reference	
weakmap.has({y: 12}); // not work because this is a new object reference	

let book1 = { title: "something"};
let book2 = { title: "something else"};

const library = new WeakMap();
library.set(book1, true);
library.set(book2, false);

book1 = null; // removed from weakmap too, so weakmap not block the garbage collection
