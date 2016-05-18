'use strict';

var services = angular.module('angularServices');

services.factory('DashboardService', ['$q', 'HttpService', function ($q, http) {                 
  var dashboardService = {};
  
  dashboardService.getObjects = function() {
	  var deferred = $q.defer();
	  http.getData('/api/objects/').then(function(data) {
		  deferred.resolve(data);
	  }).catch(function() { deferred.reject(); });
	  
	  return deferred.promise;
  };
  
  return dashboardService;
}]);