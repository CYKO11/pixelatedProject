const express = require('express');
const server = express();

server.use('/', express.static('hypertext_markup_language'));
server.use('/css', express.static('cascading_style_sheet'));
server.use('/js', express.static('javascript'));

server.listen(8080, function() {
	console.log("App started on port: 8080");
});