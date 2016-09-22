var http = require('http');
var url = require('url');

function onRequest(req, res) {
  var path = url.parse(req.url).pathname;
  console.log('Request for ' + path + ' received.');
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write('Hello World');
  res.end();
}

http.createServer(onRequest).listen(8111);
console.log('Server has started.');