(function() {

	"use strict";

	angular.module("smlAppl.webApps.framework.filters")
		.filter("decimal", [
			"$filter", function($filter) {
				var angularNumberFilter = $filter("number");
				return function(value, fraction) {
					if (!fraction || !angular.isNumber(fraction)) {
						fraction = 0;
					}

					return angularNumberFilter(value, fraction);
				}
			}
		]);

})();