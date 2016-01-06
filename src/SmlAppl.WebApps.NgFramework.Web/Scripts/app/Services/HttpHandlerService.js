/*
	This service will handle the response of a promise from $http-calls.
*/

angular.module("SmlAppl.WebApps.Framework.Services")
	.service("httpHandlerService", ["$q",
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