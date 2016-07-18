//Width, Height and padding
var w = 500;
var h = 500;
var padding = 30;
var barPadding = 2;
var increment = 8;

var makeGraph = function(data)
{
  /****SVG Delcaration****/
  var svg = d3.select("body")
              .append("svg")
              .attr("width",w)
              .attr("height",h);
  var yDom = d3.extent(data,function(d)
            {
              return d.Open;
            })
  var yMax = d3.max(data,function(d)
            {
              return d.Open;
            })

  console.log("Y Domain: ",yDom);
  console.log("Y Max: ",yMax);

  var xScale = d3.scaleOrdinal()
                 .domain(d3.range(data.length))
                 .range([padding, w-padding]);
  var yScale = d3.scaleLinear()
                 .domain(yDom)
                 .range([h-padding,0]);
  var cScale = d3.scaleLinear()
                  .domain(yDom)
                  .range([0,255]);
  /****Draw Rectangles****/
   svg.selectAll("rect")
  			.data(data)
  			.enter()
  			.append("rect")
  			.attr("x", function(d,i){
  									/*This line makes bars evenly spaced,
  									according to the data values*/
  									return i * (w / data.length) +padding
  								})
  			/*We set y to the difference between the height of the chart
  			and the data, so that the bars start from the bottom and not
  			from the top. (as SVG starts from the top)*/
  			.attr("y", function(d){
  									return (h - (d.Open * increment))-padding;
  								})
  			/*The width is set to adjust depending on how many data values
  			there are.*/
  			.attr("width",w / data.length - barPadding)
  			/*Multiply the value by 4 (also in the y attribute) so the bars
  			look bigger, but don´t lose proportion.*/
  			.attr("height",function(d){
  											return d.Open*increment;
  										})
  			/*The fill attribute assigns a shade of blue according to the
  			data value. The taller the bar, the lighter blue is.*/
  			.attr("fill", function(d){
          var f = d3.format(".3");
          /***Color Fi is a variable that takes the value of d.Open, divides
          it over the maximum value in the graph, and then multiplies it by
          255 to get a uniform color scheme. ***/
          var colorFi = f((d.Open/yMax)*255);
          //console.log("Color Value: ", colorFi);
          console.log("rgb(0,0," + colorFi+")");
  				return "rgb(0,0," + colorFi + ")";
  			});
   /****Axes Declaration****/
   var xAxis = d3.axisBottom()
  			 							/*Each axis also needs to be told on what scale to
  											operate*/
  									 	.scale(xScale)
  										/*Indicates the number of ticks*/
  										.ticks(5);
   var yAxis = d3.axisLeft()
										 /*Each axis also needs to be told on what scale to
											 operate*/
										 .scale(yScale)
										 /*Indicates the number of ticks*/
										 .ticks(5);
  /*****Text*****/
  /*var f = d3.format(".2")
  svg.selectAll("text")
      .data(data)
      .enter()
      .append("text")
      //One label per Datum
      .text(function(d){
              return f(d.Open);
      })
      /*the x coordinate sets the label exactly in the middle of
      bar.
      .attr("x", function(d, i) {
       return (i * (w / data.length) + (w / data.length - barPadding) / 2)+padding;
                  })
      .attr("y", function(d) {
                 return h - (d.Open * 4) + 14;
                })
      .attr("font-family", "sans-serif")
      .attr("font-size", "11px")
      .attr("fill","white")
      .attr("text-anchor","middle");*/
   svg.append("g")
			.attr("class","axis")
			.attr("transform", "translate(0," + (h - padding) + ")")
				.call(xAxis);
  svg.append("g")
		    .attr("class", "axis")
		    .attr("transform", "translate(" + padding + ",0)")
		    .call(yAxis);
}
