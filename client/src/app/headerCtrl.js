"use strict";
app.controller('headerCtrl', ['$scope', 'env', '$location',
	function($scope, env, $location) {
        var pageText = '';
        if($location.url() === '/') {
            pageText = 'Mission Briefing';
        } else if($location.url().indexOf('missions') > 0) {
            pageText = 'Mission Configuration';
        }
		$scope.headingText = env + ' ' + pageText;
	}]
)