//Width, Height and padding
var margin = {top: 20, right: 20, bottom: 100, left: 50},
    w = 1000 - margin.left - margin.right,
    h = 700 - margin.top - margin.bottom;
/*var w = 500;
var h = 500;*/
var padding = 50;
var barPadding = 1;

var makeLineGraph = function(data)
{
  /***Draw SVG***/
  var svg = d3.select("body")
              .append("svg")
              .attr("width",w + margin.left + margin.right)
              .attr("height",h + margin.top + margin.bottom)
              .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  /***Useful Domain Variables***/
  //var minDate = getMinDate(data);

  var xDom = d3.extent(data, function(d){
              return d.Time;
            })
  var yDom = d3.extent(data,function(d)
            {
              return d.Open;
            })
  var vDom = d3.extent(data, function(d)
            {
              return d.Volume;
            })
  //console.log("Vol Domain: ", vDom);
  //console.log("X Domain", xDom);
  //console.log("Y Domain", yDom);
  /***Scales***/
  var xScale = d3.scaleTime()
                  .domain(xDom)
                  .range([0, w]);
  var yScale = d3.scaleLinear()
                  .domain(yDom)
                  .range([h,0]);
  var vScale = d3.scaleLinear()
                  .domain(vDom)
                  .range([h,0]);
  var cScale = d3.scaleLinear()
                  .domain(vDom)
                  .range([1,0]);
  /****Axes Declaration****/
  var xAxis = d3.axisBottom()
                     /*Each axis also needs to be told on what scale to
                       operate*/
                     .scale(xScale)
                     /*Indicates the number of ticks*/
                     .ticks(16);
  var yAxis = d3.axisLeft()
                    /*Each axis also needs to be told on what scale to
                      operate*/
                    .scale(yScale)
                    /*Indicates the number of ticks*/
                    .ticks(5);
  /***Open Line Declaration***/
  var openLine = d3.line()
                .x(function(d) {
                  //console.log("X being drawn in ", d.Time);
                  //console.log("Value scaled in x: ",xScale(d.Time));
                  return xScale(d.Time);
                })
                .y(function(d) {
                  //console.log("Y being drawn in ", d.Open);
                  //console.log("Value scaled in y: ",yScale(d.Open));
                  return yScale(d.Close);
                });
  /***Low Line Declaration***/
  var lowLine = d3.line()
                .x(function(d) {
                  //console.log("X being drawn in ", d.Time);
                  //console.log("Value scaled in x: ",xScale(d.Time));
                  return xScale(d.Time);
                })
                .y(function(d) {
                  //console.log("Y being drawn in ", d.Open);
                  //console.log("Value scaled in y: ",yScale(d.Open));
                  return yScale(d.High);
                });
  /***Draw Volume Squares***/
  svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", function(d,i)
                {
                  var rectPos = w/data.length;
                  return i*rectPos;
                })
      .attr("y", function(d,i)
                  {
                    return h-vScale(d.Volume);
                  })
      .attr("width", function(d){
                    return (w/data.length)-barPadding;
                    })
      .attr("height",function(d){
                      return vScale(d.Volume);
                    })
      .attr("fill", function(d)
                    {
                      console.log("rgb(0,255,0," + cScale(d.Volume) +")");
                      return "rgba(0,255,0," + cScale(d.Volume) + ")";
                      //return cScale(d.Volume);
                    });
  /***Draw Axes***/
  svg.append("g")
     .attr("class","xaxis")
     .attr("transform", "translate(0," + h + ")")
       .call(xAxis);
 svg.append("g")
       .attr("class", "yaxis")
       .call(yAxis)
       .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Open");
 svg.selectAll(".xaxis text")  // select all the text elements for the xaxis
         .attr("transform", function(d) {
             return "translate(" + this.getBBox().height*-2 + "," + this.getBBox().height + ")rotate(-45)";
       });

  /***Draw Open Line***/
  svg.append("path")
      .datum(data)
      .attr("class", "openLine")
      .attr("d", openLine);
  /***Draw Low Line***/
  svg.append("path")
      .datum(data)
      .attr("class", "lowLine")
      .attr("d", lowLine);

}

function getMinDate(data){
  /***Function to get the min Date so that we can return a
  dynamic domain to the scale.
  (In Progress)***/
}
