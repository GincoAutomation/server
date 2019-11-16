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
    this.hardware = new Hardware();

    // get initial state from UIState
    this.state = require('../../data/UIState');

    // update internal state when hardware changes
    // this.hardware.on('light', (id, value) => this._changeState('lights', id, value));
    // this.hardware.on('button', (id, value) => this._changeState('buttons', id, value));

    // this.hardware.on('button', (id, value) => {
    //   if (value == 0) {
    //     // if button is released: toggle light
    //     this.handleEvent({
    //       type: 'buttonClicked',
    //       id
    //     });
    //   }
    // });

    this.eventListeners = {};
  }

  getState() {
    return this.state;
  }

  handleEvent(event) {
    console.log(event);
    // system logic
    // systemLogic(event).map(action =>{
    // })

    this._changeState(event.data.uiID, event.data.state, event.data.type);

    // if (event.type == 'buttonClicked') {
    //   const buttonToLightMap = {
    //     Button1: 'Blue',
    //     Button2: 'Green',
    //     Button3: 'Yellow'
    //   };
    //   const lightId = buttonToLightMap[event.id];
    //   this.hardware.setLight(lightId, !this.state.lights[lightId]);
    // }
  }

  on(eventType, fn) {
    if (!this.eventListeners[eventType]) this.eventListeners[eventType] = [];
    this.eventListeners[eventType].push(fn);
  }

  _changeState(id, value, type) {
    if (type == 'toggle') {
      this.state[id].checked = value;
    } else if (type == 'slider') {
      this.state[id].value = value;
    }
    this._fireEvent('stateChange', this.state);
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
