'use strict';
/* @flow */

var vm = require('vm');
var flow = require('flow-bin');
var utils = require('../utils.js');

module.exports = (req,res) => {
  console.log('req.payload',req.payload);
  var context = utils.createContext();
  var vmResult = vm.runInNewContext(req.payload,context);
  res({
    status:'success',
    body:{logs:context.storeLogs,output:vmResult}
  });
};
