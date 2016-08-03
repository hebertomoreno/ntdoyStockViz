//Width, Height and padding
var margin = {top: 20, right: 20, bottom: 70, left: 50},
    w = 1000 - margin.left - margin.right,
    h = 700 - margin.top - margin.bottom;

var padding = 50;
var barPadding = 1;

var makePointGraph = function(data)
{
  /***Draw SVG***/
  var svg = d3.select("body")
              .append("svg")
              .attr("width",w + margin.left + margin.right)
              .attr("height",h + margin.top + margin.bottom)
              .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  /***Useful Domain Variables***/
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
                     .scale(xScale)
                     .ticks(16);
  var yAxis = d3.axisLeft()
                    .scale(yScale)
                    .ticks(5);
  /***Brush Declaration***/
  var brush = d3.brush().on("end", brushended),
    idleTimeout,
    idleDelay = 350;
  /***Brushended function***/
  function brushended()
  {
    var s = d3.event.selection;
    if (!s) {
      if (!idleTimeout) return idleTimeout = setTimeout(idled, idleDelay);
      xScale.domain(xDom);
      yScale.domain(yDom);
    } else {
      xScale.domain([s[0][0], s[1][0]].map(xScale.invert, xScale));
      yScale.domain([s[1][1], s[0][1]].map(yScale.invert, yScale));
      svg.select(".brush").call(brush.move, null);
    }
    zoom();
  }
  function zoom()
  {
    var t = svg.transition().duration(750);
    svg.select(".xaxis").transition(t).call(xAxis);
    svg.select(".yaxis").transition(t).call(yAxis);
    svg.selectAll("circle").transition(t)
      .attr("class", "circles")
      .attr("cx", pointsx)
      .attr("cy", pointsy);
      svg.selectAll("path")
          .attr("display", "none");
      svg.append("path")
        .datum(data)
        .attr("class", "openLine")
        .attr("d",lineBetween);
  }
  /***Idle function***/
  function idled()
  {
    idleTimeout = null;
  }
  var pointsx = function(d) { return xScale(d.Time); }
  var pointsy = function(d) { return yScale(d.Open); }
  /***Draw circles***/
  svg.selectAll("circle")
    .data(data)
    .enter().append("circle")
      .attr("class","circles")
      .attr("cx", pointsx)
      .attr("cy", pointsy)
      .attr("r", 2.5)
      .attr("fill", "blue");
  /***Draw Lines between circles***/
  var lineBetween = d3.line()
                      .curve(d3.curveLinear)
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
  svg.append("path")
    .datum(data)
    .attr("class", "openLine")
    .attr("d",lineBetween);
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
  svg.selectAll(".domain")
     .style("display", "none");
  /***Draw Brush***/
  svg.append("g")
    .attr("class", "brush")
    .call(brush);
}
