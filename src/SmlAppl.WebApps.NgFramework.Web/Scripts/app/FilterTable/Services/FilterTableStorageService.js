(function () {
    "use strict";

    angular.module("smlAppl.webApps.framework.filterTable.services")
		.service("FilterTableStorageService", [function () {
		    var _self = this;

		    var persistenceObject = {
		        filterValue: {},
		        filterSort: [],
		        expireInSeconds: null
		    };

		    // Loading data from localstorage to table
		    this.load = function (filterTableKey, tOptions, keys) {

		        var filterStorage = localStorage[filterTableKey];
		        //Check whether filter data already has been stored
		        if (!localStorage[filterTableKey]) {
		            return;
		        }

		        filterStorage = JSON.parse(filterStorage);

		        //If the persistenceObject has expired than ignore it
		        if (filterStorage.expireInSeconds && filterStorage.expireInSeconds < new Date().getTime()) {
		            return;
		        }

		        //If keys is not defined than load all
		        if (!keys) {
		            keys = _self._getColumns(tOptions);
		        }

		        //Going through all saved filterValues and applies it to table if exists
		        _.each(filterStorage.filterValue, function (value, key) {

		            if (_self._keyExists(key, tOptions)) {
		                var col = _.findWhere(tOptions.Columns, { key: key });
		                //If its a multiselect
		                if (col && col.customFilter) {
		                    
		                    setTimeout(function () {
		                        var col = _.findWhere(tOptions.Columns, { _key: key });
		                        col.CustomFilter.Selected = value;
		                    });
		                    		                } else {
		                    tOptions.TableFilter[key] = value;
		                }

		            } else {
		            }
		        });
		    };

		    // Persisting data from table into localstorage
		    this.persist = function (filterTableKey, tOptions, keys, options) {
		        persistenceObject.filterValue = {};

		        //If keys is not defined than persist all
		        if (!keys) {
		            keys = _self._getColumns(tOptions);
		        }

		        //Persisting each given key from the table only if the table has the column

		        _.each(keys, function (key) {
		            //Make sure no undefined is saved
		            var value = tOptions.TableFilter[key];
		            value = (value == undefined ? "" : value);

		            //Persisting the key specified and only the ones that are actually in the table
		            if (_self._keyExists(key, tOptions)) {

		                var col = _.findWhere(tOptions.Columns, { _key: key });
                        //If its a multiselect
		                if (col.CustomFilter) {
		                    persistenceObject.filterValue[key] = col.CustomFilter.Selected;
		                } else {
                            //else if its simple input field
		                    persistenceObject.filterValue[key] = value;
		                }
                        
		            } else {
		                //Ignoring this column
		            }
		        });

		        //If a specific expireInSeconds (e.x. when 60 is given, than this object will expire in 1 minute) is given as option, than use that otherwise take default 1h
		        persistenceObject.expireInSeconds = new Date().getTime() + (options && options.expireInSeconds ? options.expireInSeconds * 1000 : 60 * 60 * 1000);
		        
		        localStorage[filterTableKey] = JSON.stringify(persistenceObject);
		    };

		    //Watch for changes and persist it automatically
		    this.autoPersist = function (filterTableKey, tOptions, keys, options, scope) {
		        scope.$watch(function () {
		            return tOptions;
		        }, function (tOptionsNew) {
		            _self.persist(filterTableKey, tOptionsNew, keys, options);
		        }, true);
		    }

		    //Returns all available columns
		    this._getColumns = function (tOptions) {
		        var columns = [];

		        _.each(tOptions.Columns, function (column) {
		            if (column._key) {
		                columns.push(column._key);
		            } else if(column.key){
		                columns.push(column.key);
		            }

		        });

		        return columns;
		    }

		    this._keyExists = function (key, tOptions) {
		        var continueSearch = true;
		        var match = false;
		        _.each(_self._getColumns(tOptions), function (column) {
		            if (continueSearch && column == key) {
		                match = true;
		                continueSearch = false;
		            };
		        });
                
		        return match;
		    }
		}]);
})();
