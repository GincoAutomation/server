const Gpio = require('onoff').Gpio;

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class Hardware {
  constructor(){
    this.type = 'Raspberry pi';
    
    this.buttons = {
      Button1: new Gpio(2, 'in', 'both', {debounceTimeout: 10, activeLow: true}), // GPIO 0-8 has internal pull-ups enabled by defualt
      Button2: new Gpio(3, 'in', 'both', {debounceTimeout: 10, activeLow: true}),
      Button3: new Gpio(4, 'in', 'both', {debounceTimeout: 10, activeLow: true})
    }
    Object.entries(this.buttons).forEach(([id, button]) => {
      button.watch( (err, value) => {
        if (err) console.error(err);
        else {
          console.log(`Button ${id} ${value ? 'pressed' : 'released'}`);
          this._fireEvent('button', id, value);
        }
      })
    });

    this.lights = {
      Blue: new Gpio(17, 'out'),
      Green: new Gpio(27, 'out'),
      Yellow: new Gpio(22, 'out'),
    }

    this.eventListeners = {}
  }

  shutdown(){
    Object.values(this.buttons).forEach(button => button.unexport());
    Object.values(this.lights).forEach(light => light.unexport());
  }

  setLight(id, value){
    if (this.lights[id]){
      console.log(`Set light ${id} ${value ? 'on' : 'off'}`);
      this.lights[id].writeSync(value ? 1 : 0);
      this._fireEvent('light', id, value ? 1 : 0);
    } else console.error(`Light with id: ${id} does not exist`);
  }

  getState(id){
    if (this.buttons[id]) return this.buttons[id].readSync();
    if (this.lights[id]) return this.lights[id].readSync();
    console.error(`No devive fount with id ${id}`);
  }

  on(eventType, fn){
    if (!this.eventListeners[eventType]) this.eventListeners[eventType] = [];
    this.eventListeners[eventType].push(fn);
  }

  _fireEvent(eventType, ...args){
    if (this.eventListeners[eventType]){
      this.eventListeners[eventType].forEach(fn => fn(...args))
    }
  }
}

module.exports = Hardware;
