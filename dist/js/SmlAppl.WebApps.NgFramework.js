/* #### File: ./src/Scripts/app/app.js */ 
(function() {
	"use strict";

	angular.module("smlAppl.webApps.framework.controllers", []);
	angular.module("smlAppl.webApps.framework.directives", []);
	angular.module("smlAppl.webApps.framework.components", []);
	angular.module("smlAppl.webApps.framework.filters", []);
	angular.module("smlAppl.webApps.framework.services", []);

	angular.module("smlAppl.webApps.framework", [
		// Custom modules 
		"smlAppl.webApps.framework.controllers",
		"smlAppl.webApps.framework.directives",
		"smlAppl.webApps.framework.components",
		"smlAppl.webApps.framework.filters",
		"smlAppl.webApps.framework.services",

		// ng-framework Custom modules
		"smlAppl.webApps.framework.filterTable",
		"smlAppl.webApps.framework.superAdmin",

		// 3rd Party Modules (in the order of the lib folder names)
		"ui.bootstrap", // angular-bootstrap
		"monospaced.elastic", // angular-elastic
		"ngCookies", // angular-cookies
		"angular-jwt",
		"ngMessages", // angular-messages
		"ngSanitize", // angular-sanitize
		"pascalprecht.translate", // angular-translate
		"ui.router", // angular-ui-router
		"ngNotify",
	]);

})();

/* #### File: ./src/Scripts/app/FilterTable/app.js */ 
(function() {
	"use strict";

	// register FilterTable modules
	angular.module("smlAppl.webApps.framework.filterTable.controllers", []);
	//angular.module("smlAppl.webApps.framework.filterTable.filters", []);
	angular.module("smlAppl.webApps.framework.filterTable.services", []);
	angular.module("smlAppl.webApps.framework.filterTable.directives", []);
	angular.module("smlAppl.webApps.framework.filterTable.factories", []);


	angular.module("smlAppl.webApps.framework.filterTable", [
		"smlAppl.webApps.framework.filterTable.controllers",
		//"smlAppl.webApps.framework.filterTable.filters",
		"smlAppl.webApps.framework.filterTable.services",
		"smlAppl.webApps.framework.filterTable.directives",
		"smlAppl.webApps.framework.filterTable.factories"
	]);

})();

/* #### File: ./src/Scripts/app/superAdmin/app.js */ 
(function() {
	"use strict";

    // register superAdmin modules
	angular.module("smlAppl.webApps.framework.superAdmin.controllers", []);
	angular.module("smlAppl.webApps.framework.superAdmin.components", []);
	angular.module("smlAppl.webApps.framework.superAdmin.services", []);


	angular.module("smlAppl.webApps.framework.superAdmin", [
		"smlAppl.webApps.framework.superAdmin.controllers",
		"smlAppl.webApps.framework.superAdmin.components",
		"smlAppl.webApps.framework.superAdmin.services"
	]);

})();

/* #### File: ./src/Scripts/app/Config/Config.js */ 
angular.module("smlAppl.webApps.framework")
	.config(function($httpProvider) {
		$httpProvider.interceptors.push("AuthInterceptor");
		$httpProvider.interceptors.push("LangInterceptor");
		$httpProvider.interceptors.push("ClientTokenInterceptor");
	});


/* #### File: ./src/Scripts/app/Config/Interceptors/ClientTokenInterceptor.js */ 
(function() {
	"use strict";

	angular.module("smlAppl.webApps.framework.services")
		.service("ClientTokenInterceptor", [
			function() {

				// create a unique guid per client. Will be renewed when hitting F5 or opening a second browser-tab.
				var clientToken = guid();

				this.request = function(config) {

					config.headers = config.headers || {};

					config.headers['Client-Token'] = clientToken;

					return config;
				};

				// source from: http://stackoverflow.com/a/105074
				function guid() {
					function s4() {
						return Math.floor((1 + Math.random()) * 0x10000)
							.toString(16)
							.substring(1);
					}

					return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
						s4() + '-' + s4() + s4() + s4();
				}
			}
		]);
})();

/* #### File: ./src/Scripts/app/Config/Interceptors/LangInterceptor.js */ 
(function () {
	"use strict";

	angular.module("smlAppl.webApps.framework.services")
		.service("LangInterceptor", [
			"$q", "$injector",
			function ($q, $injector) {

				this.request = function (config) {


					config.headers = config.headers || {};
					config.headers["Accept-Language"] = $injector.get("$translate").use();

					return config;
				};
			}
		]);
})();

/* #### File: ./src/Scripts/app/Config/appConfigFw.js */ 
(function() {
	'use strict';

	angular.module("smlAppl.webApps.framework")
		.constant("appConfigFw", getAppConfig());


	function getAppConfig() {
	    return {
	        uriBaseViews: "./Views/",
	        uriFilterTableViews: "./FilterTable/Views/",
	        uriSuperAdminViews: "./superAdmin/views/",

			uriFwBaseApi: "apiFw/v01/",
		}
	}

})();

/* #### File: ./src/Scripts/app/Config/routing.js */ 
var baseViewPath = "App/Views/";
var baseGlobalViewPath = "App/Global/Views/";

angular.module("smlAppl.webApps.framework")
	.config([
		"$stateProvider", "$urlRouterProvider", "appConfigFw",
        function ($stateProvider, $urlRouterProvider, appConfigFw) {

            var uriSuperAdminViews = appConfigFw.uriSuperAdminViews;

            $stateProvider

                // superAdmin
                .state("superadmin",
                {
                    parent: "root",
                    //abstract: true,
                    url: "/superadmin",
                    data: {
                        //roles: [appConfig.rights.settings],
                        "showSidebar": true,
                    },
                    views: {
                        "": {
                            template: '<div ui-view></div>'
                            //templateUrl: uriSuperAdminViews + "layout.html"
                        },
                        "sidebar@root": {
                            templateUrl: uriSuperAdminViews + "navigation.html"
                        },
                    }
                })
                .state("superadmin.user",
                {
                    url: "/user",
                    views: {
                        "": {
                            template: '<user-list></user-list>'
                            //templateUrl: uriSuperAdminViews + "user/list.html",
                        }
                    }
                })

            ;
        }
	])

    .run([
          "$rootScope", "$state", "$stateParams", "$location",
          function($rootScope, $state, $stateParams, $location) {
              $rootScope.$on("$stateChangeStart", function (event, toState, toStateParams) {
                  
                  //track the path the user wants to go 
                  if ($location.url() != "/login" && toState.url == "/login") {
                      localStorage.destinationPath = $location.url();
                  }
              });
          }
    ])

;

/* #### File: ./src/Scripts/app/Config/templates.js */ 
angular.module('smlAppl.webApps.framework').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('./Views/InputBox.tpl.html',
    "<div>\r" +
    "\n" +
    "	<div class=\"modal-header\">\r" +
    "\n" +
    "		<h3 translate translate-values=\"content.titleArgs\" class=\"modal-title\">{{ content.title }}</h3>\r" +
    "\n" +
    "	</div>\r" +
    "\n" +
    "	<div class=\"modal-body\">\r" +
    "\n" +
    "		<!-- TODO: This line does not function, but it is required when the message contains HTML content\r" +
    "\n" +
    "				   \"ng-if\" is used to handle those cases where angular params are used.  HTML content should not be used in this case until this issue is resolved.\r" +
    "\n" +
    "		<span translate translate-values=\"content.messageArgs\" ng-bind-html=\"content.message\"></span>\r" +
    "\n" +
    "		-->\r" +
    "\n" +
    "		<span ng-if=\"content.messageArgs !== null\" translate translate-values=\"content.messageArgs\">{{content.message}}</span>\r" +
    "\n" +
    "		<span ng-if=\"content.messageArgs === null\" ng-bind-html=\"content.message | translate\"></span>\r" +
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


  $templateCache.put('./Views/InputBoxMultiline.tpl.html',
    "<div>\r" +
    "\n" +
    "	<div class=\"modal-header\">\r" +
    "\n" +
    "		<h3 translate translate-values=\"content.titleArgs\" class=\"modal-title\">{{ content.title }}</h3>\r" +
    "\n" +
    "	</div>\r" +
    "\n" +
    "	<div class=\"modal-body\">\r" +
    "\n" +
    "		<!-- TODO: This line does not function, but it is required when the message contains HTML content\r" +
    "\n" +
    "				   \"ng-if\" is used to handle those cases where angular params are used.  HTML content should not be used in this case until this issue is resolved.\r" +
    "\n" +
    "		<span translate translate-values=\"content.messageArgs\" ng-bind-html=\"content.message\"></span>\r" +
    "\n" +
    "		-->\r" +
    "\n" +
    "		<span ng-if=\"content.messageArgs !== null\" translate translate-values=\"content.messageArgs\">{{content.message}}</span>\r" +
    "\n" +
    "		<span ng-if=\"content.messageArgs === null\" ng-bind-html=\"content.message | translate\"></span>\r" +
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


  $templateCache.put('./Views/Login.html',
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


  $templateCache.put('./Views/MsgBox.tpl.html',
    "<div>\r" +
    "\n" +
    "	<div class=\"modal-header\">\r" +
    "\n" +
    "		<h3 translate translate-values=\"content.titleArgs\" class=\"modal-title\">{{ content.title }}</h3>\r" +
    "\n" +
    "	</div>\r" +
    "\n" +
    "	<div class=\"modal-body\">\r" +
    "\n" +
    "		<!-- TODO: This line does not function, but it is required when the message contains HTML content\r" +
    "\n" +
    "			       \"ng-if\" is used to handle those cases where angular params are used.  HTML content should not be used in this case until this issue is resolved.\r" +
    "\n" +
    "		<span translate translate-values=\"content.messageArgs\" ng-bind-html=\"content.message\"></span>\r" +
    "\n" +
    "		-->\r" +
    "\n" +
    "		<span ng-if=\"content.messageArgs !== null\" translate translate-values=\"content.messageArgs\">{{content.message}}</span>\r" +
    "\n" +
    "		<span ng-if=\"content.messageArgs === null\" ng-bind-html=\"content.message | translate\"></span>\r" +
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


  $templateCache.put('./Views/PopupDatepicker.tpl.html',
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


/* #### File: ./src/Scripts/app/Controllers/ClaimsCtrl.js */ 
(function() {
	"use strict";

	angular.module("smlAppl.webApps.framework.controllers")
		.controller("ClaimsCtrl", [
			"$scope", "Authentication", "Principal",
			function ($scope, Authentication, Principal) {

				Authentication.claims()
					.then(function (response) {
					$scope.claims = response;
				});

				$scope.roles = Principal.roles();
			}
		]);

})();

/* #### File: ./src/Scripts/app/Controllers/LoginCtrl.js */ 
/*
 * When data.redirectState is defined on the state, this state will be used to redirect.
 * Otherwise a redirect to home will take place.
 */

(function () {
	"use strict";

	angular.module("smlAppl.webApps.framework.controllers")
		.controller("LoginCtrl", [
			"$scope", "$state", "Authentication", "$rootScope", "$location",
			function($scope, $state, Authentication, $rootScope, $location) {
				$scope.loginData = {
					userName: "",
					password: ""
				};

				$scope.errMessage = "";

				var destPath = "";
				if (localStorage.destinationPath && localStorage.destinationPath != "") {
				    // Prepare redirection to the previously attempted url
				    destPath = localStorage.destinationPath;
				    localStorage.destinationPath = "";
				}


				$scope.login = function () {

					Authentication.login($scope.loginData).then(function(response) {
						// login successful
					    if (destPath && destPath != "") {
					        // Redirect to the previously attempted url
					        $location.url(destPath);
						} else {
							// no redirect defined -> go to home
							$state.go("home");
                        }
					},
					function(err) {
						$scope.errMessage = err.error_description;
					});
				};
			}
		]);

})();

/* #### File: ./src/Scripts/app/Controllers/MsgBoxCtrl.js */ 
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

/* #### File: ./src/Scripts/app/Directives/compileTemplate.js */ 
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

/* #### File: ./src/Scripts/app/Directives/displayEmployee.js */ 
/*
	Displays the employees name from its id.
*/

(function() {
	'use strict';

	angular.module('smlAppl.webApps.framework.directives')
		.directive('displayEmployee', [
			"HttpHandler", "Employee",
			function (HttpHandler, Employee) {
				return {
					restrict: "E",
					require: "?ngModel",
					scope: {
						placeholder: "="
					},
					template: "<span ng-if='item.Id'>{{ item.FirstName }} {{ item.LastName }} ({{ item.Pid }})</span>" +
						"<span ng-if='!item.Id'>-</span>",
					link: function(scope, element, attrs, ctrl) {

						var ngModel = ctrl;
						scope.item = {};

						// Initialize value
						ngModel.$render = function() {
							var value = ngModel.$viewValue;
							if (value && value !== "00000000-0000-0000-0000-000000000000") {

								Employee.getById(value)
									.then(function(response) {
										scope.item = response;
									}, HttpHandler.handleGetErrorWithNotify);
							}
						}
					}
				}
			}
		]);
})();

/* #### File: ./src/Scripts/app/Directives/infoButton.js */ 
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

/* #### File: ./src/Scripts/app/Directives/popupDatepicker.js */ 
(function() {
	"use strict";

	/*
		The normal datepicker from uib displays the calendar. We need an input-box as it will be much smaller.
		To choose a date, the calendar will be popup.
	*/

	angular.module('smlAppl.webApps.framework.directives')
		.directive("popupDatepicker", [
			"appConfigFw", function (appConfigFw) {
				return {
					restrict: "E",
					scope: {
						data: "=ngModel",
						//required: "="
					},
					templateUrl: appConfigFw.uriBaseViews + "PopupDatepicker.tpl.html",

					link: function(scope, element, attrs) {

						scope.required = attrs["ng-required"];


						scope.states = {
							opened: false,
							showValidation: false,
						};

						scope.dateOptions = {
							startingDay: 1
						};

						scope.openCal = function($event) {
							scope.states.opened = true;
						};

					},
				}
			}
		]);

})();

/* #### File: ./src/Scripts/app/FilterTable/Config/templates.js */ 
angular.module('smlAppl.webApps.framework.filterTable').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('./src/Scripts/app/FilterTable/Views/FilterConditionalDate.html',
    "<div class=\"modal-header\">\r" +
    "\n" +
    "    <h3 class=\"modal-title\">Conditional filter: {{column.Display}}</h3>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<div class=\"modal-body\">\r" +
    "\n" +
    "    <div class=\"row\" ng-repeat=\"conditionItem in currentConditionalFilter\">\r" +
    "\n" +
    "        <div class=\"col-md-2\">{{column.Display}}</div>\r" +
    "\n" +
    "        <div class=\"col-md-2\">\r" +
    "\n" +
    "            <select class=\"form-control\" ng-model=\"conditionItem.condition\">\r" +
    "\n" +
    "                <option value=\"==\">==</option>\r" +
    "\n" +
    "                <option value=\"!=\">!=</option>\r" +
    "\n" +
    "                <option value=\">\">></option>\r" +
    "\n" +
    "                <option value=\">=\">>=</option>\r" +
    "\n" +
    "                <option value=\"<\"><</option>\r" +
    "\n" +
    "                <option value=\"<=\"><=</option>\r" +
    "\n" +
    "            </select>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"col-md-4\">\r" +
    "\n" +
    "            <input type=\"text\" class=\"form-control\" ng-model=\"conditionItem.value\">\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"col-md-3\">\r" +
    "\n" +
    "            <select class=\"form-control\" ng-model=\"conditionItem.conjunction\">\r" +
    "\n" +
    "                <option value=\"\">--</option>\r" +
    "\n" +
    "                <option value=\"AND\">AND</option>\r" +
    "\n" +
    "                <option value=\"OR\">OR</option>\r" +
    "\n" +
    "            </select>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"col-md-1\">\r" +
    "\n" +
    "            <div class=\"form-group\">\r" +
    "\n" +
    "                <button class=\"btn btn-xs btn-danger\" ng-click=\"removeCondition(conditionItem)\"><i class=\"fa fa-trash\" aria-hidden=\"true\"></i></button>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <!-- input for a new condition -->\r" +
    "\n" +
    "    <div class=\"row\">\r" +
    "\n" +
    "        <div class=\"col-md-2\">{{column.Display}}</div>\r" +
    "\n" +
    "        <div class=\"col-md-2\">\r" +
    "\n" +
    "            <div class=\"form-group\">\r" +
    "\n" +
    "                <select class=\"form-control\" ng-model=\"conditionalFilterItem.condition\">\r" +
    "\n" +
    "                    <option value=\"==\">==</option>\r" +
    "\n" +
    "                    <option value=\"!=\">!=</option>\r" +
    "\n" +
    "                    <option value=\">\">></option>\r" +
    "\n" +
    "                    <option value=\">=\">>=</option>\r" +
    "\n" +
    "                    <option value=\"<\"><</option>\r" +
    "\n" +
    "                    <option value=\"<=\"><=</option>\r" +
    "\n" +
    "                </select>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"col-md-4\">\r" +
    "\n" +
    "            <div class=\"form-group\">\r" +
    "\n" +
    "                <input type=\"text\" class=\"form-control\" ng-model=\"conditionalFilterItem.value\" placeholder=\"dd.MM.yyyy\">\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"col-md-3\">\r" +
    "\n" +
    "            <select class=\"form-control\" ng-model=\"conditionItem.conjunction\">\r" +
    "\n" +
    "                <option value=\"\">--</option>\r" +
    "\n" +
    "                <option value=\"AND\">AND</option>\r" +
    "\n" +
    "                <option value=\"OR\">OR</option>\r" +
    "\n" +
    "            </select>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"col-md-1\">\r" +
    "\n" +
    "            <div class=\"form-group\">\r" +
    "\n" +
    "                <button class=\"btn btn-xs btn-primary\" ng-click=\"addCondition()\"><i class=\"fa fa-plus\" aria-hidden=\"true\"></i></button>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <!-- formal overview -->\r" +
    "\n" +
    "    <div class=\"row\" ng-if=\"formulaText != ''\">\r" +
    "\n" +
    "        <div class=\"col-md-12\">\r" +
    "\n" +
    "            <hr />\r" +
    "\n" +
    "            <h4>Bedingungen als Formel</h4>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"col-md-12\">\r" +
    "\n" +
    "            <p>{{formulaText}}</p>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<div class=\"modal-footer\">\r" +
    "\n" +
    "    <button class=\"btn btn-default\" type=\"button\" ng-click=\"Reset()\">{{FilterTable.Translations.FilterTable_Reset_Filter}}</button>\r" +
    "\n" +
    "    <button class=\"btn btn-primary\" type=\"button\" ng-click=\"ok()\">{{FilterTable.Translations.FilterTable_Accept}}</button>\r" +
    "\n" +
    "    <button class=\"btn btn-warning\" type=\"button\" ng-click=\"cancel()\">{{FilterTable.Translations.FilterTable_Cancel}}</button>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n"
  );


  $templateCache.put('./src/Scripts/app/FilterTable/Views/FilterConditionalNumber.html',
    "<div class=\"modal-header\">\r" +
    "\n" +
    "    <h3 class=\"modal-title\">Conditional filter: {{column.Display}}</h3>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<div class=\"modal-body\">\r" +
    "\n" +
    "    <!-- current filter condition list -->\r" +
    "\n" +
    "    <div class=\"row\" ng-repeat=\"conditionItem in currentConditionalFilter\">\r" +
    "\n" +
    "        <div class=\"col-md-2\">{{column.Display}}</div>\r" +
    "\n" +
    "        <div class=\"col-md-2\">\r" +
    "\n" +
    "            <select class=\"form-control\" ng-model=\"conditionItem.condition\">\r" +
    "\n" +
    "                <option value=\"==\">==</option>\r" +
    "\n" +
    "                <option value=\"!=\">!=</option>\r" +
    "\n" +
    "                <option value=\">\">></option>\r" +
    "\n" +
    "                <option value=\">=\">>=</option>\r" +
    "\n" +
    "                <option value=\"<\"><</option>\r" +
    "\n" +
    "                <option value=\"<=\"><=</option>\r" +
    "\n" +
    "            </select>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"col-md-4\">\r" +
    "\n" +
    "            <input type=\"text\" class=\"form-control\" ng-model=\"conditionItem.value\">\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"col-md-3\">\r" +
    "\n" +
    "            <select class=\"form-control\" ng-model=\"conditionItem.conjunction\">\r" +
    "\n" +
    "                <option value=\"\">--</option>\r" +
    "\n" +
    "                <option value=\"AND\">AND</option>\r" +
    "\n" +
    "                <option value=\"OR\">OR</option>\r" +
    "\n" +
    "            </select>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"col-md-1\">\r" +
    "\n" +
    "            <div class=\"form-group\">\r" +
    "\n" +
    "                <button class=\"btn btn-xs btn-danger\" ng-click=\"removeCondition(conditionItem)\"><i class=\"fa fa-trash\" aria-hidden=\"true\"></i></button>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <!-- input for a new condition -->\r" +
    "\n" +
    "    <div class=\"row\">\r" +
    "\n" +
    "        <div class=\"col-md-2\">{{column.Display}}</div>\r" +
    "\n" +
    "        <div class=\"col-md-2\">\r" +
    "\n" +
    "            <div class=\"form-group\">\r" +
    "\n" +
    "                <select class=\"form-control\" ng-model=\"conditionalFilterItem.condition\">\r" +
    "\n" +
    "                    <option value=\"==\">==</option>\r" +
    "\n" +
    "                    <option value=\"!=\">!=</option>\r" +
    "\n" +
    "                    <option value=\">\">></option>\r" +
    "\n" +
    "                    <option value=\">=\">>=</option>\r" +
    "\n" +
    "                    <option value=\"<\"><</option>\r" +
    "\n" +
    "                    <option value=\"<=\"><=</option>\r" +
    "\n" +
    "                </select>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"col-md-4\">\r" +
    "\n" +
    "            <div class=\"form-group\">\r" +
    "\n" +
    "                <input type=\"text\" class=\"form-control\" ng-model=\"conditionalFilterItem.value\">\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"col-md-3\">\r" +
    "\n" +
    "            <select class=\"form-control\" ng-model=\"conditionItem.conjunction\">\r" +
    "\n" +
    "                <option value=\"\">--</option>\r" +
    "\n" +
    "                <option value=\"AND\">AND</option>\r" +
    "\n" +
    "                <option value=\"OR\">OR</option>\r" +
    "\n" +
    "            </select>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"col-md-1\">\r" +
    "\n" +
    "            <div class=\"form-group\">\r" +
    "\n" +
    "                <button class=\"btn btn-xs btn-primary\" ng-click=\"addCondition()\"><i class=\"fa fa-plus\" aria-hidden=\"true\"></i></button>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <!-- formal overview -->\r" +
    "\n" +
    "    <div class=\"row\" ng-if=\"formulaText != ''\">\r" +
    "\n" +
    "        <div class=\"col-md-12\">\r" +
    "\n" +
    "            <hr />\r" +
    "\n" +
    "            <h4>Bedingungen als Formel</h4>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"col-md-12\">\r" +
    "\n" +
    "            <p>{{formulaText}}</p>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<div class=\"modal-footer\">\r" +
    "\n" +
    "    <button class=\"btn btn-default\" type=\"button\" ng-click=\"Reset()\">{{FilterTable.Translations.FilterTable_Reset_Filter}}</button>\r" +
    "\n" +
    "    <button class=\"btn btn-primary\" type=\"button\" ng-click=\"ok()\">{{FilterTable.Translations.FilterTable_Accept}}</button>\r" +
    "\n" +
    "    <button class=\"btn btn-warning\" type=\"button\" ng-click=\"cancel()\">{{FilterTable.Translations.FilterTable_Cancel}}</button>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n"
  );


  $templateCache.put('./src/Scripts/app/FilterTable/Views/FilterTable.html',
    "<div ng-switch=\"filterTable.Status\" class=\"filtertable-container\">\r" +
    "\n" +
    "    <div class=\"row\">\r" +
    "\n" +
    "        <div ng-switch-when=\"Loading\" class=\"col-md-12\" style=\"text-align: center;\">\r" +
    "\n" +
    "            <span>Loading <img src=\"bower_components/SmlAppl-WebApps-NgFramework/dist/images/loader-horizontal.gif\" /></span>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div ng-switch-when=\"Error\" class=\"col-md-12\" style=\"text-align: center;\">\r" +
    "\n" +
    "            <span>{{::Translations.FilterTable_Error_Getting_Data}}</span>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"row\" ng-switch-when=\"Structure\">\r" +
    "\n" +
    "        <div class=\"col-md-12\">\r" +
    "\n" +
    "            <div style=\"overflow: auto;\">\r" +
    "\n" +
    "                <table class=\"table table-bordered table-condensed table-responsive table-striped table-hover filtertable-table\">\r" +
    "\n" +
    "                    <thead class=\"filtertable-table-header\">\r" +
    "\n" +
    "                        <tr>\r" +
    "\n" +
    "                            <th>\r" +
    "\n" +
    "                                <span type=\"button\" class=\"btn btn-default btn-sm\" ng-click=\"open()\" ng-show=\"filterTable.CanCustomize\"><span class=\"glyphicon glyphicon-cog\"></span></span>\r" +
    "\n" +
    "                            </th>\r" +
    "\n" +
    "                            <th ng-repeat=\"col in filterTable.VisibleCols\" ng-style=\"col._style\" style=\"padding-left: 10px; padding-right: 40px; vertical-align: middle; cursor: pointer;\"  ng-click=\"filterTable.UpdateOrderBy(col, $event)\">\r" +
    "\n" +
    "                                <span class=\"pull-left\">{{::col.Display}}</span>\r" +
    "\n" +
    "                                <span style=\"margin-right: -30px; opacity: 0.5;\" class=\"pull-right {{col.OrderIndicator}}\"></span>\r" +
    "\n" +
    "                            </th>\r" +
    "\n" +
    "                        </tr>\r" +
    "\n" +
    "                        <tr ng-show=\"filterTable.SearchActive\">\r" +
    "\n" +
    "                            <td>\r" +
    "\n" +
    "                                <span type=\"button\" class=\"btn btn-default btn-sm\" ng-click=\"filterTable.ClearFilter()\"><span class=\"glyphicon glyphicon-remove\"></span></span>\r" +
    "\n" +
    "                            </td>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <td ng-repeat=\"col in filterTable.VisibleCols\" ng-switch=\"col.FilterType\" ng-style=\"col._style\" >\r" +
    "\n" +
    "                                <div ng-switch-when=\"CustomHtml\" title=\"{{col.CustomFilter.Tooltip}}\" style=\"cursor: pointer; min-height: 28px;\" ng-click=\"defineFilter(col)\">\r" +
    "\n" +
    "                                    <span ng-bind-html=\"col.CustomFilter.InputHtml\"></span>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                                <div class=\"input-group\" ng-switch-when=\"Custom\" title=\"{{col.CustomFilter.Tooltip}}\" style=\"cursor: pointer; width: 1px;\" ng-click=\"defineFilter(col)\">\r" +
    "\n" +
    "                                    <input type=\"text\" class=\"form-control\" style=\"cursor: pointer;\" ng-style=\"{'width': col._style.width ? col._style.width : 'auto'}\" value=\"{{col.CustomFilter.Text}}\" readonly=\"readonly\" disabled=\"disabled\" ng-model-options=\"ModelOptions\"/>\r" +
    "\n" +
    "                                    <span class=\"input-group-addon\">...</span>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                                <!--<div class=\"input-group\" ng-switch-when=\"Custom\" title=\"{{col.CustomFilter.Tooltip}}\" style=\"cursor: pointer; width: 1px;\" ng-click=\"defineFilter(col)\">\r" +
    "\n" +
    "                                    <input type=\"text\" class=\"form-control\" style=\"cursor: pointer; width: auto;\" value=\"{{col.CustomFilter.Text}}\" readonly=\"readonly\" disabled=\"disabled\" ng-model-options=\"ModelOptions\" />\r" +
    "\n" +
    "                                    <div class=\"input-group-btn\">\r" +
    "\n" +
    "                                        <button type=\"button\" class=\"btn btn-default\">...</button>\r" +
    "\n" +
    "                                        <button type=\"button\" class=\"btn btn-default\" title=\"reset\" ng-click=\"resetFilter(col, $event)\"><span class=\"glyphicon glyphicon-remove\"></span></button>\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "                                </div>-->\r" +
    "\n" +
    "                                <select ng-switch-when=\"Select\" class=\"select2\" name=\"filterTable.TableFilter[col.Key]\" ng-model=\"filterTable.TableFilter[col.Key]\">\r" +
    "\n" +
    "                                    <option ng-repeat=\"item in col.GetDistincts(filterTable.ReduceSelects, true)\">{{::item}}</option>\r" +
    "\n" +
    "                                </select>\r" +
    "\n" +
    "                                <input ng-switch-when=\"Input\" type=\"text\" name=\"filterTable.TableFilter[col.Key]\" ng-model=\"filterTable.TableFilter[col.Key]\" ng-model-options=\"ModelOptions\" ng-style=\"{'width': col._width}\"/>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </td>\r" +
    "\n" +
    "                        </tr>\r" +
    "\n" +
    "						<tr ng-repeat=\"headerRow in filterTable.HeaderRows\">\r" +
    "\n" +
    "							<th>\r" +
    "\n" +
    "								<span ng-bind-html=\"::headerRow.Title\"></span>\r" +
    "\n" +
    "							</th>\r" +
    "\n" +
    "							<th ng-repeat=\"col in filterTable.VisibleCols\" ng-style=\"col._style\" >\r" +
    "\n" +
    "								<span ng-bind-html=\"headerRow.GetValue(col)\"></span>\r" +
    "\n" +
    "							</th>\r" +
    "\n" +
    "						</tr>\r" +
    "\n" +
    "                    </thead>\r" +
    "\n" +
    "                    <tbody class=\"filtertable-table-body\" ng-if=\"filterTable.VisibleCols.length > 0\">\r" +
    "\n" +
    "                        <tr ng-repeat=\"item in filterTable.DataDisplayed\">\r" +
    "\n" +
    "                            <td class=\"text-center\" ng-class=\"::{'filtertable-cell-clickable' : filterTable.ActionCol.HasClickAction}\" ng-click=\"filterTable.ActionCol.HasClickAction && filterTable.ExecuteClickAction(filterTable.ActionCol, item)\">\r" +
    "\n" +
    "                                <span ng-bind-html=\"::item[filterTable.ActionCol.Key]\" compile-template compile-scope=\"ParentScope\"></span>\r" +
    "\n" +
    "                            </td>\r" +
    "\n" +
    "                            <td ng-style=\"col._style\"  ng-repeat=\"col in filterTable.VisibleCols\" ng-class=\"::{'filtertable-cell-clickable' : col.HasClickAction}\" ng-click=\"col.HasClickAction && filterTable.ExecuteClickAction(col, item)\">\r" +
    "\n" +
    "                                <span ng-bind-html=\"::item[col.Key]\" compile-template compile-scope=\"ParentScope\"></span>\r" +
    "\n" +
    "                            </td>\r" +
    "\n" +
    "                        </tr>\r" +
    "\n" +
    "                    </tbody>\r" +
    "\n" +
    "                    <tfoot class=\"filtertable-table-footer\">\r" +
    "\n" +
    "                        <tr ng-if=\"filterTable.Loading\">\r" +
    "\n" +
    "                            <td colspan=\"100%\" class=\"none\" style=\"text-align: center;\">Loading <img src=\"bower_components/SmlAppl-WebApps-NgFramework/dist/images/loader-horizontal.gif\" /></td>\r" +
    "\n" +
    "                        </tr>\r" +
    "\n" +
    "                        <tr ng-if=\"filterTable.ShowNoDataMsg\">\r" +
    "\n" +
    "                            <td colspan=\"100%\" class=\"warning\" style=\"text-align: center;\">\r" +
    "\n" +
    "                                {{::Translations.FilterTable_Error_No_Data}}\r" +
    "\n" +
    "                            </td>\r" +
    "\n" +
    "                        </tr>\r" +
    "\n" +
    "                        <tr ng-if=\"filterTable.ShowDataFilteredOutMsg\">\r" +
    "\n" +
    "                            <td colspan=\"100%\" class=\"warning\" style=\"text-align: center;\">\r" +
    "\n" +
    "                                {{::Translations.FilterTable_Error_Filter_No_Data}}\r" +
    "\n" +
    "                            </td>\r" +
    "\n" +
    "                        </tr>\r" +
    "\n" +
    "                        <tr ng-repeat=\"footerRow in filterTable.FooterRows\">\r" +
    "\n" +
    "                            <th>\r" +
    "\n" +
    "                                <span ng-bind-html=\"::footerRow.Title\"></span>\r" +
    "\n" +
    "                            </th>\r" +
    "\n" +
    "                            <th ng-repeat=\"col in filterTable.VisibleCols\">\r" +
    "\n" +
    "                                <span ng-bind-html=\"footerRow.GetValue(col)\"></span>\r" +
    "\n" +
    "                            </th>\r" +
    "\n" +
    "                        </tr>\r" +
    "\n" +
    "                    </tfoot>\r" +
    "\n" +
    "                </table>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"row filtertable-footer\">\r" +
    "\n" +
    "                <div class=\"col-md-12\" ng-if=\"!filterTable.Loading && filterTable.HasData\">\r" +
    "\n" +
    "                    <div class=\"pull-right\" ng-if=\"filterTable.DisablePaging != true\">\r" +
    "\n" +
    "                        <button class=\"btn btn-default\" style=\"float: left;\" ng-click=\"filterTable.CurrentPage = 1\" ng-disabled=\"filterTable.BackwardDisabled\"><i class=\"fa fa-fast-backward\"></i></button>\r" +
    "\n" +
    "                        <button class=\"btn btn-default\" style=\"float: left;\" ng-click=\"filterTable.CurrentPage = (filterTable.CurrentPage - 1)\" ng-disabled=\"filterTable.BackwardDisabled\"><i class=\"fa fa-step-backward\"></i></button>\r" +
    "\n" +
    "                        <div style=\"float: left; text-align: right;\">\r" +
    "\n" +
    "                            <select ng-model=\"filterTable.CurrentPage\"\r" +
    "\n" +
    "                                    ng-options=\"item as item for item in filterTable.FilterPageArray\"></select>\r" +
    "\n" +
    "                            {{::Translations.FilterTable_Page}} {{ filterTable.CurrentPage }} {{::Translations.FilterTable_Of}} {{ filterTable.FilterDataPageCount }} ({{filterTable.PassedDataPageCount}} {{::Translations.FilterTable_Total}})\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <button class=\"btn btn-default\" style=\"float: right;\" ng-click=\"filterTable.CurrentPage = filterTable.FilterDataPageCount\" ng-disabled=\"filterTable.ForwardDisabled\"><i class=\"fa fa-fast-forward\"></i></button>\r" +
    "\n" +
    "                        <button class=\"btn btn-default\" style=\"float: right;\" ng-click=\"filterTable.CurrentPage = (filterTable.CurrentPage + 1)\" ng-disabled=\"filterTable.ForwardDisabled\"><i class=\"fa fa-step-forward\"></i></button>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                    <div style=\"float: left;\">\r" +
    "\n" +
    "                        {{::Translations.FilterTable_Records}}: {{filterTable.DataFiltered.length}} {{::Translations.FilterTable_Of}} {{filterTable.PassedData.length}}\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('./src/Scripts/app/FilterTable/Views/FilterTableMultiSelect.html',
    "<div class=\"modal-header\">\r" +
    "\n" +
    "    <h3 class=\"modal-title\">Filter {{column.Display}}</h3>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<div class=\"modal-body\">\r" +
    "\n" +
    "    <div class=\"row\">\r" +
    "\n" +
    "        <div class=\"col-md-12\">\r" +
    "\n" +
    "            <div class=\"input-group\">\r" +
    "\n" +
    "                <span class=\"input-group-addon\"><i class=\"glyphicon glyphicon-search\"></i></span>\r" +
    "\n" +
    "                <input type=\"text\" name=\"Search\" lass=\"form-control\" ng-model=\"Search\" ng-model-options=\"ModelOptions\" />\r" +
    "\n" +
    "                <div class=\"input-group-btn\">\r" +
    "\n" +
    "                    <button class=\"btn btn-default\" ng-click=\"ResetSearch()\"><span class=\"glyphicon glyphicon-remove\"></span></button>\r" +
    "\n" +
    "                    <button class=\"btn btn-default\" ng-click=\"All()\" title=\"Wählen\"><span class=\"glyphicon glyphicon-plus\"></span></button>\r" +
    "\n" +
    "                    <button class=\"btn btn-default\" ng-click=\"None()\" title=\"Abwählen\"><span class=\"glyphicon glyphicon-minus\"></span></button>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"row\" style=\"display: none;\">\r" +
    "\n" +
    "        <div class=\"col-md-4 col-md-offset-1\">\r" +
    "\n" +
    "            <button class=\"btn btn-default\" type=\"button\" ng-click=\"All()\">Wählen</button>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"col-md-4 col-md-offset-2\">\r" +
    "\n" +
    "            <button class=\"btn btn-default\" type=\"button\" ng-click=\"None()\">Abwählen</button>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"row\" style=\"max-height: 400px; overflow-y: auto; margin-top: 20px;\">\r" +
    "\n" +
    "        <div class=\"col-md-12\">\r" +
    "\n" +
    "            <div ng-repeat=\"item in Distincts | filter: Search\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <label ng-class=\"{'margin-bottom-sm': $first && HasEmpty}\">\r" +
    "\n" +
    "                    <input type=\"checkbox\" ng-model=\"column.CustomFilter.Selected[item]\"/>\r" +
    "\n" +
    "                    {{item == \"\" ? FilterTable.Translations.FilterTable_Empty_Value : item}}\r" +
    "\n" +
    "                </label>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<div class=\"modal-footer\">\r" +
    "\n" +
    "    <button class=\"btn btn-default\" type=\"button\" ng-click=\"Reset()\">{{FilterTable.Translations.FilterTable_Reset_Filter}}</button>\r" +
    "\n" +
    "    <button class=\"btn btn-primary\" type=\"button\" ng-click=\"ok()\">{{FilterTable.Translations.FilterTable_Accept}}</button>\r" +
    "\n" +
    "    <button class=\"btn btn-warning\" type=\"button\" ng-click=\"cancel()\">{{FilterTable.Translations.FilterTable_Cancel}}</button>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n"
  );


  $templateCache.put('./src/Scripts/app/FilterTable/Views/FilterTableOptions.html',
    "<div class=\"modal-header\">\r" +
    "\n" +
    "    <h3 class=\"modal-title\">Einstellungen</h3>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<div class=\"modal-body\">\r" +
    "\n" +
    "    <uib-tabset>\r" +
    "\n" +
    "        <uib-tab heading=\"Spalten\" ng-if=\"FilterTable.CanSelectCols\">\r" +
    "\n" +
    "            <div style=\"max-height: 400px; overflow-y: auto;\">\r" +
    "\n" +
    "                <table class=\"table table-bordered table-condensed table-responsive table-striped table-hover\">\r" +
    "\n" +
    "                    <thead>\r" +
    "\n" +
    "                        <tr>\r" +
    "\n" +
    "                            <th>Name</th>\r" +
    "\n" +
    "                            <th>Sichtbar</th>\r" +
    "\n" +
    "                            <th>Dropdown</th>\r" +
    "\n" +
    "                        </tr>\r" +
    "\n" +
    "                        <tr>\r" +
    "\n" +
    "                            <td>\r" +
    "\n" +
    "                                <input name=\"theColFilter.Display\" ng-model=\"theColFilter.Display\" placeholder=\"Name\" />\r" +
    "\n" +
    "                            </td>\r" +
    "\n" +
    "                            <td>\r" +
    "\n" +
    "                                <input type=\"checkbox\" ng-model=\"visible.all\" ng-change=\"ChangeVisible(visible.all)\" /> Alle\r" +
    "\n" +
    "                            </td>\r" +
    "\n" +
    "                            <td></td>\r" +
    "\n" +
    "                        </tr>\r" +
    "\n" +
    "                    </thead>\r" +
    "\n" +
    "                    <tbody>\r" +
    "\n" +
    "                        <tr ng-repeat=\"col in FilterTable.CurrentCols | filter: theColFilter\">\r" +
    "\n" +
    "                            <td>{{::col.Display}}</td>\r" +
    "\n" +
    "                            <td><input type=\"checkbox\" ng-model=\"col.Visible\" /></td>\r" +
    "\n" +
    "                            <td ng-switch=\"FilterTable.NoSearchSelects\">\r" +
    "\n" +
    "                                <input ng-switch-when=\"true\" type=\"checkbox\" ng-model=\"noSelect\" ng-disabled=\"true\" />\r" +
    "\n" +
    "                                <input ng-switch-when=\"false\" type=\"checkbox\" ng-model=\"col.BuildSelect\" ng-disabled=\"!col.CanBuildSelect\" />\r" +
    "\n" +
    "                            </td>\r" +
    "\n" +
    "                        </tr>\r" +
    "\n" +
    "                    </tbody>\r" +
    "\n" +
    "                </table>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </uib-tab>\r" +
    "\n" +
    "        <uib-tab heading=\"Tabelle\" ng-if=\"true\">\r" +
    "\n" +
    "            <div style=\"max-height: 400px; overflow-y: auto;\">\r" +
    "\n" +
    "                <table class=\"table table-bordered table-condensed table-responsive table-striped table-hover\">\r" +
    "\n" +
    "                    <thead>\r" +
    "\n" +
    "                    <tr>\r" +
    "\n" +
    "                        <th>Setting</th>\r" +
    "\n" +
    "                        <th>Wert</th>\r" +
    "\n" +
    "                    </tr>\r" +
    "\n" +
    "                    </thead>\r" +
    "\n" +
    "                    <tbody>\r" +
    "\n" +
    "                    <tr>\r" +
    "\n" +
    "                        <td>Suche aktiv</td>\r" +
    "\n" +
    "                        <td><input type=\"checkbox\" ng-model=\"FilterTable.SearchActive\"/></td>\r" +
    "\n" +
    "                    </tr>\r" +
    "\n" +
    "                    <tr>\r" +
    "\n" +
    "                        <td>Keine Dropdowns</td>\r" +
    "\n" +
    "                        <td><input type=\"checkbox\" ng-model=\"FilterTable.NoSearchSelects\"/></td>\r" +
    "\n" +
    "                    </tr>\r" +
    "\n" +
    "                    <tr>\r" +
    "\n" +
    "                        <td>Dropdowns einschränken</td>\r" +
    "\n" +
    "                        <td><input type=\"checkbox\" ng-model=\"FilterTable.ReduceSelects\"/></td>\r" +
    "\n" +
    "                    </tr>\r" +
    "\n" +
    "                    <tr>\r" +
    "\n" +
    "                        <td>Datensätze pro Seite</td>\r" +
    "\n" +
    "                        <td ng-if=\"!disablePageSizeInput\"><input type=\"number\" ng-model=\"FilterTable.PageSize\" ng-model-options=\"ModelOptions\" /></td>\r" +
    "\n" +
    "                        <td ng-if=\"disablePageSizeInput\"><input type=\"number\" ng-disabled=\"disablePageSizeInput\" /></td>\r" +
    "\n" +
    "                    </tr>\r" +
    "\n" +
    "                    </tbody>\r" +
    "\n" +
    "                </table>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </uib-tab>\r" +
    "\n" +
    "    </uib-tabset>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<div class=\"modal-footer\">\r" +
    "\n" +
    "    <button class=\"btn btn-primary\" type=\"button\" ng-click=\"ok()\">OK</button>\r" +
    "\n" +
    "    <!--<button class=\"btn btn-warning\" type=\"button\" ng-click=\"cancel()\">Cancel</button>-->\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n"
  );

}]);


/* #### File: ./src/Scripts/app/FilterTable/Controllers/FilterTableModalConditionalSelectCtrl.js */ 
	angular.module("smlAppl.webApps.framework.filterTable.directives")
        .controller('FilterTableModalConditionalSelectCtrl', ["$scope", "$uibModalInstance", "$filter", "filterTable", "column", "$translate", function ($scope, $uibModalInstance, $filter, filterTable, column, $translate) {

            $scope.formulaText = "";
            $scope.conditionalFilterItem = {
                condition: null,
                value: null
            };

            $scope.FilterTable = filterTable;
            $scope.column = angular.copy(column);

            if( Object.prototype.toString.call( $scope.column.CustomFilter.Selected ) !== '[object Array]' ) {
                $scope.column.CustomFilter.Selected = [];
            }

            $scope.currentConditionalFilter = $scope.column.CustomFilter.Selected || [];

                /**
                 * [
                 {condition: '<=', value: 100, conjunction: 'AND'}

                 ]
                 * @type {Array}
                 */

            $scope.ModelOptions = {
                debounce: {
                    default: 500,
                    blur: 0
                }
            };

            $scope.addCondition = function(){
                if($scope.conditionalFilterItem.condition == null || $scope.conditionalFilterItem.value == null){
                    return false;
                }

                $scope.currentConditionalFilter.push(angular.copy($scope.conditionalFilterItem));
                $scope.conditionalFilterItem = {
                    condition: null,
                    value: null
                }

                updateFilterFormulaText();
            }

            $scope.removeCondition = function(conditionItem){
                var sortedConditionalFilter = [];
                angular.forEach($scope.currentConditionalFilter, function(item){
                    if(conditionItem !== item){
                        sortedConditionalFilter.push(item);
                    }
                });

                $scope.currentConditionalFilter = angular.copy(sortedConditionalFilter);
                updateFilterFormulaText();
            }

            $scope.Reset = function() {
                $scope.column.CustomFilter.Selected = [];
                updateFilterFormulaText();
                $uibModalInstance.close($scope.column);
            }

            $scope.ok = function () {
                $scope.column.CustomFilter.Selected = $scope.currentConditionalFilter;
                updateFilterFormulaText();
                $uibModalInstance.close($scope.column);
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };

            function updateFilterFormulaText(){
                var formulaText = "";

                //Grouping each statement into and groups for easier processing
                var groupByAnd = new Array();
                var groupIndex = 0;
                angular.forEach($scope.column.CustomFilter.Selected, function(conditionItem){
                    if( Object.prototype.toString.call( groupByAnd[groupIndex] ) !== '[object Array]' ) {
                        groupByAnd[groupIndex] = new Array();
                    }
                    groupByAnd[groupIndex].push(conditionItem);

                    //If the AND statement is closed, a new group will be created
                    if(conditionItem.conjunction == 'AND'){
                        groupIndex++;
                    }
                });

                angular.forEach(groupByAnd, function(groupedConditions, j){
                    formulaText += "(";
                    angular.forEach(groupedConditions, function(filter, i){
                        formulaText = formulaText+ ""+$scope.column.Display + " "+filter.condition+" "+filter.value+"";
                        if(groupedConditions[i+1]){
                            formulaText += " OR ";
                        }
                    });
                    formulaText += ")";

                    if(groupByAnd[j+1]){
                        formulaText += " AND ";
                    }
                });

                $scope.formulaText = formulaText;
                $scope.column.CustomFilter.Tooltip = formulaText;
                $scope.column.CustomFilter.Text = formulaText;
            }

            updateFilterFormulaText();
}]);

/* #### File: ./src/Scripts/app/FilterTable/Controllers/FilterTableModalInstanceCtrl.js */ 
(function() {
	"use strict";

	angular.module('smlAppl.webApps.framework.filterTable.controllers').controller('FilterTableModalInstanceCtrl', function ($scope, $uibModalInstance, $filter, options) {

		$scope.Options = options;

		$scope.visible = {};
		$scope.visible.all = $scope.Options.CurrentCols.length === ($scope.Options.CurrentCols.filter(function (v, i, a) { return v.visible; })).length;

		$scope.theColFilter = {};

		$scope.ModelOptions = {
			debounce: {
				default: 500,
				blur: 0
			}
		};

		$scope.ok = function () {
			$uibModalInstance.close();
		};

		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};

		$scope.ChangeVisible = function (newValue) {
			var change = $scope.Options.CurrentCols.filter(function (v, i, a) { return v.visible !== newValue });
			var filtered = $filter('filter')(change, $scope.theColFilter);
			for (var i = 0; i < filtered.length; i++) {
				filtered[i].visible = newValue;
			}
		}

		$scope.ChangeDropDown = function (col) {
			if (col.select) {
				$scope.Options.buildDistinctsFor(col);
			}
		}
	});

})();

/* #### File: ./src/Scripts/app/FilterTable/Controllers/FilterTableModalMultiSelectCtrl.js */ 
	angular.module("smlAppl.webApps.framework.filterTable.directives")
        .controller('FilterTableModalMultiSelectCtrl', ["$scope", "$uibModalInstance", "$filter", "filterTable", "column", "$translate", function ($scope, $uibModalInstance, $filter, filterTable, column, $translate) {

        $scope.FilterTable = filterTable;
        $scope.column = angular.copy(column);
	    $scope.Search = '';
	    $scope.ResetSearch = function() {
	        $scope.Search = '';
	    }

	    function getdistincts(excludeEmpty) {
            var distincts = $filter('orderBy')($scope.column.Distincts) || [];
            if (excludeEmpty) {
                var l = distincts.length;
                for (var i = l; i > 0; i--) {
                    var val = distincts[i-1];
                    if (val === null || val === undefined || val.trim() === "") {
                        distincts.splice(i-1, 1);
                    }
                }
            }
            return distincts;
	    }

	    $scope.Distincts = $scope.column.Distincts || [];
        //since we know it will be sorted we can check element at pos 0
	    $scope.HasEmpty = $scope.Distincts.length > 0 && $scope.Distincts[0] === "";
	    

        $scope.ModelOptions = {
            debounce: {
                default: 500,
                blur: 0
            }
        };

        $scope.Reset = function() {
            $scope.column.CustomFilter.FnReset();
            $uibModalInstance.close($scope.column);
        }

        $scope.All = function () {
            updateFiltered(true);
        }
        $scope.None = function () {
            updateFiltered(false);
        }
        function updateFiltered(setTo) {
            var currents = $filter('filter')($scope.Distincts, $scope.Search);
            for (var i = 0; i < currents.length; i++) {
                var x = currents[i];
                $scope.column.CustomFilter.Selected[x] = setTo;
            }

        }
        $scope.ok = function () {
            var selected = Object.keys($scope.column.CustomFilter.Selected);
            for (var i = 0; i < selected.length; i++) {
                var key = selected[i];
                if (!$scope.column.CustomFilter.Selected[key]) {
                    delete $scope.column.CustomFilter.Selected[key];
                }
            }
            selected = Object.keys($scope.column.CustomFilter.Selected);
            if (selected.length === 0) {
                $scope.column.CustomFilter.FnReset();
            } else {
                $scope.column.CustomFilter.Text = selected.length + " " + filterTable.Translations.FilterTable_0_Selected;
                $scope.column.CustomFilter.Tooltip = selected.join(', ');
            }
            $uibModalInstance.close($scope.column);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

}]);

/* #### File: ./src/Scripts/app/FilterTable/Directives/filterTable.js */ 
(function() {
	"use strict";

	angular.module("smlAppl.webApps.framework.filterTable.directives")
	    .directive("filterTable", ["$rootScope", "$uibModal", "$timeout", "$filter", "$sanitize", "filterTableConstructor", "$translate", function ($rootScope, $uibModal, $timeout, $filter, $sanitize, filterTableConstructor, $translate) {
	        return {
	            restrict: 'E',
	            scope: {
	                inData: "=items",
	                inOptions: "=?options",

	                inColumns: "=?columns",

	                inCanCustomize: "=?canCustomize",
	                inCanSelectCols: "=?canSelectCols",

	                inSearchActive: "=?searchActive",
	                inNoSearchSelects: "=?noSearchSelects",
	                inReduceSelects: "=?reduceSelects",
	                inOrder: "=?order",
	                inPageSize: "=?pageSize",

	                inSelectsOnColumns: "=?selectsOnColumns",
	                inNoSelectsOnColumns: "=?noSelectsOnColumns",
	                inIgnoreColumns: "=?ignoreColumns",
	                inInitialEmpty: "=?initialEmpty"
	            },
	            templateUrl: "./src/Scripts/app/FilterTable/Views/FilterTable.html",

	            link: function (scope, element, attrs) {

	                scope.ModelOptions = {
	                    debounce: {
	                        default: 500,
	                        blur: 0
	                    }
	                };

	                scope.ParentScope = scope.$parent;
	                scope.filterTable = new filterTableConstructor.FilterTable();

	                function mappedField(onObject, name, definition) {
	                    var defaultVal = angular.isDefined(definition.value) ? definition.value : null;
	                    var currentVal = defaultVal;
	                    if (!(definition.force === true)) {
	                        if (angular.isDefined(scope['in' + name])) {
	                            currentVal = scope['in' + name];
	                        } else if (angular.isDefined(scope.inOptions) && angular.isDefined(scope.inOptions[name])) {
	                            currentVal = scope.inOptions[name];
	                        }
	                    }
	                    if (angular.isUndefined(onObject.backingFields)) {
	                        onObject.backingFields = {};
	                    }
	                    if (angular.isUndefined(onObject.watchers)) {
	                        onObject.watchers = {};
	                    }
	                    if (angular.isUndefined(onObject.backingFields[name])) {
	                        onObject.backingFields[name] = currentVal;
	                    }
	                    Object.defineProperty(onObject, name, {
	                        get: function () {
	                            return onObject.backingFields[name];
	                        },
	                        set: function (newValue) {
	                            var setVal = angular.isDefined(definition.changeFunc) ? definition.changeFunc.call((definition.callOn || onObject), newValue) : newValue;
	                            if (!angular.equals(onObject.backingFields[name], setVal)) {
	                                var old = onObject.backingFields[name];
	                                onObject.backingFields[name] = setVal;
	                                if (angular.isDefined(definition.afterChangeFunc)) {
	                                    definition.afterChangeFunc.call((definition.callOn || onObject), newValue, old);
	                                }
	                            }
	                            if (angular.isObject(setVal) && angular.isDefined(definition.afterChangeFunc)) {
	                                if (angular.isUndefined(onObject.watchers[name])) {
	                                    onObject.watchers[name] = scope.$watch(function () { return onObject.backingFields[name]; }, function (watchNewVal, watchOldValue) {
	                                        definition.afterChangeFunc.call((definition.callOn || onObject), watchNewVal, watchOldValue);
	                                        //onObject.backingFields[name] = watchNewVal;
	                                    }, true);
	                                }
	                            }
	                            if (definition.syncOut) {
	                                if (!angular.equals(scope['in' + name], setVal)) {
	                                    scope['in' + name] = setVal;
	                                }
	                                if (angular.isDefined(scope.inOptions)) {
	                                    if (!angular.equals(scope.inOptions[name], setVal)) {
	                                        scope.inOptions[name] = setVal;
	                                    }
	                                }
	                            }
	                        },
	                        enumerable: true,
	                        configurable: true
	                    });

	                    function findHostingScope(scope, property, lvl) {
	                        lvl = lvl || 0;
	                        if ((scope || null) === null) {
	                            return { scope: null, lvl: lvl };
	                        }
	                        if (scope.hasOwnProperty(property)) {
	                            return { scope: scope, lvl: lvl };
	                        }
	                        return findHostingScope(scope.$parent, property, lvl + 1);
	                    }

	                    if (angular.isDefined(scope.inOptions)) {
	                        //if (angular.isDefined(scope.inOptions[name]) || definition.force === true) {
	                        Object.defineProperty(scope.inOptions, name, {
	                            get: function () { return onObject[name]; },
	                            set: function (newValue) { onObject[name] = newValue; },
	                            enumerable: true,
	                            configurable: true
	                        });
	                        //}
	                    }

	                    var x = findHostingScope(scope, 'allInfos');
	                    if (angular.isDefined(scope['in' + name]) || definition.force === true) { //TODO: Test performance - seems like we had a hit here
	                        Object.defineProperty(scope, 'in' + name, {
	                            get: function () { return onObject[name]; },
	                            set: function (newValue) {
	                                onObject[name] = newValue;
	                            },
	                            enumerable: true,
	                            configurable: true
	                        });
	                    }

	                    //init all to same (overwrite inOpt with inParam in case both specified)
	                    onObject[name] = onObject[name];
	                }

	                function defineOptions(definition) {
	                    for (var x in definition) {
	                        if (definition.hasOwnProperty(x)) {
	                            mappedField(scope.filterTable, x, definition[x]);
	                        }
	                    }
	                }

	                function sanityCheckPageSize(newValue) {
	                    if (angular.isDefined(newValue) && angular.isNumber(newValue) && newValue > 0) {
	                        return newValue;
	                    }
	                    return scope.filterTable.PageSize;
	                }

                    function createInfoRows(array) {
                        var a = array || [];
                        var l = [];
                        for (var i = 0; i < a.length; i++) {
                            var entry = a[i];
                            var h = new filterTableConstructor.HeaderDef(
                                filterTableConstructor.GetDefined(entry.title, entry.Title, ""),
                                filterTableConstructor.GetDefined(entry.calculate, entry.Calculate, null),
                                filterTableConstructor.GetDefined(entry.showPageValues, entry.ShowPageValues, false)
                            );
                            if (h.CanCalculate) {
                                l.push(h);
                            }
                        }
                        return l;
                    }

	                function initFilterTable() {

	                    var filterTableDefinition = {
	                        CanCustomize: { syncIn: true, syncOut: true, value: true },
	                        CanSelectCols: { syncIn: true, syncOut: true, value: true },

	                        SearchActive: { syncIn: true, syncOut: true, value: true },
	                        NoSearchSelects: { syncIn: true, syncOut: true, value: false, afterChangeFunc: function (newValue) { if (newValue) { scope.filterTable.ResetDistincts(true); } } },
	                        ReduceSelects: { syncIn: true, syncOut: true, value: false, afterChangeFunc: function () { scope.filterTable.ResetDistincts(true); } },

	                        Order: { syncIn: true, syncOut: true, value: [], changeFunc: function (order) { return angular.isDefined(order) ? (angular.isArray(order) ? order : [order]) : []; } },
	                        PageSize: { syncIn: true, syncOut: true, value: 15, changeFunc: sanityCheckPageSize, afterChangeFunc: function () { scope.filterTable.CurrentPage = 1; } },

	                        SelectsOnColumns: { syncIn: true, syncOut: true, value: [] },
	                        NoSelectsOnColumns: { syncIn: true, syncOut: true, value: [] },
	                        IgnoreColumns: { syncIn: true, syncOut: true, value: [] },

	                        TableFilter: { syncIn: true, syncOut: true, value: {} },

	                        InitialEmpty: { syncIn: true, syncOut: true, value: false },

	                        Columns: { syncIn: true, syncOut: true, value: [], changeFunc: scope.filterTable.UpdateColumnsDefs },

	                        HeaderRows: { syncIn: true, syncOut: true, value: [], changeFunc: createInfoRows },
	                        FooterRows: { syncIn: true, syncOut: true, value: [], changeFunc: createInfoRows },

	                        Data: { syncIn: true, syncOut: false, value: [], afterChangeFunc: function (newValue) { scope.filterTable.PassedData = newValue; } },
                            DisablePaging : false

	                    }

	                    defineOptions(filterTableDefinition);
	                    scope.filterTable.OptionsProvided = scope.filterTable.Columns.length > 0;
	                    scope.filterTable.Initialised = true;
	                }

	                initFilterTable();
	                if (scope.filterTable.DisablePaging == true) {

	                    scope.filterTable.PageSize = Number.MAX_VALUE;
	                }

                    $rootScope.$on("$translateChangeEnd", function () {
                        scope.filterTable.UpdateTranslations(scope.filterTable.Refresh);
                    });

                    Object.defineProperty(scope, "Translations", {
                        get: function () { return scope.filterTable.Translations; },
                    });
                   
                    scope.filterTable.UpdateTranslations(scope.filterTable.Refresh);
	                scope.animationsEnabled = true;

	                scope.open = function (size) {
	                    scope.openThis(size, "./src/Scripts/app/FilterTable/Views/FilterTableOptions.html", "FilterTableOptionsCtrl");
	                }

                    scope.defineFilter = function(col) {
                        scope.openThis(undefined, col.CustomFilter.TemplateUrl, col.CustomFilter.Controller, col
                            , undefined
                            , function (newColDef) {
                                col.CustomFilter = newColDef.CustomFilter;
                                col.UpdateCustomFilterTexts();
                                scope.filterTable.FilterUpdateHandler.ResetHeaderAndFooter = true;
                            }
                        );
                    }

                    scope.resetFilter = function(col, event) {
                        event.preventDefault();
                        col.CustomFilter.FnReset();
                        col.UpdateCustomFilterTexts();
                        scope.filterTable.FilterUpdateHandler.ResetHeaderAndFooter = true;
                    }

	                scope.openThis = function (size, templateUrl, controller, column, cancel, ok) {
	                    column = column || null,
	                    cancel = cancel || function () { };
	                    ok = ok || function () { };
	                    var modalInstance = $uibModal.open({
	                        animation: scope.animationsEnabled,
	                        templateUrl: templateUrl,
	                        controller: controller,
	                        size: size,
	                        resolve: {
	                            filterTable: function () { return scope.filterTable; },
	                            column: column,
                                translations: scope.Translations
	                        }
	                    });

	                    modalInstance.result.then(function (retVal) {
	                        ok(retVal);
	                    }, function () {
	                        cancel();
	                    });
	                }
	            }
	        };
	    }]);

})();

/* #### File: ./src/Scripts/app/FilterTable/Directives/filterTableOptions.js */ 
(function() {
	"use strict";

	angular.module("smlAppl.webApps.framework.filterTable.directives")
        .controller('FilterTableOptionsCtrl', ["$scope", "$uibModalInstance", "$filter", "filterTable", function ($scope, $uibModalInstance, $filter, filterTable) {

        $scope.FilterTable = filterTable;

        $scope.visible = {};
        $scope.theColFilter = {};
        $scope.visible.all = undefined;

        $scope.noSelect = false;

        $scope.$watch('theColFilter', function (newValue, oldValue) {
            checkAllButtonStati();
        }, true);

        $scope.$watch('FilterTable.CurrentCols', function (newValue, oldValue) {
            checkAllButtonStati();
        }, true);

        function checkAllButtonStati() {
            var current = ($filter('filter')($scope.FilterTable.CurrentCols, $scope.theColFilter));
            var allShown = current.length === (current.filter(function (v, i, a) { return v.Visible; })).length;
            var allHidden = current.length === (current.filter(function (v, i, a) { return !v.Visible; })).length;;
            $scope.visible.all = allShown ? true : allHidden ? false : undefined;    //TODO: tristate ? i kinda like it this way    
        }

        $scope.ModelOptions = {
            debounce: {
                default: 500,
                blur: 0
            }
        };

        $scope.ok = function () {
            $uibModalInstance.close();
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.ChangeVisible = function (newValue) {
            var change = $scope.FilterTable.CurrentCols.filter(function (v, i, a) { return v.Visible !== newValue });
            var filtered = $filter('filter')(change, $scope.theColFilter);
            for (var i = 0; i < filtered.length; i++) {
                filtered[i].Visible = newValue;
            }
            checkAllButtonStati();
        }

        $scope.disablePageSizeInput = ($scope.FilterTable.PageSize === Number.MAX_VALUE);
    }]);
})();

/* #### File: ./src/Scripts/app/FilterTable/Factories/filterTableFactory.js */ 
(function() {
    "use strict";


    angular.module("smlAppl.webApps.framework.filterTable.factories").factory('filterTableConstructor', ["$filter", "$timeout", "$parse", "$sce", "$translate", function ($filter, $timeout, $parse, $sce, $translate) {
        function HeaderDef(title, calculator, showPageValues) {
            this.Title = title || "";
            this._calculator = calculator || null;
            this.Values = {};
            this.ShowPageValues = showPageValues || false;
        }

        HeaderDef.prototype = {
            get CanCalculate() {
                return ((this._calculator || null) != null);
            },
            GetValue: function (column) {
                if (angular.isUndefined(this.Values[column.Key])) {
                    var val = this.Calculate(column);
                    if ((val || null) !== null && angular.isString(val)) {
                        val = $sce.trustAsHtml(val);
                    }
                    this.Values[column.Key] = val;
                }
                return this.Values[column.Key] || null;
            },
            ResetVal: function(onlyPageChange) {
                onlyPageChange = onlyPageChange || false;
                if (!onlyPageChange || this.ShowPageValues) {
                    this.Values = {};
                }
            },
            ColumnData: function(col, data) {
                return (data || []).map(function (item) { return item[col.Key] });
            },
            Sum: function (col, data) {
                var total = 0;
                var array = this.ColumnData(col, data);
                var l = array.length;
                if (l === 0) {
                    return null;
                }
                for (var i = l; i> 0; i--) {
                    total += array[i-1];
                }
                return total;
            },
            Avg: function (col, data) {
                var l = data.length;
                if (l === 0) {
                    return null;
                }
                return this.Sum(col, data) / l;
            },
            Max: function (col, data) {
                var array = this.ColumnData(col, data);;
                var l = array.length;
                if (l === 0) {
                    return null;
                }
                return Math.max.apply(null, array);
            },
            Min: function (col, data) {
                var array = this.ColumnData(col, data);
                var l = array.length;
                if (l === 0) {
                    return null;
                }
                return Math.min.apply(null, array);
            },
            Calculate: function (column) {
                if (this.CanCalculate) {
                    var data = column.GetFilterTable().DataFiltered || [];
                    var dataDisplayed = column.GetFilterTable().DataDisplayed || [];
                    try {
                        return this._calculator.call(this, column, data, dataDisplayed);
                    } catch (ex) {
                        console.log(ex);
                        return undefined;
                    }
                }
                return null;
            }
        }

        function ColumnDef() {
            this._key = null;

            this._ignore = false;
            this._visible = false;
            this._display = undefined;
            this.DisplayKey = undefined;
            this._canBuildSelect = true;
            this._buildSelect = false;
            this.orderAsc = undefined;

            this._distincts = null;
            this._distinctsReduced = null;
            this.Filter = undefined;
            this.ValueFunction = null;
            this.ClickAction = null;

            this.ActionCol = false;
            this.GetFilterTable = function () { return null; }; //as a function, so copy and watch won't go into circular endless-loops

            this.AlternateSortCol = null;
            this._calculateColumn = null;
            this._applyFilter = null;
            this.CustomFilter = null;
            this._style = null;
        }

        ColumnDef.prototype = {
            get Key() {
                return this._key;
            },
            set Key(val) {
                if ((val || null) === null) { return; }
                this._key = val;
            },
            get Display() {
                if (angular.isUndefined(this._display)) {
                    //this._display = this.DisplayKey || this.Key;
                    //var x = $parse('"' + col.DisplayKey + '" | translate') ();
                    //var y = $parse('"' + col.DisplayKey + '" | translate')(this);
                    this._display = $parse('(col.DisplayKey || col.Key) | translate') (this, { col: this });
                }
                if (angular.isDefined(this._display) && angular.isString(this._display)) {
                    this._display = $sce.trustAsHtml(this._display);
                }
                return this._display;
            },
            set Display(val) {
                this._display = val;
            },
            ResetDisplay: function() {
                this._display = undefined;
            },
            CallOnFilterTable: function (func) {
                var ret = {
                    called: false,
                    result: undefined
                };
                var ft = this.GetFilterTable();
                if (ft != null) {
                    ret.called = true;
                    ret.result = func.call(ft, ft, this);
                }
                return ret;
            },
            _updateColumns: function (ft) {
                ft.UpdateColumnLists(ft.Columns);
            },
            UpdateColumns: function () {
                this.CallOnFilterTable(this._updateColumns);
            },
            get Visible() {
                if (this.Ignore) {
                    return false;
                }
                return this._visible;
            },
            set Visible(val) {
                if (angular.isUndefined(val) || val === null) { return; }
                if (this._ignore) {
                    this._visible = false;
                } else {
                    this._visible = val;
                }
                this.UpdateColumns();
            },
            get Ignore() {
                return this._ignore;
            },
            set Ignore(val) {
                if (angular.isUndefined(val) || val === null) { return; }
                this._ignore = val;
                if (this._ignore) {
                    this._visible = false;
                }
                this.UpdateColumns();
            },
            get BuildSelect() {
                if (!this.CanBuildSelect) {
                    return false;
                }
                return this._buildSelect;
            },
            set BuildSelect(val) {
                if (angular.isUndefined(val) || val === null) { return; }
                var before = this._buildSelect;
                if (!this.CanBuildSelect) {
                    this._buildSelect = false;
                } else {
                    this._buildSelect = val;
                }

                if (this._buildSelect !== before) {
                    this.ResetDistincts();
                };
            },
            ResetDistincts: function (all) {
                all = angular.isUndefined(all) ? true : all;
                if (all) {
                    this._distincts = null;
                }
                this._distinctsReduced = null;
            },
            _buildDistincts: function (ft, c, all, reduced) {
                return ft.CreateDistincts(c, all, reduced);
            },
            BuildDistincts: function (all, reduced) {
                var me = this;
                var ret = this.CallOnFilterTable(function(ft, c) { return me._buildDistincts(ft, c, all, reduced); });
                return ret.called ? ret.result : { All: null, Reduced:null };
            },
            get DistinctHolder() {
                if (this.BuildSelect) {
                    var distincts = this.BuildDistincts(this._distincts == null, this._distinctsReduced == null);
                    if (this._distincts == null) {
                        this._distincts = distincts.All;
                    }
                    if (this._distinctsReduced == null) {
                        this._distinctsReduced = distincts.Reduced;
                    }
                }
                return {
                    All: this._distincts,
                    Reduced: this._distinctsReduced,
                };
            },
            GetDistincts: function (reduced, addEmptyIfMissing) {
                addEmptyIfMissing = addEmptyIfMissing || false;
                var distincts = [];
                if ((reduced || false) === true) {
                    distincts = this.DistinctsReduced;
                } else {
                    distincts = this.Distincts;
                }
                if (addEmptyIfMissing) {
                    //since we know it will be sorted we can check element at pos 0
                    if (distincts.length > 0) {
                        if (distincts[0] !== "") {
                            distincts.unshift("");
                        }
                    }
                }
                return distincts;
            },
            get Distincts() {
                return this.DistinctHolder.All;
            },
            get DistinctsReduced() {
                return this.DistinctHolder.Reduced;
            },
            get HasDistincts() {
                return (this.Distincts || []).length > 0;
            },
            _canBuildFromTable: function (ft) {
                return ft.NoSearchSelects;
            },
            get CanBuildFromTable() {
                var ret = this.CallOnFilterTable(this._canBuildFromTable);
                return ret.called ? !ret.result : true;
            },
            get CanBuildSelect() {
                return this.CanBuildFromTable && this._canBuildSelect;
            },
            set CanBuildSelect(val) {
                if (angular.isUndefined(val) || val === null) { return; }
                this._canBuildSelect = val;
                if (!this._canBuildSelect) {
                    this._buildSelect = false;
                }
            },
            get OrderBy() {
                if (angular.isDefined(this.orderAsc)) {
                    var column = (this.AlternateSortCol || null) !== null ? this.AlternateSortCol : this.Key;
                    return (this.orderAsc === true ? "" : "-") + "'" + column + "'";
                }
                return null;
            },
            get IsSorted() {
                return angular.isDefined(this.orderAsc);
            },
            get OrderIndicator() {
                if (this.IsSorted) {
                    if (this.orderAsc) {
                        return "glyphicon glyphicon-sort-by-alphabet";
                    } else {
                        return "glyphicon glyphicon-sort-by-alphabet-alt";
                    }
                }
                return "glyphicon glyphicon-sort";
            },
            get CalculateColumn() {
                if (this._calculateColumn == null) {
                    this._calculateColumn = (angular.isDefined(this.ValueFunction) && angular.isFunction(this.ValueFunction) && this.ValueFunction !== null);
                }
                return this._calculateColumn;
            },
            get ApplyFilter() {
                if (this._applyFilter == null) {
                    this._applyFilter = (angular.isDefined(this.Filter));
                }
                return this._applyFilter;
            },
            get HasCustomFilter() {
                return this.CustomFilter !== null;
            },
            UpdateCustomFilterTexts: function () {
                var col = this;
                if (col.HasCustomFilter && angular.isDefined(col.CustomFilter.FnUpdateText) && angular.isFunction(col.CustomFilter.FnUpdateText)) {
                    col.CustomFilter.FnUpdateText.call(col.CustomFilter);
                }
            },
            get FilterType() {
                if (this.HasCustomFilter) {
                    if (angular.isDefined(this.CustomFilter.InputHtml)) {
                        return "CustomHtml";
                    }
                    return "Custom";
                }
                if (this.HasDistincts) {
                    return "Select";
                }
                return "Input";
            },
            TrustIt: function(val) {
                if (val !== null && angular.isDefined(val) && angular.isString(val)) {
                    return $sce.trustAsHtml(val);
                }
                return val;
            },
            GetValue: function (item) {
                if (this.CalculateColumn) {
                    return this.TrustIt(this.ValueFunction.call(this, item));
                }
                if (this.ActionCol) {
                    return ''; // needs to be handled with ValueFunction
                }
                if (this.ApplyFilter) {
                    return this.TrustIt($parse("item[col.Key] | " + this.Filter)(this, { item: item, col: this }));
                }
                return this.TrustIt(item[this.Key]);
            },
            get HasClickAction() {
                return (angular.isDefined(this.ClickAction) && angular.isFunction(this.ClickAction) && this.ClickAction !== null);
            },
            Clicked: function (item) {
                if (this.HasClickAction) {
                    this.ClickAction.call(this, item, this);
                }
            }
        }

        function defineProp(on, name, options) {
            var config = {
                //writable: true,
                enumerable: true,
                configurable: true
            }
            Object.defineProperty(Object.getPrototypeOf(on), name,
                angular.extend(config, options)
            );
        }

        function defineFunc(on, name, func) {
            Object.getPrototypeOf(on)[name] = func;
        }

        function FilterTable() {
            var ft = this;

            ft._loading = true;
            this._error = false;
            defineProp(this, 'test1', {
                    get: function () { return "foo"; },
                    set: function (val) { },
                }
            );

            this._loadTimeout = {};
            this.OptionsProvided = false;
            this.StructureSet = false;

            this._columns = [];
            this._data = [];
            this._dataCalc = [];
            this._dataCounter = 0;
            this._hasData = false;

            this.DataFiltered = [];
            this.DataDisplayed = [];
            this._currentPage = 1;
            this._filterPageCount = 0;

            this._currentCols = [];
            this._visibleCols = [];

            this.OrderByCols = [];

            this.Status = "Loading";
            this._actionCol = null;
            this.HeaderRows = [];
            this.FooterRows = [];
            this.Initialised = false;
            this.FilterUpdateHandler = {
                _pending: false,
                get Pending() { return this._pending; },
                set Pending(val) {
                    var me = this;
                    if (!me._pending && val) {
                        me._pending = val;
                        $timeout.cancel(me._delay);
                        this._delay = $timeout(function () {
                            ft.UpdateFilter(me.ResetHeaderAndFooter);
                            me._resetHeaderAndFooter = false;
                            me._pending = false;
                        }, 200);
                    }
                },
                _delay: null,
                _resetHeaderAndFooter: false,
                get ResetHeaderAndFooter() { return this._resetHeaderAndFooter; },
                set ResetHeaderAndFooter(val) {
                    this._resetHeaderAndFooter = this._resetHeaderAndFooter || val;
                    this.Pending = true;
                },
            };

            this.UpdateTranslations = function(callback) {
                var me = this;
                var arr = me.Translations.Keys;
                $translate(arr).then(function(translations) {
                    var i;
                    for (i = 0; i < arr.length; i++) {
                        var key = arr[i];
                        me.Translations[key] = translations[key];
                    }
                    for (i = 0; i < me.Columns.length; i++) {
                        var col = me.Columns[i];
                        col.UpdateCustomFilterTexts();
                    }
                    callback = callback || null;
                    if (angular.isDefined(callback) && angular.isFunction(callback)) {
                        callback.call(me);
                    }
                });
            };

            this.InitTranslations = function () {
                var me = this;
                var keys = me.Translations.Keys;
                var defineTranslationFor = function(thisKey) {
                    Object.defineProperty(me.Translations, thisKey, {
                        get: function () {
                            var val = me.Translations.backingfields[thisKey];
                            if ((val || null) == null) {
                                val = me.Translations.fallback[thisKey];
                            }
                            return val;
                        },
                        set: function (val) {
                            if (val === thisKey) {
                                delete me.Translations.backingfields[thisKey];
                            } else {
                                me.Translations.backingfields[thisKey] = val;
                            }
                        }
                    });
                }
                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i];
                    defineTranslationFor(key);
                }
            };
            //Currently not on prototype because that would affect every page, if wanted we can switch it, basically just move above function(s) and this declaration
            this.Translations = {
                backingfields: {},
                fallback: {
                    FilterTable_Error_Getting_Data: "Fehler beim Beziehen der Daten.",
                    FilterTable_Error_No_Data: "Keine Daten gefunden.",
                    FilterTable_Error_Filter_No_Data: "Filter enthält keine Daten.",
                    FilterTable_Page: "Seite",
                    FilterTable_Of: "von",
                    FilterTable_Total: "Total",
                    FilterTable_Records: "Datensätze",
                    FilterTable_Click_To_Select: "Klicken zum auswählen.",
                    FilterTable_0_Selected: "gewählt.",
                    FilterTable_Filter: "filtern",
                    FilterTable_Empty_Value: "(Kein Wert)",
                    FilterTable_Accept: "Übernehmen",
                    FilterTable_Cancel: "Abbrechen",
                    FilterTable_Reset_Filter: "Filter löschen",
                },
                get Keys() {
                    var arr = [];
                    for (var x in this.fallback) {
                        if (this.fallback.hasOwnProperty(x)) {
                            arr.push(x);
                        }
                    }
                    return arr;
                }
            };

            ft.InitTranslations();
        }

        FilterTable.prototype = {
            CreateDistincts: function (colDef, all, reduced) {
                var distinctHolder = {
                    All: null,
                    Reduced: null,
                };
                if (colDef.BuildSelect) {
                    var fetchDistincts = function (data) {
                        var onData = (data || []).map(function(item) { return item[colDef.Key] });
                        var distincts = {};
                        var distinctList = [];
                        for (var i = 0; i < onData.length; i++) {
                            var entry = onData[i];
                            if (entry == null || angular.isUndefined(entry)) {
                                entry = "";
                            }
                            if (angular.isUndefined(distincts[entry])) {
                                distincts[entry] = "";
                                distinctList.push(entry.toString());
                            }
                        }
                        distinctList = $filter("orderBy")(distinctList);
                        return distinctList;
                    }
                    if (all) {
                        distinctHolder.All = fetchDistincts(this.PassedData);
                    }
                    if (reduced) {
                        distinctHolder.Reduced = fetchDistincts(this.DataFiltered);
                    }
                }
                return distinctHolder;
            },
            get PassedData() {
                return this._dataCalc;
            },
            RecalculateData: function () {
                this.UpdateData(this._data, false);
            },
            set PassedData(val) {
                this.UpdateData(val, false);
            },
            UpdateData: function (newData, resetting) {
                resetting = resetting || false;
                var me = this;
                //if (me.Initialised && !resetting) {
                //    me._dataCounter++;
                //}
                if (!resetting) {
                    me._data = newData;
                    me.CheckColumnsDefs(me._data);
                    var dataCalc = [];
                    //var start = new Date().getTime();
                    var relevantCols = this.Columns.filter(function (v, i, a) { return !v.Ignore; });
                    for (var i = 0; i < me._data.length; i++) {
                        var row = me._data[i];
                        var calcRow = {};

                        for (var c = 0; c < relevantCols.length; c++) {
                            var col = relevantCols[c];
                            var val = row[col.Key];
                            //calcRow[col.Key] = val;
                            //calcRow[col.Key] = col.GetValue.call(col, row);
                            calcRow[col.Key] = col.GetValue(row);
                            if (col.AlternateSortCol !== null) {
                                if (row.hasOwnProperty(col.AlternateSortCol)) {
                                    calcRow[col.AlternateSortCol] = row[col.AlternateSortCol];
                                } else {
                                    calcRow[col.AlternateSortCol] = val;
                                }
                            }
                        }
                        //calcRow.origRow = row;
                        dataCalc.push(calcRow);
                    }
                    //console.log(" Elapsed:" + (new Date().getTime() - start));
                    me._dataCalc = this.GetOrdered(dataCalc);
                    me.ResetDistincts(true);
                } else {
                    me._dataCalc = this.GetOrdered(me._dataCalc);
                    me.ResetHeaders(true);
                    me.ResetFooters(true);
                }
                me._hasData = me._dataCalc.length > 0;
                me.FilterUpdateHandler.ResetHeaderAndFooter = !resetting;
                $timeout.cancel(me._loadTimeout);
                //if (!me._hasData && me._dataCounter > 1) {
                if (!me._hasData) {
                    me._loadTimeout = $timeout(function () {
                        me.Loading = false;
                        me.Error = !me._hasData && !me.InitialEmpty && !me.OptionsProvided;
                    }, 10000);
                } else {
                    me.Loading = false;
                }
            },
            ResetHeaders: function(onlyPageChange) {
                for (var i = 0; i < this.HeaderRows.length; i++) {
                    this.HeaderRows[i].ResetVal(onlyPageChange);
                }
            },
            ResetFooters: function (onlyPageChange) {
                for (var i = 0; i < this.FooterRows.length; i++) {
                    this.FooterRows[i].ResetVal(onlyPageChange);
                }
            },
            GetOrdered: function (data) {
                return $filter('orderBy')(data, this.OrderBy);
            },
            get CurrentPage() {
                return this._currentPage;
            },
            set CurrentPage(val) {
                this._currentPage = val;
                this.UpdateDisplayData();
            },
            get PageSizeCalc() {
                if (angular.isDefined(this.PageSize) && angular.isNumber(this.PageSize)) {
                    return Math.ceil(this.PageSize, 1);
                }
                return 10;
            },
            UpdateDisplayData: function () {
                var startIndex = (this.CurrentPage - 1) * this.PageSizeCalc;
                if (startIndex > this.DataFiltered.length) {
                    this.DataDisplayed = [];
                } else {
                    this.DataDisplayed = this.DataFiltered.slice(startIndex, startIndex + this.PageSizeCalc);
                }
                this.ResetHeaders(true);
                this.ResetFooters(true);
            },
            get BackwardDisabled() {
                return this.CurrentPage <= 1;
            },
            get PassedDataPageCount() {
                return Math.ceil(this.PassedData.length / this.PageSizeCalc);
            },
            get FilterDataPageCount() {
                return Math.ceil(this.DataFiltered.length / this.PageSizeCalc);
            },
            get FilterPageArray() {
                var x = [];
                for (var i = 1; i <= this.FilterDataPageCount; i++) {
                    x.push(i);
                }
                return x;
            },
            get ForwardDisabled() {
                return this.CurrentPage >= this.FilterDataPageCount;
            },
            get HasData() {
                //if (this._hasData == null) {
                //    this._hasData = this._data.length > 0;
                //}
                return this._hasData;
            },
            get ShowNoDataMsg() {
                return !this.Loading && !this.HasData;
            },
            get ShowDataFilteredOutMsg() {
                return !this.Loading && this.HasData && this.DataFiltered.length === 0;
            },
            get OrderBy() {
                var orderByList = [];
                for (var i = 0; i < this.OrderByCols.length; i++) {
                    var col = this.OrderByCols[i];
                    var orderByAdd = col.OrderBy;
                    if (orderByAdd != null) {
                        orderByList.push(orderByAdd);
                    }
                }
                return orderByList;
            },
            set OrderBy(col) {
                if ((col || null) === null) {
                    this.ClearOrderBy();
                    this.UpdateData(this.PassedData, true);
                } else if (Object.getPrototypeOf(col) === ColumnDef.prototype) {
                    var newOrderBy = !(col.orderAsc || false);
                    this.ClearOrderBy();
                    col.orderAsc = newOrderBy;
                    this.AddOrderBy(col);
                }
            },
            UpdateOrderBy: function (col, event) {
                var setDirect = !event.ctrlKey || this.OrderByCols.length === 0 || (col || null) === null || this.OrderByCols.length === 0 || Object.getPrototypeOf(col) !== ColumnDef.prototype;
                if (setDirect) {
                    this.OrderBy = col;
                } else {
                    var newOrderBy = !(col.orderAsc || false);
                    col.orderAsc = newOrderBy;
                    this.AddOrderBy(col);
                }
            },
            AddOrderBy: function (col, refresh) {
                var alreadyIn = this.OrderByCols.filter(function (v, i, a) { return v.Key === col.Key; });
                if (alreadyIn.length === 0) {
                    this.OrderByCols.push(col);
                }
                if (angular.isUndefined(refresh) || refresh === true) {
                    this.UpdateData(this.PassedData, true);
                }
            },
            ClearOrderBy: function () {
                for (var i = 0; i < this.OrderByCols.length; i++) {
                    this.OrderByCols[i].orderAsc = undefined;
                }
                this.OrderByCols.length = 0;
            },
            ColByKey: function (key) {
                var cols = this.Columns.filter(function (v, i, a) { return v.Key === key });
                if (cols.length === 1) {
                    return cols[0];
                }
                return null;
            },
            CheckColumnsDefs: function (data) {
                if (!this.OptionsProvided) {
                    this.StructureSet = false;
                    var d = data || [];
                    var cDef = [];
                    if (d.length > 0) {
                        var firstRow = d[0];
                        for (var col in firstRow) {
                            if (firstRow.hasOwnProperty(col) && col !== "$$hashKey") {
                                cDef.push({ Key: col });
                            }
                        }
                        if (cDef.length > 0) {
                            this.Columns = this.UpdateColumnsDefs(cDef);
                        }
                    }
                }
                return data;
            },
            UpdateColumnsDefs: function (inDef) {
                var defs = inDef || [];
                var prepared = [];
                var changed = false;
                for (var i = 0; i < defs.length; i++) {
                    var def = defs[i];
                    var existing = this.ColByKey(def.Key);
                    var colDef = existing == null ? createColumn(def, this) : existing;
                    changed = changed || (existing !== colDef);
                    if (colDef !== null) {
                        prepared.push(colDef);
                    }
                }
                changed = changed || (defs.length !== prepared.length) || (prepared.length !== this.Columns.length);
                this.StructureSet = prepared.length > 0;
                if (!changed) {
                    prepared = this.Columns;
                }
                this.UpdateColumnLists(prepared);
                this.UpdateStatus();
                return prepared;
            },
            UpdateColumnLists: function (columns) {
                this._currentCols = columns.filter(function (v, i, a) { return !v.Ignore && !v.ActionCol; });
                this._visibleCols = this._currentCols.filter(function (v, i, a) { return v.Visible; });
                this.InitFilter();
            },
            get CurrentCols() {
                return this._currentCols;
            },
            get VisibleCols() {
                return this._visibleCols;
            },
            //SetIgnoreColumns: function (cols) {
            //    this.ChangeColValue(cols, "Ignore", true);
            //},
            //SetBuildSelectsOnColumns: function (cols) {
            //    this.ChangeColValue(cols, "BuildSelect", true);
            //},
            ChangeColValue: function (cols, prop, newValue) {
                var colsToChange = angular.isDefined(cols) ? (angular.isArray(cols) ? cols : [cols]) : [];
                for (var i = 0; i < colsToChange.length; i++) {
                    var col = this.ColByKey(colsToChange[i]) || null;
                    if (col !== null) {
                        col[prop] = newValue;
                    }
                }
            },
            get Loading() {
                return this._loading;
            },
            set Loading(val) {
                this._loading = val;
                this.UpdateStatus();
            },
            set Error(val) {
                this._error = val;
                this.UpdateStatus();
            },
            UpdateStatus: function () {
                if (this._error) {
                    this.Status = "Error";
                    return;
                }
                if (this.StructureSet) {
                    this.Status = "Structure";
                    return;
                }
                if (this._loading) {
                    this.Status = "Loading";
                    return;
                }
                //if (this.OptionsProvided) {
                //    this.Status = "Structure";
                //    return;
                //}

                this.Status = "undefined";
                //if (this.HasData) {
                //    this.Status = "Data";
                //}
            },
            InitFilter: function () {
                var me = this;
                var x = me.TableFilter;
                var f = {
                    backingfields: {},
                };
                function defineFilterProp(name) {
                    Object.defineProperty(f, name, {
                        get: function () { return f.backingfields[name]; },
                        set: function (newValue) {
                            var changed = f.backingfields[name] !== newValue;
                            f.backingfields[name] = newValue;
                            me.FilterUpdateHandler.ResetHeaderAndFooter = changed;
                        },
                    });
                }

                var defaultfilters = this.CurrentCols.filter(function(item) { return !item.HasCustomFilter; });
                for (var i = 0; i < defaultfilters.length; i++) {
                    var col = defaultfilters[i];
                    var val = x[col.Key];
                    var name = col.Key;
                    defineFilterProp(name);
                    f.backingfields[name] = val;
                }
                this.TableFilter = f;
            },
            ClearFilter: function () {
                //this.TableFilter = {}; //new: clear only visible filters
                for (var i = 0; i < this.VisibleCols.length; i++) {
                    var col = this.VisibleCols[i];
                    this.ResetFilter(col);
                }
            },
            ResetFilter: function(col) {
                if (col.HasCustomFilter) {
                    if (angular.isDefined(col.CustomFilter.FnReset) && angular.isFunction(col.CustomFilter.FnReset)) {
                        col.CustomFilter.FnReset.call(col.CustomFilter, col);
                        this.FilterUpdateHandler.ResetHeaderAndFooter = true;
                    }
                } else {
                    this.TableFilter[col.Key] = null;
                }
            },
            CleanTableFilter: function (filter) {
                var term = angular.copy(filter || {});
                for (var x in term) {
                    if (term.hasOwnProperty(x)) { //always will filter out null values otherwise we can't really "clear" a filter on null values
                        if ((term[x] || null) === null || term[x] === "") {
                            delete term[x];
                        }
                    }
                }
                return term;
            },
            UpdateFilter: function (resetHeaderAndFooter) {
                var dataFiltered = $filter('filter')(this._dataCalc, this.CleanTableFilter(this.TableFilter.backingfields));
                var customFilters = this.CurrentCols.filter(function (item) { return item.HasCustomFilter; });
                for (var i = 0; i < customFilters.length; i++) {
                    var cfCol = customFilters[i];
                    try {
                        var nextFilter = dataFiltered.filter(function (item) { return cfCol.CustomFilter.FnFilter.call(cfCol.CustomFilter, item, cfCol); });
                        dataFiltered = nextFilter;
                    } catch (ex) {
                        console.log("Filter didn't compute.", ex);
                    }
                }
                this.DataFiltered = dataFiltered;
                this.ResetDistincts(this.ReduceSelects);
                this.CurrentPage = 1;
                if (resetHeaderAndFooter || false) {
                    this.ResetHeaders();
                    this.ResetFooters();
                }
            },
            ResetDistincts: function (reset) {
                if (reset) {
                    for (var i = 0; i < this.Columns.length; i++) {
                        var col = this.Columns[i];
                        if (Object.getPrototypeOf(col) === ColumnDef.prototype) {
                            col.ResetDistincts(true);
                        }
                    }
                }
            },
            get ActionCol() {
                if (this._actionCol == null) {
                    var actionCol = this.Columns.filter(function (v, i, a) { return v.ActionCol; });
                    if (actionCol.length === 1) { //TODO: multiple ?
                        this._actionCol = actionCol[0];
                    } else {
                        this._actionCol = createColumn({ Key: "theEmptyActionCol", ValueFunction: function (row) { return ''; } });
                    }
                }
                return this._actionCol;
            },
            set ActionCol(val) {
                this._actionCol = val;
            },
            ExecuteClickAction: function (col, item) {
                if (col.HasClickAction) {
                    col.Clicked(item);
                }
            },
            Refresh: function() {
                var me = this;
                me.Loading = true;
                for (var i = 0; i < me.Columns.length; i++) {
                    var col = me.Columns[i];
                    col.ResetDisplay();
                }

                var x = me.Columns;
                me._currentCols =[];
                me._visibleCols =[];
                $timeout(function() {
                    me.UpdateColumnLists(x);
                    me.RecalculateData();
                });
            }
        }

        function getDefined() {
            for (var i = 0; i < arguments.length; i++) {
                if (angular.isDefined(arguments[i])) {
                    return arguments[i];
                }
            }
            return undefined;
        }

        function checkOverwrite(array, key) {
            return (array || []).indexOf(key) > -1 ? true : undefined;
        }

        function createColumn(basedOn, ft) {
            var filterTable = ft || {};
            if (Object.getPrototypeOf(basedOn) === ColumnDef.prototype) {
                return basedOn;
            }
            var c = new ColumnDef();
            c.Key = getDefined(basedOn.key, basedOn.Key, null);

            c.ActionCol = getDefined(basedOn.actionCol, basedOn.ActionCol, false);
            c.ValueFunction = getDefined(basedOn.valueFunction, basedOn.ValueFunction, null);
            c.ClickAction = getDefined(basedOn.clickAction, basedOn.ClickAction, null);

            c.Ignore = getDefined(checkOverwrite(filterTable.IgnoreColumns, c.Key), basedOn.ignore, basedOn.Ignore, false);

            c.Visible = getDefined(basedOn.visible, basedOn.Visible, false);
            c.DisplayKey = getDefined(basedOn.displayKey, basedOn.DisplayKey, basedOn.display, basedOn.Display, c.Key);
            //c.Display = getDefined(basedOn.display, basedOn.Display);

            c.CanBuildSelect = getDefined((filterTable.NoSearchSelects === true ? false : undefined), checkOverwrite(filterTable.NoSelectsOnColumns, c.Key), basedOn.canSelect, basedOn.CanBuildSelect, true);
            c.BuildSelect = getDefined(checkOverwrite(filterTable.SelectsOnColumns, c.Key), basedOn.select, basedOn.BuildSelect, false);
            c.orderAsc = getDefined(checkOverwrite(filterTable.Order, c.Key), basedOn.orderAsc, basedOn.orderAsc);
            c.Filter = getDefined(basedOn.filter, basedOn.Filter);
            c.AlternateSortCol = getDefined(basedOn.alternateSortCol, basedOn.AlternateSortCol,  null);
            c.CustomFilter = getDefined(basedOn.customFilter, basedOn.CustomFilter, null);

            c._style = getDefined(basedOn.style, basedOn.Style, null);

            var isDate = getDefined(basedOn.isDate, basedOn.IsDate, false);
            if (isDate && c.AlternateSortCol === null) {
                c.AlternateSortCol = c.Key + "_Order_Col";
            }

            if (c.Key == null) {
                console.log("invalid item - missing 'key':");
                console.log(basedOn);
                return null;
            }

            filterTable = ft || null;

            if (c.CustomFilter !== null) {
                if (angular.isString(c.CustomFilter)) {
                    if (c.CustomFilter === "MultiSelect") {
                        //TODO: localisation
                        c.CanBuildSelect = true;
                        c.BuildSelect = true;
                        //Replace it
                        c.CustomFilter = {
                            Text: c.Display + " " + ft.Translations.FilterTable_Filter,
                            TemplateUrl: "./src/Scripts/app/FilterTable/Views/FilterTableMultiSelect.html",
                            Controller: "FilterTableModalMultiSelectCtrl",
                            Tooltip: ft.Translations.FilterTable_Click_To_Select,
                            Selected: {},
                            FnFilter: function (item, col) {
                                if (Object.keys(this.Selected).length === 0) {
                                    return true;
                                }
                                var val = item[c.Key];
                                val = (val === null || angular.isUndefined(val)) ? "" : val; //null and undefined -> ""
                                val = val.toString(); // TrustedValueHolder --> back to strings
                                return angular.isDefined(this.Selected[val]);
                            },
                            FnReset: function() {
                                this.Tooltip = ft.Translations.FilterTable_Click_To_Select,
                                    this.Text = c.Display + " " + ft.Translations.FilterTable_Filter,
                                    this.Selected = {};
                            },
                            FnUpdateText: function() {
                                var selected = Object.keys(this.Selected);
                                var l = selected.length;
                                if (l > 0) {
                                    this.Tooltip = selected.join(', ');
                                    this.Text = l + " " + ft.Translations.FilterTable_0_Selected;
                                } else {
                                    this.Tooltip = ft.Translations.FilterTable_Click_To_Select;
                                    this.Text = c.Display + " " + ft.Translations.FilterTable_Filter;
                                }
                            }
                        }
                    }

                    if (c.CustomFilter === "ConditionalNumberFilter") {
                        //TODO: localisation
                        c.CanBuildSelect = true;
                        c.BuildSelect = true;
                        //Replace it
                        c.CustomFilter = {
                            Text: " ... ",
                            TemplateUrl: "./src/Scripts/app/FilterTable/Views/FilterConditionalNumber.html",
                            Controller: "FilterTableModalConditionalSelectCtrl",
                            Tooltip: ft.Translations.FilterTable_Conditional_Filter,
                            Selected: {},
                            FnFilter: function (item, col) {
                                if (this.Selected.length === 0) {
                                    return true;
                                }

                                var val = item[c.Key];
                                val = (val === null || angular.isUndefined(val)) ? "" : val; //null and undefined -> ""
                                val = $sce.valueOf(val);

                                //Removing no number characters (this was added due to the display)
                                val = val.split(",").join("");

                                //Convert it to a number
                                val = parseFloat(val);

                                //When its not number, than this item will be sorted out
                                if(isNaN(val)){
                                    return false;
                                }

                                //Grouping each statement into and groups for easier processing
                                var groupByAnd = new Array();
                                var groupIndex = 0;
                                angular.forEach(this.Selected, function(conditionItem){
                                    if( Object.prototype.toString.call( groupByAnd[groupIndex] ) !== '[object Array]' ) {
                                        groupByAnd[groupIndex] = new Array();
                                    }
                                    groupByAnd[groupIndex].push(conditionItem);

                                    //If the AND statement is closed, a new group will be created
                                    if(conditionItem.conjunction == 'AND'){
                                        groupIndex++;
                                    }
                                });

                                var conditionIsTruthy = true;
                                angular.forEach(groupByAnd, function(groupedConditions){
                                    if(conditionIsTruthy){
                                        var loopOr = true;
                                        angular.forEach(groupedConditions, function(conditionItem){
                                            if(loopOr){
                                                conditionIsTruthy = conditionIsTrue(conditionItem.condition, parseFloat(conditionItem.value), val);
                                                if(conditionIsTruthy){
                                                    loopOr = false;
                                                }
                                            }
                                        });
                                    }
                                });

                                return conditionIsTruthy;
                            },
                            FnReset: function() {
                                this.Selected = [];
                                this.Tooltip = "";
                                this.Text = "..."
                            },
                            FnUpdateText: function() {

                            }
                        }
                    }


                    if (c.CustomFilter === "ConditionalDateFilter") {
                        //TODO: localisation
                        c.CanBuildSelect = true;
                        c.BuildSelect = true;
                        //Replace it
                        c.CustomFilter = {
                            Text: " ... ",
                            TemplateUrl: "./src/Scripts/app/FilterTable/Views/FilterConditionalDate.html",
                            Controller: "FilterTableModalConditionalSelectCtrl",
                            Tooltip: ft.Translations.FilterTable_Conditional_Filter,
                            Selected: {},
                            FnFilter: function (item, col) {
                                if (this.Selected.length === 0) {
                                    return true;
                                }

                                var val = item[c.Key];
                                val = (val === null || angular.isUndefined(val)) ? "" : val; //null and undefined -> ""
                                val = $sce.valueOf(val);

                                val = stringToDate(val);

                                //Grouping each statement into and groups for easier processing
                                var groupByAnd = new Array();
                                var groupIndex = 0;
                                angular.forEach(this.Selected, function(conditionItem){
                                    if( Object.prototype.toString.call( groupByAnd[groupIndex] ) !== '[object Array]' ) {
                                        groupByAnd[groupIndex] = new Array();
                                    }
                                    groupByAnd[groupIndex].push(conditionItem);

                                    //If the AND statement is closed, a new group will be created
                                    if(conditionItem.conjunction == 'AND'){
                                        groupIndex++;
                                    }
                                });

                                var conditionIsTruthy = true;
                                angular.forEach(groupByAnd, function(groupedConditions){
                                    if(conditionIsTruthy){
                                        var loopOr = true;
                                        angular.forEach(groupedConditions, function(conditionItem){
                                            if(loopOr){
                                                var conditionItemValue = stringToDate(conditionItem.value);
                                                conditionIsTruthy = conditionIsTrue(conditionItem.condition, conditionItemValue.getTime(), val.getTime());
                                                if(conditionIsTruthy){
                                                    loopOr = false;
                                                }
                                            }
                                        });
                                    }
                                });

                                return conditionIsTruthy;
                            },
                            FnReset: function() {
                                this.Selected = [];
                                this.Tooltip = "";
                                this.Text = "..."
                            },
                            FnUpdateText: function() {}
                        }
                    }
                }

                if (angular.isUndefined(c.CustomFilter.FnFilter) || !angular.isFunction(c.CustomFilter.FnFilter)) {
                    console.log("invalid filter function for customfilter on column '" + c.Key + "'");
                    console.log(basedOn);
                    return null;
                }
                if (angular.isUndefined(c.CustomFilter.FnReset) || !angular.isFunction(c.CustomFilter.FnReset)) {
                    console.log("invalid reset function for customfilter on column '" + c.Key + "'");
                    console.log(basedOn);
                    return null;
                }
                if (angular.isUndefined(c.CustomFilter.TemplateUrl) || c.CustomFilter.TemplateUrl == null || c.CustomFilter.TemplateUrl.trim() === "") {
                    console.log("invalid TemplateUrl for customfilter on column '" + c.Key + "'");
                    console.log(basedOn);
                    return null;
                }
                if (angular.isUndefined(c.CustomFilter.Controller) || c.CustomFilter.Controller == null || c.CustomFilter.Controller.trim() === "") {
                    console.log("invalid Controller for customfilter on column '" + c.Key + "'");
                    console.log(basedOn);
                    return null;
                }
            }

            c.GetFilterTable = function () { return filterTable; };

            if (angular.isDefined(c.orderAsc) && filterTable !== null) {
                filterTable.AddOrderBy(c, false);
            }
            return c;
        }


        //A string in format like 12.04.2016 will be converted to a date
        function stringToDate(date){
            //Splitting by dot in order to convert it to a date later
            var d = date.split(".");

            //Convert it to a date, substracting 1 from month since it starts with 0
            d = new Date(parseInt(d[2]), parseInt(d[1])-1, parseInt(d[0]))
            return d;
        }

        function conditionIsTrue(condition, checkedValue, value){
            switch (condition) {
                case '==':
                    return (value == checkedValue);
                    break;
                case '>':
                    return (value > checkedValue);
                    break;
                case '>=':
                    return (value >= checkedValue);
                    break;
                case '<':
                    return (value < checkedValue);
                    break;
                case '<=':
                    return (value <= checkedValue);
                    break;
                case '!=':
                    return (value != checkedValue);
                    break;
            }

            return true;
        }

        return {
            FilterTable: FilterTable,
            HeaderDef: HeaderDef,
            GetDefined: getDefined,
        }
    }])
})();


/* #### File: ./src/Scripts/app/FilterTable/Services/FilterTableStorageService.js */ 
(function () {
    "use strict";

    angular.module("smlAppl.webApps.framework.filterTable.services")
		.service("FilterTableStorageService", [function () {
		    var _self = this;

		    var persistenceObject = {
		        filterValue: {},
		        filterSort: [],
		        expireInSeconds: null
		    };

		    // Loading data from localstorage to table
		    this.load = function (filterTableKey, tOptions, keys) {

		        var filterStorage = localStorage[filterTableKey];
		        //Check whether filter data already has been stored
		        if (!localStorage[filterTableKey]) {
		            return;
		        }

		        filterStorage = JSON.parse(filterStorage);

		        //If the persistenceObject has expired than ignore it
		        if (filterStorage.expireInSeconds && filterStorage.expireInSeconds < new Date().getTime()) {
		            return;
		        }

		        //If keys is not defined than load all
		        if (!keys) {
		            keys = _self._getColumns(tOptions);
		        }

		        //Going through all saved filterValues and applies it to table if exists
		        _.each(filterStorage.filterValue, function (value, key) {

		            if (_self._keyExists(key, tOptions)) {
		                var col = _.findWhere(tOptions.Columns, { key: key });
		                //If its a multiselect
		                if (col && col.customFilter) {
		                    
		                    setTimeout(function () {
		                        var col = _.findWhere(tOptions.Columns, { _key: key });
		                        col.CustomFilter.Selected = value;
		                    });
		                    		                } else {
		                    tOptions.TableFilter[key] = value;
		                }

		            } else {
		            }
		        });
		    };

		    // Persisting data from table into localstorage
		    this.persist = function (filterTableKey, tOptions, keys, options) {
		        persistenceObject.filterValue = {};

		        //If keys is not defined than persist all
		        if (!keys) {
		            keys = _self._getColumns(tOptions);
		        }

		        //Persisting each given key from the table only if the table has the column

		        _.each(keys, function (key) {
		            //Make sure no undefined is saved
		            var value = tOptions.TableFilter[key];
		            value = (value == undefined ? "" : value);

		            //Persisting the key specified and only the ones that are actually in the table
		            if (_self._keyExists(key, tOptions)) {

		                var col = _.findWhere(tOptions.Columns, { _key: key });
                        //If its a multiselect
		                if (col.CustomFilter) {
		                    persistenceObject.filterValue[key] = col.CustomFilter.Selected;
		                } else {
                            //else if its simple input field
		                    persistenceObject.filterValue[key] = value;
		                }
                        
		            } else {
		                //Ignoring this column
		            }
		        });

		        //If a specific expireInSeconds (e.x. when 60 is given, than this object will expire in 1 minute) is given as option, than use that otherwise take default 1h
		        persistenceObject.expireInSeconds = new Date().getTime() + (options && options.expireInSeconds ? options.expireInSeconds * 1000 : 60 * 60 * 1000);
		        
		        localStorage[filterTableKey] = JSON.stringify(persistenceObject);
		    };

		    //Watch for changes and persist it automatically
		    this.autoPersist = function (filterTableKey, tOptions, keys, options, scope) {
		        scope.$watch(function () {
		            return tOptions;
		        }, function (tOptionsNew) {
		            _self.persist(filterTableKey, tOptionsNew, keys, options);
		        }, true);
		    }

		    //Returns all available columns
		    this._getColumns = function (tOptions) {
		        var columns = [];

		        _.each(tOptions.Columns, function (column) {
		            if (column._key) {
		                columns.push(column._key);
		            } else if(column.key){
		                columns.push(column.key);
		            }

		        });

		        return columns;
		    }

		    this._keyExists = function (key, tOptions) {
		        var continueSearch = true;
		        var match = false;
		        _.each(_self._getColumns(tOptions), function (column) {
		            if (continueSearch && column == key) {
		                match = true;
		                continueSearch = false;
		            };
		        });
                
		        return match;
		    }
		}]);
})();


/* #### File: ./src/Scripts/app/Filters/ChDate.js */ 
(function() {

	"use strict";

	angular.module("smlAppl.webApps.framework.filters")
		.filter("chDate", [
			"$filter", function($filter) {
				var angularDateFilter = $filter("date");
				return function(theDate) {
					return angularDateFilter(theDate, "dd.MM.yyyy");
				}
			}
		])
		.filter("chDateTime", [
			"$filter", function($filter) {
				var angularDateFilter = $filter("date");
				return function(theDate) {
					return angularDateFilter(theDate, "dd.MM.yyyy HH:mm:ss");
				}
			}
		]);

})();

/* #### File: ./src/Scripts/app/Filters/decimal.js */ 
(function() {

	"use strict";

	angular.module("smlAppl.webApps.framework.filters")
		.filter("decimal", [
			"$filter", function($filter) {
				var angularNumberFilter = $filter("number");
				return function(value, fraction) {
					if (!fraction || !angular.isNumber(fraction)) {
						fraction = 0;
					}

					return angularNumberFilter(value, fraction);
				}
			}
		]);

})();

/* #### File: ./src/Scripts/app/Services/DataResource/Employee.js */ 
/*
	Needs the EmployeesController from the Api-Framework.
*/

(function() {
	"use strict";

	angular.module("smlAppl.webApps.framework.services")
		.service("Employee", [
			"$http", "appConfigFw", "HttpHandler",
			function ($http, appConfigFw, HttpHandler) {


				var baseUri = appConfigFw.uriFwBaseApi + "Employees/";

				this.getAll = function () {
					var request = $http.get(baseUri);
					return request.then(HttpHandler.handleSuccess, HttpHandler.handleGetErrorWithNotify);
				};

				this.getById = function (id) {
					var request = $http.get(baseUri + id);
					return request.then(HttpHandler.handleSuccess, HttpHandler.handleGetErrorWithNotify);
				};

				this.getByFilter = function (filter) {
					var params = {
						filter: filter
					};

					var request = $http.get(baseUri + "GetByFilter", { params: params });
					return request.then(HttpHandler.handleSuccess, HttpHandler.handleGetErrorWithNotify);
				};
			}
		]);

})();

/* #### File: ./src/Scripts/app/Services/HttpHandler.js */ 
/*
	This service will handle the response of a promise from $http-calls.
	Usage: return request.then(HttpHandler.handleSuccess, HttpHandler.handleError);
	Usage: return request.then(HttpHandler.handleSuccess, HttpHandler.handleSaveErrorWithNotify);
*/

(function() {
	"use strict";

	angular.module("smlAppl.webApps.framework.services")
		.service("HttpHandler", [
			"$q", "Notify", "Principal",
			function ($q, Notify, Principal) {

				var self = this;

				// Original code from: http://www.bennadel.com/blog/2612-using-the-http-service-in-angularjs-to-make-ajax-requests.htm

				// transform the error response, unwrapping the application data from the API response payload.
				this.handleError = function(response) {
					console.log(response);
					// The API response from the server should be returned in a
					// nomralized format. However, if the request was not handled by the
					// server (or what not handles properly - ex. server error), then we
					// may have to normalize it on our end, as best we can.
					if (!angular.isObject(response.data) && !response.statusText) {
						response.statusText = "An unknown error occurred.";
					}

					// Otherwise, use expected error message.
					return ($q.reject(response));
				}

				// calls handleError and then shows a get error-notification
				this.handleGetErrorWithNotify = function (response) {
					var handledResponse = self.handleError(response);

					// 401 = Unauthorized
					if (!(response.status === 401 && !Principal.isAuthenticated())) {
						// just show the get error when the user is not unauthorized or authenticated
						// because in this case the user gets redirected to the login-page
						Notify.alertGetError(handledResponse);
					}

					// return new promise which could be handled
					return $q.reject(handledResponse);
				}

				// calls handleError and then shows a save error-notification
				this.handleSaveErrorWithNotify = function (response) {
					var handledResponse = self.handleError(response);

					Notify.alertSaveError(handledResponse);

					if (response && response.statusText && response.data && response.data.ExceptionMessage) {
						// exception was returned -> write it to console
						console.log("%c" + response.statusText + " (" + response.data.ExceptionType + "): " + response.data.ExceptionMessage, 'background: black; color: yellow');
					}

					// return new promise which could be handled
					return $q.reject(handledResponse);
				}

				// transform the successful response, unwrapping the application data from the API response payload.
				this.handleSuccess = function(response) {
					return (response.data);
				}
			}
		]);

})();

/* #### File: ./src/Scripts/app/Services/InfoButton.js */ 
function InfoButton(viewUri) {
	this.viewUri = viewUri;
}

/* #### File: ./src/Scripts/app/Services/MsgBox.js */ 
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


/* #### File: ./src/Scripts/app/Services/Notify.js */ 
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
						if (response.data && response.data.Validations && response.data.Validations.length > 0) {
							// validation errors occured
							message = "View_Validation_Error_Msg";
						} else {
							message = "Msg_Save_Error";
						}
					}

					alertErrorInternal(message);
				}

				// for http actions

				this.alertGetError = function (response) {
					var message = response.statusText;

					if (!message) {
						// no message text, show general error
						message = "Msg_DataGet_Error";
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

/* #### File: ./src/Scripts/app/Services/Security/AuthInterceptor.js */ 
(function() {
	"use strict";

	angular.module("smlAppl.webApps.framework.services")
		.service("AuthInterceptor", [
			"$q", "$injector", "Principal", function($q, $injector, Principal) {

				this.request = function(config) {


					config.headers = config.headers || {};

					//var authData = $cookies.getObject(webAppName + "_token");
					var authData = Principal.getTokenCookie();
					if (authData) {
						config.headers.Authorization = "Bearer " + authData.token;
					}

					return config;
				};

				this.responseError = function(rejection) {

					var isAuthenticated = Principal.isAuthenticated();

					// show login page when user is not authenticated
					if (rejection.status === 401 && !isAuthenticated) {
						// Used injector because of circular reference. See http://stackoverflow.com/a/20230786
						$injector.get("$state").transitionTo("login");
					} else if (rejection.status === 401) {
						// user is authenticated so show forbidden page
						$injector.get("$state").transitionTo("forbidden");
					}

					return $q.reject(rejection);
				};
			}
		]);

})();

/* #### File: ./src/Scripts/app/Services/Security/Authentication.js */ 
(function() {
	"use strict";

	angular.module("smlAppl.webApps.framework.services")
		.service("Authentication", [
			"$http", "$q", "appConfig", "HttpHandler", "Principal", "jwtHelper", "$cookies", function
			($http, $q, appConfig, HttpHandler, Principal, jwtHelper, $cookies) {

				var self = this;

				var serviceBase = "oauth/";

				// service functions

				this.login = function(loginData) {

					var data = "grant_type=password&username=" + encodeURIComponent(loginData.userName) + "&password=" + encodeURIComponent(loginData.password);

					var deferred = $q.defer();

					$http.post(serviceBase + "token", data, { headers: { 'Content-Type': "application/x-www-form-urlencoded" } }).success(function(response) {

						Principal.authenticate(response.access_token);

						deferred.resolve(response);

					}).error(function(response) {
						self.logOut();
						deferred.reject(response);
					});

					return deferred.promise;

				};

				this.logOut = function() {
					Principal.logOut();
				};

				this.fillAuthData = function() {

					var authData = Principal.getTokenCookie();
					if (authData) {
						Principal.authenticate(authData.token);
					}

				}

				this.claims = function() {
					var request = $http.get(appConfig.uriBaseApi + "Claims");
					return request.then(HttpHandler.handleSuccess, HttpHandler.handleGetErrorWithNotify);
				};

				this.roles = function() {
					var request = $http.get(appConfig.uriBaseApi + "Claims/GetRoles");
					return request.then(HttpHandler.handleSuccess, HttpHandler.handleGetErrorWithNotify);
				}
			}
		]);
})();

/* #### File: ./src/Scripts/app/Services/Security/Authorization.js */ 
(function() {
	"use strict";

	angular.module("smlAppl.webApps.framework.services")
		.factory("Authorization", [
			"$rootScope", "$state", "Principal",
			function($rootScope, $state, Principal) {
				return {
					authorize: function() {
						return Principal.identity()
							.then(function() {
								var isAuthenticated = Principal.isAuthenticated();
								var isExpired = Principal.isExpired();

								if (isAuthenticated && isExpired && $rootScope.toState.name !== "login") {
									// user-token is expired so go to login-page (check toState != "login" because of circular reference)
									$state.go("login");
								}

								if ($rootScope.toState.data && $rootScope.toState.data.roles && $rootScope.toState.data.roles.length > 0 && !Principal.isInAnyRole($rootScope.toState.data.roles)) {

									console.log("Is in any role: " + Principal.isInAnyRole($rootScope.toState.data.roles));

									if (isAuthenticated) {
										$state.go("forbidden"); // user is signed in but not authorized for desired state
									} else {
										// user is not authenticated. stow the state they wanted before you
										// send them to the signin state, so you can return them when you're done
										$rootScope.returnToState = $rootScope.toState;
										$rootScope.returnToStateParams = $rootScope.toStateParams;

										// now, send them to the signin state so they can log in
										$state.go("login");
									}
								}
							});
					}
				};
			}
		]);

})();

/* #### File: ./src/Scripts/app/Services/Security/Principal.js */ 
// http://stackoverflow.com/questions/22537311/angular-ui-router-login-authentication/22540482#22540482

(function () {
	"use strict";

	angular.module("smlAppl.webApps.framework.services")
		.service("Principal", [
			"$q", "$timeout", "appConfig", "$rootScope", "jwtHelper", "$cookies",
			function($q, $timeout, appConfig, $rootScope, jwtHelper, $cookies) {

				var cookieTokenName = webAppName + "_token";

				var self = this;

				var _identity = {
					userName: "",
					roles: [],
					//expiration: null, // epoch / unix timestamp
					//employeeId: null
				};
				var _authenticated = false;
			    var tokenDecoded = null; // for later requests


				// service functions

				this.isIdentityResolved = function() {
					return angular.isDefined(_identity);
				};

				this.roles = function() {
					return _identity.roles;
				};

				this.userName = function() {
					if (!_identity) {
						return null;
					}

					return _identity.userName;
				};

				this.isAuthenticated = function() {
					// cookie will automatically be deleted once it's expired
					if (self.getTokenCookie()) {
						_authenticated = true;
						return true;
					} else {
						_authenticated = false;
						return false;
					}
				};

				this.isExpired = function() {
					//var token = $cookies.getObject(cookieTokenName);

					//if (token) {
					//	return true;
					//}
					//var tokenDecoded = jwtHelper.decodeToken(getTokenCookie());

					//if (!_identity.expiration) {
					//	return false;
					//}

					//return _identity.expiration <= moment().unix();

					// should be possible to deleted as isAuthenticated returns false when token is expired!
					return false;
				};

				this.isAdmin = function() {
					if (!_authenticated) return false;

					return _identity.roles.indexOf(appConfig.rights.admin) !== -1;
				};

				this.isInRole = function(role) {
					if (!_authenticated || !_identity.roles) return false;

					if (this.isAdmin()) {
						return true;
					}

					return _identity.roles.indexOf(role) !== -1;
				};

				this.isInAnyRole = function(roles) {
					if (!_authenticated || !_identity.roles) return false;

					for (var i = 0; i < roles.length; i++) {
						if (this.isInRole(roles[i])) return true;
					}

					return false;
				};

                this.isUserOvertaken = function() {
                    return tokenGetIsUserOvertaken(tokenDecoded);
                }

			    this.authenticate = function(token) {
					var tokenDecoded = jwtHelper.decodeToken(token);

					var userName = tokenGetUserName(tokenDecoded);

					self.setTokenCookie(token);

					// lower-case the rights
					var roles = [];
					angular.forEach(tokenDecoded.role, function(item) {
						roles.push(item.toLowerCase());
					});

					var identity = {
						userName: userName,
						roles: roles,
                        isUserOvertaken: false
						//expiration: tokenDecoded.exp,
						//employeeId: employeeId
					}

					_identity = identity;
					_authenticated = true;

					$rootScope.$broadcast("onPrincipalChanged");
				};

				this.logOut = function () {
					$cookies.remove(cookieTokenName, { path: "/" });

					_identity = {
						userName: "",
						roles: []
					};
					_authenticated = false;
				    tokenDecoded = null;

					$rootScope.$broadcast("onPrincipalChanged");
				};

				this.identity = function(force) {
					var deferred = $q.defer();

					console.log("force: " + force);
					if (force === true) {
						console.log("Forced!");
						_identity = undefined;
					}

					// check and see if we have retrieved the identity data from the server. if we have, reuse it by immediately resolving
					if (angular.isDefined(_identity)) {
						deferred.resolve(_identity);

						return deferred.promise;
					}

					return deferred.promise;
				};

				this.setTokenCookie = function(token) {

					tokenDecoded = jwtHelper.decodeToken(token);

					var userName = tokenGetUserName(tokenDecoded);
					var employeeId = tokenGetEmployeeId(tokenDecoded);

				    $cookies.putObject(cookieTokenName,
				        {
				            token: token,
				            userName: userName,
				            expiration: tokenDecoded.exp,
				            employeeId: employeeId
				        },
				        { path: "/", expires: moment.unix(tokenDecoded.exp).format() }
				    );
				};

				this.getTokenCookie = function() {
					return $cookies.getObject(cookieTokenName);
				};


			    // Helper functions
				function tokenGetEmployeeId(tokenDecoded) {
				    return tokenDecoded["http://sml.zhaw.ch/2013/07/identity/claims/employeeid"];
				}

				function tokenGetIsUserOvertaken(tokenDecoded) {
				    if (!tokenDecoded) {
				        // no token
				        return false;
				    }

				    var value = tokenDecoded["http://sml.zhaw.ch/2016/08/identity/claims/isuserovertaken"];
			        if (!value) {
			            // until SmlAppl.Framework v00.047
			            value = tokenDecoded["Overtaken"];
			        }

			        if (value) {
			            return value.toLowerCase() === "true";
			        }

			        // if the claim is not provided it's not overtaken
			        return false;
			    }

				function tokenGetUserName(tokenDecoded) {
					return tokenDecoded["unique_name"];
				}
			}
		]);
})();

/* #### File: ./src/Scripts/app/Services/infoButtonProvider.js */ 
(function() {
	"use strict";

	angular.module("smlAppl.webApps.framework.services")
		.provider("infoButton", [
			function() {
				var viewUri = null;

				this.setViewUri = function(uri) {
					viewUri = uri;
				};

				this.$get = [
					function() {
						return new InfoButton(viewUri);
					}
				];
			}
		]);

})();

/* #### File: ./src/Scripts/app/superAdmin/components/superAdmin/userList/UserOvertakeCtrl.js */ 
(function() {
    "use strict";

    angular.module("smlAppl.webApps.framework.superAdmin.controllers")
        .controller("UserOvertakeCtrl", [
			"$scope", "$uibModalInstance", "content", "data", "User", "MsgBox",
			function ($scope, $uibModalInstance, content, data, User, MsgBox) {

			    $scope.content = content;
			    $scope.data = data;

			    $scope.credentials = {
			        userName: null,
			        password: null
			    };


			    $scope.ok = function () {
			        // try to overtake the user
			        User.overtake($scope.credentials.userName, $scope.credentials.password, $scope.data.UserName)
			            .then(function(response) {

			                    $uibModalInstance.close($scope.data);
			                    MsgBox.alert('Ui_UserOvertake', 'Msg_UserOvertakeSuccessful');
			                },
			                function(response) {
			                    alert('Unable to overtake. ' + response);
			                });
			    };

			    $scope.cancel = function () {
			        $uibModalInstance.dismiss('cancel');
			    };

			}
        ]);

})();

/* #### File: ./src/Scripts/app/superAdmin/components/superAdmin/userList/userList.js */ 
(function() {
    "use strict";

    var componentPath = "wwwroot/superAdmin/views/userList/";

    angular.module("smlAppl.webApps.framework.superAdmin.components")
        .component("userList",
            {
                templateUrl: componentPath + "userList.html",
                bindings: {
                    //data: '=ngModel',
                    //title: '<'
                    //fieldType: '@?',
                    //onUpdate: '&'
                },
                controller: [
                    "$scope", "$element", "$attrs", "User", "$state", "$sce", "$uibModal",
                    function ($scope, $element, $attrs, User, $state, $sce, $uibModal) {
                        var ctrl = this;

                        ctrl.data = [];

                        User.get()
                            .then(function (response) {
                                ctrl.data = response;
                            });

                        ctrl.TOptions = {
                        	CanSelectCols: true,
                        	NoSearchSelects: false,
                        	Columns: [
								{ key: "EditAction", actionCol: true, valueFunction: getTableEditIcon, clickAction: editItem },
								{ key: "UserName", display: "Label_UserName", select: false, visible: true },
								{ key: "FullName", display: "Label_FullName", select: false, visible: true },

								// invisible fields
								{ key: "Id", display: "Id", select: false, visible: false, orderAsc: true },
                        	],
                        };
                        
                        function getTableEditIcon(item) {
                        	return $sce.trustAsHtml('<button class="btn btn-default btn-xs" type="button"><i class="fa fa-edit"></i></button>');
                        };

                        function editItem(item, col) {

                            var moduleInstance = $uibModal.open({
                                animation: true,
                                templateUrl: componentPath + "userOvertake.html",
                                controller: "UserOvertakeCtrl",
                                size: "sm",
                                resolve: {
                                    content: {},
                                    data: item
                                }
                            });

                            moduleInstance.result.then(function() {
                                    $state.go("home");
                                });

                        };
                    }
                ],
            }
        );

})();

/* #### File: ./src/Scripts/app/superAdmin/config/templates.js */ 
angular.module('smlAppl.webApps.framework.superAdmin').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('./src/Scripts/app/superAdmin/views/layout.html',
    "<div ui-view></div>"
  );


  $templateCache.put('./src/Scripts/app/superAdmin/views/navigation.html',
    "    \r" +
    "\n" +
    "<div class=\"panel panel-default\">\r" +
    "\n" +
    "    <div class=\"panel-heading\">\r" +
    "\n" +
    "        <h4>\r" +
    "\n" +
    "            <i class=\"fa fa-cog\"></i> {{ \"Ui_SuperAdmin\" | translate }}\r" +
    "\n" +
    "        </h4>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div class=\"panel-body\">\r" +
    "\n" +
    "        <ul class=\"nav nav-pills nav-stacked\">\r" +
    "\n" +
    "            \r" +
    "\n" +
    "            <li role=\"presentation\">\r" +
    "\n" +
    "                <a class=\"list-group-item\" ui-sref=\"superadmin.user\" ui-sref-active=\"active\">\r" +
    "\n" +
    "                    <h4 class=\"list-group-item-heading\">{{ \"Ui_SuperAdmin_User\" | translate }}</h4>\r" +
    "\n" +
    "                </a>\r" +
    "\n" +
    "            </li>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        </ul>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('./src/Scripts/app/superAdmin/views/userList/userList.html',
    "\r" +
    "\n" +
    "<filter-table items=\"$ctrl.data\" options=\"$ctrl.TOptions\" initial-empty=\"true\"></filter-table>"
  );


  $templateCache.put('./src/Scripts/app/superAdmin/views/userList/userOvertake.html',
    "<div>\r" +
    "\n" +
    "    <div class=\"modal-header\">\r" +
    "\n" +
    "        <h3 class=\"modal-title\">Overtake user {{ data.FullName }} ({{ data.UserName }})</h3>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"modal-body\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <div class=\"form-group\">\r" +
    "\n" +
    "            <label>Your userName</label>\r" +
    "\n" +
    "            <input class=\"form-control\" type=\"text\" ng-model=\"credentials.userName\">\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <div class=\"form-group\">\r" +
    "\n" +
    "            <label>Your password</label>\r" +
    "\n" +
    "            <input class=\"form-control\" type=\"password\" ng-model=\"credentials.password\">\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"modal-footer\">\r" +
    "\n" +
    "        <button class=\"btn btn-primary\" type=\"button\" ng-click=\"ok()\">{{ \"Ui_Ok\" | translate }}</button>\r" +
    "\n" +
    "        <button class=\"btn btn-default\" type=\"button\" ng-click=\"cancel()\">{{ \"Ui_Close\" | translate }}</button>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );

}]);


/* #### File: ./src/Scripts/app/superAdmin/services/User.js */ 
(function() {
    "use strict";

    angular.module("smlAppl.webApps.framework.superAdmin.services")
		.service("User",
		[
			"$q", "$http", "appConfig", "HttpHandler", "Principal",
			function ($q, $http, appConfig, HttpHandler, Principal) {

			    var self = this;

			    var baseUri = appConfig.uriFwBaseApi + "Users/";

			    this.get = function () {
			        var request = $http.get(baseUri);
			        return request.then(HttpHandler.handleSuccess, HttpHandler.handleError);
			    }

			    this.getByUserName = function (userName) {
			        var request = $http.get(baseUri + "?userName=" + userName);
			        return request.then(HttpHandler.handleSuccess, HttpHandler.handleError);
			    }

			    this.overtake = function (userName, password, userNameToOvertake) {
			        var data = "grant_type=password&username=" + encodeURIComponent(userName) + "&password=" + encodeURIComponent(password);

			        var deferred = $q.defer();

			        $http.post("oauth/token",
			                data,
			                {
			                    headers: {
			                        'Content-Type': "application/x-www-form-urlencoded",
			                        'OvertakeUser': userNameToOvertake
			                    }
			                })
			            .then(function(response) {

			                    Principal.authenticate(response.data.access_token);

			                    deferred.resolve(response);

			                },
			                function(response) {
			                    //self.logOut();
			                    deferred.reject(response);
			                });

			        return deferred.promise;
			    }
			}
		]);

})();