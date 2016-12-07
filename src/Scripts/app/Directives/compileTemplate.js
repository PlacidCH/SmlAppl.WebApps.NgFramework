/*
 * Used to compile html fragments bound with html-bind.
 */

(function () {
	"use strict";

	angular.module("smlAppl.webApps.framework.directives")
		.directive('compileTemplate', ["$compile", "$parse", function ($compile, $parse) {
		    return {
		        link: function (scope, element, attr) {
		            var parsed = $parse(attr.ngBindHtml);

		            var boundScope = scope;
		            if (angular.isDefined(attr.compileScope)) {
		                boundScope = $parse(attr.compileScope)(scope);
		            }

		            function getStringValue() { return (parsed(boundScope) || '').toString(); }

		            //Recompile if the template changes
		            scope.$watch(getStringValue, function () {
		                $compile(element, null, -9999)(boundScope);  //The -9999 makes it skip directives so that we do not recompile ourselves
		            });
		        }
		    }
		}]);
})();