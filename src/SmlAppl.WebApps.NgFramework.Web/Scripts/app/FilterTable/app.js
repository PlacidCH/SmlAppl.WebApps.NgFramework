(function() {
	"use strict";

	// register FilterTable modules
	angular.module("smlAppl.webApps.framework.filterTable.controllers", []);
	//angular.module("smlAppl.webApps.framework.filterTable.filters", []);
	//angular.module("smlAppl.webApps.framework.filterTable.services", []);
	angular.module("smlAppl.webApps.framework.filterTable.directives", []);


	angular.module("smlAppl.webApps.framework.filterTable", [
		"smlAppl.webApps.framework.filterTable.controllers",
		//"smlAppl.webApps.framework.filterTable.filters",
		//"smlAppl.webApps.framework.filterTable.services",
		"smlAppl.webApps.framework.filterTable.directives"
	]);

})();