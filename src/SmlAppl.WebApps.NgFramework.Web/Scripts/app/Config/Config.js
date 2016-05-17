angular.module("smlAppl.webApps.framework")
	.config(function($httpProvider) {
		$httpProvider.interceptors.push("AuthInterceptor");
		$httpProvider.interceptors.push("LangInterceptor");
		$httpProvider.interceptors.push("ClientTokenInterceptor");
	});
