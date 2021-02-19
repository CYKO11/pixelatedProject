require('dotenv').config();

const express = require('express');
const app = express();

// for backend request body
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));

// start the server
http.listen(process.env.WEBHOSTPORT, function() {
	console.log("App started on port: "+ process.env.WEBHOSTPORT);
});