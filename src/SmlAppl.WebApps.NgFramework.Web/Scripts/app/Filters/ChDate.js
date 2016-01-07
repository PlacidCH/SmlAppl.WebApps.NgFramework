"use strict";

angular.module("SmlAppl.WebApps.Framework.Filters")
	.filter("chDate", function($filter) {
		var angularDateFilter = $filter("date");
		return function(theDate) {
			return angularDateFilter(theDate, "dd.MM.yyyy");
		}
	})
	.filter("chDateTime", function($filter) {
		var angularDateFilter = $filter("date");
		return function(theDate) {
			return angularDateFilter(theDate, "dd.MM.yyyy HH:mm:ss");
		}
	});