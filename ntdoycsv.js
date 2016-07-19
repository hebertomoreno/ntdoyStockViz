
var ntdoycsv = function()
{
  var parser = d3.timeParse("%Y-%m-%d");
  var tFormat = d3.timeFormat("%d/%m/%y");
  d3.csv("table.csv", function(dataset)
  {
    data = dataset.map(function(d)
    {
      var parDate = parser(d.Date);
      var f = d3.format(".2");
      //console.log("Date: ", parDate);
      d.Open = +f(+d.Open);
      d.High = +d.High;
      d.Low = +d.Low;
      d.Close = +d.Close;
      d.Volume = +d.Volume;
      d["Adj Close"] = +d["Adj Close"];
      //console.log("temp: ", d.temp);
      return{"Time": parDate,
             "Open": d.Open,
             "High": d.High,
             "Low": d.Low,
             "Close": d.Close,
             "Volume": d.Volume,
             "AdjClose": d["Adj Close"]};
    })
    console.log("Stock Data: ", data);
    makeLineGraph(data);
  })

}
