const express = require('express');
const router = express.Router();

//Get the routes.
const {
  home
} = require('../controller/home.js');

//Bind routes with controller.
router.get('/', home);

module.exports = router;