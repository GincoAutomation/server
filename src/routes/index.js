const express = require('express');
const router = express.Router();
const config = require('../../config/config');

const db = require('../database');
const system = require('../system/system');

const systemRouter = require('./systemRouter');
const userRouter = require('./userRouter');

// Get API info
router.get('/', function (req, res) {
  res.json({
      message: 'Home Automation API',
      version: config.version,
      status: 'running',
      hardware: system.hardware.type,
      database: db.connected ? 'Connected' : 'Not connected'
  });
});

// API Routers
router.use(userRouter);
router.use(systemRouter);

// All unkown routes result in 404 error
router.all('/*', function(req, res, next) {
  res.status(404).send("Incorrect API");
})

module.exports = router;
