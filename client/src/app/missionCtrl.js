"use strict";
app.controller('missionCtrl', ['$scope', '$http',
	function($scope, $http) {
		$scope.allMissions = [];
		$scope.selectedMission = null;
		$scope.messageText = '';

		$scope.setMission = function(){
			if($scope.selectedMission === ''){
				$scope.messageText = 'Please Select A Mission';
				return false;
			}
			$http.post('/setMission?missionName=' + $scope.selectedMission).then(function(data){
				if(!data){
					$scope.messageText = "Set Mission Error: You're doing it wrong";
					return false;
				}
				//Possibly find a better way to handle the mission setting message
				window.alert("Successfully set mission: " + $scope.selectedMission);
				location.reload();
			});
		};

		$scope.levelSelect = function(){
			$http.get('/mission/level?missionLevel=' + $scope.missionLevel).success(function(data){
				$scope.allMissions = data;
			});
		};
		        
		$http.get('/mission/all').success(function(data){
			$scope.allMissions = data;
        });
	}]
);
