var cumulativeRiskChart = (function() {

  var barWidth,
    barHeight,
    margins,
    data,
    lineColours,
    chart,
    scale;

  var _draw = function(_element, _data, settings) {

    data = _data;
    lineColours = settings.lineColours;

    function truncate(str, maxLength, suffix) {
      if(str.length > maxLength) {
        str = str.substring(0, maxLength + 1);
        str = str.substring(0, Math.min(str.length, str.lastIndexOf(" ")));
        str = str + suffix;
      }
      return str;
    }

    var margin = {top: 20, right: 200, bottom: 0, left: 20},
    width = 300,
    height = 200;


    var domain0 = [+new Date("2014-01-01"), +new Date()];





    // var yAxis = d3.svg.axis()
    // .scale(y)
    // .tickSize(width)
    // .tickFormat(formatCurrency)
    // .orient("right");



    var c = d3.scale.category20c(); // ["#3F3931", "#9B8B79", "#B1A08E", "#CFBEA9", "#F2E5D3"];

    var x = d3.time.scale.utc()
    .domain(domain0)
    .range([0, width]);

    var y = d3.scale.linear()
    .domain([0, 100])
    .range([height, 0]);

    var xAxis = d3.svg.axis()
    .scale(x)
    .orient("top");

    // function formatCurrency(d) {
    //   var s = formatNumber(d / 1e6);
    //   return d === y.domain()[1]
    //   ? "$" + s + " million"
    //   : s;
    // }
    // function customAxis(g) {
    //   g.selectAll("text")
    //   .attr("x", 4)
    //   .attr("dy", -4);
    // }
    // var formatNumber = d3.format(".1f");
    // var yAxis = d3.svg.axis()
    // .scale(y)
    // .tickSize(width)
    // .tickFormat(formatCurrency)
    // .orient("right");

    var customTimeFormat = d3.time.format.multi([
      ["%b", function(d) { return d.getMonth(); }],
      ["%Y", function() { return true; }]
      ]);
    var formatYears = d3.time.format("%b");
    xAxis.tickFormat(customTimeFormat);

    var svg = d3.select(_element).append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .style("margin-left", margin.left + "px");


      var domain0 = [+new Date("2013-01-01"), +new Date()];
      var xScale = d3.time.scale.utc()
      .domain(domain0)
      .range([0, width]);

      svg.append("g")
      .attr("height", 0)
      .attr("class", "xaxis axis")
      .call(xAxis)
      .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

      svg.selectAll(".xaxis text")
      .attr("transform", "rotate(-30)");

      // var gy = svg.append("g")
      // .attr("class", "y axis")
      // .call(yAxis)
      // .call(customAxis);




      var btr = data.blood_test_results;


      for (var j = 0; j < btr.length; j++) {

        var g = svg.append("g").attr("class","journal");

        var circles = g.selectAll("circle")
        .data(btr[j].test_results)
        .enter()
        .append("circle");

        var text = g.selectAll("text")
        .data(btr[j].test_results)
        .enter()
        .append("text");

        var rScale = d3.scale.linear()
        .domain([0, d3.max(btr[j].test_results, function(d) { return d.value; })])
        .range([1, 10]);

        circles
        .attr("cx", function(d, i) {
          return xScale(new Date(d.date)) + margin.left;
        })
        .attr("cy", j*30 + 20 + margin.top)
        .attr("r", function(d) { return rScale(d.value); })
        .style("fill", function(d) {


          var x = _.find(btr[j].risk_range, function(rr) {
            return rr.range_band[0] <= d.value && d.value <= rr.range_band[1];
          });

          var lineColours = {
            optimal : "#A7C520",
            medium  : "#EBC85E",
            high    : "#E87352"
          }
          return lineColours[x.value]
        });

        text
        .attr("y", j*30+25+ margin.top)
        .attr("x",function(d, i) { return xScale(new Date(d.date))-5 + margin.left; })
        .attr("class","value")
        .text(function(d){ return d.value; })
        .style("fill", function(d) { return "#666"; }) //c(j); })
        .style("display","none");

        g.append("text")
        .attr("y", j*30+25+ margin.top)
        .attr("x",width+20 + margin.left)
        .attr("class","label")
        .text(btr[j].name + " (" + btr[j].units + ")" )
        .style("fill", function(d) { return "#666"; }) //c(j); })
        .on("mouseover", onMouseover)
        .on("mouseout", onMouseout)
        .on("click", onClick);
      };

      function onMouseover(p) {
        var g = d3.select(this).node().parentNode;
        d3.select(g).selectAll("circle").style("display","none");
        d3.select(g).selectAll("text.value").style("display","block");
      }

      function onMouseout(p) {
        var g = d3.select(this).node().parentNode;
        d3.select(g).selectAll("circle").style("display","block");
        d3.select(g).selectAll("text.value").style("display","none");
      }

      function onClick(p) {

      }

  }

  return {
    draw: _draw
  };

})();
