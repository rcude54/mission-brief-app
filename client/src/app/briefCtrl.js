"use strict";
app.controller('briefCtrl', ['$scope', '$http','$location', 'growl', '$interval',
	function($scope, $http, $location,  growl, $interval) {

		$scope.reload = function(){
			$http.get('/checkStatus').then(function(reply){
				if(reply.data.status){
					$scope.mission = reply.data.mission;
				}
			});
		};
		$scope.reload();
		$interval($scope.reload, 5000);
	}]
);