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
Every device has a representationn in the `IOModules.json' config file on the server with the following properties:
```
{
  id // unique human readable id 
  adress: { // depending on protocol device uses 
    // for CAN module :
    canAdress // Adress of the CAN module
    port //used port
    // for LAN module :
    IPadress // IP adress of the module
    ...
    } 
  type // type of device, oneof ['switch', 'light', 'temperature',...]
  state: { // current state of the device, properties will depend on the type
    // for switch:
    pressed // boolean to represent if the switch is pressed / activated or not
    // ligth:
    brigthness // number between 0 and 1
    color // if color light: RGB, HSV ... color
  } 
}
```
State of all the devices will be kept in the system as a state object so that a state change doesnt have to result in a read write cycle to a file.

## Events:
An event is a message send (broadcast) on the bus (both CAN bus as well websockets to all clients) that something has happened. E.g. the state of a device has changed. 
An event message contains the following properties:
```
{
  type // oneof ['stateChange', uiInput]
  time // epoch timestamp when the event took place
  data { // depending on the type of event
    // for stateChange
    deviceId // id of the device that changed state
    type // toggle or slider or...
    oldState // previous state object
    state // new state object
    // for UI
    client // client who fired the event

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
- IOModules.json: list of existing devices on CAN bus or LAN: mainly discovered automatically
- configuration.json: organisation of the devices within the home (mainly configured manually) (might delete later)
- UIConfig.json: configuration of the (web) user interface interpretable by the ui to build the required cards
- UIState: (temporary) Keeps the state of the web UI 
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

## UI config 
configuration of how the ui looks like. Exists of 3 arrays of objects:
- Rooms: an array with the rooms which the building consists of 
- Devices: All the controlable devices in the building
- Actions

Note: UI items get different id's than the physical 'devices' mentioned above. UI cannot access the devices directly, the server controls actions that should be send to the devices as a result of ui interactions.

In short: UI cannot fire actions, only events.
```
{
  rooms:[
    {
      name //name of the room (how it will be presented on the UI)
      inputs [  //array of inputs you want in this room e.g. temperature, all lights in this room
        {
          id //unique id of the input (this id is only used by the UI)
          type // type of input e.g. slider, toggle, button,...
          name // name of the input (how it will be presented on the UI)
        }
      ]
    }
  ]
  devices:[
    {
      name //name of the device (how it will be presented on the UI)
      room //name of the room it exists in
      inputs [ // array of inputs linked to the device same syntax as room inputs
        id //unique id of this particular input, not the id of the device it controls
        type
        name
      ]
    }
  ]
  actions: [
    {
      id // unique id of this action
      name // name of this action as it will be presented on the UI
      description // furter explanation of the action, also mentioned on the UI
    }
  ]

}
```

## logic
This defines the logic on what should happen when something happens
It is a javascript file with a function that takes 1 argument: the event that just happened, it can return one or more actions that needs to be fired (array)
The function can access and use the entire state to depend the action on.


