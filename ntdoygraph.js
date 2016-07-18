//Width, Height and padding
var w = 500;
var h = 500;
var padding = 30;
var barPadding = 2;

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

  console.log(yDom);

  var xScale = d3.scaleBand()
                 .domain(d3.range(data.length))
                 .range([padding, w-padding]);
  var yScale = d3.scaleLinear()
                 .domain(yDom)
                 .range([h-padding,padding]);
  /****Draw Rectangles****/
   svg.selectAll("rect")
  			.data(data)
  			.enter()
  			.append("rect")
  			.attr("x", function(d,i){
  									/*This line makes bars evenly spaced,
  									according to the data values*/
  									return i * (w / data.length) + padding
  									//return i * 21; //Bar Width of 20 plus 1 for padding
  								})
  			/*We set y to the difference between the height of the chart
  			and the data, so that the bars start from the bottom and not
  			from the top. (as SVG starts from the top)*/
  			.attr("y", function(d){
  									return h - (d.Open * 4)-padding;
  								})
  			/*The width is set to adjust depending on how many data values
  			there are.*/
  			.attr("width",w / data.length - barPadding)
  			/*Multiply the value by 4 (also in the y attribute) so the bars
  			look bigger, but don´t lose proportion.*/
  			.attr("height",function(d){
  											return d.Open * 4;
  										})
  			/*The fill attribute assigns a shade of blue according to the
  			data value. The taller the bar, the lighter blue is.*/
  			.attr("fill", function(d){
  				return "rgb(0,0," + (d.Open * 10) + ")";
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
   svg.append("g")
			.attr("class","axis")
			.attr("transform", "translate(0," + (h - padding) + ")")
				.call(xAxis);
  svg.append("g")
		    .attr("class", "axis")
		    .attr("transform", "translate(" + padding + ",0)")
		    .call(yAxis);
}
