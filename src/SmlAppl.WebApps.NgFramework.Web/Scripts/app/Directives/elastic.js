/*
	Gives a textarea the ability to autogrowth
	From: http://stackoverflow.com/questions/17772260/textarea-auto-height

	Usage: <textarea elastic ng-model="someProperty"></textarea>
*/

(function() {
	'use strict';

	angular.module('smlAppl.webApps.framework.directives')
		.directive('elastic', [
			'$timeout',
			function($timeout) {
				return {
					restrict: 'A',
					link: function ($scope, element) {
						// scroll-bar is not needed because we have auto-height now
						element[0].style.overflowY = "hidden";

						$scope.initialHeight = 30;

						$scope.initialHeight = $scope.initialHeight || element[0].style.height;
						var resize = function() {
							element[0].style.height = $scope.initialHeight;

							var scrollHeight = element[0].scrollHeight;
							if (scrollHeight === 0) {
								// when input is not visible, scrollHeight is 0
								scrollHeight = 30;
							}

							element[0].style.height = "" + scrollHeight + "px";
						};
						element.on("input change", resize);
						$timeout(resize, 0);
					}
				};
			}
		]);
})();