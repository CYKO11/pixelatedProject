const router = require('express').Router();

router.get('/', async (req, res) => {

     // checking if all correct query values exist 
     if (!(req.query.username && req.query.email && req.query.password && req.query.mpassword && req.query.age)){
        res.sendStatus(400);
        return;
    }

    // pulling db class from express storage
    const db = req.app.get('db');

    // check user email
    var users = await db('users').where({email:req.query.email}).select('email');
    if (users.length > 0){
        res.sendStatus(409);
        return;
    }
    
    // check password
    if (req.query.password !== req.query.mpassword){
        res.sendStatus(400);
        return;
    }

    // uploading data
    try {
        var data = {
            "username": req.query.username,
            "email": req.query.email,
            "age": req.query.age,
            "password": req.query.password
        }
        await db('users').insert(data);
    } catch (err) {
        res.sendStatus(501);
        console.log(err);
        return;
    }

    // success
    res.sendStatus(200);
    return;
});


module.exports = router;