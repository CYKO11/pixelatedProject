const express = require("express"); //Imports express we just installed
const router = express.Router(); //Makes sure we start the server with app

const authController = require("../controllers/auth");

router.post("/login", authController.login);



module.exports = router; // Lets you export the rounter