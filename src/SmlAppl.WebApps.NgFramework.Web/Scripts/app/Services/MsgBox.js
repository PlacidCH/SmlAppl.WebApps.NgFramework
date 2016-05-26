/*
 * Size: sm, md, lg and fullscreen
 */

(function () {
	"use strict";

	angular.module("smlAppl.webApps.framework.services")
		.service("MsgBox", [
		"$uibModal", "appConfigFw",
		function ($uibModal, appConfigFw) {
			
			// build settings because of dynamic content
			function getSettings(title, message, showCancelBtn, options, data) {
				var size = "";

				if (options) {
					if (options.size) {
						size = options.size;
					}
				}

				var settings = {
					animation: true,
					templateUrl: appConfigFw.uriBaseViews + "msgBox.tpl.html",
					controller: "MsgBoxCtrl",
					resolve: {
						content: function() { return { title: title, message: message, showCancelBtn: showCancelBtn }; },
						data: function() { return data; }
					}
				};

				if (size.toLowerCase() === "fullscreen") {
					settings.windowClass = "modal-dialog-fullscreen";
				} else {
					settings.size = size;
				}

				return settings;
			}


			this.confirm = function (title, message, options) {
				var modalInstance = $uibModal.open(getSettings(title, message, true, options));
				return modalInstance.result;
			}

			this.alert = function (title, message, options) {
				var modalInstance = $uibModal.open(getSettings(title, message, false, options));
				return modalInstance.result;
			}

			// Input

			this.input = function (title, message, options) {
				var modalInstance = $uibModal.open(getSettingsForInput(title, message, options, false));
				return modalInstance.result;
			}

			this.inputMultiline = function (title, message, options) {
				var modalInstance = $uibModal.open(getSettingsForInput(title, message, options, true));
				return modalInstance.result;
			}

			function getSettingsForInput(title, message, options, isMultiline) {
				var settings = getSettings(title, message, true, options, { inputText: null });

				if (isMultiline) {
					settings.templateUrl = appConfigFw.uriBaseViews + "inputBoxMultiline.tpl.html";
				} else {
					settings.templateUrl = appConfigFw.uriBaseViews + "inputBox.tpl.html";
				}

				return settings;
			}
		}
		]);

})();
