var static = require('node-static');
var port = 1337;
// 
// Create a node-static server instance to serve the './public' folder 
// 
var file = new static.Server('./');
 
require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        // 
        // Serve files! 
        // 
        file.serve(request, response);
    }).resume();
}).listen(port);

console.log('listening to '+ port);