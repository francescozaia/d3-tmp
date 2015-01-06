var app = angular.module("app", ['ngRoute'])
  .constant("test", "test")
  .value("version", "0.1")
  .run(function($rootScope, $route, $location){
    console.log("test" + $location)
  })
  .filter('nospace', function () {
    return function (value) {
      return (!value) ? '' : value.replace(/ /g, '-');
    };
  });
