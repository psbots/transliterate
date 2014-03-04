var output = document.getElementById("output");
self.width=100;
self.on("message", function(selectionText) {
	output.innerHTML = "Transliterating. Please Wait...";		//placeholder till the transliteration is complete

	var xhr = new XMLHttpRequest();
	xhr.open('post', 'http://dev.silpa.org.in/JSONRPC',true);   //Set permission for the external address in package.json
	
	xhr.setRequestHeader('Content-Type', 'application/json');  // Required by JSON-RPC over HTTP

	var jsonRequest = {
	    'method': 'transliteration.transliterate',
	    'params': [
	        selectionText,
	        'en_US'
	    ],
	    'id': ''
	};

	xhr.onreadystatechange = function () {
	    if (xhr.readyState === 4) {
	        var res;
	        if (xhr.status === 200) {
	            // Don't call eval in real code use some parser
	            var result = eval('(' + xhr.responseText + ')');
	            if (result.error == null) {
	                res = result.result;
	            } 
	            else {
	                res = result.error;
	            }
	        } 
	        else {
	            res = 'Invalid Status ' + xhr.status;
	        }
	        output.innerHTML = res;
	    }
	}
	xhr.available = function () {
	};

	xhr.send(JSON.stringify(jsonRequest)); //send the request

});