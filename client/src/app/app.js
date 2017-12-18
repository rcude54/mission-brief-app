'use strict';

/* defining the app */
var app = angular
	.module('app', ['ngRoute','ngResource', 'angular-growl'])
	.config(function($routeProvider, growlProvider) {
		growlProvider.globalTimeToLive(5000);
	    $routeProvider
				.when('/',
					{templateUrl: 'app/brief.html'},
					{controller: 'briefCtrl.js'}
				)
				.when('/config',
					{templateUrl: 'app/config.html'},
				{controller: 'configCtrl.js'}
				)
				.when('/missions',
					{templateUrl: 'app/missions.html'},
					{controller: 'missionCtrl.js'}
				)
				.otherwise({redirectTo: '/'});
	});
app.value('briefMessage', {header: 'Merp', text: 'Derp'});
app.constant('env', 'House');