var singleRiskChart = (function() {

  var barWidth,
  barHeight,
  margins,
  data,
  lineColours,
  chart,
  scale;

  var _draw = function(_element, _data, settings) {

    data = _data;

    barWidth = settings.barWidth;
    barHeight = settings.barHeight;

    margins = settings.margins;
    lineColours = settings.lineColours;


    // getting the max value from all the risk bands to set the domain
    var maxRange = _.max((_.flatten(_.pluck(data.risk_range, 'range_band'))));

    scale = d3.scale.linear();
    scale.domain([0, maxRange]);
    scale.range([0, barWidth]);

    chart = d3.select(_element)
    .append("svg:svg")
    .attr('width', barWidth + margins.left + margins.right)
    .attr('height', barHeight + margins.top + margins.bottom);

    _drawAxis();

    _drawBands();

    _drawMarker();

  };

  var _drawAxis = function() {

    var maxRange = _.max((_.flatten(_.pluck(data.risk_range, 'range_band'))));
    var axisScale = d3.scale.linear();
    axisScale.domain([0, maxRange]);
    var xRange = axisScale.range([0, barWidth -2]);

    // var xRange = scale.range([0, barWidth -2]); why all that?

    var commasFormatter = d3.format(",.0f")

    var xAxis = d3.svg.axis()
    .scale(xRange)
    .ticks(5)
    .tickFormat(function(d) { return commasFormatter(d) + ""; })
    .orient("bottom");


    chart.append("g")
    .attr("height", 0)
    .attr("class", "xaxis axis")
    .call(xAxis)
    .attr("transform", "translate(" + margins.left + ", " + (barHeight + margins.top + 1) + ")")

    chart.selectAll(".xaxis text")  // select all the text elements for the xaxis
    .attr("transform", "translate(-5,5)rotate(-30)");

  };

  var _drawBands = function() {

    data.risk_range.forEach(function(b) {

      var value_zero = parseInt(b.range_band[0], 10);
      var value_uno = parseInt(b.range_band[1], 10);

      var random = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);

      var gradient = chart.append("svg:defs")
      .append("svg:linearGradient")
      .attr("id", "gradient" + random)
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%")
      .attr("spreadMethod", "pad");

      gradient.append("svg:stop")
      .attr("offset", "20%")
      .attr("stop-color", lineColours[b.value])
      .attr("stop-opacity", .8);

      gradient.append("svg:stop")
      .attr("offset", "100%")
      .attr("stop-color", lineColours[b.value])
      .attr("stop-opacity", .6);

      chart.append("svg:rect")
      .attr("class", "rangeBand")
      .attr("x", Math.floor(scale(value_zero)))
      .attr("width", Math.floor(scale(value_uno) - 1) - Math.floor(scale(value_zero)))
      .attr("y", barHeight)
      .attr("height", 0)
      .attr("fill", "url(#gradient" + random + ")")
      .attr("transform", "translate(" + margins.left + ", " + margins.top + ")")
      .transition()
      .duration(600)
      .attr("height", barHeight)
      .attr("y", 0)

    });

  };

  var _drawMarker = function() {

    var _radius = 16;
    var _radiusHover = 16;

    var marker = chart.append("circle")
    .attr("class", "dot")
    .attr("data-title", "<p class='first'><span class='big'>" + data.test_results[0].test_result.value + "</span> " + data.units + "</p><p class='second'>" + data.marker_code + "</p>")
    .attr("r", 0)
    .attr("opacity", 0)
    .attr("cx", function(d) {
      var x = scale(data.test_results[0].test_result.value)
      return x;
    })
    .attr("cy", barHeight/2)
    .attr("stroke", "#FFF")
    .attr("stroke-width", 2)
    .style("fill", "#333")
    .style("fill-opacity", .4)
    .attr("transform", "translate(" + margins.left + ", " + margins.top + ")")
    .transition()
    .duration(1000)
    .delay(600)
    .attr("r", _radius)
    .attr("opacity", 1);

    //var plus = chart.append("line")
    //  .attr("x1", function(d) {
    //    var x = scale(data.test_results[0].test_result.value) + _radius;
    //    return x;
    //  })
    //  .attr("y1", barHeight/2 + _radius - 5)
    //  .attr("x2", function(d) {
    //    var x = scale(data.test_results[0].test_result.value) + _radius;
    //    return x;
    //  })
    //  .attr("y2", barHeight/2 + _radius + 5)
    //  .attr("stroke-width", 2)
    //  .attr("stroke", "black");
    //
    //var minus = chart.append("line")
    //  .attr("x1", function(d) {
    //    var x = scale(data.test_results[0].test_result.value) + _radius - 5;
    //    return x;
    //  })
    //  .attr("y1", barHeight/2 + _radius)
    //  .attr("x2", function(d) {
    //    var x = scale(data.test_results[0].test_result.value) + _radius + 5;
    //    return x;
    //  })
    //  .attr("y2", barHeight/2 + _radius)
    //  .attr("stroke-width", 2)
    //  .attr("stroke", "black");

    $(marker[0]).on("mouseover", function(d) {

      d3.select(this).transition().duration(200).attr("r", _radiusHover);
      _showTooltip(this);
    });
    $(marker[0]).on("mouseout", function(d) {
      d3.select(this).transition().duration(200).attr("r", _radius);
      _hideTooltip(this);
    });
    $(marker[0]).on("click", function(d) {
      _showHelp(this);
    });
  };

  var _showHelp = function(element) {

    // showing help description.
    $(element).closest(".small-chart-container").find(".chart-long-description").addClass("active");

  };

  var _showTooltip = function(element) {

    // retrieving content from data attribute.
    var txt = $(element).data("title");

    // adding content to tooltip.
    $(".tooltip").find(".tooltip-inner").html(txt);

    // calculating the middle position to center the tooltip.
    var posXs = $(".tooltip").find(".tooltip-inner").width()/2 - 9;

    // calculating final x and y position for tooltip.
    var posX = parseInt( $(element).offset().left - posXs, 10),
    posY = parseInt( $(element).offset().top - 90, 10);

    // positioning tooltip.
    $(".tooltip")
    .css("top", posY + "px")
    .css("left", posX + "px");

    // showing tooltip.
    if(!Modernizr.cssanimations) {
      // degradation for !Modernizr.cssanimations
      $(".tooltip")
      .css("opacity", 1);
    } else {
      $(".tooltip").removeClass("fadeOut");
      $(".tooltip").addClass("bounceIn");
    }

  };

  var _hideTooltip = function(element) {

    // hiding help description.
    $(element).closest(".small-chart-container").find(".chart-long-description").removeClass("active");

    // moving tooltip away


    // hiding tooltip.
    if(!Modernizr.cssanimations) {
      // degradation for !Modernizr.cssanimations
      $(".tooltip")
      .css("left", -10000 + "px")
      .css("opacity", 0);
    } else {
      $(".tooltip").removeClass("bounceIn");
      $(".tooltip").addClass("fadeOut");
    }

  };

  // Public API
  return {
    draw: _draw
  };

})();
