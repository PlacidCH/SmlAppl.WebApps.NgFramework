/*
	Gives a textarea the ability to autogrowth
	From: http://stackoverflow.com/questions/17772260/textarea-auto-height

	Usage: <textarea elastic ng-model="someProperty"></textarea>
*/

(function() {
	'use strict';

	angular.module('SmlAppl.WebApps.Framework.Directives')
		.directive('elastic', [
			'$timeout',
			function($timeout) {
				return {
					restrict: 'A',
					link: function ($scope, element) {
						// scroll-bar ist not needed because we have auto-height now
						element[0].style.overflowY = "hidden";

						$scope.initialHeight = $scope.initialHeight || element[0].style.height;
						var resize = function() {
							element[0].style.height = $scope.initialHeight;
							element[0].style.height = "" + element[0].scrollHeight + "px";
						};
						element.on("input change", resize);
						$timeout(resize, 0);
					}
				};
			}
		]);
})();