const express = require("express"); //Imports express we just installed
const router = express.Router(); //Makes sure we start the server with app

router.get("/", (req, res) => {
    res.render("home");
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/about", (req, res) => {
    res.render("about");
});

router.get("/games", (req, res) => {
    res.render("games");
});

router.get("/cart", (req, res) => {
    res.render("cart");
});

router.get("/products", (req, res) => {
    res.render("products");
});

module.exports = router; // Lets you export the rounter