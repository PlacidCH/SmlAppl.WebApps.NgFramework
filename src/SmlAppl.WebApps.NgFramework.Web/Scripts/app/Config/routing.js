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
	//.run([
	//	"$rootScope", "$state", "$stateParams", "authorization", "principal",
	//	function($rootScope, $state, $stateParams, authorization, principal) {
	//		$rootScope.$on("$stateChangeStart", function (event, toState, toStateParams) {
	//			// track the state the user wants to go to; authorization service needs this
	//			$rootScope.toState = toState;
	//			$rootScope.toStateParams = toStateParams;
	//			// if the principal is resolved, do an authorization check immediately. otherwise,
	//			// it'll be done when the state it resolved.
	//			if (principal.isIdentityResolved()) authorization.authorize();
	//		});
	//	}
//])

;