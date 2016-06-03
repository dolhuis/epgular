'use strict';

var sort_order = [
	'npo1',
	'npo2',
	'npo3',
	'bbc1',
	'bbc2',
	'bbcfirst',
	'bbcworld',
	'hbo',
	'hbo2',
	'hbo3',
	'een',
	'canvas',
	'ketnet',
	'tv5',
	'cultura24',
	'hollanddoc24',
	'humortv24',
	'best24',
	'history',
	'net5',
	'nos24',
	'24kitchen',
	'eurosport',
	'eurosport2',
	'politiek24',
	'rtl4',
	'rtl5',
	'rtl7',
	'rtl8',
	'sbs6',
	'sbs9',
	'fox',
	'veronica',
	'mtv',
	'mtv24',
	'natgeo',
	'natgeowild',
	'brava',
	'cc',
	'ccextra',
	'ccfamily',
	'cnn',
	'discovery',
	'discoveryscience',
	'discoveryworld',
	'family7',
	'film1action',
	'film1comedy',
	'film1premiere',
	'film1spotlight',
	'film1sundance',
	'foxsports1',
	'foxsports2',
	'foxsports3',
	'foxsports4',
	'foxsports5',
	'iconcerts',
	'jimjam',
	'motorstv',
	'nickelodeon',
	'nickjr',
	'nostalgienet',
	'outtv',
	'pebbletv',
	'slamtv',
	'sport1extra1',
	'sport1extra2',
	'sport1golf',
	'sport1racing',
	'sport1select',
	'sport1voetbal',
	'studio100',
	'tlc',
	'travelchannel',
	'tvoranje',
	'xite',
	'zappelin',
	'101tv',
	'13thstreet',
	'192tv',
	'animalplanet2',
	'babytv',
]


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
				var channels = {};
				for (var attr in data) {
					channels[attr] = {name: data[attr][0].channel_name, key: attr};
				}
				channellist = [];
				for (var channelkey in sort_order) {
					channellist.push(channels[sort_order[channelkey]]);
				}
				unprocessed = false;
			}

			// public
			return {
				async: function () {
					if (! promise || expired()) {
						promise = $http.get('https://epg-api.xs4all.nl/index.php');
						fetchDate = new Date();
						unprocessed = true;
					}

					return promise.then(function(response) {
						if (unprocessed) {
							updateEpg(response.data);
						}
						return true;
					}).catch(function (response) {
						console.log(response.data);
					}).finally(function() {
						console.log('done!');
					});
				},
				getChannels: function () {
					return channellist;
				}
			};
		}]);


