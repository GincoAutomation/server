const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const APIRouter = require('./routes/index');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// serve build of ui project at root
const uiPath = path.resolve(path.resolve(__dirname, '../../ui'));
app.use(express.static(path.resolve(uiPath, './build'))); 

// API routing
app.use('/API', APIRouter);

// all other paths will return the ui app, routing is done by the frontend SPA ui
app.get('/*', function (req, res) {
  res.sendFile(path.resolve(uiPath, './build/index.html'));
});

module.exports = app;
