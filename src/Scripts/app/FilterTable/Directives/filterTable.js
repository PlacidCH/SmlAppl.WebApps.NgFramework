(function() {
	"use strict";

	angular.module("smlAppl.webApps.framework.filterTable.directives")
	    .directive("filterTable", ["$rootScope", "$uibModal", "$timeout", "$filter", "$sanitize", "filterTableConstructor", "$translate", function ($rootScope, $uibModal, $timeout, $filter, $sanitize, filterTableConstructor, $translate) {
	        return {
	            restrict: 'E',
	            scope: {
	                inData: "=items",
	                inOptions: "=?options",

	                inColumns: "=?columns",

	                inCanCustomize: "=?canCustomize",
	                inCanSelectCols: "=?canSelectCols",

	                inSearchActive: "=?searchActive",
	                inNoSearchSelects: "=?noSearchSelects",
	                inReduceSelects: "=?reduceSelects",
	                inOrder: "=?order",
	                inPageSize: "=?pageSize",

	                inSelectsOnColumns: "=?selectsOnColumns",
	                inNoSelectsOnColumns: "=?noSelectsOnColumns",
	                inIgnoreColumns: "=?ignoreColumns",
	                inInitialEmpty: "=?initialEmpty"
	            },
	            templateUrl: "./src/FilterTable/Views/FilterTable.html",

	            link: function (scope, element, attrs) {

	                scope.ModelOptions = {
	                    debounce: {
	                        default: 500,
	                        blur: 0
	                    }
	                };

	                scope.ParentScope = scope.$parent;
	                scope.filterTable = new filterTableConstructor.FilterTable();

	                function mappedField(onObject, name, definition) {
	                    var defaultVal = angular.isDefined(definition.value) ? definition.value : null;
	                    var currentVal = defaultVal;
	                    if (!(definition.force === true)) {
	                        if (angular.isDefined(scope['in' + name])) {
	                            currentVal = scope['in' + name];
	                        } else if (angular.isDefined(scope.inOptions) && angular.isDefined(scope.inOptions[name])) {
	                            currentVal = scope.inOptions[name];
	                        }
	                    }
	                    if (angular.isUndefined(onObject.backingFields)) {
	                        onObject.backingFields = {};
	                    }
	                    if (angular.isUndefined(onObject.watchers)) {
	                        onObject.watchers = {};
	                    }
	                    if (angular.isUndefined(onObject.backingFields[name])) {
	                        onObject.backingFields[name] = currentVal;
	                    }
	                    Object.defineProperty(onObject, name, {
	                        get: function () {
	                            return onObject.backingFields[name];
	                        },
	                        set: function (newValue) {
	                            var setVal = angular.isDefined(definition.changeFunc) ? definition.changeFunc.call((definition.callOn || onObject), newValue) : newValue;
	                            if (!angular.equals(onObject.backingFields[name], setVal)) {
	                                var old = onObject.backingFields[name];
	                                onObject.backingFields[name] = setVal;
	                                if (angular.isDefined(definition.afterChangeFunc)) {
	                                    definition.afterChangeFunc.call((definition.callOn || onObject), newValue, old);
	                                }
	                            }
	                            if (angular.isObject(setVal) && angular.isDefined(definition.afterChangeFunc)) {
	                                if (angular.isUndefined(onObject.watchers[name])) {
	                                    onObject.watchers[name] = scope.$watch(function () { return onObject.backingFields[name]; }, function (watchNewVal, watchOldValue) {
	                                        definition.afterChangeFunc.call((definition.callOn || onObject), watchNewVal, watchOldValue);
	                                        //onObject.backingFields[name] = watchNewVal;
	                                    }, true);
	                                }
	                            }
	                            if (definition.syncOut) {
	                                if (!angular.equals(scope['in' + name], setVal)) {
	                                    scope['in' + name] = setVal;
	                                }
	                                if (angular.isDefined(scope.inOptions)) {
	                                    if (!angular.equals(scope.inOptions[name], setVal)) {
	                                        scope.inOptions[name] = setVal;
	                                    }
	                                }
	                            }
	                        },
	                        enumerable: true,
	                        configurable: true
	                    });

	                    function findHostingScope(scope, property, lvl) {
	                        lvl = lvl || 0;
	                        if ((scope || null) === null) {
	                            return { scope: null, lvl: lvl };
	                        }
	                        if (scope.hasOwnProperty(property)) {
	                            return { scope: scope, lvl: lvl };
	                        }
	                        return findHostingScope(scope.$parent, property, lvl + 1);
	                    }

	                    if (angular.isDefined(scope.inOptions)) {
	                        //if (angular.isDefined(scope.inOptions[name]) || definition.force === true) {
	                        Object.defineProperty(scope.inOptions, name, {
	                            get: function () { return onObject[name]; },
	                            set: function (newValue) { onObject[name] = newValue; },
	                            enumerable: true,
	                            configurable: true
	                        });
	                        //}
	                    }

	                    var x = findHostingScope(scope, 'allInfos');
	                    if (angular.isDefined(scope['in' + name]) || definition.force === true) { //TODO: Test performance - seems like we had a hit here
	                        Object.defineProperty(scope, 'in' + name, {
	                            get: function () { return onObject[name]; },
	                            set: function (newValue) {
	                                onObject[name] = newValue;
	                            },
	                            enumerable: true,
	                            configurable: true
	                        });
	                    }

	                    //init all to same (overwrite inOpt with inParam in case both specified)
	                    onObject[name] = onObject[name];
	                }

	                function defineOptions(definition) {
	                    for (var x in definition) {
	                        if (definition.hasOwnProperty(x)) {
	                            mappedField(scope.filterTable, x, definition[x]);
	                        }
	                    }
	                }

	                function sanityCheckPageSize(newValue) {
	                    if (angular.isDefined(newValue) && angular.isNumber(newValue) && newValue > 0) {
	                        return newValue;
	                    }
	                    return scope.filterTable.PageSize;
	                }

                    function createInfoRows(array) {
                        var a = array || [];
                        var l = [];
                        for (var i = 0; i < a.length; i++) {
                            var entry = a[i];
                            var h = new filterTableConstructor.HeaderDef(
                                filterTableConstructor.GetDefined(entry.title, entry.Title, ""),
                                filterTableConstructor.GetDefined(entry.calculate, entry.Calculate, null),
                                filterTableConstructor.GetDefined(entry.showPageValues, entry.ShowPageValues, false)
                            );
                            if (h.CanCalculate) {
                                l.push(h);
                            }
                        }
                        return l;
                    }

	                function initFilterTable() {

	                    var filterTableDefinition = {
	                        CanCustomize: { syncIn: true, syncOut: true, value: true },
	                        CanSelectCols: { syncIn: true, syncOut: true, value: true },

	                        SearchActive: { syncIn: true, syncOut: true, value: true },
	                        NoSearchSelects: { syncIn: true, syncOut: true, value: false, afterChangeFunc: function (newValue) { if (newValue) { scope.filterTable.ResetDistincts(true); } } },
	                        ReduceSelects: { syncIn: true, syncOut: true, value: false, afterChangeFunc: function () { scope.filterTable.ResetDistincts(true); } },

	                        Order: { syncIn: true, syncOut: true, value: [], changeFunc: function (order) { return angular.isDefined(order) ? (angular.isArray(order) ? order : [order]) : []; } },
	                        PageSize: { syncIn: true, syncOut: true, value: 15, changeFunc: sanityCheckPageSize, afterChangeFunc: function () { scope.filterTable.CurrentPage = 1; } },

	                        SelectsOnColumns: { syncIn: true, syncOut: true, value: [] },
	                        NoSelectsOnColumns: { syncIn: true, syncOut: true, value: [] },
	                        IgnoreColumns: { syncIn: true, syncOut: true, value: [] },

	                        TableFilter: { syncIn: true, syncOut: true, value: {} },

	                        InitialEmpty: { syncIn: true, syncOut: true, value: false },

	                        Columns: { syncIn: true, syncOut: true, value: [], changeFunc: scope.filterTable.UpdateColumnsDefs },

	                        HeaderRows: { syncIn: true, syncOut: true, value: [], changeFunc: createInfoRows },
	                        FooterRows: { syncIn: true, syncOut: true, value: [], changeFunc: createInfoRows },

	                        Data: { syncIn: true, syncOut: false, value: [], afterChangeFunc: function (newValue) { scope.filterTable.PassedData = newValue; } },
                            DisablePaging : false

	                    }

	                    defineOptions(filterTableDefinition);
	                    scope.filterTable.OptionsProvided = scope.filterTable.Columns.length > 0;
	                    scope.filterTable.Initialised = true;
	                }

	                initFilterTable();
	                if (scope.filterTable.DisablePaging == true) {

	                    scope.filterTable.PageSize = Number.MAX_VALUE;
	                }

                    $rootScope.$on("$translateChangeEnd", function () {
                        scope.filterTable.UpdateTranslations(scope.filterTable.Refresh);
                    });

                    Object.defineProperty(scope, "Translations", {
                        get: function () { return scope.filterTable.Translations; },
                    });
                   
                    scope.filterTable.UpdateTranslations(scope.filterTable.Refresh);
	                scope.animationsEnabled = true;

	                scope.open = function (size) {
	                    scope.openThis(size, "./src/FilterTable/Views/FilterTableOptions.html", "FilterTableOptionsCtrl");
	                }

                    scope.defineFilter = function(col) {
                        scope.openThis(undefined, col.CustomFilter.TemplateUrl, col.CustomFilter.Controller, col
                            , undefined
                            , function (newColDef) {
                                col.CustomFilter = newColDef.CustomFilter;
                                col.UpdateCustomFilterTexts();
                                scope.filterTable.FilterUpdateHandler.ResetHeaderAndFooter = true;
                            }
                        );
                    }

                    scope.resetFilter = function(col, event) {
                        event.preventDefault();
                        col.CustomFilter.FnReset();
                        col.UpdateCustomFilterTexts();
                        scope.filterTable.FilterUpdateHandler.ResetHeaderAndFooter = true;
                    }

	                scope.openThis = function (size, templateUrl, controller, column, cancel, ok) {
	                    column = column || null,
	                    cancel = cancel || function () { };
	                    ok = ok || function () { };
	                    var modalInstance = $uibModal.open({
	                        animation: scope.animationsEnabled,
	                        templateUrl: templateUrl,
	                        controller: controller,
	                        size: size,
	                        resolve: {
	                            filterTable: function () { return scope.filterTable; },
	                            column: column,
                                translations: scope.Translations
	                        }
	                    });

	                    modalInstance.result.then(function (retVal) {
	                        ok(retVal);
	                    }, function () {
	                        cancel();
	                    });
	                }
	            }
	        };
	    }]);

})();