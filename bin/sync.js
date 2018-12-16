#!/usr/bin/env node

const Rsync = require('rsync');
const path = require('path');

const config = require('../config/config');

const sync = new Rsync()
    .shell('ssh')
    .archive()
    .compress()
    .flags('v')
    .source(path.join(__dirname, '..') + '/')
    .exclude(['.git', '.DS_Store', 'node_modules'])
    .destination(`${config.user}@${config.hostName}:~/HomeAutomation/server`);

console.log(sync.command())
sync.execute(function(error, code, cmd) {
    console.log('Completed synchronising code to remote');
});