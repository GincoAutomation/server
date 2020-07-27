var can = require('socketcan');
// var buffer = require('buffer');

var channel = can.createRawChannel('can0', true /* ask for timestamps */);
channel.start();

function dumpPacket(msg) {
  console.log(
    `(${(msg.ts_sec + msg.ts_usec / 1000000).toFixed(6)}) ${msg.id.toString(16)}# [${
      msg.data.length
    }] ${msg.data.toString('hex').toUpperCase()}`
  );
}

channel.addListener('onMessage', dumpPacket);
