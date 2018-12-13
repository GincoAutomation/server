const Hardware = require('./hardware');

console.log('start Home Automation system');

class System {
  constructor(){
    this.hardware = new Hardware();

    // get initial state from hardware
    this.state = {
      buttons = {
        Button1: this.hardware.getState('Button1'),
        Button2: this.hardware.getState('Button1'),
        Button3: this.hardware.getState('Button1')
      },
      lights = {
        Blue: this.hardware.getState('Blue'),
        Green: this.hardware.getState('Green'),
        Yellow: this.hardware.getState('Yellow'),     
      }
    }

    // update internal state when hardware changes
    this.hardware.on('light', (id, value) => {this.state.lights[id] = value; console.log(this.state)})
    this.hardware.on('button', (id, value) => {this.state.buttons[id] = value; console.log(this.state)});

    // system logic
    const buttonToLightMap = {
      Button1: 'Blue',
      Button2: 'Green',
      Button3: 'Yellow'
    }
    this.hardware.on('button', (id, value) => {
      if (value == 0) { // if button is released: toggle light
        const lightId = buttonToLightMap[id];
        this.hardware.setLight(lightId, !this.state.lights[lightId]);
      }
    })
    
  }

  getState(){
    return this.state;
  }

  handleEvent(id, value){
    if (this.state.lights[id]){
      this.hardware.setLight(id, value)
    } else throw `${id} is not a light, only allowed to set lights`
  }
}

const system = new System();

process.on('SIGINT', () => {
  console.log("Shut down home automation system");
  if (system.hardware) system.hardware.shutdown();
  process.exit();
});

module.exports = system;
