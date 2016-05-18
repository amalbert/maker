'use strict';

angular.module('hubAngularApp')
  .controller('DashboardCtrl', ['$rootScope', '$scope', '$q', '$routeParams', 'DashboardService',
                     function ($rootScope, $scope, $q, $routeParams, dashboardService) {
	  /*
	  function initWebSockets() {
		  updateChannels().then(function() {
			  ws.connect(namespace, initWebSockets).then(function() {
				  ws.subscribeUsers(namespace, $scope.users, onMessage);
				  ws.subscribeNotifications(namespace, $scope.users.findByEmail(email).name, $scope.users, onMessage);
				  $scope.myChannels.forEach(function(channel) {
					  ws.subscribeChannel(namespace, channel.name, $scope.users, onMessage);
				  });
			  });
		  });
	  }
	  
	  initWebSockets();
	  */
	  
	  dashboardService.getObjects().then(function(objects) {
		 $scope.objects = objects;
	  });
	  
  }]);
