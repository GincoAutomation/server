module.exports = function(type, action, deviceID) {
  switch (type) {
    case 'LIGHT':
      switch (action) {
        case 'ON':
          return {
            deviceId: deviceID,
            type: 'LIGHT',
            data: {
              value: 1
            }
          };
        case 'OFF':
          return {
            deviceId: deviceID,
            type: 'LIGHT',
            data: {
              value: 0
            }
          };
        case 'BRIGHTNESS':
          return {
            deviceId: deviceID,
            type: 'LIGHT',
            data: {
              brightness: 255
            }
          };
        default:
          return 'Not a valid action for LIGHT';
      }
  }
};
