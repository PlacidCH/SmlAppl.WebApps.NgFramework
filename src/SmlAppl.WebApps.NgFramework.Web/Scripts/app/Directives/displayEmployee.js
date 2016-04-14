/*
	Displays the employees name from its id.
*/

(function() {
	'use strict';

	angular.module('smlAppl.webApps.framework.directives')
		.directive('displayEmployee', [
			"HttpHandler", "Employee",
			function (HttpHandler, Employee) {
				return {
					restrict: "E",
					require: "?ngModel",
					scope: {
						placeholder: "="
					},
					template: "<span ng-if='item.Id'>{{ item.FirstName }} {{ item.LastName }} ({{ item.Pid }})</span>",
					link: function(scope, element, attrs, ctrl) {

						var ngModel = ctrl;
						scope.item = {};

						// Initialize value
						ngModel.$render = function() {
							if (ngModel.$viewValue) {

								Employee.getById(ngModel.$viewValue)
									.then(function(response) {
										scope.item = response;
									}, HttpHandler.handleGetErrorWithNotify);
							}
						}
					}
				}
			}
		]);
})();