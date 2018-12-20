let Hardware;
try {
  Hardware = require('./hardware');
} catch {
  Hardware = require('./hardwareMock')
  console.log("No hardware found, starting with mock hardware");
}

class System {
  constructor(){
    this.hardware = new Hardware();

    // get initial state from hardware
    this.state = {
      buttons: {
        Button1: this.hardware.getState('Button1'),
        Button2: this.hardware.getState('Button1'),
        Button3: this.hardware.getState('Button1')
      },
      lights: {
        Blue: this.hardware.getState('Blue'),
        Green: this.hardware.getState('Green'),
        Yellow: this.hardware.getState('Yellow'),     
      }
    }

    // update internal state when hardware changes
    this.hardware.on('light', (id, value) => this._changeState('lights', id, value))
    this.hardware.on('button', (id, value) => this._changeState('buttons', id, value));


    this.hardware.on('button', (id, value) => {
      if (value == 0) { // if button is released: toggle light
        this.handleEvent({
          type: 'buttonClicked',
          id
        })
      }
    })
    
    this.eventListeners = {};
  }

  getState(){
    return this.state;
  }

  handleEvent(event){
    console.log(event)
    // system logic
    if (event.type == 'buttonClicked'){
      const buttonToLightMap = {
        Button1: 'Blue',
        Button2: 'Green',
        Button3: 'Yellow'
      }
      const lightId = buttonToLightMap[event.id];
      this.hardware.setLight(lightId, !this.state.lights[lightId]);
    }
  }

  on(eventType, fn){
    if (!this.eventListeners[eventType]) this.eventListeners[eventType] = [];
    this.eventListeners[eventType].push(fn);
  }

  _changeState(path, id, value){
    const oldValue = this.state[path][id];
    this.state[path][id] = value;
    this._fireEvent('event', { 
      type: 'stateChange',
      path, id, oldValue, value 
    })
  }

  _fireEvent(eventType, ...args){
    if (this.eventListeners[eventType]){
      this.eventListeners[eventType].forEach(fn => fn(...args))
    }
  }
  
}

console.log('start Home Automation system');
const system = new System();

process.on('SIGINT', () => {
  console.log("Shut down home automation system");
  if (system.hardware) system.hardware.shutdown();
  process.exit();
});

module.exports = system;
