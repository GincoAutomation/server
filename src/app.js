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
const uiPath = path.resolve(path.resolve(__dirname, '../../ui'));
app.use(express.static(path.resolve(uiPath, './build'))); 

// API routing
app.use('/', indexRouter);

app.get('/*', function (req, res) {
  res.sendFile(path.resolve(uiPath, './build/index.html'));
});


module.exports = app;
