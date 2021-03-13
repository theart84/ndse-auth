const express = require('express');
const HomeController = require('../controllers/HomePage');
const router = express.Router();

router.get('/', HomeController.getHomePage);

module.exports = router;