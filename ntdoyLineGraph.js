//Width, Height and padding
var w = 500;
var h = 500;
var padding = 50;

var makeLineGraph = function(data)
{
  /***Draw SVG***/
  var svg = d3.select("body")
              .append("svg")
              .attr("width",w)
              .attr("height",h);
  /***Useful Domain Variables***/
  var maxDate = new Date(2016,07,15);
  var minDate = new Date(2016,07,01);
  var yDom = d3.extent(data,function(d)
            {
              return d.Open;
            })
  /***Scales***/
  var xScale = d3.scaleTime()
                  .domain([minDate, maxDate])
                  .range([padding, w-padding]);
  var yScale = d3.scaleLinear()
                  .domain(yDom)
                  .range([h-padding,padding]);
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
}
