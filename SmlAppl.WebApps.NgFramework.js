(function() {
	"use strict";

	angular.module("SmlAppl.WebApps.Framework.Controllers", []);
	angular.module("SmlAppl.WebApps.Framework.Directives", []);
	angular.module("SmlAppl.WebApps.Framework.Filters", []);
	angular.module("SmlAppl.WebApps.Framework.Services", []);

	angular.module("SmlAppl.WebApps.Framework", [
		// Angular modules 
		//'ngRoute'
		//"ui.router",

		// Custom modules 
		"SmlAppl.WebApps.Framework.Controllers",
		"SmlAppl.WebApps.Framework.Directives",
		"SmlAppl.WebApps.Framework.Filters",
		"SmlAppl.WebApps.Framework.Services",

		// 3rd Party Modules
	]);
})();

//var baseViewPath = "App/Views/";
//var baseGlobalViewPath = "App/Global/Views/";

//angular.module("SmlAppl.WebApps.Framework")
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

"use strict";

angular.module("SmlAppl.WebApps.Framework.Filters")
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

/*
	This service will handle the response of a promise from $http-calls.
*/

angular.module("SmlAppl.WebApps.Framework.Services")
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