var summaryChart = (function() {

  var width,
    height,
    margins,
    data,
    lineColours,
    chart,
    xScale,
    yScale;

  var circlesRadius = 16;
  var circlesDistance = 36;
  var yPadding = 20;
  var xPadding = 20;

  var _draw = function(_element, _data, settings) {

    data = _data;

    width = settings.chartWidth;
    height = settings.chartHeight;

    margins = settings.margins;
    lineColours = settings.lineColours;

    height = data.blood_test_results.length * circlesDistance + 10;

    chart = d3.select(_element).append("svg")
      .attr("id", "chart")
      .attr("width", width + margins.left + margins.right)
      .attr("height", height + margins.top + margins.bottom)
      .style("margin-left", margins.left + "px");

    // xDomain is time-based and goes from 2013-01-01 to today
    var xDomain = [+new Date("2013-01-01"), +new Date()];

    // xDomain is discrete (ordinal) and contains all the names
    var yDomain = _.pluck(data.blood_test_results, 'name');

    xScale = d3.time.scale.utc()
      .domain(xDomain)
      .range([0, width]);

    yScale = d3.scale.ordinal()
      .domain(yDomain)
      .rangeBands([0, height]);

    /*
    var yScale = d3.scale.linear()
      .domain([0, 100])
      .range([0, height]);
    */

    _drawAxis();

    _drawBands();
  }

  var _drawAxis = function() {

    // Axis Scales and Orientations

    // customTimeFormat is abbreviated month name and year
    var customTimeFormat = d3.time.format.multi([
      ["%b", function(d) { return d.getMonth(); }],
      ["%Y", function() { return true; }]
      ]);

    var xAxis = d3.svg.axis()
      .scale(xScale)
      .tickFormat(customTimeFormat)
      .orient("top");

    var xAxisBottom = d3.svg.axis()
      .scale(xScale)
      .tickFormat(customTimeFormat)
      .orient("bottom");

    var yAxis = d3.svg.axis()
      .scale(yScale)
      .tickSize(width)
      .orient("right");

    // Appending Axis

    chart.append("g")
      .attr("class", "xaxis axis")
      .call(xAxis)
      .attr("transform", "translate(" + margins.left + ", " + margins.top + ")");

    chart.append("g")
      .attr("class", "xaxis axis")
      .call(xAxisBottom)
      .attr("transform", "translate(" + margins.left + ", " + parseInt(margins.top + height, 10) + ")");

    chart.selectAll(".xaxis text")
      .attr("transform", "rotate(-30)");


    chart.append("g")
      .attr("class", "yaxis axis")
      .call(yAxis)
      .attr("transform", "translate(" + margins.left  + ", " + margins.top + ")");

    chart.selectAll(".yaxis text")
      .attr("display", "none");


  }

  var _drawBands = function() {



    for (var j = 0; j < data.blood_test_results.length; j++) {

      var currentBloodTestResult = data.blood_test_results[j];

      var g = chart.append("g");

      // rDomain is linear and goes from 0 to current blood test's max value (between all the samples)
      var rDomain = [0, d3.max(currentBloodTestResult.test_results, function(d) { return d.value; })];

      var rScale = d3.scale.linear()
        .domain(rDomain)
        .range([1, circlesRadius]);


      g.selectAll("circle")
        .data(currentBloodTestResult.test_results)
        .enter()
        .append("circle")
        .attr("cx", function(d, i) {
          return xScale(new Date(d.date)) + margins.left;
        })
        .attr("cy", j*circlesDistance + margins.top + yPadding)
        .attr("r", function(d) { return rScale(d.value); })
        .style("fill", function(d) {
          // returning the appropriate colour
          var x = _.find(currentBloodTestResult.risk_range, function(rr) {
            return rr.range_band[0] <= d.value && d.value <= rr.range_band[1];
          });
          return lineColours[x.value];
        });

      g.selectAll("text")
        .data(currentBloodTestResult.test_results)
        .enter()
        .append("text")
        .attr("y", j*circlesDistance + margins.top + yPadding + 5)
        .attr("x",function(d, i) { return xScale(new Date(d.date)) + margins.left; })
        .attr("text-anchor", "middle")
        .attr("class","value")
        .text(function(d){ return d.value; })
        .style("display","none");

      var label = g.append("text")
        .attr("y", j*circlesDistance + margins.top + yPadding + 5)
        .attr("x",width + margins.left + xPadding)
        .attr("data-anchor", currentBloodTestResult.name.toLowerCase().replace(/\s/g,"-"))
        .attr("class","label")
        .text(currentBloodTestResult.name + " (" + currentBloodTestResult.units + ")" )

      $(label[0]).on("mouseover", function(d) {
        var g = d3.select(this).node().parentNode;
        d3.select(g).selectAll("circle").style("display","none");
        d3.select(g).selectAll("text.value").style("display","block");
      });

      $(label[0]).on("mouseout", function(d) {
        var g = d3.select(this).node().parentNode;
        d3.select(g).selectAll("circle").style("display","block");
        d3.select(g).selectAll("text.value").style("display","none");
      });

      $(label[0]).on("click", function(d) {
        location.hash = d3.select(this).attr("data-anchor");
      });
    };

  }


  return {
    draw: _draw
  };

})();
