/*
 * The path of the InfoButtons must be specified with the infoButtonProvider.setViewUri().
 */

(function () {
	"use strict";

	angular.module("smlAppl.webApps.framework.directives")
		.directive("infoButton", [
			"$sce", "HttpHandler", "$http", "MsgBox", "$translate", "infoButton",
			function ($sce, HttpHandler, $http, MsgBox, $translate, infoButton) {
				return {
					restrict: "E",
					scope: {
						content: "=?"
					},
					template: '<button ng-click="show()" class="btn btn-info btn-xs info-button" type="button"><i class="fa fa-question"></i></button>',
					link: function (scope, element, attrs) {

						var contentFile = attrs["contentFile"];
						
						scope.show = function () {
							if (contentFile) {
								showInfoFile(contentFile);
							} else {
								showInfoContent(scope.content);
							}
						}

						function showInfoContent(content) {
							MsgBox.alert("Info", content, { size: "lg" });
						}

						function showInfoFile(fileName) {
							var requestForLang = getInfoHtmlForLang(fileName);

							requestForLang.then(function (response) {
								return response;
							}, function (response) {
								// the file for this lang doesn't exist, take the default
								var filePath = infoButton.viewUri + "/" + fileName;

								return $http.get(filePath)
									.then(HttpHandler.handleSuccess, HttpHandler.handleError);
							})
								.then(function (response) {
									// show the msgbox with the content
									showInfoContent(response);
								});
						}

						function getInfoHtmlForLang(fileName) {
							var currentLang = $translate.use();

							var filePath = infoButton.viewUri + "/" + currentLang + "/" + fileName;

							return $http.get(filePath)
								.then(HttpHandler.handleSuccess, HttpHandler.handleError);
						}
					},
				};
			}
		]);

})();