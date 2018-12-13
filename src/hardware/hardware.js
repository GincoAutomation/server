const Gpio = require('onoff').Gpio;

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class Hardware {
  constructor(){
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
          if (id == 'Button1') this.setLight('Blue', value);
          else if (id == 'Button2') this.setLight('Green', value);
          else this.setLight('Yellow', value);
        }
      })
    });

    this.lights = {
      Blue: new Gpio(17, 'out'),
      Green: new Gpio(27, 'out'),
      Yellow: new Gpio(22, 'out'),
    }
  }

  shutdown(){
    Object.values(this.buttons).forEach(button => button.unexport());
    Object.values(this.lights).forEach(light => light.unexport());
  }

  setLight(id, value){
    if (this.lights[id]){
      console.log(`Set light ${id} ${value ? 'on' : 'off'}`);
      this.lights[id].writeSync(value ? 1 : 0);
    } else console.error(`Light with id: ${id} does not exist`);
  }
}

console.log('start program');
hw = new Hardware();

process.on('SIGINT', () => {
  console.log("end program");
  hw.shutdown();
  process.exit();
});