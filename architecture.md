# Concepts

## Devices:
A device is any physical entity in the home with a single function.
Examples:
- switch: a single (press) button 
- light
- temperature sensor
- motion sensor
- door lock

Multiple devices can be connected to the same CAN module.
Every device has a representationn in the `IODevices.json' config file on the server with the following properties:
```
{
  id // uuid v4 serial number
  type // type of device, oneof ['switch', 'light', 'temperature']
  state: { // current state of the device, properties will depend on the type
    // for switch:
    pressed // boolean to represent if the switch is pressed / activated or not
    // ligth:
    brigthness // number between 0 and 1
    color // if color light: RGB, HSV ... color
  } 
}
```

## Events:
An event is a message send on the bus (both CAN bus as well websockets to all clients) that something has happened. E.g. the state of a device has changed. 
An event message contains the following properties:
```
{
  type // oneof ['stateChange']
  time // UTC timestamp when the event took place
  data { // depending on the type of event
    // for stateChange
    deviceId // id of the device that changed state
    oldState // previous state object
    state // new state object
  }
}
```

## Actions:
An action is a message send to a specific device to take an action. Which will most likely result in a stateChange event. E.g. Set the light on
An action message contains the following properties:
```
{
  deviceId // id of the device the action should be send to
  type // oneof [] (not sure type is useful...)
  data { // depending on the type of event and device different data can be attached to the action
    // setting on a light will be
    brightness // number of requested brightness
  }
}
```

# Configurations
A couple of configurations are stored on the server
- IOdevices.json: list of existing devices on CAN bus or LAN: mainly discovered automatically
- configuration.json: organisation of the devices within the home (mainly configured manually)
- uiConfig.json: configuration of the (web) user interface
- logic.js: the automation logic: what should happen when

## configuration
How devices are organised within the home and how they are named
```
{
  deviceNames // a map of user friendly names for each device
  rooms:[ // existing rooms within the home
    { 
      name // name of the room
      devices: { // existing devices in the room
        deviceId
        location // location within the room 
      }
    }
  ]
}
```

## ui config 
configuration of how the ui looks like: i.e. what boards exists, which devices are represented, which input devices exist and what actions do they fire
```
{
  tabs:[ // list of tabs
    {
      name // name of tab
      tiles: [
        {
          type // oneof ['device', 'input']
          data:{
            // for devices
            deviceId // Id of the device that is represented
            type // type of the device oneof ['light', 'switch',...]
            actionOnClick // action that should be fired when clicking on the device

            // for input
            type // type of input: oneof ['switch', 'slider']
            actionOnClick // action that should be fired when clicking on the input field, question: maybe this should also fire an event instead of an action...
          }
        }
      ]
    }
  ]
}
```

## logic
This defines the logic on what should happen when something happens
It is a javascript file with a function that takes 1 argument: the event that just happened, it can return one or more actions that needs to be fired
The function can access and use the entire state to depend the action on.
