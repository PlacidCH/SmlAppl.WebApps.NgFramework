(function() {
	"use strict";

	angular.module("smlAppl.webApps.framework.services")
		.service("AuthInterceptor", [
			"$q", "$injector", "Principal", function($q, $injector, Principal) {

				this.request = function(config) {


					config.headers = config.headers || {};

					//var authData = $cookies.getObject(webAppName + "_token");
					var authData = Principal.getTokenCookie();
					if (authData) {
						config.headers.Authorization = "Bearer " + authData.token;
					}

					return config;
				};

				this.responseError = function(rejection) {

					var isAuthenticated = Principal.isAuthenticated();

					// show login page when user is not authenticated
					if (rejection.status === 401 && !isAuthenticated) {
						// Used injector because of circular reference. See http://stackoverflow.com/a/20230786
						$injector.get("$state").transitionTo("login");
					} else if (rejection.status === 401) {
						// user is authenticated so show forbidden page
						$injector.get("$state").transitionTo("forbidden");
					}

					return $q.reject(rejection);
				};
			}
		]);

})();