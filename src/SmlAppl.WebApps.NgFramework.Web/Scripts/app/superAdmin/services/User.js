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