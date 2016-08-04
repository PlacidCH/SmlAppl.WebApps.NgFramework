angular.module('smlAppl.webApps.framework').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('wwwroot/Views/InputBoxMultiline.tpl.html',
    "<div>\r" +
    "\n" +
    "	<div class=\"modal-header\">\r" +
    "\n" +
    "		<h3 class=\"modal-title\">{{ content.title | translate }}</h3>\r" +
    "\n" +
    "	</div>\r" +
    "\n" +
    "	<div class=\"modal-body\">\r" +
    "\n" +
    "		<span ng-bind-html=\"content.message | translate \"></span>\r" +
    "\n" +
    "		<textarea class=\"form-control msd-elastic\" ng-model=\"data.inputText\"></textarea>\r" +
    "\n" +
    "	</div>\r" +
    "\n" +
    "	<div class=\"modal-footer\">\r" +
    "\n" +
    "		<button class=\"btn btn-primary\" type=\"button\" ng-click=\"ok()\">{{ \"View_Button_Ok\" | translate }}</button>\r" +
    "\n" +
    "		<button class=\"btn btn-warning\" type=\"button\" ng-click=\"cancel()\" ng-if=\"content.showCancelBtn\">{{ \"View_Button_Cancel\" | translate }}</button>\r" +
    "\n" +
    "	</div>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('wwwroot/Views/Login.html',
    "<!-- Paths to Content and bower_components are according to the WebApp-paths, not the paths from the ng-framework -->\r" +
    "\n" +
    "<link href=\"Content/css/login.css\" rel=\"stylesheet\" />\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div class=\"container-fluid\" ng-controller=\"LoginCtrl\">\r" +
    "\n" +
    "	<div class=\"login\">\r" +
    "\n" +
    "		<div class=\"row\">\r" +
    "\n" +
    "			<div class=\"\r" +
    "\n" +
    "				 col-lg-4 col-lg-offset-4\r" +
    "\n" +
    "				 col-md-6 col-md-offset-3\r" +
    "\n" +
    "				 col-sm-8 col-sm-offset-2\r" +
    "\n" +
    "				 col-xs-10 col-xs-offset-1 \">\r" +
    "\n" +
    "				<div style=\"max-width: 440px; max-height: 550px; margin: auto auto;\">\r" +
    "\n" +
    "					<div class=\"col-md-12\">\r" +
    "\n" +
    "						<div class=\"logo\">\r" +
    "\n" +
    "							<img class=\"fit\" src=\"bower_components/SmlAppl-WebApps-NgFramework/dist/images/zhaw_logo_white.png\" />\r" +
    "\n" +
    "						</div>\r" +
    "\n" +
    "					</div>\r" +
    "\n" +
    "					<div class=\"col-md-12 loginbox\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "						<div class=\"banner\">\r" +
    "\n" +
    "							<img class=\"fit\" src=\"bower_components/SmlAppl-WebApps-NgFramework/dist/images/zhaw_banner_leaf.png\" />\r" +
    "\n" +
    "						</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "						<div class=\"appname\">\r" +
    "\n" +
    "							{{ appName }}\r" +
    "\n" +
    "						</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "						<form name=\"loginForm\" ng-submit=\"login()\" novalidate>\r" +
    "\n" +
    "							<p class=\"text-danger\">\r" +
    "\n" +
    "								{{ errMessage | translate }}\r" +
    "\n" +
    "							</p>\r" +
    "\n" +
    "							<div class=\"form-group\">\r" +
    "\n" +
    "								<input name=\"userName\" ng-model=\"loginData.userName\" ng-change=\"errMessage = ''\" ng-required=\"true\" placeholder=\"{{ 'Model_Account_Login_Username' | translate }}\" class=\"form-control bigmargin bigInput\" autofocus />\r" +
    "\n" +
    "								<input name=\"password\" type=\"password\" ng-model=\"loginData.password\" ng-change=\"errMessage = ''\" ng-required=\"true\" placeholder=\"{{ 'Model_Account_Login_Password'| translate }}\" class=\"form-control bigmargin bigInput\" />\r" +
    "\n" +
    "							</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "							<div class=\"form-group\">\r" +
    "\n" +
    "								<button class=\"btn btn-primary btn-block btn-login\" style=\"height: 40px;\" type=\"submit\">{{ \"View_Account_Login_Submit\" | translate }}</button>\r" +
    "\n" +
    "							</div>\r" +
    "\n" +
    "						</form>\r" +
    "\n" +
    "					</div>\r" +
    "\n" +
    "				</div>\r" +
    "\n" +
    "			</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "		</div>\r" +
    "\n" +
    "	</div>\r" +
    "\n" +
    "</div> <!-- /container -->"
  );


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


  $templateCache.put('wwwroot/Views/inputBox.tpl.html',
    "<div>\r" +
    "\n" +
    "	<div class=\"modal-header\">\r" +
    "\n" +
    "		<h3 class=\"modal-title\">{{ content.title | translate }}</h3>\r" +
    "\n" +
    "	</div>\r" +
    "\n" +
    "	<div class=\"modal-body\">\r" +
    "\n" +
    "		<span ng-bind-html=\"content.message | translate \"></span>\r" +
    "\n" +
    "		<input class=\"form-control\" ng-model=\"data.inputText\" />\r" +
    "\n" +
    "	</div>\r" +
    "\n" +
    "	<div class=\"modal-footer\">\r" +
    "\n" +
    "		<button class=\"btn btn-primary\" type=\"button\" ng-click=\"ok()\">{{ \"View_Button_Ok\" | translate }}</button>\r" +
    "\n" +
    "		<button class=\"btn btn-warning\" type=\"button\" ng-click=\"cancel()\" ng-if=\"content.showCancelBtn\">{{ \"View_Button_Cancel\" | translate }}</button>\r" +
    "\n" +
    "	</div>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('wwwroot/Views/msgBox.tpl.html',
    "<div>\r" +
    "\n" +
    "	<div class=\"modal-header\">\r" +
    "\n" +
    "		<h3 class=\"modal-title\">{{ content.title | translate }}</h3>\r" +
    "\n" +
    "	</div>\r" +
    "\n" +
    "	<div class=\"modal-body\">\r" +
    "\n" +
    "		<span ng-bind-html=\"content.message | translate \"></span>\r" +
    "\n" +
    "	</div>\r" +
    "\n" +
    "	<div class=\"modal-footer\">\r" +
    "\n" +
    "		<button class=\"btn btn-warning\" type=\"button\" ng-click=\"cancel()\" ng-if=\"content.showCancelBtn\">{{ \"View_Button_Cancel\" | translate }}</button>\r" +
    "\n" +
    "		<button class=\"btn btn-primary\" type=\"button\" ng-click=\"ok()\">{{ \"View_Button_Ok\" | translate }}</button>\r" +
    "\n" +
    "	</div>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );

}]);
