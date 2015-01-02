angular.module('App')
  .controller("dataController", [
    '$scope',
    '$http',
    'lsChartService',
    function($scope, $http, $lsChartService) {

    var userDataPromise = $lsChartService.getResponseData();
    userDataPromise.then(function(response){
      $scope.posts = response;
    }, function(error) {
      // TODO
      $log.error("userSessionDetailsPromise rejected: " + error);
    });
  }]);

/*
angular.module('App')
  .controller('AppController', [
    '$scope',
    '$route',
    '$location',
    '$modal',
    '$log',
    'AuthenticationService',
    function( $scope, $route, $location, $modal, $log, $authenticationService) {

      var modalInstance;

      $scope.userDetails = {
        "userdata": false
      };

      var userSessionDetailsPromise = $authenticationService.getSessionDetails();
      userSessionDetailsPromise.then(function(response){
        if (response.data.userdetails && response.data.userdetails.userdata) {

          $log.info("User is logged in.");
          $log.info("Their user name is " + response.data.userdetails.userdata.name + ".");

          var userAccountDetailsPromise = $authenticationService.getAccountDetails();
          userAccountDetailsPromise.then(function (accountResponse) {

            if (accountResponse.data.sites && accountResponse.data.sites.length > 0) {

              $log.info("User has websites.");
              for (var i = 0; i < accountResponse.data.sites.length; i++ ) {
                $log.info("Website name " + accountResponse.data.sites[i].name + ".");
              }

            }
          }, function(error) {
            $log.error("userAccountDetailsPromise rejected: " + error);
          });
          $scope.userDetails = response.data.userdetails;
        } else {

          $log.info("User is NOT logged in.");

          $scope.userDetails.userdata = false;
        }
      }, function(error) {
        // TODO
        $log.error("userSessionDetailsPromise rejected: " + error);
      });


      var modalFactory = function (templateURL) {
        return {
          templateUrl: templateURL,
          controller: ['$scope', '$modalInstance', function ($scope, $modalInstance) {
            $scope.cancel = function () {
              $modalInstance.dismiss('cancel');
            };
          }]
        }
      };

      $scope.go = function(path) {
        $location.path(path);
      };


      $scope.$on('$routeChangeSuccess', function() {

        var path = $location.path();
        $scope.loginVisible = false;
        $scope.registrationVisible = false;
        $scope.forgotPasswordVisible = false;

        if (modalInstance) {
          modalInstance.dismiss('cancel');
        }

        var mappedPath = ['/login', '/forgot-password', '/registration'];

        if (mappedPath.indexOf(path) > -1) {
          modalInstance = $modal.open(modalFactory(path.replace('-','_') + '.html'));
          modalInstance.name = path;
        }

        if (modalInstance) {
          modalInstance.result.then(function () {
            // resolved: modal is closed (with result)
          }, function () {
            // rejected: modal is dismissed (without result)
            if (modalInstance.name === path) {
              $location.path("");
              modalInstance = undefined;
            }

          });
        }

      });
    }]);
  */