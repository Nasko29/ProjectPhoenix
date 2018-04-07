var context = document.getElementById('content').getContext('2d');

var width = 0.7*window.innerWidth;
var height = 0.7*window.innerHeight;
var size = d3.min([width, height]);

d3.select('#content')
  .attr('height', height + 'px');
  //.attr('width', width + 'px')

context.lineWidth = 0.4;
context.strokeStyle = 'rgba(0, 0, 0, 0.4)';

var projection = d3.geoOrthographic()
  .scale(0.4 * size)
  //.translate([0.5 * width, 0.5 * height]);

var geoGenerator = d3.geoPath()
  .projection(projection)
  .context(context);

var geojson = {type: 'Feature', geometry: {type: 'LineString', coordinates: []}};

function rndLon() {return -180 + Math.random() * 360;}
function rndLat() {return -90 + Math.random() * 180;}
function addPoint() {geojson.geometry.coordinates.push([rndLon(), rndLat()])}
function update(t) {
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