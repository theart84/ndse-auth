const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const loggerMiddleware = require('./middleware/logger');
const errorMiddleware = require('./middleware/error');
const booksRouter = require('./routes/books');
const booksRouterAPI = require('./routes/booksAPI');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(loggerMiddleware);
app.use('/api', booksRouterAPI);
app.use('/', booksRouter);
app.use(errorMiddleware);

module.exports = app;
