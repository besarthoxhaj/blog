'use strict';
/* @flow */

var server = require('./server.js');

server.start(() => {
  console.log('Server running on port:',server.info.port);
});
