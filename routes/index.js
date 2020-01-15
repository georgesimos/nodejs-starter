const router = require('express').Router();

router.use('/api/auth', require('./api/auth'));
router.use('/api/users', require('./api/users'));

module.exports = router;
