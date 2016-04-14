/* #### File: Scripts/app/app.js */ 
(function() {
	"use strict";

	angular.module("smlAppl.webApps.framework.controllers", []);
	angular.module("smlAppl.webApps.framework.directives", []);
	angular.module("smlAppl.webApps.framework.filters", []);
	angular.module("smlAppl.webApps.framework.services", []);

	angular.module("smlAppl.webApps.framework", [
		// Angular modules 
		//'ngRoute'
		//"ui.router",

		// Custom modules 
		"smlAppl.webApps.framework.controllers",
		"smlAppl.webApps.framework.directives",
		"smlAppl.webApps.framework.filters",
		"smlAppl.webApps.framework.services",

		// ng-framework Custom modules
		"smlAppl.webApps.framework.filterTable",
		
		// 3rd Party Modules
		"ngNotify"
	]);

})();

/* #### File: Scripts/app/FilterTable/app.js */ 
(function() {
	"use strict";

	// register FilterTable modules
	angular.module("smlAppl.webApps.framework.filterTable.controllers", []);
	//angular.module("smlAppl.webApps.framework.filterTable.filters", []);
	//angular.module("smlAppl.webApps.framework.filterTable.services", []);
	angular.module("smlAppl.webApps.framework.filterTable.directives", []);


	angular.module("smlAppl.webApps.framework.filterTable", [
		"smlAppl.webApps.framework.filterTable.controllers",
		//"smlAppl.webApps.framework.filterTable.filters",
		//"smlAppl.webApps.framework.filterTable.services",
		"smlAppl.webApps.framework.filterTable.directives"
	]);

})();

/* #### File: Scripts/app/Config/appConfigFw.js */ 
(function() {
	'use strict';

	angular.module("smlAppl.webApps.framework")
		.constant("appConfigFw", getAppConfig());


	function getAppConfig() {
		return {
			uriBaseViews: "wwwroot/Views/",
			uriFilterTableViews: "wwwroot/FilterTable/Views/",

			uriFwBaseApi: "apiFw/v01/",
		}
	}

})();

/* #### File: Scripts/app/Config/routes.js */ 
//var baseViewPath = "App/Views/";
//var baseGlobalViewPath = "App/Global/Views/";

//angular.module("smlAppl.webApps.framework")
//	.config([
//		"$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {

//			// For any unmatched url, send to /index
//			$urlRouterProvider.otherwise("/home");

//			$stateProvider
//				.state("root", {
//					abstract: true,
//					views: {
//						"navigation": {
//							templateUrl: "Layout/navigation.html"
//						},
//						//"breadcrumb": {
//						//	template: "<div ncy-breadcrumb></div>"
//						//},
//						//"footer": {
//						//	templateUrl: baseViewPath + "Description/Footer.html"
//						//},
//					}
//				})
//				.state("home", {
//					parent: "root",
//					url: "/home",
//					views: {
//						"@": {
//							templateUrl: "home.html"
//						},
//					},
//					ncyBreadcrumb: {
//						label: "View_Home_PageTitle"
//					}
//				})
//				//.state("login", {
//				//	url: "/login",
//				//	controller: "loginCtrl",
//				//	templateUrl: appConfig.uriBaseGlobalViews + "Login.html",
//				//	ncyBreadcrumb: {
//				//		label: "View_Layout_LogIn"
//				//	}
//				//})
//				//.state("forbidden", {
//				//	parent: "root",
//				//	url: "/forbidden",
//				//	views: {
//				//		"@": {
//				//			templateUrl: appConfig.uriBaseGlobalViews + "forbidden.html"
//				//		},
//				//	},
//				//	ncyBreadcrumb: {
//				//		label: "View_Forbidden_PageTitle"
//				//	}
//				//})
//				//.state("claims", {
//				//	parent: "root",
//				//	url: "/claims",
//				//	controller: "claimsCtrl",
//				//	views: {
//				//		"@": {
//				//			templateUrl: appConfig.uriBaseGlobalViews + "Claims.html"
//				//		},
//				//	},
//				//	ncyBreadcrumb: {
//				//		label: "Claims"
//				//	}
//				//})
//				//.state("moddesc", {
//				//	parent: "home",
//				//	url: "/moddesc",
//				//	data: {
//				//		roles: [appConfig.rights.read, appConfig.rights.readAll]
//				//	},
//				//	views: {
//				//		"@": {
//				//			templateUrl: baseViewPath + "Description/List.html"
//				//		},
//				//	},
//				//	ncyBreadcrumb: {
//				//		label: "View_ModDesc_PageTitle"
//				//	}
//				//})
//				//.state("moddesc.list", {
//				//	url: "/list",
//				//	data: {
//				//		roles: [appConfig.rights.readAll, appConfig.rights.read]
//				//	},
//				//	views: {
//				//		"@": {
//				//			templateUrl: baseViewPath + "Description/List.html",
//				//		}
//				//	},
//				//	ncyBreadcrumb: {
//				//		skip: true,
//				//		label: "View_ModDesc_List_PageTitle",
//				//		//parent: "moddesc"
//				//	}
//				//})
//				//.state("moddesc.create", {
//				//	url: "/create",
//				//	data: {
//				//		roles: [appConfig.rights.create]
//				//	},
//				//	views: {
//				//		"@": {
//				//			templateUrl: baseViewPath + "Description/Create.html",
//				//		}
//				//	},
//				//	ncyBreadcrumb: {
//				//		label: "View_ModDesc_Create_PageTitle",
//				//		//parent: "moddesc"
//				//	}
//				//})
//				//.state("moddesc.edit", {
//				//	url: "/edit/{id}",
//				//	data: {
//				//		roles: [appConfig.rights.updateAllModDesc, appConfig.rights.updateModDesc]
//				//	},
//				//	views: {
//				//		"@": {
//				//			templateUrl: baseViewPath + "Description/Edit.html",
//				//		}
//				//	},
//				//	ncyBreadcrumb: {
//				//		label: "View_ModDesc_Edit_PageTitle",
//				//		//parent: "moddesc"
//				//	}
//				//})


//				//.state("moddesc.literatureTest", {
//				//	url: "/literatureTest/{id}",
//				//	data: {
//				//		roles: [appConfig.rights.updateAllModDesc, appConfig.rights.updateModDesc]
//				//	},
//				//	views: {
//				//		"@": {
//				//			templateUrl: baseViewPath + "Description/literatureTest.html",
//				//		}
//				//	},
//				//	ncyBreadcrumb: {
//				//		label: "View_ModDesc_Edit_PageTitle",
//				//		//parent: "moddesc"
//				//	}
//				//});
//		}
//	])
//	//.run([
//	//	"$rootScope", "$state", "$stateParams", "authorization", "principal",
//	//	function($rootScope, $state, $stateParams, authorization, principal) {
//	//		$rootScope.$on("$stateChangeStart", function (event, toState, toStateParams) {
//	//			// track the state the user wants to go to; authorization service needs this
//	//			$rootScope.toState = toState;
//	//			$rootScope.toStateParams = toStateParams;
//	//			// if the principal is resolved, do an authorization check immediately. otherwise,
//	//			// it'll be done when the state it resolved.
//	//			if (principal.isIdentityResolved()) authorization.authorize();
//	//		});
//	//	}
////])

//;

/* #### File: Scripts/app/Config/templates.js */ 
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


/* #### File: Scripts/app/Directives/displayEmployee.js */ 
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
					template: "<span ng-if='item.Id'>{{ item.FirstName }} {{ item.LastName }} ({{ item.Pid }})</span>",
					link: function(scope, element, attrs, ctrl) {

						var ngModel = ctrl;
						scope.item = {};

						// Initialize value
						ngModel.$render = function() {
							if (ngModel.$viewValue) {

								Employee.getById(ngModel.$viewValue)
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

/* #### File: Scripts/app/Directives/elastic.js */ 
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

/* #### File: Scripts/app/Directives/popupDatepicker.js */ 
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

/* #### File: Scripts/app/FilterTable/Config/templates.js */ 
angular.module('smlAppl.webApps.framework.filterTable').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('wwwroot/FilterTable/Views/FilterTable.html',
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
    "                            <th ng-repeat=\"col in filterTable.VisibleCols\" style=\"padding-left: 10px; padding-right: 40px; vertical-align: middle; cursor: pointer;\" ng-click=\"filterTable.UpdateOrderBy(col, $event)\">\r" +
    "\n" +
    "                                <span class=\"pull-left\">{{::col.Display}}</span>\r" +
    "\n" +
    "                                <span style=\"margin-right: -30px; opacity: 0.5;\" class=\"pull-right {{col.OrderIndicator}}\"></span>\r" +
    "\n" +
    "                            </th>\r" +
    "\n" +
    "                        </tr>\r" +
    "\n" +
    "                        <tr ng-repeat=\"headerRow in filterTable.HeaderRows\">\r" +
    "\n" +
    "                            <th>\r" +
    "\n" +
    "                                <span ng-bind-html=\"::headerRow.Title\"></span>\r" +
    "\n" +
    "                            </th>\r" +
    "\n" +
    "                            <th ng-repeat=\"col in filterTable.VisibleCols\">\r" +
    "\n" +
    "                                <span ng-bind-html=\"headerRow.GetValue(col)\"></span>\r" +
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
    "                            <td ng-repeat=\"col in filterTable.VisibleCols\" ng-switch=\"col.HasDistincts\">\r" +
    "\n" +
    "                                <select ng-switch-when=\"true\" class=\"select2\" name=\"filterTable.TableFilter[col.Key]\" ng-model=\"filterTable.TableFilter[col.Key]\">\r" +
    "\n" +
    "                                    <option ng-repeat=\"item in col.Distincts\">{{::item}}</option>\r" +
    "\n" +
    "                                </select>\r" +
    "\n" +
    "                                <input ng-switch-when=\"false\" type=\"text\" name=\"filterTable.TableFilter[col.Key]\" ng-model=\"filterTable.TableFilter[col.Key]\" ng-model-options=\"ModelOptions\" />\r" +
    "\n" +
    "                            </td>\r" +
    "\n" +
    "                        </tr>\r" +
    "\n" +
    "                    </thead>\r" +
    "\n" +
    "                    <tbody class=\"filtertable-table-body\" ng-if=\"filterTable.VisibleCols.length > 0\">\r" +
    "\n" +
    "                        <tr ng-repeat=\"item in filterTable.DataDisplayed\">\r" +
    "\n" +
    "                            <td class=\"text-center\" ng-class=\"::{'filtertable-cell-clickable' : filterTable.ActionCol.HasClickAction}\" ng-click=\"filterTable.ExecuteClickAction(filterTable.ActionCol, item)\">\r" +
    "\n" +
    "                                <span ng-bind-html=\"::item[filterTable.ActionCol.Key]\"></span>\r" +
    "\n" +
    "                            </td>\r" +
    "\n" +
    "                            <td ng-repeat=\"col in filterTable.VisibleCols\" ng-class=\"::{'filtertable-cell-clickable' : col.HasClickAction}\" ng-click=\"filterTable.ExecuteClickAction(col, item)\">\r" +
    "\n" +
    "                                <span ng-bind-html=\"::item[col.Key]\"></span>\r" +
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
    "                    <div class=\"pull-right\">\r" +
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


  $templateCache.put('wwwroot/FilterTable/Views/FilterTableOptions.html',
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
    "            <table class=\"table table-bordered table-condensed table-responsive table-striped table-hover\">\r" +
    "\n" +
    "                <thead>\r" +
    "\n" +
    "                    <tr>\r" +
    "\n" +
    "                        <th>Name</th>\r" +
    "\n" +
    "                        <th>Sichtbar</th>\r" +
    "\n" +
    "                        <th>Dropdown</th>\r" +
    "\n" +
    "                    </tr>\r" +
    "\n" +
    "                    <tr>\r" +
    "\n" +
    "                        <td>\r" +
    "\n" +
    "                            <input name=\"theColFilter.Display\" ng-model=\"theColFilter.Display\" placeholder=\"Name\" />\r" +
    "\n" +
    "                        </td>\r" +
    "\n" +
    "                        <td>\r" +
    "\n" +
    "                            <input type=\"checkbox\" ng-model=\"visible.all\" ng-change=\"ChangeVisible(visible.all)\" /> Alle\r" +
    "\n" +
    "                        </td>\r" +
    "\n" +
    "                        <td></td>\r" +
    "\n" +
    "                    </tr>\r" +
    "\n" +
    "                </thead>\r" +
    "\n" +
    "                <tbody>\r" +
    "\n" +
    "                    <tr ng-repeat=\"col in FilterTable.CurrentCols | filter: theColFilter\">\r" +
    "\n" +
    "                        <td>{{::col.Display}}</td>\r" +
    "\n" +
    "                        <td><input type=\"checkbox\" ng-model=\"col.Visible\" /></td>\r" +
    "\n" +
    "                        <td ng-switch=\"FilterTable.NoSearchSelects\">\r" +
    "\n" +
    "                            <input ng-switch-when=\"true\" type=\"checkbox\" ng-model=\"noSelect\" ng-disabled=\"true\" />\r" +
    "\n" +
    "                            <input ng-switch-when=\"false\" type=\"checkbox\" ng-model=\"col.BuildSelect\" ng-disabled=\"!col.CanBuildSelect\" />\r" +
    "\n" +
    "                        </td>\r" +
    "\n" +
    "                    </tr>\r" +
    "\n" +
    "                </tbody>\r" +
    "\n" +
    "            </table>\r" +
    "\n" +
    "        </uib-tab>\r" +
    "\n" +
    "        <uib-tab heading=\"Tabelle\" ng-if=\"true\">\r" +
    "\n" +
    "            <table class=\"table table-bordered table-condensed table-responsive table-striped table-hover\">\r" +
    "\n" +
    "                <thead>\r" +
    "\n" +
    "                    <tr>\r" +
    "\n" +
    "                        <th>Setting</th>\r" +
    "\n" +
    "                        <th>Wert</th>\r" +
    "\n" +
    "                    </tr>\r" +
    "\n" +
    "                </thead>\r" +
    "\n" +
    "                <tbody>\r" +
    "\n" +
    "                    <tr>\r" +
    "\n" +
    "                        <td>Suche aktiv</td>\r" +
    "\n" +
    "                        <td><input type=\"checkbox\" ng-model=\"FilterTable.SearchActive\" /></td>\r" +
    "\n" +
    "                    </tr>\r" +
    "\n" +
    "                    <tr>\r" +
    "\n" +
    "                        <td>Keine Dropdowns</td>\r" +
    "\n" +
    "                        <td><input type=\"checkbox\" ng-model=\"FilterTable.NoSearchSelects\" /></td>\r" +
    "\n" +
    "                    </tr>\r" +
    "\n" +
    "                    <tr>\r" +
    "\n" +
    "                        <td>Dropdowns einschränken</td>\r" +
    "\n" +
    "                        <td><input type=\"checkbox\" ng-model=\"FilterTable.ReduceSelects\" /></td>\r" +
    "\n" +
    "                    </tr>\r" +
    "\n" +
    "                    <tr>\r" +
    "\n" +
    "                        <td>Datensätze pro Seite</td>\r" +
    "\n" +
    "                        <td><input type=\"number\" ng-model=\"FilterTable.PageSize\" ng-model-options=\"ModelOptions\" /></td>\r" +
    "\n" +
    "                    </tr>\r" +
    "\n" +
    "                </tbody>\r" +
    "\n" +
    "            </table>\r" +
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


/* #### File: Scripts/app/FilterTable/Controllers/FilterTableModalInstanceCtrl.js */ 
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

/* #### File: Scripts/app/FilterTable/Directives/filterTable.js */ 
(function() {
	"use strict";

	angular.module("smlAppl.webApps.framework.filterTable.directives")
	    .factory('filterTableConstructor', ["$filter", "$timeout", "$parse", "$sce", function ($filter, $timeout, $parse, $sce) {
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
                        var dataDisplayed = column.GetFilterTable().DataDisplayed ||[];
                        return this._calculator.call(this, column, data, dataDisplayed);
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
	            ResetDistincts: function () {
	                //TODO: hold 2 distinct lists ?
	                this._distincts = null;
	            },
	            _buildDistincts: function (ft, c) {
	                return ft.CreateDistincts(c);
	            },
	            BuildDistincts: function () {
	                var ret = this.CallOnFilterTable(this._buildDistincts);
	                return ret.called ? ret.result : null;
	            },
	            get Distincts() {
	                if (!this.BuildSelect) {
	                    return null;
	                } else {
	                    if (this._distincts == null) {
	                        this._distincts = this.BuildDistincts();
	                    }
	                    return this._distincts;
	                }
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
                TrustIt: function(val) {
                    if ((val || null) !== null && angular.isString(val)) {
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
	            this._loading = true;
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
	        }

	        FilterTable.prototype = {
	            CreateDistincts: function (colDef) {
	                if (colDef.BuildSelect) {
	                    //if (this.ReduceSelects) {
	                    //    return ["", "I", "am", "reduced"];
	                    //} else {
	                    //    return ["", "I", "will", "do", "selects", "once", "implemented"];
	                    //}
	                    var distincts = {};
	                    var distinctList = [""];
	                    var onData = (this.ReduceSelects ? this.DataFiltered : this.PassedData).map(function (item) { return item[colDef.Key] });

	                    for (var i = 0; i < onData.length; i++) {
	                        var entry = (onData[i] || null);
	                        if (entry !== null && angular.isUndefined(distincts[entry])) {
	                            distincts[entry] = "";
	                            distinctList.push(entry.toString());
	                        }
	                    }
	                    distinctList = $filter("orderBy")(distinctList);
	                    return distinctList;
	                }
	                return null;
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
	                me.UpdateFilter(!resetting);
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
	                return !this.Loading && !this.HasData && !this.InitialEmpty;
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
	                    delayFilter: {},
	                    backingfields: {},
	                };
	                function defineFilterProp(name) {
	                    Object.defineProperty(f, name, {
	                        get: function () { return f.backingfields[name]; },
	                        set: function (newValue) {
	                            var changed = f.backingfields[name] !== newValue;
	                            f.backingfields[name] = newValue;
	                            $timeout.cancel(f.delayFilter);
	                            f.delayFilter = $timeout(function () {
	                                me.UpdateFilter(changed);
	                            }, 200);
	                        },
	                    });
	                }
	                for (var i = 0; i < this.CurrentCols.length; i++) {
	                    var col = this.CurrentCols[i];
	                    var val = x[col.Key];
	                    var name = col.Key;
	                    defineFilterProp(name);
	                    f.backingfields[name] = val;
	                }
	                this.TableFilter = f;
	            },
	            ClearFilter: function () {
	                //this.TableFilter = {}; //new: clear only visible filters
	                //var x = this.TableFilter;
	                for (var i = 0; i < this.VisibleCols.length; i++) {
	                    var col = this.VisibleCols[i];
	                    this.TableFilter[col.Key] = null;
	                }
	                //this.TableFilter = x;
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
	                this.DataFiltered = $filter('filter')(this._dataCalc, this.CleanTableFilter(this.TableFilter.backingfields));
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
	                            col.ResetDistincts();
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
	            c.orderAsc = getDefined(checkOverwrite(filterTable.Order, c.Key), basedOn.orderAsc || basedOn.orderAsc);
	            c.Filter = getDefined(basedOn.filter, basedOn.Filter);
	            c.AlternateSortCol = getDefined(basedOn.alternateSortCol, basedOn.AlternateSortCol || null);

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
	            c.GetFilterTable = function () { return filterTable; };

	            if (angular.isDefined(c.orderAsc) && filterTable !== null) {
	                filterTable.AddOrderBy(c, false);
	            }
	            return c;
	        }

            return {
                FilterTable: FilterTable,
                HeaderDef: HeaderDef, 
                GetDefined: getDefined,
            }
	    }])
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
	            templateUrl: "wwwroot/FilterTable/Views/FilterTable.html",
	            link: function (scope, element, attrs) {

	                scope.ModelOptions = {
	                    debounce: {
	                        default: 500,
	                        blur: 0
	                    }
	                };

	                scope.filterTable = new filterTableConstructor.FilterTable();

	                //function mappedField_old(onObject, name, definition) {
	                //    var defaultVal = angular.isDefined(definition.value) ? definition.value : null;
	                //    onObject.__defineGetter__(name, function () {
	                //        //{
	                //        //    definition.CallCounter = (definition.CallCounter || 0) + 1;
	                //        //    var isSame = (definition.lastVal === defaultVal);
	                //        //    console.log("Calling getter for:" + name + " (" + definition.CallCounter + ") same:" + isSame);
	                //        //    definition.lastVal = defaultVal;
	                //        //}
	                //        if (angular.isDefined(scope['in' + name])) {
	                //            return scope['in' + name];
	                //        }
	                //        if (angular.isDefined(scope.inOptions) && angular.isDefined(scope.inOptions[name])) {
	                //            return scope.inOptions[name];
	                //        }
	                //        return defaultVal;
	                //    });
	                //    onObject.__defineSetter__(name, function (val) {
	                //        var setVal = angular.isDefined(definition.changeFunc) ? definition.changeFunc.call((definition.callOn || onObject), val) : val;
	                //        if (definition.syncOut) {
	                //            //if (angular.isDefined(scope['in' + name])) {
	                //            if (scope['in' + name] !== setVal) {
	                //                scope['in' + name] = setVal;
	                //            }
	                //            //}
	                //            if (angular.isDefined(scope.inOptions)) {
	                //                if (scope.inOptions[name] !== setVal) {
	                //                    scope.inOptions[name] = setVal;
	                //                }
	                //            }
	                //        }
	                //        if (defaultVal !== setVal) {
	                //            defaultVal = setVal;
	                //        }
	                //    });

	                //    //init all to same (overwrite inOpt with inParam in case both specified)
	                //    onObject[name] = definition.force === true ? defaultVal : onObject[name];
	                //}

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

	                    }

	                    defineOptions(filterTableDefinition);
	                    scope.filterTable.OptionsProvided = scope.filterTable.Columns.length > 0;
	                    scope.filterTable.Initialised = true;
	                }

	                initFilterTable();

                    $rootScope.$on("$translateChangeEnd", function () {
                        //console.log("$translateChangeEnd");
                        updateTranslations();
                        scope.filterTable.Refresh();
                    });

                    function updateTranslations() {
                        var arr =[];
                        for (var x in scope.Translations.fallback) {
                            if (scope.Translations.fallback.hasOwnProperty(x)) {
                                arr.push(x);
                            }
                        }
                        $translate(arr).then(function(translations) {
                            for (var i = 0; i < arr.length; i++) {
                                var key = arr[i];
                                var same = (key === translations[key]);
                                if (same) {
                                    scope.Translations[key]= scope.Translations.fallback[key];
                                } else {
                                    scope.Translations[key]= translations[key];
                                }
                            }
                        });
                    }
                    //TODO: move to filtertable (prototype)? (watch for change only once though)
                    scope.Translations = {
                        fallback: {
                            FilterTable_Error_Getting_Data: "Fehler beim Beziehen der Daten.",
                            FilterTable_Error_No_Data: "Keine Daten gefunden.",
                            FilterTable_Error_Filter_No_Data: "Filter enthält keine Daten.",
                            FilterTable_Page: "Seite",
                            FilterTable_Of: "von",
                            FilterTable_Total: "Total",
                            FilterTable_Records: "Datensätze"
                        }
                    }
	                updateTranslations();

	                scope.animationsEnabled = true;

	                scope.open = function (size) {
	                    var modalInstance = $uibModal.open({
	                        animation: scope.animationsEnabled,
	                        templateUrl: "wwwroot/FilterTable/Views/FilterTableOptions.html",
	                        controller: 'FilterTableOptionsCtrl',
	                        size: size,
	                        resolve: {
	                            filterTable: function () { return scope.filterTable; }
	                        }
	                    });

	                    modalInstance.result.then(function () {

	                    }, function () {

	                    });
	                }
	            }
	        };
	    }]);

})();

/* #### File: Scripts/app/FilterTable/Directives/filterTableOptions.js */ 
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
    }]);
})();

/* #### File: Scripts/app/Filters/ChDate.js */ 
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

/* #### File: Scripts/app/Filters/decimal.js */ 
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

/* #### File: Scripts/app/Services/DataResource/Employee.js */ 
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

/* #### File: Scripts/app/Services/HttpHandler.js */ 
/*
	This service will handle the response of a promise from $http-calls.
	Usage: return request.then(HttpHandler.handleSuccess, HttpHandler.handleError);
	Usage: return request.then(HttpHandler.handleSuccess, HttpHandler.handleSaveErrorWithNotify);
*/

(function() {
	"use strict";

	angular.module("smlAppl.webApps.framework.services")
		.service("HttpHandler", [
			"$q", "Notify",
			function ($q, Notify) {

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

					Notify.alertGetError(handledResponse);

					// return new promise which could be handled
					return $q.reject(handledResponse)
				}

				// calls handleError and then shows a save error-notification
				this.handleSaveErrorWithNotify = function (response) {
					var handledResponse = self.handleError(response);

					Notify.alertSaveError(handledResponse);

					// return new promise which could be handled
					return $q.reject(handledResponse)
				}

				// transform the successful response, unwrapping the application data from the API response payload.
				this.handleSuccess = function(response) {
					return (response.data);
				}
			}
		]);

})();

/* #### File: Scripts/app/Services/Notify.js */ 
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
						message = "Message_Save_Error";
					}

					alertErrorInternal(message);
				}

				// for http actions

				this.alertGetError = function (response) {
					var message = response.statusText;

					if (!message) {
						// no message text, show general error
						message = "Message_DataGet_Error";
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