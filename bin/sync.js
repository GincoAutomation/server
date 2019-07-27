#!/usr/bin/env node

const Rsync = require('rsync');
const path = require('path');
const { spawn } = require('child_process');

const config = require('../config/config');

const sync = new Rsync()
  .shell('ssh')
  .archive()
  .compress()
  .flags('v')
  .source(path.join(__dirname, '..') + '/')
  .exclude(['.*', 'node_modules', 'data'])
  .destination(`${config.user}@${config.hostName}:~/HomeAutomation/server`);

// console.log(sync.command())
if (process.platform == 'win32') {
  // TODO: find a better way to execute rsync cmd on windwos
  spawn(sync.command().replace('/Users', '/c/Users'), {
    stdio: 'inherit',
    shell: true
  });
} else {
  sync.execute(
    error => console.log('Completed synchronising code to remote', error),
    data => process.stdout.write(data.toString('utf8')),
    data => process.stderr.write(data.toString('utf8'))
  );
}
