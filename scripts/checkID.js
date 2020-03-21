console.log("check id's execute");
const UIConfig = require('../data/UIConfig');

const allInputs = [
  ...UIConfig.rooms.map(room => room.inputs),
  ...UIConfig.devices.map(device => device.inputs),
  ...UIConfig.actions
];

console.log(allInputs.flat().map(input => input.id));
