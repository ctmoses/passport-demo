angular.module('passport-demo', ['ngRoute'])
	.config(function($routeProvider, $locationProvider) {
		$routeProvider
			.when('/home', {
				templateUrl: 'angular/templates/home.html'
			})
			.when('/next', {
				templateUrl: 'angular/templates/next.html'
			})
			.otherwise({redirectTo: '/login'});

		$locationProvider.html5Mode({enabled: true, requireBase: false});
	});

authCheck = function($http) {
	$http.get('/checAuth')
	.success(function(auth) {
		return auth;
	})
	.err(function(err) {
		console.log(err);
	});
};