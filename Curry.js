// ES5 - Curry
// Description: help to inject variables into function with a private scope
// Where? mostly where you hve fixed params like events (ex. onClick)
// How it work?
// Need a wrapper function which store in local scope our variable(s)
// then return the function where we want use the injected data


// 1) Curry with DOM click event
// * not in our example let/const also solve the problem but this was a example for ES5
// * data attribute on element also could be a solution 

/* HTML code for test
<body>
  <a href="//www.yahoo.com">Yahoo!</a><br/>
  <a href="//www.altavista.com">AltaVista</a><br/>
  <a href="//www.google.com">Google</a><br/>
</body>
*/

function registerHandlers() {
  	var as = document.getElementsByTagName('a');
	// we want to know the "a" index and alert when user click to "a"
 	for (var i = 0; i < as.length; i++) {
    		as[i].onclick = (function(i) {
			// return the event handler
			return function(event) {
				alert(i);
      				return false;
			}      			
    		})(i);
  	}
}

registerHandlers();

// 2) same like above but a bit separated

function wrapper(i) {
	return function(event) {
		alert(i);
      		return false;
	}      			
}; 

(function registerHandlers() {
  	var as = document.getElementsByTagName('a');
 	for (var i = 0; i < as.length; i++) {
    		as[i].onclick = wrapper(i);
  	}
})();

// 3) Nested 
function multiple(x) {
  	return function(y) {
		 return x * y * z;
  	}
}

// we used
const double = multiple(2);
const triple = multiple(3);
double(2); // 4
double(8); // 16
triple(2); // 6
triple(5); // 15



// 4) Deeper curry 

function multiple(x) {
  	return function(y) {
   		 return function(z) {
     			 return x * y * z;
    		}
  	}
}

multiple(2)(3)(4); // 24

// 5) Advanced curry

function curry(func) {
  	return function curried(...args) {
    		if (args.length >= func.length) {
      			return func.apply(this, args);
   		 } else {
      			return function(...args2) {
 				return curried.apply(this, args.concat(args2));
			}
		}
	};
}

function sum(a, b, c) {
	return a + b + c;
}

let curriedSum = curry(sum);

// still callable normally
alert( curriedSum(1, 2, 3) ); // 6

// get the partial with curried(1) and call it with 2 other arguments
alert( curriedSum(1)(2,3) ); // 6

// full curried form
alert( curriedSum(1)(2)(3) ); // 6 
