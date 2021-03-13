const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Book = require('../models/Book')

class UserController {
  async loginGET(req, res) {
    res.render('signin', {
      title: 'Sign In',
      isLogin: false,
      errorLogin: false
    })
  }

  singupGET(req, res) {
      res.render('signup', {
        title: 'Sign Up',
        isLogin: false,
      })
  }

  async getProfile(req, res) {
    const candidate = await User.findOne({email: 'demo@demo'});
    console.log(candidate)
    res.render('account', {
      title: 'Account',
      user: candidate,
      isLogin: true,
    })
  }
  async loginPOST(req, res) {
    console.log(req.session)
    const id = req.session.passport.user
    await User.findByIdAndUpdate(id, {sessionID: req.sessionID})
    if (req.user) {
      res.status(200).redirect('/main');
    }
  }

  async singupPOST(req, res) {
    const candidate = await User.findOne({
      email: req.body.email
    })
    if (candidate) {
      const response = {
        success: false,
        message: 'This user already exists.'
      }
      res.status(409).send(JSON.stringify(response))
    } else {
      const salt = bcrypt.genSaltSync(10);
      const password = req.body.password;
      const newUser = await new User({
        email: req.body.email,
        username: req.body.username,
        password: bcrypt.hashSync(password, salt)
      });
      const response = {
        success: true,
        message: 'User was created successfully!'
      }
      try {
        await newUser.save()
        res.status(200).redirect('/api/user/login')
      } catch {
        res.status(404).redirect('error/404');
      }
    }


  }
}

module.exports = new UserController();
