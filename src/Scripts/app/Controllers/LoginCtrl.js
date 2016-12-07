/*
 * When data.redirectState is defined on the state, this state will be used to redirect.
 * Otherwise a redirect to home will take place.
 */

(function () {
	"use strict";

	angular.module("smlAppl.webApps.framework.controllers")
		.controller("LoginCtrl", [
			"$scope", "$state", "Authentication", "$rootScope", "$location",
			function($scope, $state, Authentication, $rootScope, $location) {
				$scope.loginData = {
					userName: "",
					password: ""
				};

				$scope.errMessage = "";

				var destPath = "";
				if (localStorage.destinationPath && localStorage.destinationPath != "") {
				    // Prepare redirection to the previously attempted url
				    destPath = localStorage.destinationPath;
				    localStorage.destinationPath = "";
				}


				$scope.login = function () {

					Authentication.login($scope.loginData).then(function(response) {
						// login successful
					    if (destPath && destPath != "") {
					        // Redirect to the previously attempted url
					        $location.url(destPath);
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