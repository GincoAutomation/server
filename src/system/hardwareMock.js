class Hardware {
  constructor() {
    this.type = 'mockup hardware';

    this.buttons = {
      Button1: { state: 0 },
      Button2: { state: 0 },
      Button3: { state: 0 }
    };

    this.lights = {
      Blue: { state: 0 },
      Green: { state: 0 },
      Yellow: { state: 0 }
    };

    this.eventListeners = {};
  }

  shutdown() {}

  setLight(id, value) {
    if (this.lights[id]) {
      console.log(`Set light ${id} ${value ? 'on' : 'off'}`);
      this.lights[id].state = value ? 1 : 0;
      this._fireEvent('light', id, value ? 1 : 0);
    } else console.error(`Light with id: ${id} does not exist`);
  }

  getState(id) {
    if (this.buttons[id]) return this.buttons[id].state;
    if (this.lights[id]) return this.lights[id].state;
    console.error(`No devive fount with id ${id}`);
  }

  on(eventType, fn) {
    if (!this.eventListeners[eventType]) this.eventListeners[eventType] = [];
    this.eventListeners[eventType].push(fn);
  }

  _fireEvent(eventType, ...args) {
    if (this.eventListeners[eventType]) {
      this.eventListeners[eventType].forEach(fn => fn(...args));
    }
  }
}

module.exports = Hardware;
