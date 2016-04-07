(function() {
	"use strict";

	angular.module("smlAppl.webApps.framework.filterTable.directives")
	    .factory('filterTableConstructor', ["$filter", "$timeout", "$parse", "$sce", function ($filter, $timeout, $parse, $sce) {
	        function HeaderDef(title, calculator, showPageValues) {
                this.Title = title || "";
                this._calculator = calculator || null;
                this.Values = {};
                this.ShowPageValues = showPageValues || false;
            }

            HeaderDef.prototype = {
                get CanCalculate() {
                    return ((this._calculator || null) != null);
                },
                GetValue: function (column) {
                    if (angular.isUndefined(this.Values[column.Key])) {
                        var val = this.Calculate(column);
                        if ((val || null) !== null && angular.isString(val)) {
                            val = $sce.trustAsHtml(val);
                        }
                        this.Values[column.Key] = val;
                    }
                    return this.Values[column.Key] || null;
                },
                ResetVal: function(onlyPageChange) {
                    onlyPageChange = onlyPageChange || false;
                    if (!onlyPageChange || this.ShowPageValues) {
                        this.Values = {};
                    }
                },
                ColumnData: function(col, data) {
                    return (data || []).map(function (item) { return item[col.Key] });
                },
                Sum: function (col, data) {
                    var total = 0;
                    var array = this.ColumnData(col, data);
                    var l = array.length;
                    if (l === 0) {
                        return null;
                    }
                    for (var i = l; i> 0; i--) {
                        total += array[i-1];
                    }
                    return total;
                },
                Avg: function (col, data) {
                    var l = data.length;
                    if (l === 0) {
                        return null;
                    }
                    return this.Sum(col, data) / l;
                },
                Max: function (col, data) {
                    var array = this.ColumnData(col, data);;
                    var l = array.length;
                    if (l === 0) {
                        return null;
                    }
                    return Math.max.apply(null, array);
                },
                Min: function (col, data) {
                    var array = this.ColumnData(col, data);
                    var l = array.length;
                    if (l === 0) {
                        return null;
                    }
                    return Math.min.apply(null, array);
                },
                Calculate: function (column) {
                    if (this.CanCalculate) {
                        var data = column.GetFilterTable().DataFiltered || [];
                        var dataDisplayed = column.GetFilterTable().DataDisplayed ||[];
                        return this._calculator.call(this, column, data, dataDisplayed);
                    }
                    return null;
                }
            }

	        function ColumnDef() {
	            this._key = null;

	            this._ignore = false;
	            this._visible = false;
	            this._display = undefined;
	            this._canBuildSelect = true;
	            this._buildSelect = false;
	            this.orderAsc = undefined;

	            this._distincts = null;
	            this._distinctsReduced = null;
	            this.Filter = undefined;
	            this.ValueFunction = null;
	            this.ClickAction = null;

	            this.ActionCol = false;
	            this.GetFilterTable = function () { return null; }; //as a function, so copy and watch won't go into circular endless-loops

	            this.AlternateSortCol = null;
	            this._calculateColumn = null;
	            this._applyFilter = null;
	        }

	        ColumnDef.prototype = {
	            get Key() {
	                return this._key;
	            },
	            set Key(val) {
	                if ((val || null) === null) { return; }
	                this._key = val;
	                if (angular.isUndefined(this._display)) {
	                    this._display = this._key;
	                }
	            },
	            get Display() {
	                if (angular.isUndefined(this._display)) {
	                    this._display = this._display || this.Key;
	                }
	                return this._display;
	            },
	            set Display(val) {
	                if ((val || null) === null) { return; }
	                this._display = val;
	            },
	            CallOnFilterTable: function (func) {
	                var ret = {
	                    called: false,
	                    result: undefined
	                };
	                var ft = this.GetFilterTable();
	                if (ft != null) {
	                    ret.called = true;
	                    ret.result = func.call(ft, ft, this);
	                }
	                return ret;
	            },
	            _updateColumns: function (ft) {
	                ft.UpdateColumnLists(ft.Columns);
	            },
	            UpdateColumns: function () {
	                this.CallOnFilterTable(this._updateColumns);
	            },
	            get Visible() {
	                if (this.Ignore) {
	                    return false;
	                }
	                return this._visible;
	            },
	            set Visible(val) {
	                if (angular.isUndefined(val) || val === null) { return; }
	                if (this._ignore) {
	                    this._visible = false;
	                } else {
	                    this._visible = val;
	                }
	                this.UpdateColumns();
	            },
	            get Ignore() {
	                return this._ignore;
	            },
	            set Ignore(val) {
	                if (angular.isUndefined(val) || val === null) { return; }
	                this._ignore = val;
	                if (this._ignore) {
	                    this._visible = false;
	                }
	                this.UpdateColumns();
	            },
	            get BuildSelect() {
	                if (!this.CanBuildSelect) {
	                    return false;
	                }
	                return this._buildSelect;
	            },
	            set BuildSelect(val) {
	                if (angular.isUndefined(val) || val === null) { return; }
	                var before = this._buildSelect;
	                if (!this.CanBuildSelect) {
	                    this._buildSelect = false;
	                } else {
	                    this._buildSelect = val;
	                }

	                if (this._buildSelect !== before) {
	                    this.ResetDistincts();
	                };
	            },
	            ResetDistincts: function () {
	                //TODO: hold 2 distinct lists ?
	                this._distincts = null;
	            },
	            _buildDistincts: function (ft, c) {
	                return ft.CreateDistincts(c);
	            },
	            BuildDistincts: function () {
	                var ret = this.CallOnFilterTable(this._buildDistincts);
	                return ret.called ? ret.result : null;
	            },
	            get Distincts() {
	                if (!this.BuildSelect) {
	                    return null;
	                } else {
	                    if (this._distincts == null) {
	                        this._distincts = this.BuildDistincts();
	                    }
	                    return this._distincts;
	                }
	            },
	            get HasDistincts() {
	                return (this.Distincts || []).length > 0;
	            },
	            _canBuildFromTable: function (ft) {
	                return ft.NoSearchSelects;
	            },
	            get CanBuildFromTable() {
	                var ret = this.CallOnFilterTable(this._canBuildFromTable);
	                return ret.called ? !ret.result : true;
	            },
	            get CanBuildSelect() {
	                return this.CanBuildFromTable && this._canBuildSelect;
	            },
	            set CanBuildSelect(val) {
	                if (angular.isUndefined(val) || val === null) { return; }
	                this._canBuildSelect = val;
	                if (!this._canBuildSelect) {
	                    this._buildSelect = false;
	                }
	            },
	            get OrderBy() {
	                if (angular.isDefined(this.orderAsc)) {
	                    var column = (this.AlternateSortCol || null) !== null ? this.AlternateSortCol : this.Key;
	                    return (this.orderAsc === true ? "" : "-") + "'" + column + "'";
	                }
	                return null;
	            },
	            get IsSorted() {
	                return angular.isDefined(this.orderAsc);
	            },
	            get OrderIndicator() {
	                if (this.IsSorted) {
	                    if (this.orderAsc) {
	                        return "glyphicon glyphicon-sort-by-alphabet";
	                    } else {
	                        return "glyphicon glyphicon-sort-by-alphabet-alt";
	                    }
	                }
	                return "glyphicon glyphicon-sort";
	            },
	            get CalculateColumn() {
	                if (this._calculateColumn == null) {
	                    this._calculateColumn = (angular.isDefined(this.ValueFunction) && angular.isFunction(this.ValueFunction) && this.ValueFunction !== null);
	                }
	                return this._calculateColumn;
	            },
	            get ApplyFilter() {
	                if (this._applyFilter == null) {
	                    this._applyFilter = (angular.isDefined(this.Filter));
	                }
	                return this._applyFilter;
	            },
                TrustIt: function(val) {
                    if ((val || null) !== null && angular.isString(val)) {
                        return $sce.trustAsHtml(val);
                    }
                    return val;
                },
	            GetValue: function (item) {
	                if (this.CalculateColumn) {
	                    return this.TrustIt(this.ValueFunction.call(this, item));
	                }
	                if (this.ActionCol) {
	                    return ''; // needs to be handled with ValueFunction
	                }
	                if (this.ApplyFilter) {
	                    return this.TrustIt($parse("item[col.Key] | " + this.Filter)(this, { item: item, col: this }));
	                }
	                return this.TrustIt(item[this.Key]);
	            },
	            get HasClickAction() {
	                return (angular.isDefined(this.ClickAction) && angular.isFunction(this.ClickAction) && this.ClickAction !== null);
	            },
	            Clicked: function (item) {
	                if (this.HasClickAction) {
	                    this.ClickAction.call(this, item, this);
	                }
	            }
	        }

	        function defineProp(on, name, options) {
	            var config = {
	                //writable: true,
	                enumerable: true,
	                configurable: true
	            }
	            Object.defineProperty(Object.getPrototypeOf(on), name,
                    angular.extend(config, options)
                );
	        }

	        function defineFunc(on, name, func) {
	            Object.getPrototypeOf(on)[name] = func;
	        }

	        function FilterTable() {
	            this._loading = true;
	            this._error = false;
	            defineProp(this, 'test1', {
	                get: function () { return "foo"; },
	                set: function (val) { },
	            }
                );

	            this._loadTimeout = {};
	            this.OptionsProvided = false;
	            this.StructureSet = false;

	            this._columns = [];
	            this._data = [];
	            this._dataCalc = [];
	            this._dataCounter = 0;
	            this._hasData = false;

	            this.DataFiltered = [];
	            this.DataDisplayed = [];
	            this._currentPage = 1;
	            this._filterPageCount = 0;

	            this._currentCols = [];
	            this._visibleCols = [];

	            this.OrderByCols = [];

	            this.Status = "Loading";
	            this._actionCol = null;
	            this.HeaderRows = [];
	            this.FooterRows = [];
	            this.Initialised = false;
	        }

	        FilterTable.prototype = {
	            CreateDistincts: function (colDef) {
	                if (colDef.BuildSelect) {
	                    //if (this.ReduceSelects) {
	                    //    return ["", "I", "am", "reduced"];
	                    //} else {
	                    //    return ["", "I", "will", "do", "selects", "once", "implemented"];
	                    //}
	                    var distincts = {};
	                    var distinctList = [""];
	                    var onData = (this.ReduceSelects ? this.DataFiltered : this.PassedData).map(function (item) { return item[colDef.Key] });

	                    for (var i = 0; i < onData.length; i++) {
	                        var entry = (onData[i] || null);
	                        if (entry !== null && angular.isUndefined(distincts[entry])) {
	                            distincts[entry] = "";
	                            distinctList.push(entry.toString());
	                        }
	                    }
	                    distinctList = $filter("orderBy")(distinctList);
	                    return distinctList;
	                }
	                return null;
	            },
	            get PassedData() {
	                return this._dataCalc;
	            },
	            RecalculateData: function () {
	                this.UpdateData(this.PassedData, false);
	            },
	            set PassedData(val) {
	                this.UpdateData(val, false);
	            },
	            UpdateData: function (newData, resetting) {
	                resetting = resetting || false;
	                var me = this;
	                //if (me.Initialised && !resetting) {
	                //    me._dataCounter++;
	                //}
	                if (!resetting) {
	                    me._data = newData;
	                    me.CheckColumnsDefs(me._data);
	                    var dataCalc = [];
	                    //var start = new Date().getTime();
	                    var relevantCols = this.Columns.filter(function (v, i, a) { return !v.Ignore; });
	                    for (var i = 0; i < me._data.length; i++) {
	                        var row = me._data[i];
	                        var calcRow = {};

	                        for (var c = 0; c < relevantCols.length; c++) {
	                            var col = relevantCols[c];
	                            var val = row[col.Key];
	                            //calcRow[col.Key] = val;
	                            //calcRow[col.Key] = col.GetValue.call(col, row);
	                            calcRow[col.Key] = col.GetValue(row);
	                            if (col.AlternateSortCol !== null) {
	                                if (row.hasOwnProperty(col.AlternateSortCol)) {
	                                    calcRow[col.AlternateSortCol] = row[col.AlternateSortCol];
	                                } else {
	                                    calcRow[col.AlternateSortCol] = val;
	                                }
	                            }
	                        }
	                        //calcRow.origRow = row;
	                        dataCalc.push(calcRow);
	                    }
	                    //console.log(" Elapsed:" + (new Date().getTime() - start));
	                    me._dataCalc = this.GetOrdered(dataCalc);
	                    me.ResetDistincts(true);
	                } else {
	                    me._dataCalc = this.GetOrdered(me._dataCalc);
	                    me.ResetHeaders(true);
	                    me.ResetFooters(true);
	                }
	                me._hasData = me._dataCalc.length > 0;
	                me.UpdateFilter(!resetting);
	                $timeout.cancel(me._loadTimeout);
	                //if (!me._hasData && me._dataCounter > 1) {
	                if (!me._hasData) {
	                    me._loadTimeout = $timeout(function () {
	                        me.Loading = false;
	                        me.Error = !me._hasData && !me.InitialEmpty && !me.OptionsProvided;
	                    }, 10000);
	                } else {
	                    me.Loading = false;
	                }
	            },
                ResetHeaders: function(onlyPageChange) {
                    for (var i = 0; i < this.HeaderRows.length; i++) {
                        this.HeaderRows[i].ResetVal(onlyPageChange);
                    }
                },
                ResetFooters: function (onlyPageChange) {
                    for (var i = 0; i < this.FooterRows.length; i++) {
                        this.FooterRows[i].ResetVal(onlyPageChange);
                    }
                },
                GetOrdered: function (data) {
	                return $filter('orderBy')(data, this.OrderBy);
	            },
	            get CurrentPage() {
	                return this._currentPage;
	            },
	            set CurrentPage(val) {
	                this._currentPage = val;
	                this.UpdateDisplayData();
	            },
	            get PageSizeCalc() {
	                if (angular.isDefined(this.PageSize) && angular.isNumber(this.PageSize)) {
	                    return Math.ceil(this.PageSize, 1);
	                }
	                return 10;
	            },
	            UpdateDisplayData: function () {
	                var startIndex = (this.CurrentPage - 1) * this.PageSizeCalc;
	                if (startIndex > this.DataFiltered.length) {
	                    this.DataDisplayed = [];
	                } else {
	                    this.DataDisplayed = this.DataFiltered.slice(startIndex, startIndex + this.PageSizeCalc);
	                }
	                this.ResetHeaders(true);
	                this.ResetFooters(true);
	            },
	            get BackwardDisabled() {
	                return this.CurrentPage <= 1;
	            },
	            get PassedDataPageCount() {
	                return Math.ceil(this.PassedData.length / this.PageSizeCalc);
	            },
	            get FilterDataPageCount() {
	                return Math.ceil(this.DataFiltered.length / this.PageSizeCalc);
	            },
	            get FilterPageArray() {
	                var x = [];
	                for (var i = 1; i <= this.FilterDataPageCount; i++) {
	                    x.push(i);
	                }
	                return x;
	            },
	            get ForwardDisabled() {
	                return this.CurrentPage >= this.FilterDataPageCount;
	            },
	            get HasData() {
	                //if (this._hasData == null) {
	                //    this._hasData = this._data.length > 0;
	                //}
	                return this._hasData;
	            },
	            get ShowNoDataMsg() {
	                return !this.Loading && !this.HasData && !this.InitialEmpty;
	            },
	            get ShowDataFilteredOutMsg() {
	                return !this.Loading && this.HasData && this.DataFiltered.length === 0;
	            },
	            get OrderBy() {
	                var orderByList = [];
	                for (var i = 0; i < this.OrderByCols.length; i++) {
	                    var col = this.OrderByCols[i];
	                    var orderByAdd = col.OrderBy;
	                    if (orderByAdd != null) {
	                        orderByList.push(orderByAdd);
	                    }
	                }
	                return orderByList;
	            },
	            set OrderBy(col) {
	                if ((col || null) === null) {
	                    this.ClearOrderBy();
	                    this.UpdateData(this.PassedData, true);
	                } else if (Object.getPrototypeOf(col) === ColumnDef.prototype) {
	                    var newOrderBy = !(col.orderAsc || false);
	                    this.ClearOrderBy();
	                    col.orderAsc = newOrderBy;
	                    this.AddOrderBy(col);
	                }
	            },
	            UpdateOrderBy: function (col, event) {
	                var setDirect = !event.ctrlKey || this.OrderByCols.length === 0 || (col || null) === null || this.OrderByCols.length === 0 || Object.getPrototypeOf(col) !== ColumnDef.prototype;
	                if (setDirect) {
	                    this.OrderBy = col;
	                } else {
	                    var newOrderBy = !(col.orderAsc || false);
	                    col.orderAsc = newOrderBy;
	                    this.AddOrderBy(col);
	                }
	            },
	            AddOrderBy: function (col, refresh) {
	                var alreadyIn = this.OrderByCols.filter(function (v, i, a) { return v.Key === col.Key; });
	                if (alreadyIn.length === 0) {
	                    this.OrderByCols.push(col);
	                }
	                if (angular.isUndefined(refresh) || refresh === true) {
	                    this.UpdateData(this.PassedData, true);
	                }
	            },
	            ClearOrderBy: function () {
	                for (var i = 0; i < this.OrderByCols.length; i++) {
	                    this.OrderByCols[i].orderAsc = undefined;
	                }
	                this.OrderByCols.length = 0;
	            },
	            ColByKey: function (key) {
	                var cols = this.Columns.filter(function (v, i, a) { return v.Key === key });
	                if (cols.length === 1) {
	                    return cols[0];
	                }
	                return null;
	            },
	            CheckColumnsDefs: function (data) {
	                if (!this.OptionsProvided) {
	                    this.StructureSet = false;
	                    var d = data || [];
	                    var cDef = [];
	                    if (d.length > 0) {
	                        var firstRow = d[0];
	                        for (var col in firstRow) {
	                            if (firstRow.hasOwnProperty(col) && col !== "$$hashKey") {
	                                cDef.push({ Key: col });
	                            }
	                        }
	                        if (cDef.length > 0) {
	                            this.Columns = this.UpdateColumnsDefs(cDef);
	                        }
	                    }
	                }
	                return data;
	            },
	            UpdateColumnsDefs: function (inDef) {
	                var defs = inDef || [];
	                var prepared = [];
	                var changed = false;
	                for (var i = 0; i < defs.length; i++) {
	                    var def = defs[i];
	                    var existing = this.ColByKey(def.Key);
	                    var colDef = existing == null ? createColumn(def, this) : existing;
	                    changed = changed || (existing !== colDef);
	                    if (colDef !== null) {
	                        prepared.push(colDef);
	                    }
	                }
	                changed = changed || (defs.length !== prepared.length) || (prepared.length !== this.Columns.length);
	                this.StructureSet = prepared.length > 0;
	                if (!changed) {
	                    prepared = this.Columns;
	                }
	                this.UpdateColumnLists(prepared);
	                this.UpdateStatus();
	                return prepared;
	            },
	            UpdateColumnLists: function (columns) {
	                this._currentCols = columns.filter(function (v, i, a) { return !v.Ignore && !v.ActionCol; });
	                this._visibleCols = this._currentCols.filter(function (v, i, a) { return v.Visible; });
	                this.InitFilter();
	            },
	            get CurrentCols() {
	                return this._currentCols;
	            },
	            get VisibleCols() {
	                return this._visibleCols;
	            },
	            //SetIgnoreColumns: function (cols) {
	            //    this.ChangeColValue(cols, "Ignore", true);
	            //},
	            //SetBuildSelectsOnColumns: function (cols) {
	            //    this.ChangeColValue(cols, "BuildSelect", true);
	            //},
	            ChangeColValue: function (cols, prop, newValue) {
	                var colsToChange = angular.isDefined(cols) ? (angular.isArray(cols) ? cols : [cols]) : [];
	                for (var i = 0; i < colsToChange.length; i++) {
	                    var col = this.ColByKey(colsToChange[i]) || null;
	                    if (col !== null) {
	                        col[prop] = newValue;
	                    }
	                }
	            },
	            get Loading() {
	                return this._loading;
	            },
	            set Loading(val) {
	                this._loading = val;
	                this.UpdateStatus();
	            },
	            set Error(val) {
	                this._error = val;
	                this.UpdateStatus();
	            },
	            UpdateStatus: function () {
	                if (this._error) {
	                    this.Status = "Error";
	                    return;
	                }
	                if (this.StructureSet) {
	                    this.Status = "Structure";
	                    return;
	                }
	                if (this._loading) {
	                    this.Status = "Loading";
	                    return;
	                }
	                //if (this.OptionsProvided) {
	                //    this.Status = "Structure";
	                //    return;
	                //}

	                this.Status = "undefined";
	                //if (this.HasData) {
	                //    this.Status = "Data";
	                //}
	            },
	            InitFilter: function () {
	                var me = this;
	                var x = me.TableFilter;
	                var f = {
	                    delayFilter: {},
	                    backingfields: {},
	                };
	                function defineFilterProp(name) {
	                    Object.defineProperty(f, name, {
	                        get: function () { return f.backingfields[name]; },
	                        set: function (newValue) {
	                            var changed = f.backingfields[name] !== newValue;
	                            f.backingfields[name] = newValue;
	                            $timeout.cancel(f.delayFilter);
	                            f.delayFilter = $timeout(function () {
	                                me.UpdateFilter(changed);
	                            }, 200);
	                        },
	                    });
	                }
	                for (var i = 0; i < this.CurrentCols.length; i++) {
	                    var col = this.CurrentCols[i];
	                    var val = x[col.Key];
	                    var name = col.Key;
	                    defineFilterProp(name);
	                    f.backingfields[name] = val;
	                }
	                this.TableFilter = f;
	            },
	            ClearFilter: function () {
	                //this.TableFilter = {}; //new: clear only visible filters
	                //var x = this.TableFilter;
	                for (var i = 0; i < this.VisibleCols.length; i++) {
	                    var col = this.VisibleCols[i];
	                    this.TableFilter[col.Key] = null;
	                }
	                //this.TableFilter = x;
	            },
	            CleanTableFilter: function (filter) {
	                var term = angular.copy(filter || {});
	                for (var x in term) {
	                    if (term.hasOwnProperty(x)) { //always will filter out null values otherwise we can't really "clear" a filter on null values
	                        if ((term[x] || null) === null || term[x] === "") {
	                            delete term[x];
	                        }
	                    }
	                }
	                return term;
	            },
	            UpdateFilter: function (resetHeaderAndFooter) {
	                this.DataFiltered = $filter('filter')(this._dataCalc, this.CleanTableFilter(this.TableFilter.backingfields));
	                this.ResetDistincts(this.ReduceSelects);
	                this.CurrentPage = 1;
	                if (resetHeaderAndFooter || false) {
	                    this.ResetHeaders();
	                    this.ResetFooters();
	                }
	            },
	            ResetDistincts: function (reset) {
	                if (reset) {
	                    for (var i = 0; i < this.Columns.length; i++) {
	                        var col = this.Columns[i];
	                        if (Object.getPrototypeOf(col) === ColumnDef.prototype) {
	                            col.ResetDistincts();
	                        }
	                    }
	                }
	            },
	            get ActionCol() {
	                if (this._actionCol == null) {
	                    var actionCol = this.Columns.filter(function (v, i, a) { return v.ActionCol; });
	                    if (actionCol.length === 1) { //TODO: multiple ?
	                        this._actionCol = actionCol[0];
	                    } else {
	                        this._actionCol = createColumn({ Key: "theEmptyActionCol", ValueFunction: function (row) { return ''; } });
	                    }
	                }
	                return this._actionCol;
	            },
	            set ActionCol(val) {
	                this._actionCol = val;
	            },
	            ExecuteClickAction: function (col, item) {
	                if (col.HasClickAction) {
	                    col.Clicked(item);
	                }
	            }
	        }

	        function getDefined() {
	            for (var i = 0; i < arguments.length; i++) {
	                if (angular.isDefined(arguments[i])) {
	                    return arguments[i];
	                }
	            }
	            return undefined;
	        }

	        function checkOverwrite(array, key) {
	            return (array || []).indexOf(key) > -1 ? true : undefined;
	        }

	        function createColumn(basedOn, ft) {
	            var filterTable = ft || {};
	            if (Object.getPrototypeOf(basedOn) === ColumnDef.prototype) {
	                return basedOn;
	            }
	            var c = new ColumnDef();
	            c.Key = getDefined(basedOn.key, basedOn.Key, null);

	            c.ActionCol = getDefined(basedOn.actionCol, basedOn.ActionCol, false);
	            c.ValueFunction = getDefined(basedOn.valueFunction, basedOn.ValueFunction, null);
	            c.ClickAction = getDefined(basedOn.clickAction, basedOn.ClickAction, null);

	            c.Ignore = getDefined(checkOverwrite(filterTable.IgnoreColumns, c.Key), basedOn.ignore, basedOn.Ignore, false);

	            c.Visible = getDefined(basedOn.visible, basedOn.Visible, false);
	            c.Display = getDefined(basedOn.display, basedOn.Display);

	            c.CanBuildSelect = getDefined((filterTable.NoSearchSelects === true ? false : undefined), checkOverwrite(filterTable.NoSelectsOnColumns, c.Key), basedOn.canSelect, basedOn.CanBuildSelect, true);
	            c.BuildSelect = getDefined(checkOverwrite(filterTable.SelectsOnColumns, c.Key), basedOn.select, basedOn.BuildSelect, false);
	            c.orderAsc = getDefined(checkOverwrite(filterTable.Order, c.Key), basedOn.orderAsc || basedOn.orderAsc);
	            c.Filter = getDefined(basedOn.filter, basedOn.Filter);
	            c.AlternateSortCol = getDefined(basedOn.alternateSortCol, basedOn.AlternateSortCol || null);

	            var isDate = getDefined(basedOn.isDate, basedOn.IsDate, false);
	            if (isDate && c.AlternateSortCol === null) {
	                c.AlternateSortCol = c.Key + "_Order_Col";
	            }

	            if (c.Key == null) {
	                console.log("invalid item - missing 'key':");
	                console.log(basedOn);
	                return null;
	            }

	            filterTable = ft || null;
	            c.GetFilterTable = function () { return filterTable; };

	            if (angular.isDefined(c.orderAsc) && filterTable !== null) {
	                filterTable.AddOrderBy(c, false);
	            }
	            return c;
	        }

            return {
                FilterTable: FilterTable,
                HeaderDef: HeaderDef, 
                GetDefined: getDefined,
            }
	    }])
	    .directive("filterTable", ["filterFilter", "$uibModal", "$timeout", "$filter", "$sanitize", "filterTableConstructor", function (filterFilter, $uibModal, $timeout, $filter, $sanitize, filterTableConstructor) {
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
	            templateUrl: "wwwroot/FilterTable/Views/FilterTable.html",
	            link: function (scope, element, attrs) {

	                scope.ModelOptions = {
	                    debounce: {
	                        default: 500,
	                        blur: 0
	                    }
	                };

	                scope.filterTable = new filterTableConstructor.FilterTable();

	                //function mappedField_old(onObject, name, definition) {
	                //    var defaultVal = angular.isDefined(definition.value) ? definition.value : null;
	                //    onObject.__defineGetter__(name, function () {
	                //        //{
	                //        //    definition.CallCounter = (definition.CallCounter || 0) + 1;
	                //        //    var isSame = (definition.lastVal === defaultVal);
	                //        //    console.log("Calling getter for:" + name + " (" + definition.CallCounter + ") same:" + isSame);
	                //        //    definition.lastVal = defaultVal;
	                //        //}
	                //        if (angular.isDefined(scope['in' + name])) {
	                //            return scope['in' + name];
	                //        }
	                //        if (angular.isDefined(scope.inOptions) && angular.isDefined(scope.inOptions[name])) {
	                //            return scope.inOptions[name];
	                //        }
	                //        return defaultVal;
	                //    });
	                //    onObject.__defineSetter__(name, function (val) {
	                //        var setVal = angular.isDefined(definition.changeFunc) ? definition.changeFunc.call((definition.callOn || onObject), val) : val;
	                //        if (definition.syncOut) {
	                //            //if (angular.isDefined(scope['in' + name])) {
	                //            if (scope['in' + name] !== setVal) {
	                //                scope['in' + name] = setVal;
	                //            }
	                //            //}
	                //            if (angular.isDefined(scope.inOptions)) {
	                //                if (scope.inOptions[name] !== setVal) {
	                //                    scope.inOptions[name] = setVal;
	                //                }
	                //            }
	                //        }
	                //        if (defaultVal !== setVal) {
	                //            defaultVal = setVal;
	                //        }
	                //    });

	                //    //init all to same (overwrite inOpt with inParam in case both specified)
	                //    onObject[name] = definition.force === true ? defaultVal : onObject[name];
	                //}

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

	                    }

	                    defineOptions(filterTableDefinition);
	                    scope.filterTable.OptionsProvided = scope.filterTable.Columns.length > 0;
	                    scope.filterTable.Initialised = true;
	                }

	                initFilterTable();

	                scope.animationsEnabled = true;

	                scope.open = function (size) {
	                    var modalInstance = $uibModal.open({
	                        animation: scope.animationsEnabled,
	                        templateUrl: "wwwroot/FilterTable/Views/FilterTableOptions.html",
	                        controller: 'FilterTableOptionsCtrl',
	                        size: size,
	                        resolve: {
	                            filterTable: function () { return scope.filterTable; }
	                        }
	                    });

	                    modalInstance.result.then(function () {

	                    }, function () {

	                    });
	                }
	            }
	        };
	    }]);

})();