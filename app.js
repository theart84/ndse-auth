const express = require('express');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const loggerMiddleware = require('./middleware/logger');
const errorMiddleware = require('./middleware/error');
const isAuth = require('./middleware/isAuth')
const booksRouter = require('./routes/books');
const booksRouterAPI = require('./routes/booksAPI');
const userController = require('./routes/user');
const homeRouter = require('./routes/home');
const passport = require('passport');

const app = express();

app.use(session({
  cookie: {
    path: '/',
    httpOnly: true,
    secure: false,
    maxAge: null,
  },
  name: 'library-session-id',
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(loggerMiddleware);
app.use(passport.initialize());
require('./middleware/passportLocal')(passport)
app.use(passport.session());
app.use(isAuth);
app.use('/api/user', userController);
app.use('/api', booksRouterAPI);
app.use('/', homeRouter)
app.use('/', booksRouter);

app.use(errorMiddleware);



module.exports = app;
