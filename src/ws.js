const system = require('./system/system');

wsHandlers = {
  onMessage: (message) => {
    console.log('ws received: ', message);
    let event;
    try {
      event = JSON.parse(message);
    } catch {
      console.log("ws received message is not a json")
    }
    if (event) system.handleEvent(event);
  },

  setBroadcast: (broadcast) => {
    system.on('event', event => broadcast(JSON.stringify(event)))
  }
}

module.exports = wsHandlers;