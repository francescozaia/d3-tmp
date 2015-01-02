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
        // declare some default values
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
          if(v){ // Check if you got the value already, you can be more specific like angular.isObject/angular.isArray(v)
            unwatch(); //Remove the watch
            console.log(v);
          }
        });
      }
    };
  });

/*
 angular.module('App')
 .directive('mfMain', function () {

 'use strict';

 return {
 restrict: 'A',
 transclude: true,
 replace: false
 };
 })

 .directive('autoFillSync', function($timeout) {
 return {
 require: 'ngModel',
 link: function(scope, elem, attrs, model) {
 var origVal = elem.val();

 $timeout(function () {
 var newVal = elem.val();
 if(model.$pristine && origVal !== newVal) {
 model.$setViewValue(newVal);
 }
 }, 500);
 }
 };
 });

 */