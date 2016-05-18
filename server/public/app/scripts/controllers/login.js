'use strict';

angular.module('hubAngularApp')
  .controller('LoginCtrl', ['$rootScope', '$scope', '$http', '$cookies', '$location', '$timeout', 'UserService', 
                   function ($rootScope, $scope, $http, $cookies, $location, $timeout, userService) {

	  $scope.login = function() {
    	if (userService.login($scope.user.email, $scope.user.password)) {
            window.location.href="/#/dashboard";
        };   
    };
   
  }]);
