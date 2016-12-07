(function () {
	"use strict";

	angular.module("smlAppl.webApps.framework.services")
		.service("LangInterceptor", [
			"$q", "$injector",
			function ($q, $injector) {

				this.request = function (config) {


					config.headers = config.headers || {};
					config.headers["Accept-Language"] = $injector.get("$translate").use();

					return config;
				};
			}
		]);
})();