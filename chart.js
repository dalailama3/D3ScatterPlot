$(document).ready(function () {
  var data;

  $.ajax({
    url: 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json',
    dataType: 'json'
  }).done(function (result) {

    var margin = {  top: 80, right: 140, bottom: 60, left: 60 }
    var width = 900 - margin.left - margin.right
    var height = 700 - margin.top - margin.bottom
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
      .domain([minutesGap + .2, 0])
      .range([0, width])

    var yScale = d3.scale.linear()
      .domain([36, 0])
      .range([height, 0])

    var xAxis = d3.svg.axis()
      .scale(xScale)
      .orient("bottom")

    var yAxis = d3.svg.axis()
      .scale(yScale)
      .orient("left")

    var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
      return "<span>" + d.Name + ": " + d.Nationality + "</span><br><span>" + "Year: " + d.Year + "</span>" + "<br><span>" + "Time: " + d.Time +
      "</span>" + "<br><br><span>" + d.Doping + "</span>"
    })






    var circles = svg.selectAll(".dot")
      .data(result)
      .enter().append("circle")
      //give circles radius
      .attr("r", 6)
      .attr("class", "dot")
      .attr("cx", function (d) {
        // console.log((d.Seconds - firstPlace) / 60)
        return  xScale((d.Seconds - firstPlace) / 60)
      })
      .attr("cy", function (d) {
        return yScale(d.Place)
      })
      .call(tip)
      .style("fill", function (d) {
        if (d.Doping.length) {
          return "red"

        } else {
          return "steelblue"
        }
      })
      .on("mouseover", tip.show)
      .on("mouseout", tip.hide)

      //add labels for the circles

      svg.selectAll("text")

      .data(result)
      .enter()
      .append("text")
      .text(function(d) {

        return d.Name;
      })
      .attr("x", function(d) {
        return xScale((d.Seconds - firstPlace) / 60)
      })
      .attr("y", function(d) {
        return yScale(d.Place);
      })
      .attr("transform", "translate(15,+4)");

      //x-axis
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
        .text("Place");






    var legend = svg.selectAll(".legend")
      .data([["No doping allegations", "steelblue"], ["Doping Allegations", "red"]])
      .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) {
      var margin = parseInt(i * 30 + 300);
      return "translate(0," + margin + ")";

    });

  // draw legend colored rectangles
  legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", function(d) { return d[1];});

  // draw legend text
  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style({
        "text-anchor": "end",
        "font-size": "16px"
      })
      .text(function(d) { return d[0];})

      //give chart a title

    svg.append("text")
        .attr("x", (width / 2))
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style({
            "font-size": "30px",
            "font-weight": "bold"
        })
        .text("35 Fastest times up Alpe d'Huez");

  })





});
