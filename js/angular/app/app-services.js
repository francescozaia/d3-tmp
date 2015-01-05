angular.module("app")
  .factory("appService", ["$http", function ($http) {

    var _getResponseData = function () {
      return $http({
        method: 'GET',
        url: "./js/data.json",
        responseType: 'json'
      });
    };

    return {
      getResponseData: function() {
        return _getResponseData();
      }
    };
  }]);
