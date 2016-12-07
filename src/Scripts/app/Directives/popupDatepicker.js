(function() {
	"use strict";

	/*
		The normal datepicker from uib displays the calendar. We need an input-box as it will be much smaller.
		To choose a date, the calendar will be popup.
	*/

	angular.module('smlAppl.webApps.framework.directives')
		.directive("popupDatepicker", [
			"appConfigFw", function (appConfigFw) {
				return {
					restrict: "E",
					scope: {
						data: "=ngModel",
						//required: "="
					},
					templateUrl: appConfigFw.uriBaseViews + "PopupDatepicker.tpl.html",

					link: function(scope, element, attrs) {

						scope.required = attrs["ng-required"];


						scope.states = {
							opened: false,
							showValidation: false,
						};

						scope.dateOptions = {
							startingDay: 1
						};

						scope.openCal = function($event) {
							scope.states.opened = true;
						};

					},
				}
			}
		]);

})();