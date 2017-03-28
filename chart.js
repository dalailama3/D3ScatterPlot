$(document).ready(function () {
  var data;

  $.ajax({
    url: 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json',
    dataType: 'json'
  }).done(function (result) {
    console.log(result)

    var margin = { top: 20, right: 10, left: 10, bottom: 50 }
    var width = 800 - margin.left - margin.right
    var height = 800 - margin.top - margin.bottom
    var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)

    //setup x and y scales

    var firstPlace = result[0].Seconds
    var lastPlace = result[34].Seconds
    var secondsGap = firstPlace - lastPlace

    var xScale = d3.scale.linear()
      .domain([secondsGap, 0])
      .range([0, width])

    var yScale = d3.scale.linear()
      .domain([0, 35])
      .range([height, 0])

    var xAxis = d3.svg.axis()
      .scale(xScale)
      .orient("left")

    var yAxis = d3.svg.axis()
      .scale(yScale)
      .orient("bottom")
      .ticks(8, "")
  })

  
});
