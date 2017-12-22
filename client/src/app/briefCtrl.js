"use strict";
app.controller('briefCtrl', ['$scope', '$http', '$interval',
	function($scope, $http, $interval) {

		$scope.messageHeader = '';
		$scope.messageText = '';

		var envName = '';
        $http.get('/environment/name').success(function(data){
			envName = data.name;
		});

		$scope.reload = function(){
			$http.get('/checkStatus').then(function(missionReply){
				var missionData = missionReply.data;
				if(!missionData.status){
					$scope.mission = missionData.mission;
					$http.get('/briefMessages?env=' + envName).success(function(reply){
						var missionResult = reply[1];
						if(missionResult.text && missionData.previous){
							$scope.missionResult = 'Team ' + missionResult.text + ' won ' + missionData.previous.name + ' mission!!!';
						}
						var message = reply[0];
						$scope.messageHeader = message.header;
						$scope.messageText = message.text;
					});
				}
			});
		};
		$scope.reload();
		$interval($scope.reload, 5000);
	}]
)