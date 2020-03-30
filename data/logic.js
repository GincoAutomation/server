const generateAction = require('./actionLibrary');
module.exports = function(event, state) {
  var actions = [];
  if (event.type == 'uiInput') {
    const UI = {
      home_toggle: () => {
        if (event.data.state) {
          actions.push(generateAction('LIGHT', 'ON', 'light_out01'));
          actions.push(generateAction('LIGHT', 'ON', 'light_out02'));
          actions.push(generateAction('LIGHT', 'ON', 'light_out03'));
          actions.push(generateAction('LIGHT', 'ON', 'light_out04'));
          actions.push(generateAction('LIGHT', 'ON', 'light_out05'));
          actions.push(generateAction('LIGHT', 'ON', 'light_out06'));
          actions.push(generateAction('LIGHT', 'ON', 'light_out07'));
          actions.push(generateAction('LIGHT', 'ON', 'light_out08'));
        } else {
          actions.push(generateAction('LIGHT', 'OFF', 'light_out01'));
          actions.push(generateAction('LIGHT', 'OFF', 'light_out02'));
          actions.push(generateAction('LIGHT', 'OFF', 'light_out03'));
          actions.push(generateAction('LIGHT', 'OFF', 'light_out04'));
          actions.push(generateAction('LIGHT', 'OFF', 'light_out05'));
          actions.push(generateAction('LIGHT', 'OFF', 'light_out06'));
          actions.push(generateAction('LIGHT', 'OFF', 'light_out07'));
          actions.push(generateAction('LIGHT', 'OFF', 'light_out08'));
        }
      },
      living_toggle1: () => {
        if (event.data.state) {
          actions.push(generateAction('LIGHT', 'ON', 'light_out01'));
          actions.push(generateAction('LIGHT', 'ON', 'light_out02'));
          actions.push(generateAction('LIGHT', 'ON', 'light_out03'));
          //possibility to add more actions
        } else {
          actions.push(generateAction('LIGHT', 'OFF', 'light_out01'));
          actions.push(generateAction('LIGHT', 'OFF', 'light_out02'));
          actions.push(generateAction('LIGHT', 'OFF', 'light_out03'));
          //possibility to add more actions
        }
      },
      living_toggle2: () => {
        //not yet defined
        return;
      },
      living_slider1: () => {
        //not yet defined
        return;
      },
      kitchen_toggle1: () => {
        if (event.data.state) {
          actions.push(generateAction('LIGHT', 'ON', 'light_out04'));
          actions.push(generateAction('LIGHT', 'ON', 'light_out05'));
          actions.push(generateAction('LIGHT', 'ON', 'light_out06'));
          //possibility to add more actions
        } else {
          actions.push(generateAction('LIGHT', 'OFF', 'light_out04'));
          actions.push(generateAction('LIGHT', 'OFF', 'light_out05'));
          actions.push(generateAction('LIGHT', 'OFF', 'light_out06'));
          //possibility to add more actions
        }
      },
      kitchen_toggle2: () => {
        //not yet defined
        return;
      },
      kitchen_slider1: () => {
        //not yet defined
        return;
      },
      bedroom_toggle1: () => {
        //not yet defined
        return;
      },
      bedroom_toggle2: () => {
        //not yet defined
        return;
      },
      bedroom_slider1: () => {
        //not yet defined
        return;
      },
      lamp01: () => {
        if (event.data.state) {
          actions.push(generateAction('LIGHT', 'ON', 'light_out01'));
          //possibility to add more actions
        } else {
          actions.push(generateAction('LIGHT', 'OFF', 'light_out01'));
          //possibility to add more actions
        }
      },
      lamp02: () => {
        if (event.data.state) {
          actions.push(generateAction('LIGHT', 'ON', 'light_out02'));
          //possibility to add more actions
        } else {
          actions.push(generateAction('LIGHT', 'OFF', 'light_out02'));
          //possibility to add more actions
        }
      },
      lamp03: () => {
        if (event.data.state) {
          actions.push(generateAction('LIGHT', 'ON', 'light_out03'));
          //possibility to add more actions
        } else {
          actions.push(generateAction('LIGHT', 'OFF', 'light_out03'));
          //possibility to add more actions
        }
      },
      lamp04: () => {
        if (event.data.state) {
          actions.push(generateAction('LIGHT', 'ON', 'light_out04'));
          //possibility to add more actions
        } else {
          actions.push(generateAction('LIGHT', 'OFF', 'light_out04'));
          //possibility to add more actions
        }
      },
      lamp05: () => {
        if (event.data.state) {
          actions.push(generateAction('LIGHT', 'ON', 'light_out05'));
          //possibility to add more actions
        } else {
          actions.push(generateAction('LIGHT', 'OFF', 'light_out05'));
          //possibility to add more actions
        }
      },
      lamp06: () => {
        if (event.data.state) {
          actions.push(generateAction('LIGHT', 'ON', 'light_out06'));
          //possibility to add more actions
        } else {
          actions.push(generateAction('LIGHT', 'OFF', 'light_out06'));
          //possibility to add more actions
        }
      },
      lamp07: () => {
        if (event.data.state) {
          actions.push(generateAction('LIGHT', 'ON', 'light_out07'));
          //possibility to add more actions
        } else {
          actions.push(generateAction('LIGHT', 'OFF', 'light_out07'));
          //possibility to add more actions
        }
      },
      lamp08: () => {
        if (event.data.state) {
          actions.push(generateAction('LIGHT', 'ON', 'light_out08'));
          //possibility to add more actions
        } else {
          actions.push(generateAction('LIGHT', 'OFF', 'light_out08'));
          //possibility to add more actions
        }
      }
    };
    UI[event.data.uiID]();
    return actions;
  }
};
