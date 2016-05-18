'use strict';

var services = angular.module('angularServices');

services.factory('WSService', ['$timeout', '$cookies', '$q', 'ChatService', 'UserService', 'DateService', function ($timeout, $cookies, $q, chatService, userService, dateService) {                 
  var wsService = {email:null};
  var stompClient = null;
  
  wsService.topics = {};
  
  wsService.connect = function(namespace, disconnectCallback) {
	  wsService.email = $cookies.get('access_login');
	  var deferred = $q.defer();
	  var header = { email:wsService.email, namespace:namespace };
	  
	  stompClient && stompClient.disconnect(header);
	  
	  var socketNews = new SockJS('/ws/imall');//?access_token=' + $cookies.get("access_token"));
      stompClient = Stomp.over(socketNews);
      stompClient.debug = null;
      stompClient.connect(header, function(frame) {
    	  console.log('ws connection successful');
    	  deferred.resolve();
      }, function() {
    	  deferred.reject();
    	  wsService.disconnect(namespace);
    	  $timeout(function() { disconnectCallback && disconnectCallback() }, 2000);
      }); 
      
      return deferred.promise;
  };
  
  wsService.isConnected = function() {
	  return stompClient != null;
  };
  
  wsService.subscribe = function(namespace, topic, users, callback) {
	  var subscription = stompClient.subscribe(topic, function(message){
    	  var body = JSON.parse(message.body);
    	  wsService.onMessage(namespace, body, users);
    	  callback && callback(body);
      });
	  console.log('ws subscribed to ' + topic);
	  wsService.topics[topic] = subscription;
	  
	  return subscription;
  };
  
  wsService.unsubscribeChannel = function(namespace, channel) {
	  var topic = '/topic/' + namespace + '/' + channel;
	  wsService.topics[topic].unsubscribe();
	  console.log('ws unsubscribed to ' + topic);
  };
  
  wsService.subscribeChannel = function(namespace, channel, users, callback) {
	  var topic = '/topic/' + namespace + '/' + channel;
	  return wsService.subscribe(namespace, topic, users, callback);
  };
  
  wsService.subscribeUsers = function(namespace, users, callback) {
	  var topic = '/topic/users/' + namespace;
	  return wsService.subscribe(namespace, topic, users, callback);
  };
  
  wsService.subscribeNotifications = function(namespace, userName, users, callback) {
	  var topic = '/topic/' + namespace + '/@' + userName;
	  return wsService.subscribe(namespace, topic, users, callback);
  };
 
  wsService.disconnect = function(namespace) {
	  var header = { email:wsService.email, namespace:namespace };
	  stompClient && stompClient.disconnect(header);
	  stompClient = null;
	  console.log('ws disconnected');
  }
  
  wsService.onMessage = function(namespace, message, users) {
	  console.log(message);
	  switch (message.type) {
	  case 'Chat' :
		  chatService.onMessage(namespace, message, users);
		  break;
	  case 'User' :
		  userService.onMessage(namespace, message, users);
		  break;
	  case 'Notification' :
		  chatService.onNotification(namespace, message, users);
		  break;
	  }
  };
  
  return wsService;
}]);