"use strict";
app.controller('configCtrl', ['$scope', '$http',
	function($scope, $http) {
		var envName = '';
        $http.get('/environment/name').success(function(data){
			envName = data.name;
		});
		$scope.nameSelect = function(){
			$http.post('/environment/name?name=' + $scope.nameConfig).then(function(reply){
				window.alert(reply.data);
				location.reload();
			},
			function(reply){
				window.alert(reply.data);
				location.reload();
			});
		};
		$scope.setMessage = function(){
			//Result is set to false since this is the typically static message that is sometimes updated
			//Result is true when it's the result from the last mission
			var messageJson = {header: $scope.messageHeader, text: $scope.messageText, env: envName, result: false};
			$http.post('/briefMessage', messageJson).then(function(reply){
				window.alert(reply.data);
			});
		};
	}]
);