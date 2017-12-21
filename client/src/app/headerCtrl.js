"use strict";
var envName = '';
app.controller('headerCtrl', ['$scope', '$location', '$http',
	function($scope, $location, $http) {
        $http.get('/environment/name').success(function(data){
            var envName = data.name;
            envName = data.name;
            if($location.url() === '/') {
                $scope.headingText = envName + ' ' + 'Mission';
            } else if($location.url().indexOf('missions') > 0) {
                $scope.headingText = envName + ' ' + 'Mission Configuration';
            } else if($location.url().indexOf('config') > 0) {
                $scope.headingText = envName + ' ' + 'Configuration';
            }
        });
	}]
);
app.value('envName', envName);
