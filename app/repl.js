'use strict';
/* @flow */

var d3 = require('d3-selection');
var fetch = require('isomorphic-fetch');

var runButton = d3.select('#runButton');
var textInput = d3.select('#textInput');
runButton.on('click',run);

function run() {
  var input = textInput.node().value;
  fetch('/api/repl',{
    method:'POST',
    body:input,
  }).then(data => {
    return data.json();
  }).then(data => {
    console.log('data',data);
  }).catch(error => {
    console.log('error',error);
  });
}
