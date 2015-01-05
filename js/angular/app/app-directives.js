angular.module('App')
  .directive('lsChartDirective', function() {
    return {
      templateUrl: './templates/lsChart.html',
      scope: {
        chartId: '@'
      },
      restrict: 'E',
      replace: false,
      controller: function($scope, $element, $attrs, lsChartService){
        $scope.defaultText = 'text';
        lsChartService.getResponseData().success(function (response) {
          $scope.responseData = response;
          $scope.currentData = $scope.responseData[$scope.chartId];
          $scope.description = $scope.responseData[$scope.chartId].description;
          $("#chart-" + $scope.chartId).visualizeRisk($scope.responseData[$scope.chartId]);
        });
      },
      link: function (scope, element, attrs) {
        var unwatch =  scope.$watch('responseData', function(v) {
          // review this watch console.log(angular.isArray(v))
          if(angular.isArray(v)){
            unwatch();
          }
        });
      }
    };
  });
