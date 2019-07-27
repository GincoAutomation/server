const express = require('express');
const router = express.Router();
const ws = require('../websocket');

// Create interface to the system
const system = require('../system/system');

// via API:
router.get('/state', function(req, res) {
  res.json(system.getState());
});

router.post('/event', function(req, res) {
  system.handleEvent(req.body);
  res.json(system.getState());
});

// via websockets
ws.subscribe((message) => {
  console.log('ws received: ', message);
  let event;
  try {
    event = JSON.parse(message);
  } catch(err) {
    console.log("ws received message is not a json")
  }
  if (event) system.handleEvent(event);
});

system.on('event', event => ws.broadcast(JSON.stringify(event)))

module.exports = router;