module.exports = function(event, state) {
  if (event.type == 'uiInput') {
    if (event.id == 'living.toggle1')
      return [
        {
          device: 'living.mainLight',
          data: { checked: !state['living.mainLight'].checked }
        }
      ];
  }
};
