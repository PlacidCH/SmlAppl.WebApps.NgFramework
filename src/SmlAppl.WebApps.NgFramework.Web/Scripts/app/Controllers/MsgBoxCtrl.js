/*
	The modal provides the params content and data.
	All relevant data to be displayed can be packed into data.

	Structure:
		content: 
			{
				title: 'My super title', // localization-key possible, will be translated
				message: 'You are a hero!', // localization-key possible, will be translated
				showCancelBtn: true
			},

		data: 
			{
				mySuperObject: 
					{
						prop1: 'We are superheros.',
						prop2: 1000
					}
			}
*/

(function () {
	"use strict";

	angular.module("smlAppl.webApps.framework.controllers")
		.controller("MsgBoxCtrl", [
			"$scope", "$uibModalInstance", "content", "data",
			function($scope, $uibModalInstance, content, data) {

				$scope.content = content;
				$scope.data = data;

				$scope.ok = function() {
					$uibModalInstance.close($scope.data);
				};

				$scope.cancel = function() {
					$uibModalInstance.dismiss('cancel');
				};

			}
		]);

})();