// ES7 Async & Await
// Description: used for make our asyns function act like sync
// Background: transpiled to function generator & yield
// Advice: mix async/await with promise for most cleaner code
// Note: 
//	1. await useable only in function with async keyword
//	2. await behave similiar like .then, it return the result from promise

// 1) Simple get name and age when available both 

function getName() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve('pista');
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


async function main() {
	const name = await getName();
	const age = await getAge();
	console.log(name, age);
}

main();

//----------------------------------------

// 2) Mix with await & Promise.all - get both result

(async function getResult() { 
	console.log(await Promise.all([getName(), getAge]))
})();

//----------------------------------------

// 3) We use same example but we want catch the rejects if exist

async function main() {
	try {
		const name = await getName();
		const age = await getAge();
		console.log(name, age);
	} catch(err) {
		alert(err);
	}
}

main();

//----------------------------------------

// 4) fetch is a promise, so we can use await for it

async function getData() {
	const response = await (await fetch('https://jsonplaceholder.typicode.com/todos/1')).json();
	console.log(response);
}
