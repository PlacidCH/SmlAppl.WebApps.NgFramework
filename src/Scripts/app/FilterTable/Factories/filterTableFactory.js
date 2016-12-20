(function() {
    "use strict";


    angular.module("smlAppl.webApps.framework.filterTable.factories").factory('filterTableConstructor', ["$filter", "$timeout", "$parse", "$sce", "$translate", function ($filter, $timeout, $parse, $sce, $translate) {
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
                    var dataDisplayed = column.GetFilterTable().DataDisplayed || [];
                    try {
                        return this._calculator.call(this, column, data, dataDisplayed);
                    } catch (ex) {
                        console.log(ex);
                        return undefined;
                    }
                }
                return null;
            }
        }

        function ColumnDef() {
            this._key = null;

            this._ignore = false;
            this._visible = false;
            this._display = undefined;
            this.DisplayKey = undefined;
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
            this.CustomFilter = null;
            this._style = null;
        }

        ColumnDef.prototype = {
            get Key() {
                return this._key;
            },
            set Key(val) {
                if ((val || null) === null) { return; }
                this._key = val;
            },
            get Display() {
                if (angular.isUndefined(this._display)) {
                    //this._display = this.DisplayKey || this.Key;
                    //var x = $parse('"' + col.DisplayKey + '" | translate') ();
                    //var y = $parse('"' + col.DisplayKey + '" | translate')(this);
                    this._display = $parse('(col.DisplayKey || col.Key) | translate') (this, { col: this });
                }
                if (angular.isDefined(this._display) && angular.isString(this._display)) {
                    this._display = $sce.trustAsHtml(this._display);
                }
                return this._display;
            },
            set Display(val) {
                this._display = val;
            },
            ResetDisplay: function() {
                this._display = undefined;
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
            ResetDistincts: function (all) {
                all = angular.isUndefined(all) ? true : all;
                if (all) {
                    this._distincts = null;
                }
                this._distinctsReduced = null;
            },
            _buildDistincts: function (ft, c, all, reduced) {
                return ft.CreateDistincts(c, all, reduced);
            },
            BuildDistincts: function (all, reduced) {
                var me = this;
                var ret = this.CallOnFilterTable(function(ft, c) { return me._buildDistincts(ft, c, all, reduced); });
                return ret.called ? ret.result : { All: null, Reduced:null };
            },
            get DistinctHolder() {
                if (this.BuildSelect) {
                    var distincts = this.BuildDistincts(this._distincts == null, this._distinctsReduced == null);
                    if (this._distincts == null) {
                        this._distincts = distincts.All;
                    }
                    if (this._distinctsReduced == null) {
                        this._distinctsReduced = distincts.Reduced;
                    }
                }
                return {
                    All: this._distincts,
                    Reduced: this._distinctsReduced,
                };
            },
            GetDistincts: function (reduced, addEmptyIfMissing) {
                addEmptyIfMissing = addEmptyIfMissing || false;
                var distincts = [];
                if ((reduced || false) === true) {
                    distincts = this.DistinctsReduced;
                } else {
                    distincts = this.Distincts;
                }
                if (addEmptyIfMissing) {
                    //since we know it will be sorted we can check element at pos 0
                    if (distincts.length > 0) {
                        if (distincts[0] !== "") {
                            distincts.unshift("");
                        }
                    }
                }
                return distincts;
            },
            get Distincts() {
                return this.DistinctHolder.All;
            },
            get DistinctsReduced() {
                return this.DistinctHolder.Reduced;
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
            get HasCustomFilter() {
                return this.CustomFilter !== null;
            },
            UpdateCustomFilterTexts: function () {
                var col = this;
                if (col.HasCustomFilter && angular.isDefined(col.CustomFilter.FnUpdateText) && angular.isFunction(col.CustomFilter.FnUpdateText)) {
                    col.CustomFilter.FnUpdateText.call(col.CustomFilter);
                }
            },
            get FilterType() {
                if (this.HasCustomFilter) {
                    if (angular.isDefined(this.CustomFilter.InputHtml)) {
                        return "CustomHtml";
                    }
                    return "Custom";
                }
                if (this.HasDistincts) {
                    return "Select";
                }
                return "Input";
            },
            TrustIt: function(val) {
                if (val !== null && angular.isDefined(val) && angular.isString(val)) {
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
            var ft = this;

            ft._loading = true;
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
            this.FilterUpdateHandler = {
                _pending: false,
                get Pending() { return this._pending; },
                set Pending(val) {
                    var me = this;
                    if (!me._pending && val) {
                        me._pending = val;
                        $timeout.cancel(me._delay);
                        this._delay = $timeout(function () {
                            ft.UpdateFilter(me.ResetHeaderAndFooter);
                            me._resetHeaderAndFooter = false;
                            me._pending = false;
                        }, 200);
                    }
                },
                _delay: null,
                _resetHeaderAndFooter: false,
                get ResetHeaderAndFooter() { return this._resetHeaderAndFooter; },
                set ResetHeaderAndFooter(val) {
                    this._resetHeaderAndFooter = this._resetHeaderAndFooter || val;
                    this.Pending = true;
                },
            };

            this.UpdateTranslations = function(callback) {
                var me = this;
                var arr = me.Translations.Keys;
                $translate(arr).then(function(translations) {
                    var i;
                    for (i = 0; i < arr.length; i++) {
                        var key = arr[i];
                        me.Translations[key] = translations[key];
                    }
                    for (i = 0; i < me.Columns.length; i++) {
                        var col = me.Columns[i];
                        col.UpdateCustomFilterTexts();
                    }
                    callback = callback || null;
                    if (angular.isDefined(callback) && angular.isFunction(callback)) {
                        callback.call(me);
                    }
                });
            };

            this.InitTranslations = function () {
                var me = this;
                var keys = me.Translations.Keys;
                var defineTranslationFor = function(thisKey) {
                    Object.defineProperty(me.Translations, thisKey, {
                        get: function () {
                            var val = me.Translations.backingfields[thisKey];
                            if ((val || null) == null) {
                                val = me.Translations.fallback[thisKey];
                            }
                            return val;
                        },
                        set: function (val) {
                            if (val === thisKey) {
                                delete me.Translations.backingfields[thisKey];
                            } else {
                                me.Translations.backingfields[thisKey] = val;
                            }
                        }
                    });
                }
                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i];
                    defineTranslationFor(key);
                }
            };
            //Currently not on prototype because that would affect every page, if wanted we can switch it, basically just move above function(s) and this declaration
            this.Translations = {
                backingfields: {},
                fallback: {
                    FilterTable_Error_Getting_Data: "Fehler beim Beziehen der Daten.",
                    FilterTable_Error_No_Data: "Keine Daten gefunden.",
                    FilterTable_Error_Filter_No_Data: "Filter enthält keine Daten.",
                    FilterTable_Page: "Seite",
                    FilterTable_Of: "von",
                    FilterTable_Total: "Total",
                    FilterTable_Records: "Datensätze",
                    FilterTable_Click_To_Select: "Klicken zum auswählen.",
                    FilterTable_0_Selected: "gewählt.",
                    FilterTable_Filter: "filtern",
                    FilterTable_Empty_Value: "(Kein Wert)",
                    FilterTable_Accept: "Übernehmen",
                    FilterTable_Cancel: "Abbrechen",
                    FilterTable_Reset_Filter: "Filter löschen",
                },
                get Keys() {
                    var arr = [];
                    for (var x in this.fallback) {
                        if (this.fallback.hasOwnProperty(x)) {
                            arr.push(x);
                        }
                    }
                    return arr;
                }
            };

            ft.InitTranslations();
        }

        FilterTable.prototype = {
            CreateDistincts: function (colDef, all, reduced) {
                var distinctHolder = {
                    All: null,
                    Reduced: null,
                };
                if (colDef.BuildSelect) {
                    var fetchDistincts = function (data) {
                        var onData = (data || []).map(function(item) { return item[colDef.Key] });
                        var distincts = {};
                        var distinctList = [];
                        for (var i = 0; i < onData.length; i++) {
                            var entry = onData[i];
                            if (entry == null || angular.isUndefined(entry)) {
                                entry = "";
                            }
                            if (angular.isUndefined(distincts[entry])) {
                                distincts[entry] = "";
                                distinctList.push(entry.toString());
                            }
                        }
                        distinctList = $filter("orderBy")(distinctList);
                        return distinctList;
                    }
                    if (all) {
                        distinctHolder.All = fetchDistincts(this.PassedData);
                    }
                    if (reduced) {
                        distinctHolder.Reduced = fetchDistincts(this.DataFiltered);
                    }
                }
                return distinctHolder;
            },
            get PassedData() {
                return this._dataCalc;
            },
            RecalculateData: function () {
                this.UpdateData(this._data, false);
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
                me.FilterUpdateHandler.ResetHeaderAndFooter = !resetting;
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
                return !this.Loading && !this.HasData;
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
                    backingfields: {},
                };
                function defineFilterProp(name) {
                    Object.defineProperty(f, name, {
                        get: function () { return f.backingfields[name]; },
                        set: function (newValue) {
                            var changed = f.backingfields[name] !== newValue;
                            f.backingfields[name] = newValue;
                            me.FilterUpdateHandler.ResetHeaderAndFooter = changed;
                        },
                    });
                }

                var defaultfilters = this.CurrentCols.filter(function(item) { return !item.HasCustomFilter; });
                for (var i = 0; i < defaultfilters.length; i++) {
                    var col = defaultfilters[i];
                    var val = x[col.Key];
                    var name = col.Key;
                    defineFilterProp(name);
                    f.backingfields[name] = val;
                }
                this.TableFilter = f;
            },
            ClearFilter: function () {
                //this.TableFilter = {}; //new: clear only visible filters
                for (var i = 0; i < this.VisibleCols.length; i++) {
                    var col = this.VisibleCols[i];
                    this.ResetFilter(col);
                }
            },
            ResetFilter: function(col) {
                if (col.HasCustomFilter) {
                    if (angular.isDefined(col.CustomFilter.FnReset) && angular.isFunction(col.CustomFilter.FnReset)) {
                        col.CustomFilter.FnReset.call(col.CustomFilter, col);
                        this.FilterUpdateHandler.ResetHeaderAndFooter = true;
                    }
                } else {
                    this.TableFilter[col.Key] = null;
                }
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
                var dataFiltered = $filter('filter')(this._dataCalc, this.CleanTableFilter(this.TableFilter.backingfields));
                var customFilters = this.CurrentCols.filter(function (item) { return item.HasCustomFilter; });
                for (var i = 0; i < customFilters.length; i++) {
                    var cfCol = customFilters[i];
                    try {
                        var nextFilter = dataFiltered.filter(function (item) { return cfCol.CustomFilter.FnFilter.call(cfCol.CustomFilter, item, cfCol); });
                        dataFiltered = nextFilter;
                    } catch (ex) {
                        console.log("Filter didn't compute.");
                    }
                }
                this.DataFiltered = dataFiltered;
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
                            col.ResetDistincts(true);
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
            },
            Refresh: function() {
                var me = this;
                me.Loading = true;
                for (var i = 0; i < me.Columns.length; i++) {
                    var col = me.Columns[i];
                    col.ResetDisplay();
                }

                var x = me.Columns;
                me._currentCols =[];
                me._visibleCols =[];
                $timeout(function() {
                    me.UpdateColumnLists(x);
                    me.RecalculateData();
                });
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
            c.DisplayKey = getDefined(basedOn.displayKey, basedOn.DisplayKey, basedOn.display, basedOn.Display, c.Key);
            //c.Display = getDefined(basedOn.display, basedOn.Display);

            c.CanBuildSelect = getDefined((filterTable.NoSearchSelects === true ? false : undefined), checkOverwrite(filterTable.NoSelectsOnColumns, c.Key), basedOn.canSelect, basedOn.CanBuildSelect, true);
            c.BuildSelect = getDefined(checkOverwrite(filterTable.SelectsOnColumns, c.Key), basedOn.select, basedOn.BuildSelect, false);
            c.orderAsc = getDefined(checkOverwrite(filterTable.Order, c.Key), basedOn.orderAsc, basedOn.orderAsc);
            c.Filter = getDefined(basedOn.filter, basedOn.Filter);
            c.AlternateSortCol = getDefined(basedOn.alternateSortCol, basedOn.AlternateSortCol,  null);
            c.CustomFilter = getDefined(basedOn.customFilter, basedOn.CustomFilter, null);

            c._style = getDefined(basedOn.style, basedOn.Style, null);

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

            if (c.CustomFilter !== null) {
                if (angular.isString(c.CustomFilter)) {
                    if (c.CustomFilter === "MultiSelect") {
                        //TODO: localisation
                        c.CanBuildSelect = true;
                        c.BuildSelect = true;
                        //Replace it
                        c.CustomFilter = {
                            Text: c.Display + " " + ft.Translations.FilterTable_Filter,
                            TemplateUrl: "./src/Scripts/app/FilterTable/Views/FilterTableMultiSelect.html",
                            Controller: "FilterTableModalMultiSelectCtrl",
                            Tooltip: ft.Translations.FilterTable_Click_To_Select,
                            Selected: {},
                            FnFilter: function (item, col) {
                                if (Object.keys(this.Selected).length === 0) {
                                    return true;
                                }
                                var val = item[c.Key];
                                val = (val === null || angular.isUndefined(val)) ? "" : val; //null and undefined -> ""
                                val = val.toString(); // TrustedValueHolder --> back to strings
                                return angular.isDefined(this.Selected[val]);
                            },
                            FnReset: function() {
                                this.Tooltip = ft.Translations.FilterTable_Click_To_Select,
                                    this.Text = c.Display + " " + ft.Translations.FilterTable_Filter,
                                    this.Selected = {};
                            },
                            FnUpdateText: function() {
                                var selected = Object.keys(this.Selected);
                                var l = selected.length;
                                if (l > 0) {
                                    this.Tooltip = selected.join(', ');
                                    this.Text = l + " " + ft.Translations.FilterTable_0_Selected;
                                } else {
                                    this.Tooltip = ft.Translations.FilterTable_Click_To_Select;
                                    this.Text = c.Display + " " + ft.Translations.FilterTable_Filter;
                                }
                            }
                        }
                    }

                    if (c.CustomFilter === "ConditionalNumberFilter") {
                        //TODO: localisation
                        c.CanBuildSelect = true;
                        c.BuildSelect = true;
                        //Replace it
                        c.CustomFilter = {
                            Text: " ... ",
                            TemplateUrl: "./src/Scripts/app/FilterTable/Views/FilterConditionalNumber.html",
                            Controller: "FilterTableModalConditionalSelectCtrl",
                            Tooltip: ft.Translations.FilterTable_Conditional_Filter,
                            Selected: {},
                            FnFilter: function (item, col) {
                                if (this.Selected.length === 0) {
                                    return true;
                                }

                                var val = item[c.Key];
                                val = (val === null || angular.isUndefined(val)) ? "" : val; //null and undefined -> ""
                                val = $sce.valueOf(val);

                                //Removing no number characters (this was added due to the display)
                                val = val.split(",").join("");

                                //Convert it to a number
                                val = parseFloat(val);

                                //When its not number, than this item will be sorted out
                                if(isNaN(val)){
                                    return false;
                                }

                                var conditionIsTruthy = true;
                                angular.forEach(this.Selected, function(conditionItem){
                                    if(conditionIsTruthy) {
                                        conditionIsTruthy = conditionIsTrue(conditionItem.condition, parseFloat(conditionItem.value), val);
                                    }
                                });

                                return conditionIsTruthy;
                            },
                            FnReset: function() {
                                this.Selected = [];
                                this.Tooltip = "";
                                this.Text = "..."
                            },
                            FnUpdateText: function() {

                            }
                        }
                    }


                    if (c.CustomFilter === "ConditionalDateFilter") {
                        //TODO: localisation
                        c.CanBuildSelect = true;
                        c.BuildSelect = true;
                        //Replace it
                        c.CustomFilter = {
                            Text: " ... ",
                            TemplateUrl: "./src/Scripts/app/FilterTable/Views/FilterConditionalDate.html",
                            Controller: "FilterTableModalConditionalSelectCtrl",
                            Tooltip: ft.Translations.FilterTable_Conditional_Filter,
                            Selected: {},
                            FnFilter: function (item, col) {
                                if (this.Selected.length === 0) {
                                    return true;
                                }

                                var val = item[c.Key];
                                val = (val === null || angular.isUndefined(val)) ? "" : val; //null and undefined -> ""
                                val = $sce.valueOf(val);

                                val = stringToDate(val);

                                var conditionIsTruthy = true;
                                //Conditions are checked here
                                angular.forEach(this.Selected, function(conditionItem){
                                    //This is a conjunction of AND therefore we can cancel the loop as soon as we've a false condition
                                    if(conditionIsTruthy) {
                                        var conditionItemValue = stringToDate(conditionItem.value);
                                        conditionIsTruthy = conditionIsTrue(conditionItem.condition, conditionItemValue.getTime(), val.getTime());
                                    }
                                });


                                return conditionIsTruthy;
                            },
                            FnReset: function() {
                                this.Selected = [];
                                this.Tooltip = "";
                                this.Text = "..."
                            },
                            FnUpdateText: function() {}
                        }
                    }
                }

                if (angular.isUndefined(c.CustomFilter.FnFilter) || !angular.isFunction(c.CustomFilter.FnFilter)) {
                    console.log("invalid filter function for customfilter on column '" + c.Key + "'");
                    console.log(basedOn);
                    return null;
                }
                if (angular.isUndefined(c.CustomFilter.FnReset) || !angular.isFunction(c.CustomFilter.FnReset)) {
                    console.log("invalid reset function for customfilter on column '" + c.Key + "'");
                    console.log(basedOn);
                    return null;
                }
                if (angular.isUndefined(c.CustomFilter.TemplateUrl) || c.CustomFilter.TemplateUrl == null || c.CustomFilter.TemplateUrl.trim() === "") {
                    console.log("invalid TemplateUrl for customfilter on column '" + c.Key + "'");
                    console.log(basedOn);
                    return null;
                }
                if (angular.isUndefined(c.CustomFilter.Controller) || c.CustomFilter.Controller == null || c.CustomFilter.Controller.trim() === "") {
                    console.log("invalid Controller for customfilter on column '" + c.Key + "'");
                    console.log(basedOn);
                    return null;
                }
            }

            c.GetFilterTable = function () { return filterTable; };

            if (angular.isDefined(c.orderAsc) && filterTable !== null) {
                filterTable.AddOrderBy(c, false);
            }
            return c;
        }


        //A string in format like 12.04.2016 will be converted to a date
        function stringToDate(date){
            //Splitting by dot in order to convert it to a date later
            var d = date.split(".");

            //Convert it to a date, substracting 1 from month since it starts with 0
            d = new Date(parseInt(d[2]), parseInt(d[1])-1, parseInt(d[0]))
            return d;
        }

        function conditionIsTrue(condition, checkedValue, value){
            switch (condition) {
                case '==':
                    return (value == checkedValue);
                    break;
                case '>':
                    return (value > checkedValue);
                    break;
                case '>=':
                    return (value >= checkedValue);
                    break;
                case '<':
                    return (value < checkedValue);
                    break;
                case '<=':
                    return (value <= checkedValue);
                    break;
            }

            return true;
        }

        return {
            FilterTable: FilterTable,
            HeaderDef: HeaderDef,
            GetDefined: getDefined,
        }
    }])
})();
