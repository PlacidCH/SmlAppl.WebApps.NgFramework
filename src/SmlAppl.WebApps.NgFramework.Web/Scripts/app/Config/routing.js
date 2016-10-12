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