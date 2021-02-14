const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
const mysql = require("mysql");
const publicDirectory = path.join(__dirname, "./public");

dotenv.config({ path: './.env' });

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.DBUSER,
    password: process.env.PASS,
    database: process.env.DATABASE,

});
app.set('view engine', 'hbs'); //View Template
app.use(express.static(publicDirectory)); //For Css Connections


// Parses URL encoded Bodies as sent by the HTML Forms
// Makes sure you can grab data from any type of form
app.use(express.urlencoded({
    extended: false
}));

app.use(express.json()); // Makes sure that the data that comes in via forms is of json format

//Define Routes

app.use("/", require("./routes/pages")); // Whenever access / check for access to those routes
//app.use("/auth", require("./routes/auth"));

db.connect((err) => {
    if (err) {
        console.log("Error has occured")
        throw err;
    }
    else {
        console.log("MY SQL CONNECTED")
    }
});

app.listen(8080, () => {
    console.log("Server Started");
});