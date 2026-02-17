// server/routes/specific_search.pages.routes.js
const express = require('express');
const router = express.Router();
const TankerPageController = require('../controllers/specific_search_page.controller');

// Browser-rendered pages (EJS)
router.get('/countries', TankerPageController.showCountries);
router.get('/countries/:country/types', TankerPageController.showTypes);
router.get('/countries/:country/types/:type/models', TankerPageController.showModels);
router.get('/countries/:country/types/:type/models/:model/receivers', TankerPageController.showReceivers);

module.exports = router;
