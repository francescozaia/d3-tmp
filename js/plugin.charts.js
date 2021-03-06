$(function() {

  /***********************************/
  /* jQuery plugin to visualize data */
  /***********************************/

  $.fn.createSingleResultChart = function(data, options) {

    var _options = options ? options : {};

    // Extending default options.
    var settings = $.extend({
      barHeight : 16,
      barWidth  : 160,
      margins   : {
        left: 16,
        right: 16,
        top: 16,
        bottom: 32
      },
      lineColours: {
        optimal : "#60CD9B",
        medium  : "#EBC85E",
        high    : "#E87352"
      }
    }, _options);

    // Applying the function to all input elements
    var elements = $(this);

    for (var i = 0; i < elements.length; i += 1) {
      singleResultChart.draw(elements[i], data, settings);
    }

  };

  $.fn.createSummaryChart = function(data, options) {

    var _options = options ? options : {};

    // Extending default options.
    var settings = $.extend({
      chartHeight : 200, // make this dynamic?
      chartWidth  : 360,
      margins     : {
        left: 24,
        right: 200,
        top: 24,
        bottom: 24
      },
      lineColours: {
        optimal : "#60CD9B",
        medium  : "#EBC85E",
        high    : "#E87352"
      }
    }, _options);

    // Applying the function to all input elements
    var elements = $(this);

    for (var i = 0; i < elements.length; i += 1) {
      summaryChart.draw(elements[i], data, settings);
    }

  };



});
