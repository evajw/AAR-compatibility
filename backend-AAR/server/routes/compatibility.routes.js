const router = require('express').Router();
const controller = require('../controllers/compatibility.controller');

router.get('/hello', controller.hello);
router.post('/submit', controller.submitCompatibility);
//router.post('/search', controller.searchCompatibility);

module.exports = router;
