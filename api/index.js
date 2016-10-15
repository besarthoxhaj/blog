'use strict';

var server = require('./server.js');

server.start(function(){
  console.log('Server running on port:',server.info.port);
});
