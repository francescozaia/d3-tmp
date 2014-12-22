$(function() {

  var feature = (function() {

    var width,
      height,
      leftPadding,
      rightPadding,
      topPadding,
      bottomPadding,
      element,
      units,
      range,
      data;

    var chart;
    var scale;

    var privateThing = "secret";
    var publicThing = "not secret";


    var lineColors = {
        optimal: "#3bbec0",
        medium: "#ebc85e",
        high: "#e87352"
      },
      gradientColors = {
        optimal: ["#56a307", "#60b609"],
        medium: ["#e19825", "#f3a124"],
        high: ["#d54705", "#dd4c0b"]
      },
      strokeColors = {
        optimal: "#3bbec0",
        medium: "#ebc85e",
        high: "#e87352"
      };

    var chartComponent = function(_data, _width, _height,
      _leftPadding, _rightPadding, _topPadding, _bottomPadding,
      _element) {
      data = _data;
      width = _width;
      height = _height;
      leftPadding = _leftPadding;
      rightPadding = _rightPadding;
      topPadding = _topPadding;
      bottomPadding = _bottomPadding;
      element = _element[0];
      if (element.className.indexOf("chart-body-mass") > 0) {
        data = data.subcategories[0].markers[0];
        units = data.units;
        range = data.risk_range_new;
      } else {
        data = data.subcategories[0].markers[1];
        units = data.units;
        range = data.risk_range_new;
      }



      scale = d3.scale.linear();
      scale.domain([0, 100]); // my max range value is always 100

      scale.range([0, width]); // my chart width is 350

      console.log("uno" + scale(10)); //Returns 10
      console.log("uno" + scale(100)); //Returns 350
      console.log("uno" + scale(50)); //Returns 175

      draw();

    };

    var draw = function() {
      chart = d3.select(element)
        .append("svg:svg")
        .attr("class", "chart") //redundant?
        .attr('width', width)
        .attr('height', height);
      //var data = d3.range(51);


      var o = d3.scale.ordinal()
        .domain([1, 2, 3, 4])
        .rangeRoundPoints([0, 100]);

      var data = o.range(); // [1, 34, 67, 100]

      var x = d3.scale.ordinal()
        .domain(data)
        .rangeBands([0, width])

      var colors = d3.scale.category20()

      /*
      chart.selectAll('rect.example1')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'example1')
        .style('fill', colors)
        .attr('x', function(d) {
          return x(d)
        })
        .attr('y', 50)
        .attr('width', Math.round(x.rangeBand()))
        .attr('height', 50);
        */

      drawBands();
    }

    var drawBands = function() {

      range.forEach(function(b) {

        var value_zero = parseInt(b.range_band[0], 10);
        var value_uno = parseInt(b.range_band[1], 10);

        chart.append("svg:line")
          .attr("class", "rangeBand")
          .attr("x1", Math.floor(scale(value_zero)))
          .attr("x2", Math.floor(scale(value_uno) - 1))
          .attr("y1", 0) //to make space for the cursor
          .attr("y2", 0)
          .attr("stroke", lineColors[b.value])
          .attr("stroke-width", 40)


      });


      /*
      var ddd = chart.append("circle")
        .attr("class", "dot")
        .attr("r", 10)
        .attr("cx", function(d) {
          return 15;
        })
        .attr("cy", function(d) {
          return 20;
        })
        .attr("stroke", "#FFF")
        .attr("stroke-width", 2)
        .style("fill", function(d) {
          return "#61aaca";
        })
        .transition()
        .duration(1000)
        .delay(2000)
        .attr("cx", function(d) {
          var x = scale(data.test_results[0].test_result.value)
          return x;
        })

      $(ddd[0]).on("click", function(d) {

      })
      */
      var cursor = chart.append('rect')
        .attr('class', 'example1')
        .attr("stroke", "#FFF")
        .attr("stroke-width", 2)
        .style('fill', "#666")
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', 10)
        .attr('height', 20)
        .transition()
        .duration(1000)
        .delay(2000)
        .attr('x', function(d) {
          var x = scale(data.test_results[0].test_result.value)
          return x;
        })
    }

    var sayPrivateThing = function() {
      console.log(privateThing);
      changePrivateThing();
    };

    // Public API
    return {
      chartComponent: chartComponent,
      publicThing: publicThing
    };
  })();

  /* Dataviz */


  $.fn.visualizeRisk = function(data, options) {


    // Extending defaults.
    var settings = $.extend({
      color: "#556b2f",
      backgroundColor: "white"
    }, options);



    var _element = $(this),
      _data = data,
      _height = 30,
      _width = 200,
      _leftPadding = 50,
      _rightPadding = 50,
      _topPadding = 0,
      _bottomPadding = 50,

      _chart = feature.chartComponent(_data, _width, _height,
        _leftPadding, _rightPadding, _topPadding, _bottomPadding,
        _element);
  };

  d3.json("./js/data.json", function(error, json) {

    if (error) {
      return console.warn(error);
    }
    var data = json;

    var rangeBands = [];
    var options = {};

    $(".chart-body-mass").visualizeRisk(data, options);
    $(".chart-weight").visualizeRisk(data, options);
  });



});
