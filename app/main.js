'use strict';
/* @flow */

require('../assets/styles/main.scss');
var Nes = require('nes');

function findMax<T>(arr:T[],compare:(a:T,b:T) => number) {
  var sorted = arr.sort(compare);
  return sorted[sorted.length - 1];
}

function getMax(a,b) {
  return a-b;
}

var here = findMax([5,1,2,3,4],getMax);

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
