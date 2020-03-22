const generateAction = require('./actionLibrary');
module.exports = function(event, state) {
  var actions = [];
  if (event.type == 'uiInput') {
    switch (event.data.uiID) {
      case 'lamp01':
        if (event.data.state) {
          actions.push(generateAction('LIGHT', 'ON', 'light_out01'));
          //possibility to add more actions
          return actions;
        } else {
          actions.push(generateAction('LIGHT', 'OFF', 'light_out01'));
          //possibility to add more actions
          return actions;
        }
      case 'lamp02':
        if (event.data.state) {
          actions.push(generateAction('LIGHT', 'ON', 'light_out02'));
          return actions;
        } else {
          actions.push(generateAction('LIGHT', 'OFF', 'light_out02'));
          return actions;
        }
      default:
        console.log('event not yet defined');
        return 'event not yet defined';
    }
  }
};
