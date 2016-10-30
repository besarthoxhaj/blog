'use strict';
/* @flow */

exports.createContext = () => {
  var context = {
    storeLogs:[],
    console:{
      log:function() {
        context.storeLogs.push(arguments);
      }
    }
  };

  return context;
};
