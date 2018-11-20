// ES6 Create Custom iterable object (for of/spread)
// Note: object must have:
// 1. Symbol.iterator method
// 2. must return: done (boolean), value (any data)

// 1) example: listing numbers 0-4
const myObj = {
	[Symbol.iterator] () {
		let count = 0;
		let max = 4;
		return {
			next() {
				return {
					value: Math.random(),
					done: ++count > max
				}
			}
		}
	}

};


for (item of myObj) {
	console.log(item);
}


//---------------------------------------

// 2) listing characters from number

const obj = {
    number: 53820391,
    [Symbol.iterator] () {
        const arr = this.number.toString();
        let c = -1;
        const max = arr.length;
        return {
            next() {
                c++;
                return {
                    value: arr[c],
                    done: c >= max
                }
            }
        }
    }
}

// for of use obj.next().value 
// Basically for of can iterate any iteratable object;
// iterator.next() return {value, done}

for (const c of obj) {
    console.log(c)
}