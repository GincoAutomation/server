module.exports = function(event, UIstate, IOModules) {
  const groupFunctions = {
    homeGroup: () => {
      let dependants = [
        IOModules.light_out01.state.value,
        IOModules.light_out02.state.value,
        IOModules.light_out03.state.value,
        IOModules.light_out04.state.value,
        IOModules.light_out05.state.value,
        IOModules.light_out06.state.value,
        IOModules.light_out07.state.value,
        IOModules.light_out08.state.value
      ];
      if (dependants.every(v => v == 1)) {
        UIstate.home_toggle.checked = true;
      } else if (dependants.some(v => v == 0)) {
        UIstate.home_toggle.checked = false;
      }
    },
    kitchenGroup: () => {
      //example: check if all kitchen ligts are on
      let dependants = [
        IOModules.light_out01.state.value,
        IOModules.light_out02.state.value,
        IOModules.light_out03.state.value
      ];
      if (dependants.every(v => v == 1)) {
        UIstate.kitchen_toggle1.checked = true;
      } else if (dependants.some(v => v == 0)) {
        UIstate.kitchen_toggle1.checked = false;
      }
    },
    livingGroup: () => {
      //example: check if all kitchen ligts are on
      let dependants = [
        IOModules.light_out04.state.value,
        IOModules.light_out05.state.value,
        IOModules.light_out06.state.value
      ];
      if (dependants.every(v => v == 1)) {
        UIstate.living_toggle1.checked = true;
      } else if (dependants.some(v => v == 0)) {
        UIstate.living_toggle1.checked = false;
      }
    }
  };
  const Modules = {
    light_out01: {
      reactors: [
        () => {
          UIstate.lamp01.checked = event.data.state;
        },
        groupFunctions.kitchenGroup,
        groupFunctions.homeGroup
      ]
    },
    light_out02: {
      reactors: [
        () => {
          UIstate.lamp02.checked = event.data.state;
        },
        groupFunctions.kitchenGroup,
        groupFunctions.homeGroup
      ]
    },
    light_out03: {
      reactors: [
        () => {
          UIstate.lamp03.checked = event.data.state;
        },
        groupFunctions.kitchenGroup,
        groupFunctions.homeGroup
      ]
    },
    light_out04: {
      reactors: [
        () => {
          UIstate.lamp04.checked = event.data.state;
        },
        groupFunctions.livingGroup,
        groupFunctions.homeGroup
      ]
    },
    light_out05: {
      reactors: [
        () => {
          UIstate.lamp05.checked = event.data.state;
        },
        groupFunctions.livingGroup,
        groupFunctions.homeGroup
      ]
    },
    light_out06: {
      reactors: [
        () => {
          UIstate.lamp06.checked = event.data.state;
        },
        groupFunctions.livingGroup,
        groupFunctions.homeGroup
      ]
    },
    light_out07: {
      reactors: [
        () => {
          UIstate.lamp07.checked = event.data.state;
        },
        groupFunctions.homeGroup
      ]
    },
    light_out08: {
      reactors: [
        () => {
          UIstate.lamp08.checked = event.data.state;
        },
        groupFunctions.homeGroup
      ]
    }
  };

  Modules[event.data.deviceId].reactors.forEach(fn => fn());
};
