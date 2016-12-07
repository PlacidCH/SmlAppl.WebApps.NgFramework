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