(function() {
	"use strict";

	angular.module("smlAppl.webApps.framework.controllers")
		.controller("LoginCtrl", [
			"$scope", "$state", "Authentication", function($scope, $state, Authentication) {
				$scope.loginData = {
					userName: "",
					password: ""
				};

				$scope.errMessage = "";

				$scope.login = function() {

					Authentication.login($scope.loginData).then(function(response) {
							// login successful, forward to home
							$state.go("home");
						},
						function(err) {
							$scope.errMessage = err.error_description;
						});
				};
			}
		]);

})();