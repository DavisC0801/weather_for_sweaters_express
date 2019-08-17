require('dotenv').config()
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const usersRouter = require('./routes/api/v1/users');
const sessionsRouter = require('./routes/api/v1/sessions');
const forecastRouter = require('./routes/api/v1/forecast');
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/sessions', sessionsRouter);
app.use('/api/v1/forecast', forecastRouter);

module.exports = app;
