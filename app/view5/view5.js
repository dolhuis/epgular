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
  var dayOfMs = 24000*3600;

  $this.updatePrograms = function(data) {
    for (var i in data[$this.channelId]) {
      var programObject = data[$this.channelId][i];
      programObject.time_start = new Date(programObject.time_start);
      programObject.time_end = new Date(programObject.time_end);
      $this.programList.push(programObject);
    }
  };

  $this.inPast = function(date) {
    return date < $this.now;
  };

  $this.now = new Date();
  $this.channelId = $params.channelId;
  $this.programList = [];

  $this.focus = $params.date ? new Date(new Date($params.date).getTime()+10800000) : $this.now;
  $this.previous = new Date($this.focus.getTime()-dayOfMs);
  if ($this.previous < new Date()) {
    $this.previous = null;
  }
  $this.next = new Date($this.focus.getTime()+dayOfMs);

  $http.get('https://epg-api.xs4all.nl/index.php?channel='+$this.channelId+'&from='+$this.focus.toJSON().substring(0,10)+'T00:00:00&till='+$this.next.toJSON().substring(0,10)+'T00:00:00').success($this.updatePrograms);

}]);