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