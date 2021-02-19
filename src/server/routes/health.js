const express = require('express');
const router  = express.Router();

//Get the routes.
const health   = require('../controller/health.js');

//Bind routes with controller.
router.get('/ready',health);
router.get('/live',health);
router.get('/',health);

module.exports = router;