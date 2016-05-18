'use strict';

var services = angular.module('angularServices');

services.factory('HttpService', ['$http', '$q', function ($http, $q) {                 
  var httpService = {};
  
  httpService.getData = function(url) {
	  var deferred = $q.defer();
	  $http({ method: 'GET', url: url }).success(function (data) { deferred.resolve(data); }).error(function (data) { deferred.reject(data); });
	  
	  return deferred.promise;
  };
  
  httpService.postData = function(url, data) {
	  var deferred = $q.defer();
	  $http({ method: 'POST', url: url, data: data }).success(function (data) { deferred.resolve(data); }).error(function (data) { deferred.reject(data); });
	  
	  return deferred.promise;
  };
  
  return httpService;
}]);