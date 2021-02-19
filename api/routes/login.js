const router = require('express').Router();

router.get('/test', (req, res) => { res.json({"test":"login"})});

module.exports = router;