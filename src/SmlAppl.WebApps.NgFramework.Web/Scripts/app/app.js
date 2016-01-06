(function() {
	'use strict';

	angular.module("SmlAppl.WebApps.Framework.Controllers", []);
	angular.module("SmlAppl.WebApps.Framework.Directives", []);
	angular.module("SmlAppl.WebApps.Framework.Filters", []);
	angular.module("SmlAppl.WebApps.Framework.Services", []);

	angular.module('SmlAppl.WebApps.Framework', [
		// Angular modules 
		//'ngRoute'
		//"ui.router",

		// Custom modules 
		"SmlAppl.WebApps.Framework.Controllers",
		"SmlAppl.WebApps.Framework.Directives",
		"SmlAppl.WebApps.Framework.Filters",
		"SmlAppl.WebApps.Framework.Services",

		// 3rd Party Modules
	]);
})();