const Gpio = require('onoff').Gpio;
// eslint-disable-next-line no-unused-vars
const testpin = new Gpio(1, 'in'); // test if we are running on rPi
// const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class Hardware {
  constructor() {
    this.type = 'Raspberry pi';

    this.buttons = {
      button1: new Gpio(3, 'in', 'both', {
        debounceTimeout: 100,
        activeLow: true
      }), // GPIO 0-8 has internal pull-ups enabled by defualt
      button2: new Gpio(4, 'in', 'both', {
        debounceTimeout: 100,
        activeLow: true
      }),
      button3: new Gpio(17, 'in', 'both', {
        debounceTimeout: 100,
        activeLow: true
      }),
      button4: new Gpio(27, 'in', 'both', {
        debounceTimeout: 100,
        activeLow: true
      }),
      button5: new Gpio(0, 'in', 'both', {
        debounceTimeout: 100,
        activeLow: true
      }),
      button6: new Gpio(5, 'in', 'both', {
        debounceTimeout: 100,
        activeLow: true
      }),
      button7: new Gpio(6, 'in', 'both', {
        debounceTimeout: 100,
        activeLow: true
      }),
      button8: new Gpio(13, 'in', 'both', {
        debounceTimeout: 100,
        activeLow: true
      }),
      buttonBlue: new Gpio(19, 'in', 'both', {
        debounceTimeout: 100,
        activeLow: true
      }),
      buttonRed: new Gpio(26, 'in', 'both', {
        debounceTimeout: 100,
        activeLow: true
      })
    };
    Object.entries(this.buttons).forEach(([id, button]) => {
      button.watch((err, value) => {
        if (err) console.error(err);
        else {
          console.log(`Button ${id} ${value ? 'pressed' : 'released'}`);
          this._fireEvent('button', id, value);
        }
      });
    });

    this.lights = {
      light1: new Gpio(14, 'low'),
      light2: new Gpio(15, 'low'),
      light3: new Gpio(18, 'low'),
      light4: new Gpio(23, 'low'),
      light5: new Gpio(24, 'low'),
      light6: new Gpio(16, 'low'),
      light7: new Gpio(20, 'low'),
      light8: new Gpio(21, 'low'),
    };

    this.eventListeners = {};
  }

  shutdown() {
    Object.values(this.buttons).forEach(button => button.unexport());
    Object.values(this.lights).forEach(light => light.unexport());
  }

  setLight(id, value) {
    if (this.lights[id]) {
      console.log(`Set light ${id} ${value ? 'on' : 'off'}`);
      this.lights[id].writeSync(value ? 1 : 0);
      this._fireEvent('light', id, value ? 1 : 0);
    } else console.error(`Light with id: ${id} does not exist`);
  }

  getState(id) {
    if (this.buttons[id]) return this.buttons[id].readSync();
    if (this.lights[id]) return this.lights[id].readSync();
    console.error(`No device found with id ${id}`);
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
