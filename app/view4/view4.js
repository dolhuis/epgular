'use strict';

angular.module('myApp.view4', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view4', {
    templateUrl: 'view4/view4.html',
    controller: 'View4Ctrl',
    controllerAs: 'view4Ctrl'
  });
}])

.controller('View4Ctrl', ['$http', function($http) {
  var self = this;

  self.updateEpg = function(data) {
    self.channellist = [];
    self.epg = data;
    for (var attr in data) {
      self.channellist.push({name: data[attr][0].channel_name, key: attr})
    }
  };

  self.updateEpg(null);
  $http.get('https://epg-api.xs4all.nl/index.php').success(self.updateEpg);

}]);