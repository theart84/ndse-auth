class HomePage {
  getHomePage(req, res) {
    try {
      const isAuth = req.session.sessionID === req.sessionID;
      if (isAuth) {
        res.redirect('/main')
      } else {
        res.render('home', {
          title: 'Главная',
          user: false,
          isLogin: false,
        });
      }
    } catch {
      res.render('home', {
        title: 'Главная',
        user: false,
        isLogin: false,
      });
    }
  }
}

module.exports = new HomePage();
