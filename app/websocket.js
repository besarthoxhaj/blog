'use strict';
/* @flow */

var Nes = require('nes');

var client = new Nes.Client(
  process.env.NODE_ENV === 'development'
  ? 'ws://localhost:2000'
  : window.location.protocol === 'https:'
  ? 'wss://' + location.hostname
  : 'ws://' + location.hostname
);
client.connect(err => {
  // can also request '/h'
  client.request('hello', (err,payload) => {
    // payload -> 'world!'
    console.log('hello,',payload);
  });
});
