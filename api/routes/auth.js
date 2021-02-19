const router = require('express').Router();

module.exports = {
    ensureLogged : async function(req,res,next) {
        if (!(req.query.email && req.query.token))
            res.redirect('/login');
        else {
            // pulling db class from express storage
            const db = req.app.get('db');

            // getting user data
            var users = await db('users').where({email:req.query.email}).select(['email','password','admin','token']);
            if (users.length == 0){
                res.sendStatus(404);
                return;
            }
            var userData;
            userData = users[0];

            // checks token
            if (userData.token === req.query.token){
                return next();
            } else {
                res.redirect('/login');
            }
        }
    },
    ensureAdmin : async function(req,res,next) {
        if (!(req.query.email && req.query.token))
            res.redirect('/login');
        else {
            // pulling db class from express storage
            const db = req.app.get('db');

            // getting user data
            var users = await db('users').where({email:req.query.email}).select(['email','password','admin','token']);
            if (users.length == 0){
                res.sendStatus(404);
                return;
            }
            var userData;
            userData = users[0];

            // checks admin
            if (userData.admin === 1){
                return next();
            } else {
                res.redirect('/home');
            }
        }
        // req.flash('error_msg' , 'please login to view this resource');
    },
}

module.exports = router;