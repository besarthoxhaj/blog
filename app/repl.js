'use strict';
/* @flow */

var d3 = require('d3-selection');
var fetch = require('isomorphic-fetch');
var utils = require('./utils.js');

var runButton = d3.select('#runButton');
var textArea = d3.select('#textArea');
var textLines = d3.select('#textLines');
var editor = ace.edit('editor');

runButton.on('click',run);
editor.getSession().setMode('ace/mode/typescript');
editor.getSession().setTabSize(2);
editor.getSession().setUseSoftTabs(false);

editor.selection.on('changeCursor', () => {
  var text = editor.getValue();
  var cursor = editor.getCursorPosition();
  try {
    var session = editor.getSession();
    Object.keys(session.$backMarkers).forEach(r => session.removeMarker(r));
    var flowRes = flow.checkContent('_',text);
    var annotations = utils.transformErrors(flowRes);
    session.setAnnotations(annotations);
    var Range = ace.require('ace/range').Range;
    annotations.forEach(error => {
      session.addMarker(
        new Range(error.row,error.column,error.row,error.columnEnd + 1),
        'marker-highlight-error',
        'background'
      );
    });
  } catch (e) {
    console.log('boom',e);
  }
});

function run() {
  console.log('editor.getValue()',editor.getValue());
}
