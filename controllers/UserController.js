const bcrypt = require('bcryptjs');
const User = require('../models/User');

class UserController {
  loginGET(req, res) {
    const { error } = req.query
    if (error === 'incorrectData') {
      res.setHeader('Content-Type', 'text/html')
      res.render('signin', {
        title: 'Sign In',
        isLogin: false,
        errorLogin: true
      });
    } else {
      res.render('signin', {
        title: 'Sign In',
        isLogin: false,
        errorLogin: false
      });
    }
  }

  singupGET(req, res) {
      res.render('signup', {
        title: 'Sign Up',
        isLogin: false,
        errorSignup: false
      });
  }

  async getProfile(req, res) {
    const isAuth = req.session.sessionID === req.sessionID;
    if (isAuth) {
      const id = req.session.passport.user
      const candidate = await User.findOne({_id: id});
      res.render('account', {
        title: 'Account',
        user: candidate,
        isLogin: true,
      })
    } else {
      res.redirect('/');
    }
  }
  loginPOST(req, res) {
    req.session.sessionID = req.sessionID;
    if (req.user) {
      res.status(200).redirect('/main');
    }
  }

  async singupPOST(req, res) {
    const candidate = await User.findOne({
      email: req.body.email
    })
    if (candidate) {
      res.render('signup', {
        title: 'Sign Up',
        isLogin: false,
        errorSignup: true
      });
    } else {
      const salt = bcrypt.genSaltSync(10);
      const password = req.body.password;
      const newUser = await new User({
        email: req.body.email,
        username: req.body.username,
        password: bcrypt.hashSync(password, salt)
      });
      try {
        await newUser.save()
        res.status(200).redirect('/api/user/login');
      } catch {
        res.status(404).redirect('error/404');
      }
    }
  }

  async logout(req, res) {
    req.session.sessionID = '';
    req.logOut();
    res.redirect('/');
  }
}

module.exports = new UserController();
