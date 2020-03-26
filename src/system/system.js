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
    this.UIstate = JSON.parse(require('../../data/UIState'));

    // update internal state when hardware changes
    // this.hardware.on('light', (id, value) => this._changeState('lights', id, value));
    // this.hardware.on('button', (id, value) => this._changeState('buttons', id, value));

    this.hardware.on('button', (id, value) => {
      if (value == 0) {
        console.log(this.state);
        // if button is released: toggle light
        var lampID = 'lamp0' + id.charAt(id.length - 1);
        this.handleEvent({
          type: 'Input',
          time: 'N/A',
          data: {
            uiID: lampID,
            type: 'toggle',
            oldState: this.state[lampID].checked,
            state: !this.state[lampID].checked,
            client: 'TODO'
          }
        });
      }
    });

    this.eventListeners = {};
  }

  getState() {
    return this.state;
  }
  handleActions(actions) {
    //send actions to correct handlers
    actions.forEach(action => {
      switch (action.comType) {
        case 'CAN':
          //handle in hardware
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
      switch (this.state[event.data.deviceId].type) {
        case 'LIGHT':
          this.state[event.data.deviceId].state.value = event.data.state;
          break;
        case 'SWITCH':
          this.state[event.data.deviceId].state.pressed = event.data.state;
          break;
        default:
          console.log('device type not recognized');
          break;
      }
    }
    var actions = sytemLogic(event, this.state);

    // system logic
    // if (event.type == 'buttonClicked') {
    //   const buttonToLightMap = {
    //     button1: 'light1',
    //     button2: 'light2',
    //     button3: 'light3',
    //     button4: 'light4',
    //     button5: 'light5',
    //     button6: 'light6',
    //     button7: 'light7',
    //     button8: 'light8'
    //   };
    //   const lightId = buttonToLightMap[event.id];
    //   this.hardware.setLight(lightId, !this.state.lights[lightId]);
    // }
    // systemLogic(event).map(action =>{
    // })

    this._changeState(event.data.uiID, event.data.state, event.data.type);
    this.hardware.setLight('light' + event.data.uiID.charAt(event.data.uiID.length - 1), event.data.state);
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
