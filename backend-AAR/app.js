// src/app.js
const express = require('express');
const routes = require('./server/routes');
const requestLogger = require('./server/middlewares/requestlogger.middleware');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(requestlogger);

app.use('/', routes);
app.use(errorMiddleware);

module.exports = app;
