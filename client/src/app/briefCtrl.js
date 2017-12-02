"use strict"
app.controller('briefCtrl', [ '$scope', '$http','$location', 'growl',
	function($scope, $http, $location,  growl){

		$scope.reload = function(){
			$http.get('/checkStatus').then(function(reply){
				if(reply.data.status){
					var mission = reply.data.mission;
					setTimeout($scope.reload(), 50000);
					$scope.missionName = mission.name;
					$scope.missionTagline = mission.tagline;
					return;
				}
				location.reload();
			});
		};
		setTimeout($scope.reload(), 50000);
	}]
);