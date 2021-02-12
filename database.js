require('dotenv').config();

var mysql = require('mysql');

var con = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.DBUSER,
    password: process.env.PASS,
    port: process.env.DBPORT
});

con.connect(function (err) {
    if (err) {
        throw err;
    } else {
        console.log("Connected Successfully");
    }

    con.query("CREATE DATABASE IF NOT EXISTS mydb", function (err, result) {
        if (err) {
            throw err;
        } else {
            console.log("DATABASE CREATED SUCCESSFULLY")
            console.log(result);
        }
    });
});

