module.exports = (req, res, next) => {
  try {
    if (req.session.sessionID === req.sessionID) {
      req.isAuth = true;
      next();
    } else {
      req.isAuth = false;
      next();
    }
  } catch (err) {
    console.log(err)
  }
}
