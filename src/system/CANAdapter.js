const IOModules = require('../../data/IOModules.json');
const { findKey } = require('lodash');

module.exports = function CANEvent(msg) {
  var canEvent = {
    type: 'hardwareInput',
    time: new Date((msg.ts_sec + msg.ts_usec / 1000000) * 1000).toISOString(),
    data: {
      deviceId: findKey(IOModules, o => Number(o.address) == msg.id && o.port == msg.data[0])
    }
  };

  switch (msg.data[1]) {
    case 0:
      //type: switch
      canEvent.data.type = 'switch';
      canEvent.data.state = msg.data[2] ? 'pressed' : 'released';
      canEvent.data.duration = (msg.data[4] << 8) + msg.data[3];
      break;
  }
  console.log(canEvent);
  return canEvent;
};
