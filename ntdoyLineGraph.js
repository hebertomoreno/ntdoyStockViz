//Width, Height and padding
var margin = {top: 20, right: 20, bottom: 30, left: 50},
    w = 960 - margin.left - margin.right,
    h = 500 - margin.top - margin.bottom;
/*var w = 500;
var h = 500;*/
var padding = 50;

var makeLineGraph = function(data)
{
  /***Draw SVG***/
  var svg = d3.select("body")
              .append("svg")
              .attr("width",w + margin.left + margin.right)
              .attr("height",h + margin.top + margin.bottom);
  /***Useful Domain Variables***/
  //var minDate = getMinDate(data);

  var xDom = d3.extent(data, function(d){
              return d.Time;
            })
  var yDom = d3.extent(data,function(d)
            {
              return d.Open;
            })
  console.log("X Domain", xDom);
  console.log("Y Domain", yDom);
  /***Scales***/
  var xScale = d3.scaleTime()
                  .domain(xDom)
                  .range([0, w]);
  var yScale = d3.scaleLinear()
                  .domain(yDom)
                  .range([h,0]);
  /****Axes Declaration****/
  var xAxis = d3.axisBottom()
                     /*Each axis also needs to be told on what scale to
                       operate*/
                     .scale(xScale);
                     /*Indicates the number of ticks*/
  var yAxis = d3.axisLeft()
                    /*Each axis also needs to be told on what scale to
                      operate*/
                    .scale(yScale)
                    /*Indicates the number of ticks*/
                    .ticks(5);
  /***Line Declaration***/
  var line = d3.line()
                .x(function(d) {
                  console.log("X being drawn in ", d.Time);
                  console.log("Value scaled in x: ",xScale(d.Time));
                  return xScale(d.Time);
                })
                .y(function(d) {
                  console.log("Y being drawn in ", d.Open);
                  console.log("Value scaled in y: ",yScale(d.Open));
                  return yScale(d.Open);
                });
  /***Draw Axes***/
  svg.append("g")
     .attr("class","xaxis")
     .attr("transform", "translate(0," + (h - padding) + ")")
       .call(xAxis);
 svg.append("g")
       .attr("class", "yaxis")
       .attr("transform", "translate(" + padding + ",0)")
       .call(yAxis);
 svg.selectAll(".xaxis text")  // select all the text elements for the xaxis
         .attr("transform", function(d) {
             return "translate(" + this.getBBox().height*-2 + "," + this.getBBox().height + ")rotate(-45)";
       });
  /***Draw Line***/
  svg.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line);
}

function getMinDate(data){
  /***Function to get the min Date so that we can return a
  dynamic domain to the scale.
  (In Progress)***/
}
