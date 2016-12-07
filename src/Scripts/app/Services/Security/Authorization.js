(function() {
	"use strict";

	angular.module("smlAppl.webApps.framework.services")
		.factory("Authorization", [
			"$rootScope", "$state", "Principal",
			function($rootScope, $state, Principal) {
				return {
					authorize: function() {
						return Principal.identity()
							.then(function() {
								var isAuthenticated = Principal.isAuthenticated();
								var isExpired = Principal.isExpired();

								if (isAuthenticated && isExpired && $rootScope.toState.name !== "login") {
									// user-token is expired so go to login-page (check toState != "login" because of circular reference)
									$state.go("login");
								}

								if ($rootScope.toState.data && $rootScope.toState.data.roles && $rootScope.toState.data.roles.length > 0 && !Principal.isInAnyRole($rootScope.toState.data.roles)) {

									console.log("Is in any role: " + Principal.isInAnyRole($rootScope.toState.data.roles));

									if (isAuthenticated) {
										$state.go("forbidden"); // user is signed in but not authorized for desired state
									} else {
										// user is not authenticated. stow the state they wanted before you
										// send them to the signin state, so you can return them when you're done
										$rootScope.returnToState = $rootScope.toState;
										$rootScope.returnToStateParams = $rootScope.toStateParams;

										// now, send them to the signin state so they can log in
										$state.go("login");
									}
								}
							});
					}
				};
			}
		]);

})();