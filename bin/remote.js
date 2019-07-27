const config = require('../config/config');

// const args = process.argv.slice(2);
const npmCommand = process.argv[2];

// 1) using spawn
const { spawn } = require('child_process');
spawn(`ssh -t ${config.user}@${config.hostName} "cd ~/HomeAutomation/server && npm run ${npmCommand}"`, {
  stdio: 'inherit',
  shell: true
});

// 2) using
// const SSH2Promise = require('ssh2-promise');

// var ssh = new SSH2Promise({
//   host: config.hostName,
//   username: config.user,
//   agent: process.env.SSH_AUTH_SOCK,
//   agentForward: true
// });

// (async function(){
//   await ssh.connect();
//   console.log("Connection established");
//   // var data = await ssh.exec("whoami");
//   // console.log(data);

//   var socket = await ssh.spawn(`cd ~/HomeAutomation/server && npm run ${npmCommand}`, [], {pty:true});
//   socket.on('data', (data) => {
//     process.stdout.write(data.toString('utf8'))
//   }).stderr.on('data', function(data) {
//     process.stderr.write(data.toString('utf8'))
//   })
//   socket.on('close', (code, signal) => {
//     ssh.close();
//   })
//   process.on('SIGINT', function() {
//     socket.write('\x03');
//   });
// })();
