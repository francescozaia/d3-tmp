var app = angular.module("app", [])
  .constant("test", "test")
  .value("version", "0.1")
  .run(function($rootScope){
    //console.log("test" + $rootScope)
  })
  .filter('dashspace', function () {
    return function (value) {
      return (!value) ? '' : value.replace(/ /g, '-');
    };
  });
