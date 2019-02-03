function AsyncHook(asyncFunc, initFunc = null) {
		let result = null,
				initData = null;
		const cb = [];

		initFunc && (initData = initFunc());

	    function* generator () {
			// insert iter into async
	        result = yield asyncFunc(iter);
			// pass result to every registered callback
			cb.forEach( c => {
    			const cbResult = c(result, initData);
					cbResult && (result = cbResult);
				}
			);
			// just test, this is will be the last
			return result;
	    };

    const iter = generator();
    iter.next(); 	// start and go till first yield
		return {
			add(callback) {
				// register callback for async function
				cb.push(callback);
				return this;
			}
		}
}

function ajax(url, resolve) {
		const xhr = new XMLHttpRequest();
		xhr.open("GET", url, true);
		xhr.onreadystatechange = function () {
   			if (xhr.readyState != 4) return;
    		if (xhr.status != 200 && xhr.status != 304) { return };
		    resolve.next(xhr.responseText);
		};

		xhr.send(null);
}
