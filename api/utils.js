'use strict';
/* @flow */


exports.createContext = () => {
  var context = {
    storeLogs:[],
    console:{
      log:(...args) => {
        context.storeLogs.push(args.join(' '));
      }
    }
  };

  return context;
};
