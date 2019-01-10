
const serverConfig = {
  version: '0.1.0',

  user: 'pi',
  hostName: 'raspberrypi.local',
  defaultPort: 8080,

  database: {
    url: 'mongodb://localhost:27017',
    name: 'home'
  }
}

module.exports = serverConfig;