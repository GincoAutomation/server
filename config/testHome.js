module.exports = {
  rooms: {
    living: {
      toggles: ['Verlichting', 'Verluchting'],
      name: 'Living'
    },
    keuken: {
      toggles: ['Verlichting', 'Verluchting'],
      name: 'Keuken'
    },
    slaapkamer: {
      toggles: ['Verlichting', 'Verluchting'],
      name: 'Slaapkamer'
    }
  },
  devices: {
    LStaand: {
      toggles: ['Hoofd lamp', 'Leeslamp'],
      name: 'Staande Lamp',
      roomName: 'Living',
      type: 'floor_lamp',
      id: 'Livinglight01'
    },
    KaNacht: {
      toggles: ['Lamp'],
      name: ' Nacht lampjes',
      roomName: 'Slaapkamer',
      type: 'floor_lamp',
      id: 'Slaapkamerlight01'
    },
    KHoofd: {
      toggles: ['Lamp'],
      name: 'Hoofd Luchter',
      roomName: 'Keuken',
      type: 'ceiling_lamp',
      id: 'Keukenlight01'
    },
    KaHoofd: {
      toggles: ['Lamp'],
      name: 'Hoofd Luchter',
      roomName: 'Slaapkamer',
      type: 'ceiling_lamp',
      id: 'Slaapkamerlight02'
    }
  },
  actions: {
    movie: {
      name: 'Movie',
      subtext: 'Film kijken'
    },
    sleep: {
      name: 'Sleep',
      subtext: 'Gaan slapen'
    },
    leave: {
      name: 'Leave',
      subtext: 'Huis verlaten'
    }
  }
};
