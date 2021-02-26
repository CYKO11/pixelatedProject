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

    try {
        const { email, password } = req.body;

        if (!email || !password) { // Checks if fields are empty
            return res.status(400).render("Login", {
                message: "Please Provide an Email And Password"
            });
        }

        db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
            // If no users in the database with that email
            if (!result || !(await bcrypt.compare(password, result[0].password))) {
                res.status(401).render("login", {
                    message: "Email Or Password is Incorrect"
                });  //401 means forbidden in other words wrong login details
            }else {
                console.log("LIFE");
                const id = result[0].id;
                const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                });
                console.log("The Token is: " + token);

                const cookieOptions = {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
                    ),
                    httpOnly: true //Helps with hacking. If people wanna mess with cookies they can only on a http
                }
                res.cookie("jwt", token, cookieOptions);
                res.status(200).redirect("/"); // Means everything is fine
            }
        });

    } catch (error) {
        console.log(error);
    }

}

exports.register = (req, res) => {

    const { usernameSignUp, emailSignUp, passwordSignUp, passwordConfirmSignUp, address, age } = req.body;

    db.query("SELECT email FROM users WHERE email = ?", [emailSignUp], async (err, result) => {
        if (err) {
            console.log(err);
        }

        //Checks if the email is already in use or not
        if (result.length > 0) {
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

        /*
        bcrypt.hash(passwordSignUp, 8).then(hased => {
            console.log(hashedPassword);
        });
        */

        let hashedPassword = await bcrypt.hash(passwordSignUp, 8);
        console.log(hashedPassword);

        
        db.query("INSERT INTO users SET ?", { username: usernameSignUp, email: emailSignUp, password: hashedPassword, address: address, age: age }, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
                return res.render("login", {
                    message: "User Registered Successfully"
                });
            }
        });


    });

}

