
var PORT = 3000;
var http = require('http');
var qs = require('querystring');
var url = require('url') ;

var htmlSum = "<!doctype html><html><head><title>200</title></head><body><form><form action='sum'>a:<br><input type='text' name='a'>+b:<br><input type='text' name='b'><br><br><input type='submit' value='Submit'></form></body></html>";
var htmlNotFound = "<!doctype html><html><head><title>404</title></head><body>404: Not Found</body></html>";
var htmlNotSupported = "<!doctype html><html><head><title>405</title></head><body>405: Not Supported</body></html>";

http.createServer(function (request, response) {
	var query = url.parse(request.url, true).query;
	var pathname = url.parse(request.url).pathname;

	switch(request.method) {
		case "GET":
			if (pathname === "/sum") {
				response.writeHead(200, {'Content-Type': 'text/html'});
				response.write('<!doctype html><html><head><title>sum of '+query.a +' + '+query.b+'</title></head><body>');
				response.write("<p>"+getSumString(query.a,query.b)+"</p>");
				response.end("</body></html>");
			} else {
				response.writeHead(200, {'Content-Type': 'text/html'});
      	response.end(htmlSum);
			}
			break;
		case "POST":
			console.log(request);
			if (pathname === "/sum") {
				request.on('data', function() {
					postBody += data;
					if(requestBody.length > 1e7) {
	          response.writeHead(413, 'Request Entity Too Large', {'Content-Type': 'text/html'});
	          response.end('<!doctype html><html><head><title>413</title></head><body>413: Request Entity Too Large</body></html>');
	        }
				});
			}
			break;
		default:
			response.writeHead(405, 'Method Not Supported', {'Content-Type': 'text/html'});
			return response.end(htmlNotSupported);
	}
}).listen(3000);

function getSumString(a,b) {
	var sum = parseInt(a) + parseInt(b);
	return a+" + "+b+" = " + sum;
}
