const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcryptjs');

const options = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: false
}

const verify = async (email, password, done)=> {
 try {
   const user = await User.findOne({email: email});
   if (user) {
     const isValidPassword =  bcrypt.compareSync(password, user.password);
     isValidPassword ? done(null, user) : done(null, false)
   }
 } catch (e) {
   console.log(e)
 }
}

passport.serializeUser(function (user, cb) {
  cb(null, user.id)
})

passport.deserializeUser(async function (id, cb) {
  try {
    const user = await User.findById(id);
    if (user) {
      cb(null, user)
    }
  } catch (err) {
    cb(err)
  }
})

module.exports = passport => passport.use('local', new LocalStrategy(options, verify))