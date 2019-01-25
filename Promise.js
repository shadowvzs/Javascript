// ES6 - Promise
// Description: Sync the Async functions
// Structure: 
// new Promise(function(resolve, reject) { 
//     //do something and use resolve(something) or reject(something) callbacks 
// });
// Note: reject is acctually a normal error, so .catch is same like catch 
// in try-catch, also you can use either throw '...', reject('...'), Error('...')


// 1) Execute async functions in order, catch error, do something in both case
// - We have 3 async function (and 3 promise)
// - Order: after 1st done, we execute 2nd, when 2nd done we execute 3rd
// - if any from the 3 have reject we catch  the error
// - we execute allways something if we place .then after catch ()
// Duration: 1+2+1 second

function getName() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const serverOn = Math.random() > 0.3;
			if (serverOn) {
				resolve('pista');
			} else {
				reject('Server is offline')			
			}
		}, 1000)
	});
}

function getAge() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve('10');
		}, 2000)
	});
}

function getLocation() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve('New York');
		}, 1000)
	});
}

getName()
	.then( name => { console.log(name); return getAge(); } )
	.then( age => { console.log(age); return getLocation(); } )
	.then( loc => console.log(loc) )
	.catch(err => alert(err))
	.then( _=> console.log('this will be executed allways') )


// --------------------------------------

// 2) Lets use the 3 function from previous example 
// but now we don't chain it, just start every async functions
// and if longest async function done then we handle it
// Duration: 2 second (longest asyn is 2 sec)

Promise.all([getName(), getAge(), getLocation()])
	.then(([name, age, loc]) => console.log(name+' '+age+' '+loc))
	.catch(err => alert(err))


// --------------------------------------
// 3) Get the fastest async function

const randomDelay = () => Math.floor(Math.random()*2000+100);

function pingServer1() {
	const delay = randomDelay();
	const id = 1;	
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve({id, delay});
		}, delay)
	});
}

function pingServer2() {
	const delay = randomDelay();
	const id = 2;	
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve({id, delay});
		}, delay)
	});
}

function pingServer3() {
	const delay = randomDelay();
	const id = 3;	
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve({id, delay});
		}, delay)
	});
}

Promise.race([pingServer1(), pingServer2(), pingServer3()])
	.then(server => console.log(`fastest server is #${server.id}, ping: ${server.delay}ms`))
