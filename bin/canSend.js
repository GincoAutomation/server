var can = require('socketcan');
// var buffer = require('buffer');

var channel = can.createRawChannelWithOptions('can0', {
  timestamps: true,
  non_block_send: true
});
channel.start();

channel.addListener('onMessage', msg =>
  console.log(
    `(${(msg.ts_sec + msg.ts_usec / 1000000).toFixed(6)}) ${msg.id.toString(16)}# [${
      msg.data.length
    }] ${msg.data.toString('hex').toUpperCase()}`
  )
);

const msg = {
  id: 0x42a,
  data: Buffer.from([0x01, 0x02, 0x03, 0x04])
};
const ret = channel.send(msg);
console.log('Send', msg, ret);
