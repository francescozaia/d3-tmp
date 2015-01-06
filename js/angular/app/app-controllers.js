angular.module("app")
  .controller("AppController", ["$scope", "appService", function($scope, $appService) {

    var userDataPromise = $appService.getResponseData();
    userDataPromise.then(function(response) {
      if (true) {
        $scope.responseData = response.data;
        
      } else {
        $log.error("response not correct");
      }
    }, function(error) {
      $log.error("userDataPromise rejected: " + error);
    });

  }]);
