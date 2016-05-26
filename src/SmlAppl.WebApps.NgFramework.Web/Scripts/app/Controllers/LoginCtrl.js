/*
 * When data.redirectState is defined on the state, this state will be used to redirect.
 * Otherwise a redirect to home will take place.
 */

(function () {
	"use strict";

	angular.module("smlAppl.webApps.framework.controllers")
		.controller("LoginCtrl", [
			"$scope", "$state", "Authentication", "$rootScope",
			function($scope, $state, Authentication, $rootScope) {
				$scope.loginData = {
					userName: "",
					password: ""
				};

				$scope.errMessage = "";

				$scope.login = function() {

					Authentication.login($scope.loginData).then(function(response) {
							// login successful

							if ($rootScope.toState.data && $rootScope.toState.data.redirectState) {
								// Redirect state is defined -> go to the state defined
								$state.go($rootScope.toState.data.redirectState);
							} else {
								// no redirect defined -> go to home
								$state.go("home");
							}
						},
						function(err) {
							$scope.errMessage = err.error_description;
						});
				};
			}
		]);

})();