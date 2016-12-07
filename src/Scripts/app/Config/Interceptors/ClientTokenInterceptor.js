(function() {
	"use strict";

	angular.module("smlAppl.webApps.framework.services")
		.service("ClientTokenInterceptor", [
			function() {

				// create a unique guid per client. Will be renewed when hitting F5 or opening a second browser-tab.
				var clientToken = guid();

				this.request = function(config) {

					config.headers = config.headers || {};

					config.headers['Client-Token'] = clientToken;

					return config;
				};

				// source from: http://stackoverflow.com/a/105074
				function guid() {
					function s4() {
						return Math.floor((1 + Math.random()) * 0x10000)
							.toString(16)
							.substring(1);
					}

					return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
						s4() + '-' + s4() + s4() + s4();
				}
			}
		]);
})();