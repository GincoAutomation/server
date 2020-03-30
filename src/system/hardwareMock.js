class Hardware {
  constructor() {
    this.type = 'mockup hardware';

    this.buttons = {
      Button1: { state: 0 },
      Button2: { state: 0 },
      Button3: { state: 0 }
    };

    this.lights = {
      light_out01: { state: 0 },
      light_out02: { state: 0 },
      light_out03: { state: 0 },
      light_out04: { state: 0 },
      light_out05: { state: 0 },
      light_out06: { state: 0 },
      light_out07: { state: 0 },
      light_out08: { state: 0 }
    };

    this.eventListeners = {};
  }

  handleCANAction(action) {
    /* send the data  to can module*/
  }
  handleGPIOAction(action) {
    /* set gpio pins */
    var prevState = this.lights[action.deviceId].state;
    console.log(`setting GPIO pin cooresponding with: ${action.deviceId}`);
    let event = {
      type: 'stateChange',
      time: new Date().toISOString(),
      data: {
        deviceId: action.deviceId,
        oldState: prevState,
        state: action.data.value
      }
    };
    this.passEvent(event);
  }
  receiveCANEvent() {
    /* received can message containing Event */
  }
  passEvent(event) {
    this._fireEvent('triggerEvent', event);
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
