
// GetContext
var context = document.getElementById('content1').getContext('2d');

// Set Sizing
var width = 0.75*window.innerWidth;
var height = 0.75*window.innerHeight;
var size = d3.min([width, height]);
d3.select('#content1')
  .attr('height', 1.2*height + 'px')
  .attr('width', 1.2*width + 'px') 

// SelectProjection
var projection = d3.geoOrthographic()
  .scale(0.4 * size)
  // .translate([0, 0.5 * height]);
var geoGenerator = d3.geoPath()
  .projection(projection)
  .context(context);

// Create Points 
var pts    = []; 
var metals = [];
var water  = [];
generateData(1000);

function generateData(npts)
{
  pts = []
  for (i = 0; i < npts; i++)
  {
    pts.push([-90+360*Math.random(),-90+180*Math.random()]);
    metals.push(Math.random());
    water.push(Math.random());
  } 
}
function drawPoints()
{
  for (i = 0; i < pts.length; i++){drawPoint(pts[i][0],pts[i][1],1000);} 
}

function drawPoint(x,y,r)
{
  // draw line
  var context = document.getElementById('content1').getContext('2d');
  context.lineWidth = 1.0;
  context.strokeStyle = 'rgba(1, 0, 0, 1.0)';
  var line = {type: 'Feature', geometry: {type: 'Point',coordinates: [x,y]}}; 
  context.beginPath();
  geoGenerator(line);
  context.fill();
}

function update(t) 
{
  rotangle = t / 200
  projection.rotate([rotangle]);
  context.clearRect(0, 0, width, height);
  drawPlanet(rotangle);
  drawPoints();
  window.requestAnimationFrame(update);
}

window.requestAnimationFrame(update);

function angleRange(angle)
{
  if(angle > 270)
  {
    return (angle + 90)%360 - 90
  }
  else if(angle < 0 - 90)// if angle is lower than -90
  {
    return (angle - 270)%360 + 270
  }
  return angle;
}

function drawPlanet(rotangle)
{
  context.lineWidth = 1.0;
  context.strokeStyle = 'rgba(0, 0, 0, 1.0)';

  // Longitudes
  nlong = 50;
  for (i = 0; i < nlong; i++) 
  { 
      // find longitudes
      ratio = i/nlong;
      long  = -90.0 + (360.0*ratio);

      if(angleRange(long+rotangle) >= -90 && angleRange(long+rotangle) <= 90)
      {
        // draw line
        var line = {type: 'Feature', geometry: {type: 'LineString', coordinates: [[long,-90],[long,90]]}}; 
        context.beginPath();
        geoGenerator(line);
        context.stroke();
      }
  }

  // Latitudes
  nlat = nlong;
  nlong = 100
  for (j = 0; j < nlat; j++) 
  { 
    longspan = 360.0/nlong;
    ratio = j/nlat;
    lat = -90.0 + (180.0*ratio);

    for (i = 0; i < nlong; i++) 
    { 
        long1 = -90 + (i*longspan);
        long2 = -90 + (i*longspan)+ longspan;
        midlong = (long1 + long2) / 2;

        if(angleRange(midlong+rotangle) >= -90 && angleRange(midlong+rotangle) <= 90)// midlong+rotangle > -45 && midlong+rotangle < 45)
        {
          // draw line
          var line = {type: 'Feature', geometry: {type: 'LineString', coordinates: [[long1,lat],[long2,lat]]}}; 
          context.beginPath();
          geoGenerator(line);
          context.stroke();
        }
    }
  }
}