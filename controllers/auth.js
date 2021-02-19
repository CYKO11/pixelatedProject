const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.DBUSER,
    password: process.env.PASS,
    database: process.env.DATABASE,

});


exports.login = (req, res) => {
    console.log(req.body);
    const {username, password } = req.body;
}

exports.register = (req, res) => {

    console.log(req.body);
    const {usernameSignUp, emailSignUp, passwordSignUp, passwordConfirmSignUp, address, age } = req.body;
    
    db.query("SELECT email FROM users WHERE email = ?", [emailSignUp], (err, result) => {
        if (err) {
            console.log(err);
        }

        console.log(passwordSignUp !== passwordConfirmSignUp);
        console.log("INSIDE OF YOU323232");
        //Checks if the email is already in use or not
        if (result.length > 0) {
            console.log("INSIDE OF YOU2");
            return res.render("login", {
                message: "Email Already In Use"
            });
        } else if (passwordSignUp !== passwordConfirmSignUp) {
            console.log("INSIDE OF YOU"); // Checks if passwords match
            return res.render("login", {
                message: "Password MisMatch"
            });
        }

        // let hashPassword = await 
        bcrypt.hash(passwordSignUp, 8).then(hased => {
            console.log(hashedPassword);
        });
    });

}

