//Width, Height and padding
var w = 500;
var h = 500;
var padding = 30;
var barPadding = 2;

var makeGraph = function(data)
{
  var yDom = d3.extent(data,function(d)
            {
              return d.Open;
            })

  console.log(yDom);

  var xScale = d3.scaleOrdinal()
                 .domain(d3.range(data.length))
                 .range([padding, w-padding]);
  var yScale = d3.scaleLinear()
                 .domain(yDom)
                 .range([h-padding,padding]);
}
