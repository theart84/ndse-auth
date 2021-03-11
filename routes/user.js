const express = require('express');
const UserController = require('../controllers/UserController');
const router = express.Router();

router.get('/login', UserController.loginGET);
router.get('/signup', UserController.singupGET);
router.get('/me', UserController.getProfile);
router.post('/login', UserController.loginPOST);
router.post('/signup', UserController.singupPOST);


module.exports = router;
