'use strict';

var services = angular.module('angularServices');

services.factory('UserService', ['$q', '$http', '$httpParamSerializer', 'HttpService', function ($q, $http, $httpParamSerializer, http) {                 
  var userService = {};
  userService.users = {};
  
  userService.login = function(email, password) {
  	return (email == 'anthony.malbert@gmail.com' && password == '')
  };
  
  return userService;
}]);