// ES6 Proxy
// Description: proxy like a setter/getter callback object, 
//      so when you set/get an property then you can manupulate it before real action
// Note:
// - Proxy is an object and need to use new keywork
// - Proxy need a target Object and an handler (could be empty object)
// - Traps (cbs): get, set, apply, has, deleteProperty, ownKeys, construct, defineProperty,
//      getOwnProperty, preventExtensions, isExtensible, getPrototypeOf, setPrototypeOf


// 1) Get Trap

const pista = {age: 10, _name: "Pista"};
const handler = {
	get(target, propName) {
		console.log('target', target);
		console.log('prop', propName);
		// maybe you can insert a check or timed stuff
		return target[propName];
	},
	set(target, propName, value) {
	    console.log('prop', propName);
	    console.log('original value', value);
       	    if (propName === 'weight') {
                value = value * 0.85;
            }
	    console.log('value', value);
            target[propName] = value;		
	},
  	has (target, key) {
    		if (key[0] === '_') {
  			console.log('hidden key: ', key);
			return false;
    		}
    		console.log('check the key: ', key);
		return key in target;
  	},
	construct(target, args) {
    		console.log('constructor called');
    		return new target(...args);
  	}
};



const proxy = new Proxy(pista, handler);
console.log('_name' in proxy);
console.log('age' in proxy);



// ---------------------------------------

// 2) construct with proxy


function Car(color) {
  	this.color = color;
}

const handler = {
	construct(target, args) {
    		console.log('An constructor was called');
  		// Reflect.construct(target, args); // this same than below 
		return new target(...args);
  	}
};


const proxy = new Proxy(Car, handler);
const newObj = new proxy('red');
console.log(newObj);

