(function() {
	"use strict";

	angular.module("smlAppl.webApps.framework.services")
		.provider("infoButton", [
			function() {
				var viewUri = null;

				this.setViewUri = function(uri) {
					viewUri = uri;
				};

				this.$get = [
					function() {
						return new InfoButton(viewUri);
					}
				];
			}
		]);

})();