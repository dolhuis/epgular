'use strict';

angular.module('myApp.view5', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view5', {
    templateUrl: 'view5/view5.html',
    controller: 'View5Ctrl',
    controllerAs: 'view5Ctrl'
  });
}])

.controller('View5Ctrl', ['$http', '$routeParams', function($http, $params) {
  var $this = this;

  $this.updatePrograms = function(data) {
    for (var program in data[$this.channelId]) {
      $this.programList.push(data[$this.channelId][program])
    }
  }

  $this.channelId = $params.channelId;
  $this.programList = [];

  $http.get('https://epg-api.xs4all.nl/index.php?channel='+$this.channelId).success($this.updatePrograms);

}]);