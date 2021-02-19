const router = require('express').Router();

router.get('/', async (req, res) => {
    
    // check query
    if (!(req.query.email, req.query.password)){
        res.sendStatus(400);
        return;
    }

    // pulling db class from express storage
    const db = req.app.get('db');

    // getting user data
    var users = await db('users').where({email:req.query.email}).select(['email','password','admin']);
    if (users.length == 0){
        res.sendStatus(404);
        return;
    }
    var userData;
    userData = users[0];

    // check password
    if (req.query.password !== userData.password){
        res.sendStatus(403);    
        return;
    }

    // build token
    const rand = ()=>Math.random(0).toString(36).substr(2);
    const token = rand() + Date.now();
    console.log(token);

    // uploading token
    await db('users').where({ email : userData.email }).update({ "token" : token });

    // returning token
    res.json({ "token" : token });
});

module.exports = router;