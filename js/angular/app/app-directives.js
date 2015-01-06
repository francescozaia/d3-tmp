angular.module("app")
  .directive("appDirective", function() {

    return {
      templateUrl: "./templates/lsChart.html",
      restrict: "E",
      scope: {
        chartId: "@" // using the chartId set as HTML attribute to pick the appropriate JSON id
      },
      replace: false,
      link: function (scope, element, attrs) {

        // watches for the parent controller to retrieve the data
        var unwatch = scope.$parent.$watch("responseData", function(responseData) {
          if (angular.isObject(responseData) && angular.isArray(responseData.blood_test_results)) {

            // selecting current data to visualize - value used by template
            scope.responseDataItem = responseData.blood_test_results[scope.chartId];

            // 'initializing' data visualization for the current element
            $("#chart-" + scope.chartId).visualizeRisk(scope.responseDataItem);

            // removing watcher
            unwatch();
          }
        }, true);
      }
    };
  })
  .directive("summaryChartDirective", function() {

    return {
      template: "<div class='summary-chart'></div>",
      restrict: "E",
      scope: {},
      replace: false,
      link: function (scope, element, attrs) {

        // watches for the parent controller to retrieve the data
        var unwatch = scope.$parent.$watch("responseData", function(responseData) {
          if (angular.isObject(responseData) && angular.isArray(responseData.blood_test_results)) {

            $(".summary-chart").createSummary(responseData); // create directive

            // removing watcher
            unwatch();
          }
        }, true);
      }
    };
  })
