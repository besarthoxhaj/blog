'use strict';
/* @flow */

var Hapi = require('hapi');
var server = new Hapi.Server();

server.connection({port:process.env.PORT || 2000});

server.register([{
  register:require('vision'),
  options:{}
},{
  register:require('inert'),
  options:{}
},{
  register:require('nes'),
  options:{}
}], (err) => {
  if (err) {
    console.log('Failed to load vision.');
  }
  server.views({
    engines:{
      html:require('handlebars')
    },
    relativeTo:__dirname,
    path:'../views'
  });
  server.route(require('./routes.js'));
});

module.exports = server;
