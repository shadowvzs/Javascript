// ES6 Getter & Setter
// Description: getter/setter function allow manipulate the data but useage remain same like it is a property
// Note:
// - Must be in onject (get name(){} or set name(){})
// - Difference between Object.defineProperty() vs Getter/Setter is target is object vs Class (behavior same)
// - For hide property you need Object.defineProperty
// Object.defineProperty(myObject, "myProp", { enumerable : false,  value : 42 });

// 1) Simple getter/setter

var obj = {
  _name: 'Pista',
  get name() {
	console.log('getter method executed');
    	return this._name;
  },
  set name(name) {
	console.log('setter method executed');
    	this._name = name;
  }
}