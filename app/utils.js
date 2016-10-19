'use strict';
/* @flow */

var R = require('ramda');

module.exports = {
  transformErrors
};

function transformErrors(errors) {
  return errors.reduce((errors,error) => {
    var description = error.message.length >= 5
      ? error.message.slice(2, 5).map(e => e.descr).join('\n')
      : error.message.map(e => {
        return e.path && e.path !== '_' ? e.descr + ': ' + e.path + ':' + e.line + '\n' + e.context: e.descr;
      }).join('\n');

    var messages = error.message.map(message => ({
      row:message.line - 1,
      column:message.start - 1,
      columnEnd:message.end - 1,
      text:description,
      type:'error'
    }));
    return errors.concat(messages);
  },[]);
}
