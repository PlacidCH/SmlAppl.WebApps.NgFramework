(function() {
	"use strict";

	angular.module("smlAppl.webApps.framework.services")
		.service("Notify", [
			"ngNotify", "$filter",
			function(ngNotify, $filter) {

				this.alertInfo = function(text) {
					setTranslateText(text, "info");
				}

				this.alertSuccess = function(text) {
					setTranslateText(text, "success");
				}

				this.alertError = function(text) {
					alertErrorInternal(text);
				}

				// save

				this.alertSaveSuccess = function () {
					setTranslateText("Msg_Save_Successful", "success");
				}

				this.alertSaveError = function (response) {
					var message = response.statusText;

					if (!message) {
						// no message text, show general error
						message = "Message_Save_Error";
					}

					alertErrorInternal(message);
				}

				// for http actions

				this.alertGetError = function (response) {
					var message = response.statusText;

					if (!message) {
						// no message text, show general error
						message = "Message_DataGet_Error";
					}

					alertErrorInternal(message);
				}

				// helper methods
				
				function alertErrorInternal(text) {
					setTranslateText(text, "error");
				}

				function setTranslateText(text, type) {
					// translate text. If text is not found then it will be returned as is. This is important when not sending any translation-key
					text = $filter("translate")(text);
					ngNotify.set(text, type);
				}
			}
		]);

})();