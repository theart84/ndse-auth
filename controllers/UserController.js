class UserController {
  login(req, res) {
    res.status(201).json({
      id: 1,
      mail: 'test@mail.ru',
    });
  }
}

module.exports = new UserController();
