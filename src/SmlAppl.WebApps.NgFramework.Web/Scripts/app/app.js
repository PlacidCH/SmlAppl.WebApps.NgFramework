(function() {
	"use strict";

	angular.module("smlAppl.webApps.framework.controllers", []);
	angular.module("smlAppl.webApps.framework.directives", []);
	angular.module("smlAppl.webApps.framework.filters", []);
	angular.module("smlAppl.webApps.framework.services", []);

	angular.module("smlAppl.webApps.framework", [
		// Angular modules 
		//'ngRoute'
		//"ui.router",

		// Custom modules 
		"smlAppl.webApps.framework.controllers",
		"smlAppl.webApps.framework.directives",
		"smlAppl.webApps.framework.filters",
		"smlAppl.webApps.framework.services",

		// ng-framework Custom modules
		"smlAppl.webApps.framework.filterTable",
		
		// 3rd Party Modules
	]);
})();