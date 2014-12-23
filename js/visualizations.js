$(function() {

  var littleChartBuilder = (function() {

    var width,
      height,
      leftPadding,
      rightPadding,
      topPadding,
      bottomPadding,
      element,
      units,
      range,
      data,
      lineColours,
      chart,
      scale;

    var _drawChartComponent = function(_element, _data, settings) {

      element = _element;

      width = settings.width;
      height = settings.height;

      leftPadding = settings.leftPadding;
      rightPadding = settings.rightPadding;
      topPadding = settings.topPadding;
      bottomPadding = settings.bottomPadding;
      lineColours = settings.lineColours;

      // picking element id and selecting marker
      var chartID = parseInt(element.id.replace("chart-", ""), 10);
      data = _data.markers[chartID];
      units = _data.markers[chartID].units;
      range = _data.markers[chartID].risk_range;

      /**
       * getting the max value from all the risk bands
       * to set the domain
       */
      var maxRange = _.max((_.flatten(_.pluck(range, 'range_band'))));

      scale = d3.scale.linear();
      scale.domain([0, maxRange]);
      scale.range([0, width]);

      chart = d3.select(element)
        .append("svg:svg")
        .attr('width', width)
        .attr('height', height);

      // _drawAxis();

      _drawBands();

      _drawMarker();
    }

    var _drawAxis = function() {
      var x = scale.range([0, width]);

      var xAxis = d3.svg.axis()
        .scale(x)
        .tickValues(x.domain())
        .orient("bottom");

      chart.append("svg")
        .attr("width", "1")
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(0," + 20 + ")");

      chart.append("g")
        .attr("class", "x axis")
        .call(xAxis)
        .attr("transform", "translate(0," + 20 + ")");
    }

    var _drawBands = function() {

      range.forEach(function(b) {

        var value_zero = parseInt(b.range_band[0], 10);
        var value_uno = parseInt(b.range_band[1], 10);

        var random = Math.random().toString(36).replace(
          /[^a-z]+/g, '').substr(0, 5);

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
          .attr("width", Math.floor(scale(value_uno) - 1) -
            Math.floor(scale(value_zero)))
          .attr("y", 24) //to make space for the cursor
          .attr("height", 0)
          .attr("fill", "url(#gradient" + random + ")")
          .transition()
          .duration(600)
          .attr("height", 16)
          .attr("y", 4)

      });

    }

    var _drawMarker = function() {

      var marker = chart.append("circle")
        .attr("class", "dot")
        .attr("r", 0)
        .attr("opacity", 0)
        .attr("cx", function(d) {
          var x = scale(data.test_results[0].test_result.value)
          return x;
        })
        .attr("cy", 12)
        .attr("stroke", "#FFF")
        .attr("stroke-width", 2)
        .style("fill", "#333")
        .style("fill-opacity", .6)
        .transition()
        .duration(1000)
        .delay(600)
        .attr("r", 9)
        .attr("opacity", 1)

      $(marker[0]).on("mouseover", function(d) {
        d3.select(this).transition().duration(200).attr("r",
          11)
      })
      $(marker[0]).on("mouseout", function(d) {
        d3.select(this).transition().duration(200).attr("r",
          9)
      })
    }

    // Public API
    return {
      drawChartComponent: _drawChartComponent
    };

  })();


  /***********************************/
  /* jQuery plugin to visualize data */
  /***********************************/

  $.fn.visualizeRisk = function(data, options) {

    // Extending defaults.
    var settings = $.extend({
      height: 36,
      width: 160,
      leftPadding: 50,
      rightPadding: 50,
      topPadding: 0,
      bottomPadding: 50,
      lineColours: {
        optimal: "#A7C520",
        medium: "#ebc85e",
        high: "#e87352"
      }
    }, options);

    var elements = $(this);
    for (var i = 0; i < elements.length; i += 1) {
      var chart = littleChartBuilder.drawChartComponent(elements[i], data,
        settings);
    }

  };

});
