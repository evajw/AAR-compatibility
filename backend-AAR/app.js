// src/app.js
const express = require('express');
const routes = require('./server/routes/index.routes');
const requestlogger = require('./server/middlewares/requestlogger.middleware');
const errorMiddleware = require('./server/middlewares/error.middleware');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(requestlogger);

app.use('/', routes);
app.use(errorMiddleware);

module.exports = app;
