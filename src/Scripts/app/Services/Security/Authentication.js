﻿(function() {
	"use strict";

	angular.module("smlAppl.webApps.framework.services")
		.service("Authentication", [
			"$http", "$q", "appConfig", "HttpHandler", "Principal", "jwtHelper", "$cookies", function
			($http, $q, appConfig, HttpHandler, Principal, jwtHelper, $cookies) {

				var self = this;

				var serviceBase = "oauth/";

				// service functions

				this.login = function(loginData) {

					var data = "grant_type=password&username=" + encodeURIComponent(loginData.userName) + "&password=" + encodeURIComponent(loginData.password);

					var deferred = $q.defer();

					$http.post(serviceBase + "token", data, { headers: { 'Content-Type': "application/x-www-form-urlencoded" } }).then(function(successResponse) {
						Principal.authenticate(successResponse.data.access_token);
						deferred.resolve(successResponse.data);

					}, function(errorResponse) {
						self.logOut();
						deferred.reject(errorResponse.data);
					});

					return deferred.promise;

				};

				this.logOut = function() {
					Principal.logOut();
				};

				this.fillAuthData = function() {

					var authData = Principal.getTokenCookie();
					if (authData) {
						Principal.authenticate(authData.token);
					}

				}

				this.claims = function() {
					var request = $http.get(appConfig.uriBaseApi + "Claims");
					return request.then(HttpHandler.handleSuccess, HttpHandler.handleGetErrorWithNotify);
				};

				this.roles = function() {
					var request = $http.get(appConfig.uriBaseApi + "Claims/GetRoles");
					return request.then(HttpHandler.handleSuccess, HttpHandler.handleGetErrorWithNotify);
				}
			}
		]);
})();