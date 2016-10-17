'use strict';
/* @flow */

require('../assets/styles/main.scss');

var topojson = require('topojson');
var d3 = Object.assign({},
  require('d3-geo'),
  require('d3-selection'),
  require('d3-request')
);

var margin = {top:10,left:10,bottom:10,right:10};
var rawWidth = parseInt(d3.select('#map').style('width'));
var width = rawWidth - margin.left - margin.right;
var mapRatio = 0.5;
var height = width * mapRatio;

var svg = d3.select('body').append('svg').attr('width',width).attr('height',height);
var projection = d3.geoEquirectangular().scale(width * 0.15).translate([width/2,height/2]);
var graticule = d3.geoGraticule();
var path = d3.geoPath().projection(projection);
svg.append('path').datum(graticule).attr('class','graticule').attr('d',path);
var g = svg.append('g');

d3.json('/world.json', (error,topoData) => {
  var geoData = topojson.feature(topoData,topoData.objects.collection);

  g.append('g')
      .attr('id','states')
    .selectAll('path')
      .data(geoData.features)
    .enter().append('path')
      .attr('class','land')
      .attr('d',path)
      // .on('click',clicked);


  // svg.append('path')
  //   .datum(geoData)
  //   .attr('class','land')
  //   .attr('d',path)
  //   .on('mousemove', function(d) {
  //     console.log('d',d);
  //   });
});

d3.select(window).on('resize',() => {
  // adjust things when the window size changes
  rawWidth = parseInt(d3.select('#map').style('width'));
  width = rawWidth - margin.left - margin.right;
  height = width * mapRatio;
  // logs
  console.log('width',width);
  console.log('height',height);
  // update projection
  projection.translate([width/2,height/2]).scale(width * 0.15);
  // resize the map container
  svg.attr('width',width).attr('height',height);
  // resize the map
  g.selectAll('.land').attr('d',path);
  svg.select('.graticule').attr('d',path);
});
