'use strict';
/* @flow */

var test = require('tape');
var R = require('ramda');
var flow = require('../../assets/data/flow.js');
var utils = require('../utils.js');

test('utils:transformErrors', t => {
  var code = `
    /* @flow */
    function add(x:number) {
      return x;
    }
    add('1');
  `;
  var res = R.pipe(
    R.curry(flow.checkContent)('_'),
    utils.transformErrors
  )(code);
  t.equals(res.length,3,'got 3 errors');
  t.end();
});
