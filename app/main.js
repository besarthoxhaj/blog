'use strict';
/* @flow */

require('../assets/styles/main.scss');

var topojson = require('topojson');
var d3 = Object.assign({},
  require('d3-geo'),
  require('d3-selection'),
  require('d3-request'),
  require('d3-transition'),
);

var margin = {top:10,left:10,bottom:10,right:10};
var rawWidth = parseInt(d3.select('#map').style('width'));
var width = rawWidth - margin.left - margin.right;
var mapRatio = 0.5;
var height = width * mapRatio;
var centered;

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
      .on('click',clicked);
});

function clicked(d) {
  var x,y,k;

  if (d && centered !== d) {
    var centroid = path.centroid(d);
    x = centroid[0];
    y = centroid[1];
    k = 4;
    centered = d;
  } else {
    x = width/2;
    y = height/2;
    k = 1;
    centered = null;
  }

  g.transition().duration(750).attr('transform',`translate(${width/2},${height/2})scale(${k})translate(${-x},${-y})`);
}

/**
 * bind this function with projection
 * and stuff for globals
 * @type {[type]}
 */
d3.select(window).on('resize',() => {
  // adjust things when the window size changes
  rawWidth = parseInt(d3.select('#map').style('width'));
  width = rawWidth - margin.left - margin.right;
  height = width * mapRatio;
  // update projection
  projection.translate([width/2,height/2]).scale(width * 0.15);
  // resize the map container
  svg.attr('width',width).attr('height',height);
  // resize the map
  g.selectAll('.land').attr('d',path);
  svg.select('.graticule').attr('d',path);
});
