(function() {

	"use strict";

	angular.module("smlAppl.webApps.framework.filters")
		.filter("chDate", [
			"$filter", function($filter) {
				var angularDateFilter = $filter("date");
				return function(theDate) {
					return angularDateFilter(theDate, "dd.MM.yyyy");
				}
			}
		])
		.filter("chDateTime", [
			"$filter", function($filter) {
				var angularDateFilter = $filter("date");
				return function(theDate) {
					return angularDateFilter(theDate, "dd.MM.yyyy HH:mm:ss");
				}
			}
		]);

})();