const router = require('express').Router();
// api
router.use('/login', require('./routes/login.js'));
router.use('/register', require('./routes/register.js'));

module.exports = router;