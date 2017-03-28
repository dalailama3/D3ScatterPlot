$(document).ready(function () {
  var data;

  $.ajax({
    url: 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json',
    dataType: 'json'
  }).done(function (result) {
    console.log(result)

    var margin = { top: 20, right: 10, left: 40, bottom: 50 }
    var width = 800 - margin.left - margin.right
    var height = 500 - margin.top - margin.bottom
    var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    //setup x and y scales

    var firstPlace = result[0].Seconds
    var lastPlace = result[34].Seconds
    var minutesGap = (lastPlace - firstPlace) / 60

    var xScale = d3.scale.linear()
      .domain([minutesGap, 0])
      .range([0, width])

    var yScale = d3.scale.linear()
      .domain([35, 0])
      .range([height, 0])

    var xAxis = d3.svg.axis()
      .scale(xScale)
      .orient("bottom")

    var yAxis = d3.svg.axis()
      .scale(yScale)
      .orient("left")

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
  .append("text")
    .attr("class", "label")
    .attr("x", width)
    .attr("y", -6)
    .style("text-anchor", "end")
    .text("Minutes behind first place");

// y-axis
svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("class", "label")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Rank");



      svg.selectAll(".dot")
        .data(result)
        .enter().append("circle")
        //give circles radius
        .attr("r", 6)
        .attr("class", "dot")
        .attr("cx", function (d) {
          console.log((d.Seconds - firstPlace) / 60)
          return  xScale((d.Seconds - firstPlace) / 60)
        })
        .attr("cy", function (d) {
          console.log(d.Place)
          return yScale(d.Place)
        })

  })





});
