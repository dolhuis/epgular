'use strict';

// Declare app level module which depends on views, and components
angular

		.module('myApp', [
			'ngRoute',
			'myApp.view1',
			'myApp.view2',
			'myApp.view3',
			'myApp.view4',
			'myApp.view5',
			'myApp.version'
		]).

		config(['$routeProvider', function ($routeProvider) {
			$routeProvider.otherwise({redirectTo: '/view1'});
		}]).

		service('EpgService', ['$http', function ($http) {

			// private
			var fetchDate = undefined;
			var unprocessed = true;
			var promise = undefined;
			var channellist = [];

			// private
			var expired = function () {
				return !fetchDate || (new Date() - fetchDate) > 12 * 3600 * 1000;
			}

			var updateEpg = function (data) {
				channellist = [];
				for (var attr in data) {
					channellist.push({name: data[attr][0].channel_name, key: attr});
				}
				unprocessed = false;
			}

			// public
			var myService = {
				async: function () {
					if (! promise || expired()) {
						promise = $http.get('https://epg-api.xs4all.nl/index.php');
						fetchDate = new Date();
						unprocessed = true;
					}
					return promise;
				},
				getChannels: function (response) {
					if (unprocessed) {
						updateEpg(response.data);
					}
					return channellist;
				}
			};

			return myService;
		}]);

