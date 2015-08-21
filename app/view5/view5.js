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
  var self = this;
  var dayOfMs = 24000*3600;

  self.updatePrograms = function(data) {
    for (var i in data[self.channelId]) {
      var programObject = data[self.channelId][i];
      programObject.time_start = new Date(programObject.time_start);
      programObject.time_end = new Date(programObject.time_end);
      self.programList.push(programObject);
    }
  };

  self.inPast = function(date) {
    return date < self.now;
  };

  self.now = new Date();
  self.channelId = $params.channelId;
  self.programList = [];

  self.focus = $params.date ? new Date(new Date($params.date).getTime()+10800000) : self.now;
  self.previous = new Date(self.focus.getTime()-dayOfMs);
  if (self.previous < new Date()) {
    self.previous = null;
  }
  self.next = new Date(self.focus.getTime()+dayOfMs);

  $http.get('https://epg-api.xs4all.nl/index.php?channel='+self.channelId+'&from='+self.focus.toJSON().substring(0,10)+'T00:00:00&till='+self.next.toJSON().substring(0,10)+'T00:00:00').success(self.updatePrograms);

}]);