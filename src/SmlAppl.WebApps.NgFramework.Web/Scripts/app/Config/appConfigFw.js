(function() {
	'use strict';

	angular.module("smlAppl.webApps.framework")
		.constant("appConfigFw", getAppConfig());


	function getAppConfig() {
	    return {
	        uriBaseViews: "wwwroot/Views/",
	        uriFilterTableViews: "wwwroot/FilterTable/Views/",
	        uriSuperAdminViews: "wwwroot/superAdmin/views/",

			uriFwBaseApi: "apiFw/v01/",
		}
	}

})();