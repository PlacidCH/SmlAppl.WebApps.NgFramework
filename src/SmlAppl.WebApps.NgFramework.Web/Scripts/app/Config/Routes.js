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