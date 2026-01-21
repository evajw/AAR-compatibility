const router = require('express').Router();

router.use('/tables', require('./tables.routes'));
router.use('/', require('./compatibility.routes'));

module.exports = router;
