var http = require('http');
var fs = require('fs');
var server = http.createServer();

function start(){
	server.addListener('request', function (request, response) {
		console.log('requested...');

		fs.readFile('HelloWorld.html', function (error, data) {
			response.writeHead(200, {'Content-Type' : 'text/html'});
			response.end(data);
		});
	});
	/*
	server.addListener('connection', function(socket){
		console.log('connected..2.');
	});

	server.addListener('close', function(socket){
		console.log('disconnected...');
	});
*/
	server.listen(8888);

	console.log("server start");
}

function stop(){
	server.close();
	console.log('server stop');
}

exports.stop = stop;
exports.start = start;
