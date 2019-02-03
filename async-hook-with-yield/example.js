/*
        // another example
        async function asyncFunc(resolve) {
             const rndDelay = Math.random() * 1000+300;
             let initdata = 'my init data after '+rndDelay+' ms';
             setTimeout(() => {
                console.log('Final result is: ', resolve.next(initdata).value);
            }, rndDelay)
        }
*/

async function asyncFunc(resolve) {
    ajax('https://jsonplaceholder.typicode.com/todos', resolve);
}

const initFunc = () => {
    document.body.classList.add("wait");
    return +Date.now();
}

const asyncHook = new AsyncHook(asyncFunc, initFunc);


asyncHook.add(rawData => JSON.parse(rawData))
         .add(data => data.find( item => item.id == 2 ))
         .add(item => rootDiv.textContent += 'data [title from id:2]: '+item.title)
         .add((item, initData) => rootDiv.textContent += ' - this takes: '+(Date.now()-initData)+ 'ms')
         .add(() => document.body.classList.remove("wait"));
