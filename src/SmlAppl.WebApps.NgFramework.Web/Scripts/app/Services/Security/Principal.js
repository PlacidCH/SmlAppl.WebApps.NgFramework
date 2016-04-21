// http://stackoverflow.com/questions/22537311/angular-ui-router-login-authentication/22540482#22540482

(function () {
	"use strict";

	angular.module("smlAppl.webApps.framework.services")
		.service("Principal", [
			"$q", "$timeout", "appConfig", "$rootScope", "jwtHelper", "$cookies",
			function($q, $timeout, appConfig, $rootScope, jwtHelper, $cookies) {

				var cookieTokenName = webAppName + "_token";

				var self = this;

				var _identity = {
					userName: "",
					roles: [],
					//expiration: null, // epoch / unix timestamp
					//employeeId: null
				};
				var _authenticated = false;


				// service functions

				this.isIdentityResolved = function() {
					return angular.isDefined(_identity);
				};

				this.roles = function() {
					return _identity.roles;
				};

				this.userName = function() {
					if (!_identity) {
						return null;
					}

					return _identity.userName;
				};

				this.isAuthenticated = function() {
					// cookie will automatically be deleted once it's expired
					if (self.getTokenCookie()) {
						_authenticated = true;
						return true;
					} else {
						_authenticated = false;
						return false;
					}
				};

				this.isExpired = function() {
					//var token = $cookies.getObject(cookieTokenName);

					//if (token) {
					//	return true;
					//}
					//var tokenDecoded = jwtHelper.decodeToken(getTokenCookie());

					//if (!_identity.expiration) {
					//	return false;
					//}

					//return _identity.expiration <= moment().unix();

					// should be possible to deleted as isAuthenticated returns false when token is expired!
					return false;
				};

				this.isAdmin = function() {
					if (!_authenticated) return false;

					return _identity.roles.indexOf(appConfig.rights.admin) !== -1;
				};

				this.isInRole = function(role) {
					if (!_authenticated || !_identity.roles) return false;

					if (this.isAdmin()) {
						return true;
					}

					return _identity.roles.indexOf(role) !== -1;
				};

				this.isInAnyRole = function(roles) {
					if (!_authenticated || !_identity.roles) return false;

					for (var i = 0; i < roles.length; i++) {
						if (this.isInRole(roles[i])) return true;
					}

					return false;
				};

				this.authenticate = function(token) {
					var tokenDecoded = jwtHelper.decodeToken(token);

					var userName = tokenGetUserName(tokenDecoded);

					self.setTokenCookie(token);

					// lower-case the rights
					var roles = [];
					angular.forEach(tokenDecoded.role, function(item) {
						roles.push(item.toLowerCase());
					});

					var identity = {
						userName: userName,
						roles: roles,
						//expiration: tokenDecoded.exp,
						//employeeId: employeeId
					}

					_identity = identity;
					_authenticated = true;

					$rootScope.$broadcast("onPrincipalChanged");
				};

				this.logOut = function () {
					$cookies.remove(cookieTokenName, { path: "/" });

					_identity = {
						userName: "",
						roles: []
					};
					_authenticated = false;

					$rootScope.$broadcast("onPrincipalChanged");
				};

				this.identity = function(force) {
					var deferred = $q.defer();

					console.log("force: " + force);
					if (force === true) {
						console.log("Forced!");
						_identity = undefined;
					}

					// check and see if we have retrieved the identity data from the server. if we have, reuse it by immediately resolving
					if (angular.isDefined(_identity)) {
						deferred.resolve(_identity);

						return deferred.promise;
					}

					return deferred.promise;
				};

				this.setTokenCookie = function(token) {

					var tokenDecoded = jwtHelper.decodeToken(token);

					var userName = tokenGetUserName(tokenDecoded);
					var employeeId = tokenGetEmployeeId(tokenDecoded);

					$cookies.putObject(cookieTokenName,
						{ token: token, userName: userName, expiration: tokenDecoded.exp, employeeId: employeeId },
						{ path: "/", expires: moment.unix(tokenDecoded.exp).format() }
					);
				};

				this.getTokenCookie = function() {
					return $cookies.getObject(cookieTokenName);
				};


				// Helper functions
				function tokenGetEmployeeId(tokenDecoded) {
					return tokenDecoded["http://sml.zhaw.ch/2013/07/identity/claims/employeeid"];
				}

				function tokenGetUserName(tokenDecoded) {
					return tokenDecoded["unique_name"];
				}
			}
		]);
})();