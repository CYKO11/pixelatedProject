require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

// for backend request body
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));

//api / webhost
app.use('/api', require('./api/api'));

// start the server
app.listen(process.env.WEBHOSTPORT, function() {
	console.log("App started on port: "+ process.env.WEBHOSTPORT);
});