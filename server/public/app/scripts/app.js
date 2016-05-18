'use strict';

angular.module('angularServices', []);
angular.module('angularDirectives', []);

angular
  .module('hubAngularApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'angularServices',
    'angularDirectives',
    'angular-web-notification'
  ])
  .service('authInterceptor', function($q) {
	    var service = this;
	
	    service.responseError = function(response) {
	        if (response.status == 401){
	            window.location = "/#/refresh";
	        }
	        return $q.reject(response);
	    };
	})
  .config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
	  $httpProvider.interceptors.push('authInterceptor');
	  
	$routeProvider
	  .when('/login', {
	    templateUrl: 'views/login.html',
	    controller: 'LoginCtrl',
	    controllerAs: 'loginCtrl'
	  })
	  .when('/dashboard', {
	    templateUrl: 'views/dashboard.html',
	    controller: 'DashboardCtrl',
	    controllerAs: 'dashboardCtrl'
	  })
	  .otherwise({
	    redirectTo: '/login'
	  });
  }]);
