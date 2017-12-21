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
			$http.get('/checkStatus').then(function(reply){
				if(!reply.data.status){
					$scope.mission = reply.data.mission;
					$http.get('/briefMessages?env=' + envName).success(function(reply){
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