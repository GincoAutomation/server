const sytemLogic = require('../../data/logic');

let Hardware;
try {
  Hardware = require('./hardware');
} catch (err) {
  Hardware = require('./hardwareMock');
  console.log('No hardware found, starting with mock hardware');
}

class System {
  constructor() {
    this.UIstate = require('../../data/UIState');
    this.IOModules = require('../../data/IOModules');
    this.updateUI = require('../../data/UILogic');

    this.hardware = new Hardware(this.IOModules);

    // get initial state from hardware
    // this.state = {
    //   buttons: {
    //     button1: this.hardware.getState('button1'),
    //     button2: this.hardware.getState('button2'),
    //     button3: this.hardware.getState('button3'),
    //     button4: this.hardware.getState('button4'),
    //     button5: this.hardware.getState('button5'),
    //     button6: this.hardware.getState('button6'),
    //     button7: this.hardware.getState('button7'),
    //     button8: this.hardware.getState('button8'),
    //     buttonBlue: this.hardware.getState('buttonBlue'),
    //     buttonRed: this.hardware.getState('buttonRed'),
    //   },
    //   lights: {
    //     light1: this.hardware.getState('light1'),
    //     light2: this.hardware.getState('light2'),
    //     light3: this.hardware.getState('light3'),
    //     light4: this.hardware.getState('light4'),
    //     light5: this.hardware.getState('light5'),
    //     light6: this.hardware.getState('light6'),
    //     light7: this.hardware.getState('light7'),
    //     light8: this.hardware.getState('light8'),
    //   }
    // };
    // get initial state from UIState

    // update internal state when hardware changes
    // this.hardware.on('light', (id, value) => this._changeState('lights', id, value));
    // this.hardware.on('button', (id, value) => this._changeState('buttons', id, value));
    this.hardware.on('triggerEvent', event => this.handleEvent(event));
    this.eventListeners = {};
  }

  getState() {
    return this.UIstate;
  }
  handleActions(actions) {
    //send actions to correct handlers
    actions.forEach(action => {
      switch (this.IOModules[action.deviceId].comType) {
        case 'CAN':
          //handle in hardware
          this.hardware.handleCANAction(action);
          break;
        case 'GPIO':
          //handle in hardware
          this.hardware.handleGPIOAction(action);
          break;
        case 'HTTP':
          //pass action to express
          break;
        case 'WS':
          //pass action to express
          break;
        default:
          console.log('communication type not defined');
          break;
      }
    });
  }

  handleEvent(event) {
    console.log(event);
    if (event.type == 'stateChange') {
      switch (this.IOModules[event.data.deviceId].type) {
        case 'LIGHT':
          this.IOModules[event.data.deviceId].state.value = event.data.state;
          break;
        case 'SWITCH':
          this.IOModules[event.data.deviceId].state.pressed = event.data.state;
          break;
        default:
          console.log('device type not recognized');
          break;
      }
      this.updateUI(event, this.UIstate, this.IOModules);
      this._fireEvent('stateChange', this.UIstate);
    }
    if (event.type == 'uiInput') {
      this.handleActions(sytemLogic(event, this.IOModules));
    }
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

console.log('Start Home Automation system');
const system = new System();

process.on('SIGINT', () => {
  console.log('Shut down home automation system');
  if (system.hardware) system.hardware.shutdown();
  process.exit();
});

module.exports = system;
