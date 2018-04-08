
// Context
var context = document.getElementById('content').getContext('2d');


// Sizing
var width = 0.9*window.innerWidth;
var height = 0.9*window.innerHeight;
var size = d3.min([width, height]);

d3.select('#content')
  .attr('height', height + 'px')
  .attr('width', width + 'px') 

var projection = d3.geoOrthographic()
  .scale(0.4 * size)
  //.translate([0.5 * width, 0.5 * height]);

var geoGenerator = d3.geoPath()
  .projection(projection)
  .context(context);


function drawPlanet(rotangle)
{
  context.lineWidth = 1.0;
  context.strokeStyle = 'rgba(0, 0, 0, 0.2)';

  // Longitudes
  nlong = 40;
  for (i = 0; i < nlong; i++) 
  { 
      // find longitudes
      ratio = i/nlong;
      long  = -90.0 + (360.0*ratio);

      if(true)// long+rotangle > -45 && long+rotangle < 45)
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

        if(true)// midlong+rotangle > -45 && midlong+rotangle < 45)
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



function update(t) 
{
  rotangle = t / 200
  projection.rotate([rotangle]);
  // document.getElementById("reporter").innerHTML = rotangle

  context.clearRect(0, 0, width, height);

  drawPlanet(rotangle);

  window.requestAnimationFrame(update);
}

window.requestAnimationFrame(update);