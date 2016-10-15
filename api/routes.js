'use strict';

var database = [];

module.exports = [
  {
    method:'GET',
    path:'/',
    handler:(req,res) => {
      res.view('index',{message:'Hello, World!'});
    }
  },
  {
    method:'GET',
    path:'/h',
    config:{
      id:'hello',
      handler:(req,res) => {
        res('world!');
      }
    }
  },
  {
    method:'GET',
    path:'/one',
    handler:(req,res) => {
      res.view('one');
    }
  },
  {
    method:'GET',
    path:'/two',
    handler:(req,res) => {
      res.view('two');
    }
  },
  {
    method:'GET',
    path:'/data',
    handler:(req,res) => {
      return res(database);
    }
  },
  {
    method:'POST',
    path:'/data',
    handler:(req,res) => {
      database.push(req.payload);
      return res(database);
    }
  },
  // static route
  {
    method:'GET',
    path:'/{filepath*}',
    handler:{
      directory:{
        path:'public'
      }
    }
  }
];
