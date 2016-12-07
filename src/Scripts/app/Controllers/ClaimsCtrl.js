(function() {
	"use strict";

	angular.module("smlAppl.webApps.framework.controllers")
		.controller("ClaimsCtrl", [
			"$scope", "Authentication", "Principal",
			function ($scope, Authentication, Principal) {

				Authentication.claims()
					.then(function (response) {
					$scope.claims = response;
				});

				$scope.roles = Principal.roles();
			}
		]);

})();