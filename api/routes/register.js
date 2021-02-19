const router = require('express').Router();

router.get('/newUser', async (req, res) => {

     // checking if all correct query values exist 
     if (!(req.query.username && req.query.email && req.query.pass && req.query.mpass && req.query.age)){
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
    if (req.query.pass !== req.query.mpass){
        res.sendStatus(400);
        return;
    }

    // uploading data
    try {
        db('users').insert(req.query);
    } catch (err) {
        res.sendStatus(501);
        return;
    }

    // success
    res.sendStatus(200);
    return;
});


module.exports = router;