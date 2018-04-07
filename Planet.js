
// Context
var context = document.getElementById('content').getContext('2d');


// Sizing
var width = 0.7*window.innerWidth;
var height = 0.7*window.innerHeight;
var size = d3.min([width, height]);

d3.select('#content')
  .attr('height', height + 'px')
  .attr('width', width + 'px') 

context.lineWidth = 0.4;
context.strokeStyle = 'rgba(0, 0, 0, 0.4)';

var projection = d3.geoOrthographic()
  .scale(0.4 * size)
  //.translate([0.5 * width, 0.5 * height]);

var geoGenerator = d3.geoPath()
  .projection(projection)
  .context(context);

// Lattitudes from -180 to +180
// nlats = 24;
// for (i = 0; i < nlats; i++) 
// { 
//     var line = {type: 'Feature', geometry: {type: 'LineString', coordinates: []}};
//     ratio = i/nlats;
//     lat  = -180 + (360*ratio);
//     long1 = -90;
//     long2 = +90;
//     line.geometry.coordinates.push([long1,lat]);
// }

// Longitudes from -90 to +90



var geojson = {type: 'Feature', geometry: {type: 'LineString', coordinates: []}};

function rndLon() {return -180 + Math.random() * 360;}
function rndLat() {return -90 + Math.random() * 180;}
function addPoint() {geojson.geometry.coordinates.push([rndLon(), rndLat()])}

function update(t) 
{
  if(geojson.geometry.coordinates.length < 6000)
    addPoint();

  projection.rotate([t / 1000]);

  context.clearRect(0, 0, width, height);
  context.beginPath();
  geoGenerator(geojson);
  context.stroke();

  window.requestAnimationFrame(update);
}

window.requestAnimationFrame(update);