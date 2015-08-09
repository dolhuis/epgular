'use strict';

angular.module('myApp.view3', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view3', {
    templateUrl: 'view3/view3.html',
    controller: 'View3Ctrl',
    controllerAs: 'view3Ctrl'
  });
}])

.controller('View3Ctrl', ['$http', function($http) {
  var view3data = this;
  view3data.ipAddress = '0.0.0.0';
  $http.get('https://webtv-api.xs4all.nl/2/remoteaddr').success(function(data){
    view3data.ipAddress = data;
  });
}]);