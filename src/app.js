const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
var cors = require('cors');

const indexRouter = require('./routes/index');

const app = express();

app.use(cors());    // enable all origins: not very safe for production!!
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// serve build of ui project at root
app.use(express.static('../ui/build')); 

// API routing
app.use('/', indexRouter);

module.exports = app;
