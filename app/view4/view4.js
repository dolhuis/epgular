'use strict';

angular

		.module('myApp.view4', ['ngRoute'])

		.config(['$routeProvider', function ($routeProvider) {
			$routeProvider.when('/view4', {
				templateUrl: 'view4/view4.html',
				controller: 'View4Ctrl',
				controllerAs: 'view4Ctrl'
			});
		}])

		.controller('View4Ctrl', ['EpgService', function (EpgService) {
			var me = this;

			// public
			me.channellist = [];

			me.refreshData = function () {
				EpgService.async().then(function (response) {
					me.channellist = EpgService.getChannels(response);
				});
			};

			// init
			me.refreshData();
		}]);