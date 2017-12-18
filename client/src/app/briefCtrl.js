"use strict";
app.controller('briefCtrl', ['$scope', '$http', '$window', 'growl', '$interval', 'briefMessage',
	function($scope, $http, $window,  growl, $interval, briefMessage) {
		$scope.messageHeader = briefMessage.header;
		$scope.messageText = briefMessage.text;

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
)