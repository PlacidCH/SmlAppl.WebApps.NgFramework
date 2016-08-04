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

				var tmpTitle = title;
				var tmpMessage = message;
				var titleArgs = null;
				var messageArgs = null;

				if (angular.isObject(title)) {
					tmpTitle = title.title;
					titleArgs = title.titleArgs;
				}

				if (angular.isObject(message)) {
					tmpMessage = message.message;
					messageArgs = message.messageArgs;
				}

				if (options) {
					if (options.size) {
						size = options.size;
					}
				}

				var settings = {
					animation: true,
					templateUrl: appConfigFw.uriBaseViews + "MsgBox.tpl.html",
					controller: "MsgBoxCtrl",
					resolve: {
						content: function () { return { title: tmpTitle, titleArgs: titleArgs, message: tmpMessage, messageArgs: messageArgs, showCancelBtn: showCancelBtn }; },
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
					settings.templateUrl = appConfigFw.uriBaseViews + "InputBoxMultiline.tpl.html";
				} else {
					settings.templateUrl = appConfigFw.uriBaseViews + "InputBox.tpl.html";
				}

				return settings;
			}
		}
		]);

})();
