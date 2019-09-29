
const dscc = require('@google/dscc');
const viz = require('@google/dscc-scripts/viz/initialViz.js');
const local = require('./localMessage.js');

import {Deck} from '@deck.gl/core';
import {ScatterplotLayer} from '@deck.gl/layers';
// change this to 'true' for local development
// change this to 'false' before deploying
export const LOCAL = false;
var chartElement = document.createElement('div');
chartElement.id = 'container';
document.body.appendChild(chartElement);
var canvasElement = document.createElement('canvas');
var ctx = canvasElement.getContext('2d');
canvasElement.id = 'container';
document.body.appendChild(canvasElement);



const drawViz = (data) => {
  var data1 = data.tables.DEFAULT;  
  const INITIAL_VIEW_STATE = {
    bearing: 0,
    longitude: 143.499772,
    latitude:  -34.7773053,
    zoom: 15,
    minZoom: 5,
    maxZoom: 20,
    pitch: 40.5,
  };
const deckgl = new Deck({
  initialViewState: INITIAL_VIEW_STATE,
  controller: true,
  layers: [
    new ScatterplotLayer({
      //data: 'https://raw.githubusercontent.com/djouallah/keplergl/master/docs/data.json',
      data : data1,
      getPosition: d => d.dimID,
      radiusScale: 10,
      radiusMinPixels: d => d.metricID,
      //getFillColor: d => d.colorcode,
    })
  ],
  
});
};
// renders locally
if (LOCAL) {
  drawViz(local.message);
  
} else {
  dscc.subscribeToData(drawViz, {transform: dscc.objectTransform});
}
