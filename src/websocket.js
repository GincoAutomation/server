const WebSocket = require('ws');

class WebSocketClient {
  constructor() {
    this._wss = null;

    this.messageHandlers = [];
  }

  startServer(options) {
    this._wss = new WebSocket.Server(options);

    // When a new websocket connection opens
    this._wss.on('connection', ws => {
      console.log('ws connection opened');
      ws.isAlive = true;
      ws.on('pong', () => (ws.isAlive = true));
      // send incoming messages to all subscribed messageHandlers
      ws.on('message', message => this.messageHandlers.forEach(mh => mh(message)));
      ws.on('close', () => console.log('ws connection closed'));
    });

    // set hartbeat
    this._hartbeat = setInterval(() => {
      this._wss.clients.forEach(ws => {
        if (!ws.isAlive) return ws.terminate();
        ws.isAlive = false;
        ws.ping();
      });
    }, 30000);
  }

  subscribe(messageHandler) {
    this.messageHandlers.push(messageHandler);
  }

  broadcast(message) {
    if (this._wss) {
      this._wss.clients.forEach(ws => {
        if (ws.readyState === WebSocket.OPEN) {
          console.log('ws send', message);
          ws.send(message);
        }
      });
    }
  }
}

const ws = new WebSocketClient();
module.exports = ws;
