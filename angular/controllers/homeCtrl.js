angular.module('passport-demo')
	.controller('HomeCtrl', ['$scope', '$http', function($scope, $http) {
		$scope.user = {};

		$http.get('/user')
			.success(function(err, data) {
				$scope.user = data;
			})
			.error(function(err) {
				console.log(err);
			})
	}]);