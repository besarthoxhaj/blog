'use strict';
/* @flow */

var d3 = require('d3-selection');
var fetch = require('isomorphic-fetch');

var runButton = d3.select('#runButton');
var textArea = d3.select('#textArea');
var textLines = d3.select('#textLines');
runButton.on('click',run);

function run() {
  var input = textArea.node().value;
  console.log('input',input);
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

/**
 * Numbers of line
 */
var start = ['_'];
textLines.append('div')
  .data(start)
  .attr('class','lineNumber')
  .text((_,i) => i + 1);
textArea.on('keyup',function() {
  var lines = textArea.node().value.split('\n');
  console.log('lines',lines);
  textLines.enter().append('div')
      .attr('class','lineNumber')
    .merge(lines)
      .text((_,i) => i + 1);
  textLines.exit().remove();
});
