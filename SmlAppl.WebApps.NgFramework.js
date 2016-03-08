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
	]);
})();

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

angular.module('smlAppl.webApps.framework.filterTable').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('wwwroot/FilterTable/Views/FilterTable.html',
    "<style>\r" +
    "\n" +
    "	select[value=\"\"] {\r" +
    "\n" +
    "		color: gray;\r" +
    "\n" +
    "	}\r" +
    "\n" +
    "</style>\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div class=\"row\">\r" +
    "\n" +
    "    <div class=\"col-md-12\" style=\"text-align: center;\">\r" +
    "\n" +
    "        <span ng-hide=\"!loading\">Loading <img src=\"Content/images/loader-horizontal.gif\" /></span>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"col-md-12\" style=\"text-align: center;\">\r" +
    "\n" +
    "        <span ng-show=\"error\">Fehler beim Beziehen der Daten.</span>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<script type=\"text/ng-template\" id=\"myModalContent.html\">\r" +
    "\n" +
    "    <div class=\"modal-header\">\r" +
    "\n" +
    "        <h3 class=\"modal-title\">Einstellungen</h3>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"modal-body\">\r" +
    "\n" +
    "        <uib-tabset>\r" +
    "\n" +
    "            <uib-tab heading=\"Spalten\" ng-if=\"Options.CanSelectCols\">\r" +
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
    "                                <input name=\"theColFilter.display\" ng-model=\"theColFilter.display\" placeholder=\"Name\" />\r" +
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
    "                        <tr ng-repeat=\"col in Options.CurrentCols | filter: theColFilter\">\r" +
    "\n" +
    "                            <td>{{::col.display | translate}}</td>\r" +
    "\n" +
    "                            <td><input type=\"checkbox\" ng-model=\"col.visible\" /></td>\r" +
    "\n" +
    "                            <td><input type=\"checkbox\" ng-model=\"col.select\" ng-change=\"ChangeDropDown(col)\" ng-disabled=\"Options.NoSearchSelects || !col.canSelect\" /></td>\r" +
    "\n" +
    "                        </tr>\r" +
    "\n" +
    "                    </tbody>\r" +
    "\n" +
    "                </table>\r" +
    "\n" +
    "            </uib-tab>\r" +
    "\n" +
    "            <uib-tab heading=\"Tabelle\" ng-if=\"true\">\r" +
    "\n" +
    "                <table class=\"table table-bordered table-condensed table-responsive table-striped table-hover\">\r" +
    "\n" +
    "                    <thead>\r" +
    "\n" +
    "                        <tr>\r" +
    "\n" +
    "                            <th>Setting</th>\r" +
    "\n" +
    "                            <th>Wert</th>\r" +
    "\n" +
    "                        </tr>\r" +
    "\n" +
    "                    </thead>\r" +
    "\n" +
    "                    <tbody>\r" +
    "\n" +
    "                        <tr>\r" +
    "\n" +
    "                            <td>Suche aktiv</td>\r" +
    "\n" +
    "                            <td><input type=\"checkbox\" ng-model=\"Options.SearchActive\" /></td>\r" +
    "\n" +
    "                        </tr>\r" +
    "\n" +
    "                        <tr>\r" +
    "\n" +
    "                            <td>Keine Dropdowns</td>\r" +
    "\n" +
    "                            <td><input type=\"checkbox\" ng-model=\"Options.NoSearchSelects\" /></td>\r" +
    "\n" +
    "                        </tr>\r" +
    "\n" +
    "                        <tr>\r" +
    "\n" +
    "                            <td>Dropdowns einschränken</td>\r" +
    "\n" +
    "                            <td><input type=\"checkbox\" ng-model=\"Options.ReduceSelects\" /></td>\r" +
    "\n" +
    "                        </tr>\r" +
    "\n" +
    "                        <tr>\r" +
    "\n" +
    "                            <td>Datensätze pro Seite</td>\r" +
    "\n" +
    "                            <td><input type=\"number\" ng-model=\"Options.PageSize\" ng-model-options=\"ModelOptions\" /></td>\r" +
    "\n" +
    "                        </tr>\r" +
    "\n" +
    "                    </tbody>\r" +
    "\n" +
    "                </table>\r" +
    "\n" +
    "            </uib-tab>\r" +
    "\n" +
    "        </uib-tabset>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"modal-footer\">\r" +
    "\n" +
    "        <button class=\"btn btn-primary\" type=\"button\" ng-click=\"ok()\">OK</button>\r" +
    "\n" +
    "        <!--<button class=\"btn btn-warning\" type=\"button\" ng-click=\"cancel()\">Cancel</button>-->\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "</script>\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div ng-hide=\"loading || error\">\r" +
    "\n" +
    "    <div class=\"row\">\r" +
    "\n" +
    "        <div class=\"col-md-12\">\r" +
    "\n" +
    "            <div style=\"overflow: auto;\">\r" +
    "\n" +
    "                <table class=\"table table-bordered table-condensed table-responsive table-striped table-hover\">\r" +
    "\n" +
    "                    <thead>\r" +
    "\n" +
    "                        <tr>\r" +
    "\n" +
    "                            <th>\r" +
    "\n" +
    "                                <span type=\"button\" class=\"btn btn-default btn-sm\" ng-click=\"open()\" ng-show=\"Options.CanCustomize\"><span class=\"glyphicon glyphicon-cog\"></span></span>\r" +
    "\n" +
    "                            </th>\r" +
    "\n" +
    "                            <th ng-repeat=\"col in Options.VisibleCols\" style=\"padding-left: 10px; padding-right: 40px; vertical-align: middle;\">\r" +
    "\n" +
    "                                <span class=\"pull-left\">{{::col.display | translate}}</span>\r" +
    "\n" +
    "                                <span style=\"margin-right: -30px; opacity: 0.5; cursor: pointer;\" class=\"pull-right {{GetOrderIndicator(col)}}\" ng-click=\"OrderBy(col)\"></span>\r" +
    "\n" +
    "                            </th>\r" +
    "\n" +
    "                        </tr>\r" +
    "\n" +
    "                        <tr ng-show=\"Options.SearchActive\">\r" +
    "\n" +
    "                            <th>\r" +
    "\n" +
    "                                <span type=\"button\" class=\"btn btn-default btn-sm\" ng-click=\"clearFilter()\"><span class=\"glyphicon glyphicon-remove\"></span></span>\r" +
    "\n" +
    "                            </th>\r" +
    "\n" +
    "                            <th ng-repeat=\"col in Options.VisibleCols\">\r" +
    "\n" +
    "                                <select class=\"select2\" name=\"theFilter{{::col.key}}\" ng-model=\"theFilter[col.key]\" ng-if=\"col.select && hasDistincts(col.key)\">\r" +
    "\n" +
    "                                    <!-- acts as placeholder -->\r" +
    "\n" +
    "                                    <!--<option value=\"\" disabled selected hidden>{{col.display}}</option>-->\r" +
    "\n" +
    "                                    <option ng-repeat=\"item in Distincts[col.key] | orderBy \">{{::item}}</option>\r" +
    "\n" +
    "                                </select>\r" +
    "\n" +
    "                                <input type=\"text\" name=\"theFilter{{::col.key}}\" ng-model=\"theFilter[col.key]\" ng-model-options=\"ModelOptions\" ng-if=\"!col.select || !hasDistincts(col.key)\" />\r" +
    "\n" +
    "                                <!--<input type=\"text\" name=\"theFilter{{col.key}}\" ng-model=\"theFilter[col.key]\" ng-model-options=\"ModelOptions\" ng-if=\"!hasDistincts(col.key)\" placeholder=\"{{col.display}}\"/>-->\r" +
    "\n" +
    "                            </th>\r" +
    "\n" +
    "                        </tr>\r" +
    "\n" +
    "                    </thead>\r" +
    "\n" +
    "                    <tbody>\r" +
    "\n" +
    "                        <tr ng-if=\"PassedData.length === 0 && !Options.InitialEmpty\">\r" +
    "\n" +
    "                            <td colspan=\"100%\" class=\"warning\">Keine Daten gefunden.</td>\r" +
    "\n" +
    "                        </tr>\r" +
    "\n" +
    "                        <tr ng-if=\"Options.VisibleCols.length > 0\" ng-repeat=\"item in DisplayedData\">\r" +
    "\n" +
    "                            <td></td>\r" +
    "\n" +
    "                            <!--<td ng-repeat=\"col in Options.VisibleCols\">{{::GetVal(item, col)}}</td>-->\r" +
    "\n" +
    "                            <td ng-\r" +
    "\n" +
    "                            <td ng-repeat=\"col in Options.VisibleCols\"><span ng-bind-html=\"::GetVal(item, col)\"></span></td>\r" +
    "\n" +
    "                        </tr>\r" +
    "\n" +
    "                        <tr ng-if=\"PassedData.length > 0 && (FilteredData.length == 0)\">\r" +
    "\n" +
    "                            <td colspan=\"100%\" class=\"warning\">Filter enthält keine Daten.</td>\r" +
    "\n" +
    "                        </tr>\r" +
    "\n" +
    "                    </tbody>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                </table>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"row\">\r" +
    "\n" +
    "        <div class=\"col-md-12\">\r" +
    "\n" +
    "            <div class=\"pull-right\">\r" +
    "\n" +
    "                <button class=\"btn btn-default\" style=\"float: left;\" ng-click=\"SetCurrentPage(1)\" ng-disabled=\"settings.backwardDisabled\"><i class=\"fa fa-fast-backward\"></i></button>\r" +
    "\n" +
    "                <button class=\"btn btn-default\" style=\"float: left;\" ng-click=\"SetCurrentPage(settings.currentPage-1)\" ng-disabled=\"settings.backwardDisabled\"><i class=\"fa fa-step-backward\"></i></button>\r" +
    "\n" +
    "                <div style=\"float: left; text-align: right;\">\r" +
    "\n" +
    "                    <select ng-model=\"settings.currentPage\" ng-change=\"SetCurrentPage(settings.currentPage)\"\r" +
    "\n" +
    "                            ng-options=\"item as item for item in settings.filterPageArray\"></select>\r" +
    "\n" +
    "                    Seite {{ settings.currentPage }} von {{ settings.filterPageCount }} ({{settings.totalPageCount}} Total)\r" +
    "\n" +
    "\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <button class=\"btn btn-default\" style=\"float: right;\" ng-click=\"SetCurrentPage(settings.filterPageCount)\" ng-disabled=\"settings.forwardDisabled\"><i class=\"fa fa-fast-forward\"></i></button>\r" +
    "\n" +
    "                <button class=\"btn btn-default\" style=\"float: right;\" ng-click=\"SetCurrentPage(settings.currentPage+1)\" ng-disabled=\"settings.forwardDisabled\"><i class=\"fa fa-step-forward\"></i></button>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div style=\"float: left;\">Datensätze: {{FilteredData.length}} von {{PassedData.length}}</div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );

}]);


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

(function() {
	"use strict";

	angular.module("smlAppl.webApps.framework.filterTable.directives")
	.directive("filterTable", function (filterFilter, $uibModal, $timeout, $filter, $sanitize) {
		return {
			restrict: 'E',
			scope: {
				data: "=items",
				Options: "=options",

				columns: "=",

				canCustomize: "=",
				canSelectCols: "=",

				searchActive: "=",
				noSearchSelects: "=",
				reduceSelects: "=",
				order: "=",
				pageSize: "=",

				selectsOnColumns: "=",
				noSelectsOnColumns: "=",
				ignoreColumns: "=",
				initialEmpty: "="
			},
			templateUrl: "wwwroot/FilterTable/Views/FilterTable.html",
			link: function (scope, element, attrs) {

				scope.loading = true;
				scope.error = false;
				scope.timeout = {};

				scope.ModelOptions = {
					debounce: {
						default: 500,
						blur: 0
					}
				};

				scope.Distincts = {};

				function getAttr(attr, fallback) {
					return angular.isDefined(attr) && angular.isArray(scope.$eval(attr)) ? scope.$eval(attr) : fallback;
				}
				function gotData() { return scope.PassedData.length > 0; }

				var defaultOptions = {
					CanCustomize: true,
					CanSelectCols: true,

					Columns: [],

					SearchActive: true,
					NoSearchSelects: false,
					ReduceSelects: false,


					Order: {
						OrderBy: "",
						Asc: true,
					},
					PageSize: 15,

					SelectsOnColumns: [],
					NoSelectsOnColumns: [],
					IgnoreColumns: [],

					//
					Provided: false,

					//
					ColByName: {},
					Cols: [],
					CurrentCols: [],
					VisibleCols: [],

					InitialEmpty: false
				}

				function initAllOptions(fromData) {

					var userDefinedOverrides = {
						CanCustomize: scope.canCustomize,
						CanSelectCols: scope.canSelectCols,
						Columns: scope.columns,
						SearchActive: scope.searchActive,
						NoSearchSelects: scope.noSearchSelects,
						ReduceSelects: scope.reduceSelects,
						Order: scope.order,
						PageSize: scope.pageSize,

						SelectsOnColumns: getAttr(attrs.selectsOnColumns, []),
						NoSelectsOnColumns: getAttr(attrs.noSelectsOnColumns, []),
						IgnoreColumns: getAttr(attrs.ignoreColumns, []),

						InitialEmpty: scope.initialEmpty
					}

					// see also http://stackoverflow.com/a/22403711
					var base = (fromData === true) ? scope.Options : {};
					var options = $.extend(true, base, defaultOptions, scope.Options, userDefinedOverrides);
					options.Provided = options.Columns.length > 0;

					if (options.Provided || fromData === true) {
						getColumns(options);
					}
					scope.Options = options;
				}

				initAllOptions();

				function canBuildSelect(options, colName) {
					if (options.NoSearchSelects) { return false; }
					if (options.NoSelectsOnColumns.indexOf(colName) > -1) { return false; }
					return true;
				}

				function doBuildSelect(options, colName) {
					if (canBuildSelect(options, colName)) {
						if (options.SelectsOnColumns.indexOf(colName) > -1) { return false; }
					}
					return false;
				}

				function isIgnored(options, colName) {
					if (options.IgnoreColumns.indexOf(colName) > -1) { return true; }
					return false;
				}

				function getColumns(options) {

					var defaultEntry = {
						key: null,
						ignore: false,
						visible: false,
						display: undefined,
						canSelect: true,
						select: false,
						orderAsc: undefined,
					}

					var columns = [];
					var i;
					var key;
					var entry;

					if (options.Provided) {
						columns = angular.copy(options.Columns);
					} else if (gotData()) {
						var byItem = scope.data[0];
						for (var prop in byItem) {
							if (byItem.hasOwnProperty(prop) && prop !== '$$hashKey') {
								var exists = options.ColByName[prop] || {};
								columns.push($.extend({}, defaultEntry, exists, {
									key: prop,
								}));
							}
						}
					}

					options.Cols = [];
					options.ColByName = {};
					options.CurrentCols = [];

					for (i = 0; i < columns.length; i++) {
						entry = columns[i];
						key = entry.key || null;
						if (key == null) {
							console.log("invalid item - missing 'key':");
							console.log(entry);
							continue;
						}
						entry = $.extend({}, defaultEntry, {
							display: entry.display || entry.key,
							index: i,
							canSelect: canBuildSelect(options, key),
							select: doBuildSelect(options, key),
							ignore: isIgnored(options, key)
						}, entry);
						columns[i] = entry;

						if (options.Order.OrderBy === "") {
							if (angular.isDefined(entry.orderAsc)) {
								options.Order.OrderBy = entry.key;
								options.Order.Asc = entry.orderAsc;
							}
						}

						if (angular.isDefined(entry.key)) {
							options.Cols.push(entry);
							options.ColByName[entry.key] = entry;
						}
					}
					options.CurrentCols = options.Cols.filter(function (v, i, a) { return !v.ignore; });
					options.VisibleCols = options.CurrentCols.filter(function (v, i, a) { return v.visible; });

					return options;
				}

				scope.$watch('inOpts', function (newValue, oldValue) {
					if (newValue === oldValue) { return; }
					initAllOptions();
					updateData();
				}, true);

				scope.$watch('options', function (newValue, oldValue) {
					if (newValue === oldValue) { return; }
					initAllOptions();
					updateData();
				}, true);

				scope.$watch('columns', function (newValue, oldValue) {
					if (newValue === oldValue) { return; }
					initAllOptions();
					updateData();
				}, true);

				scope.$watch('Options.Cols', function (newValue, oldValue) {
					if (newValue === oldValue) { return; }
					scope.Options.CurrentCols = scope.Options.Cols.filter(function (v, i, a) { return !v.ignore; });
					scope.Options.VisibleCols = [];
					scope.Options.VisibleCols = scope.Options.CurrentCols.filter(function (v, i, a) { return v.visible; });
				}, true);

				scope.$watch('Options.SearchActive', function (newValue, oldValue) {
					if (!newValue) {
						scope.clearFilter();
					}
				}, true);

				scope.$watch('Options.NoSearchSelects', function (newValue, oldValue) {
					if (newValue) {
						var change = scope.Options.Cols.filter(function (v, i, a) { return v.select; });
						for (var i = 0; i < change.length; i++) {
							change[i].select = false;
						}
					}
				}, true);

				scope.$watch('Options.ReduceSelects', function (newValue, oldValue) {
					updateData();
				}, true);

				scope.$watch('Options.Order.OrderBy', function (newValue, oldValue) {

					var oldItem = scope.Options.ColByName[oldValue];
					if (angular.isDefined(oldItem) && oldItem !== null) {
						oldItem.orderAsc = undefined;
					}
					var newItem = scope.Options.ColByName[newValue];
					if (angular.isDefined(newItem) && newItem !== null) {
						newItem.orderAsc = scope.Options.Order.Asc;
					}
				}, true);

				scope.$watch('Options.Order.Asc', function (newValue, oldValue) {
					var newItem = scope.Options.ColByName[scope.Options.Order.OrderBy];
					if (angular.isDefined(newItem) && newItem !== null) {
						newItem.orderAsc = scope.Options.Order.Asc;
					}
				}, true);

				scope.$watch('Options.PageSize', function (newValue, oldValue) {
					if (newValue === null || newValue === "" || angular.isUndefined(newValue) || isNaN(newValue)) {
						scope.Options.PageSize = oldValue;
					} else {
						updateData();
					}
				}, true);

				scope.settings = {
					currentPage: 1,
					filterPageCount: 1,
					totalPageCount: 1,
					filterPageArray: [1],
					backwardDisabled: true,
					forwardDisabled: true,
				}

				scope.GetPageCount = function (length) {
					return scope.Options.PageSize === 0 ? 0 : Math.ceil(length / scope.Options.PageSize);
				}

				function getPageArray(length) {
					var pageArray = [];
					for (var i = 1; i <= length; i++) {
						pageArray.push(i);
					}
					return pageArray;
				}

				scope.SetCurrentPage = function (page) {
					scope.settings.currentPage = Number(page);
					updateDisplayData();
				}

				function buildDistincts() {
					if (scope.Options.NoSearchSelects) {
						return;
					}

					var theDistincts = {};

					var data = scope.Options.ReduceSelects ? scope.FilteredData : scope.PassedData;

					for (var c = 0; c < scope.Options.CurrentCols.length; c++) {
						var col = scope.Options.CurrentCols[c];
						if (col.select) {
							var distinct = {};
							for (var i = 0; i < (data || []).length; i++) {
								var row = data[i];
								//if (angular.isDefined(row[col.key])) {
								//    distinct[row[col.key] !== null ? row[col.key].toString() : row[col.key]] = "";
								//}
								if (angular.isDefined(row[col.key]) && row[col.key] !== null) {
									distinct[row[col.key].toString()] = "";
								}
							}
							theDistincts[col.key] = [];
							theDistincts[col.key].push("");
							for (var entry in distinct) {
								if (entry !== "") {
									theDistincts[col.key].push(entry);
								}
							}
						}
					}
					scope.Distincts = theDistincts;
				}

				scope.Options.buildDistinctsFor = function (col) {
					if (scope.Options.NoSearchSelects) {
						return;
					}

					var theDistincts = [];

					if (col.select) {
						var data = scope.Options.ReduceSelects ? filterFilter(scope.data, scope.theFilter) : scope.data;

						var distinct = {};
						for (var i = 0; i < data.length; i++) {
							var row = data[i];
							if (angular.isDefined(row[col.key]) && row[col.key] !== null) {
								distinct[row[col.key].toString()] = "";
							}
						}

						theDistincts.push("");
						for (var entry in distinct) {
							if (entry !== "") {
								theDistincts.push(entry);
							}
						}
					}
					scope.Distincts[col.key] = theDistincts;
				}

				scope.Options.DistinctsFrom = function (array, column) {

					var theDistincts = [];

					var distinct = {};
					for (var i = 0; i < array.length; i++) {
						var row = array[i];
						if (angular.isDefined(row[column]) && row[column] !== null) {
							distinct[row[column].toString()] = "";
						}
					}

					theDistincts.push("");
					for (var entry in distinct) {
						if (entry !== "") {
							theDistincts.push(entry);
						}
					}
					return theDistincts;
				}


				scope.hasDistincts = function (name) {
					return !angular.isUndefined(scope.Distincts[name]);
				}

				scope.theFilter = {};
				scope.clearFilter = function () {
					scope.theFilter = {};
				}

				scope.$watch('theFilter', function (term) {
					scope.settings.currentPage = 1;
					var fixed = false;
					for (var x in term) { //always will filter out null values otherwise we can't really "clear" a filter on null values
						if (term[x] === "") {
							fixed = true;
							delete term[x];
						}
					}
					if (fixed) {
						scope.theFilter = term;
					}
					updateFilterData();
				}, true);

				scope.$watch('data', function () {
					updateData();
				});

				scope.PassedData = [];
				scope.BuildingUp = true;

				function updateData() {
					scope.BuildingUp = true;

					scope.PassedData = $filter('orderBy')((scope.data || []), scope.GetOrderInfo());
					scope.settings.totalPageCount = scope.GetPageCount(scope.PassedData.length);

					refresh(true);

					updateFilterData();
				}

				scope.FilteredData = [];

				function updateFilterData() {
					scope.BuildingUp = true;

					scope.FilteredData = filterFilter(scope.PassedData, scope.theFilter);

					scope.settings.currentPage = 1;
					scope.settings.filterPageCount = scope.GetPageCount(scope.FilteredData.length);
					scope.settings.filterPageArray = getPageArray(scope.settings.filterPageCount);

					buildDistincts();

					updateDisplayData();
				}

				scope.DisplayedData = [];

				function updateDisplayData() {
					scope.BuildingUp = true;

					var startIndex = (scope.settings.currentPage - 1) * scope.Options.PageSize;
					if (startIndex > scope.FilteredData.length) {
						scope.DisplayedData = [];
					} else {
						scope.DisplayedData = scope.FilteredData.slice(startIndex, startIndex + scope.Options.PageSize);
					}
					scope.settings.backwardDisabled = scope.settings.currentPage === 1;
					scope.settings.forwardDisabled = scope.settings.currentPage === scope.settings.filterPageCount;

					scope.BuildingUp = false;
				}

				function refresh(init) {
					scope.error = false;
					$timeout.cancel(scope.timeout);

					if ((init === true) && !scope.Options.Provided && gotData()) {
						initAllOptions(true);
					} else {
						scope.Options.CurrentCols = scope.Options.Cols.filter(function (v, i, a) { return !v.ignore; });
					}

					scope.loading = !init && !gotData();

					if (scope.loading) {
						scope.timeout = $timeout(function () {
							scope.loading = false;
							scope.error = !scope.Options.Provided;
						}, 10000);
					}
				}

				scope.GetVal = function (item, col) {
					if (!angular.isDefined(col.filter)) {
						return item[col.key];
					}
					return scope.$eval("item[col.key] | " + col.filter, { item: item, col: col });
				}

				scope.OrderBy = function (item) {
					if (scope.Options.Order.OrderBy === item.key) {
						scope.Options.Order.Asc = !scope.Options.Order.Asc;
					} else {
						scope.Options.Order.OrderBy = item.key;
						scope.Options.Order.Asc = true;
					}

					updateData();
				}

				scope.GetOrderInfo = function () {
					var t = (scope.Options.Order.Asc ? "" : "-") + scope.Options.Order.OrderBy;
					return t;
				}

				scope.IsOrdered = function (item) {
					return scope.Options.Order.OrderBy === item.key;
				}

				scope.GetOrderIndicator = function (item) {
					if (scope.IsOrdered(item)) {
						if (scope.Options.Order.Asc) {
							return "glyphicon glyphicon-sort-by-alphabet";
						} else {
							return "glyphicon glyphicon-sort-by-alphabet-alt";
						}
					}
					return "glyphicon glyphicon-sort";
				}

				scope.animationsEnabled = true;

				scope.open = function (size) {
					var modalInstance = $uibModal.open({
						animation: scope.animationsEnabled,
						templateUrl: 'myModalContent.html',
						controller: 'FilterTableModalInstanceCtrl',
						size: size,
						resolve: {
							options: function () { return scope.Options; }
						}
					});

					modalInstance.result.then(function () {

					}, function () {

					});
				}
			}
		};
	});

})();

"use strict";

angular.module("smlAppl.webApps.framework.filters")
	.filter("chDate", ["$filter", function($filter) {
		var angularDateFilter = $filter("date");
		return function(theDate) {
			return angularDateFilter(theDate, "dd.MM.yyyy");
		}
	}])
	.filter("chDateTime", ["$filter", function($filter) {
		var angularDateFilter = $filter("date");
		return function(theDate) {
			return angularDateFilter(theDate, "dd.MM.yyyy HH:mm:ss");
		}
	}]);

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

/*
	This service will handle the response of a promise from $http-calls.
*/

angular.module("smlAppl.webApps.framework.services")
	.service("HttpHandler", ["$q",
		function ($q) {

			// Original code from: http://www.bennadel.com/blog/2612-using-the-http-service-in-angularjs-to-make-ajax-requests.htm

			// I transform the error response, unwrapping the application dta from
			// the API response payload.
			this.handleError = function (response) {
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

			// I transform the successful response, unwrapping the application data
			// from the API response payload.
			this.handleSuccess = function (response) {
				return (response.data);
			}
		}
	]);