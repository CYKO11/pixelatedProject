var http = require('http');
var fs = require('fs');

http.createServer(function(req, res){
    fs.readFile("/hypertext markup language/Home.html", function(err, data){
        res.writeHead(200, {"Content-Type": "text/html"});
        res.write(data);
        return res.end();
    });
}).listen(8080);

