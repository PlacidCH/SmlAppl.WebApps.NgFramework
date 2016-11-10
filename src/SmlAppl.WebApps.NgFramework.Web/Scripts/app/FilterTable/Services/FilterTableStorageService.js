(function () {
    "use strict";

    angular.module("smlAppl.webApps.framework.filterTable.services")
		.service("FilterTableStorageService", [function () {
		    var _self = this;

		    var persistenceObject = {
		        filterTableKey: null,
		        filterValue: {},
		        filterSort: []
		    };

		    // Loading data from localstorage to table
		    this.load = function (filterTableKey, tOptions, keys) {

		        var filterStorage = localStorage[filterTableKey];
		        //Check whether filter data already has been stored
		        if (!localStorage[filterTableKey]) {
		            return;
		        }

		        filterStorage = JSON.parse(filterStorage);

		        //If keys is not defined than load all
		        if (!keys) {
		            keys = _self._getColumns(tOptions);
		        }

		        //Going through all saved filterValues and applies it to table if exists
		        _.each(filterStorage.filterValue, function (value, key) {
		            if (_.contains(keys, key)) {
		                tOptions.TableFilter[key] = value;
		            } else {
		                //Ignoring this key
		                //console.error("Loading: " + key + " is not a valid table key");
		            }
		        });
		    };

		    // Persisting data from table into localstorage
		    this.persist = function (filterTableKey, tOptions, keys) {
		        persistenceObject.filterTableKey = filterTableKey;
		        persistenceObject.filterValue = {};

		        //If keys is not defined than persist all
		        if (!keys) {
		            keys = _self._getColumns(tOptions, true);
		        }

		        //Persisting each given key from the table only if the table has the column

		        _.each(keys, function (key) {
		            //Make sure no undefined is saved
		            var value = tOptions.TableFilter[key];
		            value = (value == undefined ? "" : value);

		            //Persisting the key specified and only the ones that are actually in the table
		            if (key in tOptions.TableFilter) {
		                persistenceObject.filterValue[key] = value;
		            } else {
		                //Ignoring this column
		            }
		        });

		        localStorage[filterTableKey] = JSON.stringify(persistenceObject);
		    };

		    //Watch for changes and persist it automatically
		    this.autoPersist = function (filterTableKey, tOptions, keys, scope) {
		        scope.$watch(function () {
		            return tOptions.TableFilter.backingfields;
		        }, function (newValue) {
		            _self.persist(filterTableKey, tOptions, keys);
		        }, true);
		    }

		    //Returns all available columns
		    this._getColumns = function (tOptions, fromBacking) {
		        var columns = [];


		        if (fromBacking) {
		            _.each(tOptions.TableFilter.backingfields, function (value, key) {
		                columns.push(key);
		            });
		        } else {
		            _.each(tOptions.Columns, function (column) {
		                columns.push(column.key);
		            });
		        }

		        return columns;
		    }
		}]);
})();
