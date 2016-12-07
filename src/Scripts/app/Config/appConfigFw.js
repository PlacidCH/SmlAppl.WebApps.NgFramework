(function() {
	'use strict';

	angular.module("smlAppl.webApps.framework")
		.constant("appConfigFw", getAppConfig());


	function getAppConfig() {
	    return {
	        uriBaseViews: "./Views/",
	        uriFilterTableViews: "./FilterTable/Views/",
	        uriSuperAdminViews: "./superAdmin/views/",

			uriFwBaseApi: "apiFw/v01/",
		}
	}

})();