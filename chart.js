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


  })
});
