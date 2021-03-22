const express = require('express');
const UserController = require('../controllers/UserController');
const router = express.Router();
const passport = require('passport');

router.get('/login',UserController.loginGET);
router.get('/username',UserController.usernameGET);
router.get('/signup', UserController.singupGET);
router.get('/logout', UserController.logout);
router.get('/me', UserController.getProfile);
router.post('/login',passport.authenticate('local', {failureRedirect: 'login?error=incorrectData'}), UserController.loginPOST);
router.post('/signup', UserController.singupPOST);



module.exports = router;
