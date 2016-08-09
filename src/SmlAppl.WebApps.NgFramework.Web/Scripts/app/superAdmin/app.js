(function() {
	"use strict";

    // register superAdmin modules
	angular.module("smlAppl.webApps.framework.superAdmin.controllers", []);
	angular.module("smlAppl.webApps.framework.superAdmin.components", []);
	angular.module("smlAppl.webApps.framework.superAdmin.services", []);


	angular.module("smlAppl.webApps.framework.superAdmin", [
		"smlAppl.webApps.framework.superAdmin.controllers",
		"smlAppl.webApps.framework.superAdmin.components",
		"smlAppl.webApps.framework.superAdmin.services"
	]);

})();