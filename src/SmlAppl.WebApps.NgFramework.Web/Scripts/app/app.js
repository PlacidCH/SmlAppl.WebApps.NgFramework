(function() {
	"use strict";

	angular.module("smlAppl.webApps.framework.controllers", []);
	angular.module("smlAppl.webApps.framework.directives", []);
	angular.module("smlAppl.webApps.framework.components", []);
	angular.module("smlAppl.webApps.framework.filters", []);
	angular.module("smlAppl.webApps.framework.services", []);

	angular.module("smlAppl.webApps.framework", [
		// Custom modules 
		"smlAppl.webApps.framework.controllers",
		"smlAppl.webApps.framework.directives",
		"smlAppl.webApps.framework.components",
		"smlAppl.webApps.framework.filters",
		"smlAppl.webApps.framework.services",

		// ng-framework Custom modules
		"smlAppl.webApps.framework.filterTable",
		"smlAppl.webApps.framework.superAdmin",

		// 3rd Party Modules (in the order of the lib folder names)
		"ui.bootstrap", // angular-bootstrap
		"monospaced.elastic", // angular-elastic
		"ngCookies", // angular-cookies
		"angular-jwt",
		"ngMessages", // angular-messages
		"ngSanitize", // angular-sanitize
		"pascalprecht.translate", // angular-translate
		"ui.router", // angular-ui-router
		"ngNotify",
	]);

})();