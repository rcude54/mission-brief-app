"use strict";
app.controller('configCtrl', ['$scope', '$http',
	function($scope, $http) {
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
	}]
);