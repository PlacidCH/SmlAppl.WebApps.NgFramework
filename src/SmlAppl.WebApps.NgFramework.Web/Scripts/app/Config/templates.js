angular.module('smlAppl.webApps.framework').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('wwwroot/Views/PopupDatepicker.tpl.html',
    "<div class=\"input-group\">\r" +
    "\n" +
    "	<input type=\"text\" id=\"datepicker\" name=\"datepicker\" class=\"form-control\" uib-datepicker-popup=\"dd.MM.yyyy\" ng-model=\"data\" is-open=\"states.opened\" min-date=\"minDate\" max-date=\"maxDate\" datepicker-options=\"dateOptions\" ng-required=\"required\" close-text=\"Close\" />\r" +
    "\n" +
    "	<span class=\"input-group-btn\">\r" +
    "\n" +
    "		<button type=\"button\" class=\"btn btn-default\" ng-click=\"openCal($event)\"><i class=\"glyphicon glyphicon-calendar\"></i></button>\r" +
    "\n" +
    "	</span>\r" +
    "\n" +
    "</div>"
  );

}]);
