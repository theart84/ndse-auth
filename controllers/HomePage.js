class HomePage {
  getHomePage(req, res) {
    if (req.user) {
      res.render('home', {
        title: 'Главная',
        user: false,
        isLogin: false,
      });
    } else {
      res.render('home', {
        title: 'Главная',
        user: true,
        isLogin: false,
      });
    }
  }
}

module.exports = new HomePage();