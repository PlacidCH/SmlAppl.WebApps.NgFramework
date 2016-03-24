angular.module('smlAppl.webApps.framework.filterTable').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('wwwroot/FilterTable/Views/FilterTable.html',
    "<div ng-switch=\"filterTable.Status\" class=\"filtertable-container\">\r" +
    "\n" +
    "    <div class=\"row\">\r" +
    "\n" +
    "        <div ng-switch-when=\"Loading\" class=\"col-md-12\" style=\"text-align: center;\">\r" +
    "\n" +
    "            <span>Loading <img src=\"Content/images/loader-horizontal.gif\" /></span>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div ng-switch-when=\"Error\" class=\"col-md-12\" style=\"text-align: center;\">\r" +
    "\n" +
    "            <span>Fehler beim Beziehen der Daten.</span>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"row\" ng-switch-when=\"Structure\">\r" +
    "\n" +
    "        <div class=\"col-md-12\">\r" +
    "\n" +
    "            <div style=\"overflow: auto;\">\r" +
    "\n" +
    "                <table class=\"table table-bordered table-condensed table-responsive table-striped table-hover filtertable-table\">\r" +
    "\n" +
    "                    <thead class=\"filtertable-table-header\">\r" +
    "\n" +
    "                        <tr>\r" +
    "\n" +
    "                            <th>\r" +
    "\n" +
    "                                <span type=\"button\" class=\"btn btn-default btn-sm\" ng-click=\"open()\" ng-show=\"filterTable.CanCustomize\"><span class=\"glyphicon glyphicon-cog\"></span></span>\r" +
    "\n" +
    "                            </th>\r" +
    "\n" +
    "                            <th ng-repeat=\"col in filterTable.VisibleCols\" style=\"padding-left: 10px; padding-right: 40px; vertical-align: middle; cursor: pointer;\" ng-click=\"filterTable.UpdateOrderBy(col, $event)\">\r" +
    "\n" +
    "                                <span class=\"pull-left\">{{::col.Display}}</span>\r" +
    "\n" +
    "                                <span style=\"margin-right: -30px; opacity: 0.5;\" class=\"pull-right {{col.OrderIndicator}}\"></span>\r" +
    "\n" +
    "                            </th>\r" +
    "\n" +
    "                        </tr>\r" +
    "\n" +
    "                        <tr ng-show=\"filterTable.SearchActive\">\r" +
    "\n" +
    "                            <th>\r" +
    "\n" +
    "                                <span type=\"button\" class=\"btn btn-default btn-sm\" ng-click=\"filterTable.ClearFilter()\"><span class=\"glyphicon glyphicon-remove\"></span></span>\r" +
    "\n" +
    "                            </th>\r" +
    "\n" +
    "                            <th ng-repeat=\"col in filterTable.VisibleCols\" ng-switch=\"col.HasDistincts\">\r" +
    "\n" +
    "                                <select ng-switch-when=\"true\" class=\"select2\" name=\"filterTable.TableFilter[col.Key]\" ng-model=\"filterTable.TableFilter[col.Key]\">\r" +
    "\n" +
    "                                    <option ng-repeat=\"item in col.Distincts\">{{::item}}</option>\r" +
    "\n" +
    "                                </select>\r" +
    "\n" +
    "                                <input ng-switch-when=\"false\" type=\"text\" name=\"filterTable.TableFilter[col.Key]\" ng-model=\"filterTable.TableFilter[col.Key]\" ng-model-options=\"ModelOptions\" />\r" +
    "\n" +
    "                            </th>\r" +
    "\n" +
    "                        </tr>\r" +
    "\n" +
    "                    </thead>\r" +
    "\n" +
    "                    <tbody class=\"filtertable-table-body\" ng-if=\"filterTable.VisibleCols.length > 0\">\r" +
    "\n" +
    "                        <tr ng-repeat=\"item in filterTable.DataDisplayed\">\r" +
    "\n" +
    "                            <td ng-class=\"::{'filtertable-cell-clickable' : filterTable.ActionCol.HasClickAction}\" ng-click=\"filterTable.ExecuteClickAction(filterTable.ActionCol, item)\">\r" +
    "\n" +
    "                                <span ng-bind-html=\"::item[filterTable.ActionCol.Key]\"></span>\r" +
    "\n" +
    "                            </td>\r" +
    "\n" +
    "                            <td ng-repeat=\"col in filterTable.VisibleCols\" ng-class=\"::{'filtertable-cell-clickable' : col.HasClickAction}\" ng-click=\"filterTable.ExecuteClickAction(col, item)\">\r" +
    "\n" +
    "                                <span ng-bind-html=\"::item[col.Key]\"></span>\r" +
    "\n" +
    "                            </td>\r" +
    "\n" +
    "                        </tr>\r" +
    "\n" +
    "                    </tbody>\r" +
    "\n" +
    "                    <tfoot class=\"filtertable-table-footer\">\r" +
    "\n" +
    "                        <tr ng-if=\"filterTable.Loading\">\r" +
    "\n" +
    "                            <td colspan=\"100%\" class=\"none\" style=\"text-align: center;\">Loading <img src=\"Content/images/loader-horizontal.gif\" /></td>\r" +
    "\n" +
    "                        </tr>\r" +
    "\n" +
    "                        <tr ng-if=\"filterTable.ShowNoDataMsg\">\r" +
    "\n" +
    "                            <td colspan=\"100%\" class=\"warning\" style=\"text-align: center;\">Keine Daten gefunden.</td>\r" +
    "\n" +
    "                        </tr>\r" +
    "\n" +
    "                        <tr ng-if=\"filterTable.ShowDataFilteredOutMsg\">\r" +
    "\n" +
    "                            <td colspan=\"100%\" class=\"warning\" style=\"text-align: center;\">Filter enthält keine Daten.</td>\r" +
    "\n" +
    "                        </tr>\r" +
    "\n" +
    "                    </tfoot>\r" +
    "\n" +
    "                </table>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"row filtertable-footer\">\r" +
    "\n" +
    "                <div class=\"col-md-12\" ng-if=\"!filterTable.Loading && filterTable.HasData\">\r" +
    "\n" +
    "                    <div class=\"pull-right\">\r" +
    "\n" +
    "                        <button class=\"btn btn-default\" style=\"float: left;\" ng-click=\"filterTable.CurrentPage = 1\" ng-disabled=\"filterTable.BackwardDisabled\"><i class=\"fa fa-fast-backward\"></i></button>\r" +
    "\n" +
    "                        <button class=\"btn btn-default\" style=\"float: left;\" ng-click=\"filterTable.CurrentPage = (filterTable.CurrentPage - 1)\" ng-disabled=\"filterTable.BackwardDisabled\"><i class=\"fa fa-step-backward\"></i></button>\r" +
    "\n" +
    "                        <div style=\"float: left; text-align: right;\">\r" +
    "\n" +
    "                            <select ng-model=\"filterTable.CurrentPage\"\r" +
    "\n" +
    "                                    ng-options=\"item as item for item in filterTable.FilterPageArray\"></select>\r" +
    "\n" +
    "                            Seite {{ filterTable.CurrentPage }} von {{ filterTable.FilterDataPageCount }} ({{filterTable.PassedDataPageCount}} Total)\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <button class=\"btn btn-default\" style=\"float: right;\" ng-click=\"filterTable.CurrentPage = filterTable.FilterDataPageCount\" ng-disabled=\"filterTable.ForwardDisabled\"><i class=\"fa fa-fast-forward\"></i></button>\r" +
    "\n" +
    "                        <button class=\"btn btn-default\" style=\"float: right;\" ng-click=\"filterTable.CurrentPage = (filterTable.CurrentPage + 1)\" ng-disabled=\"filterTable.ForwardDisabled\"><i class=\"fa fa-step-forward\"></i></button>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                    <div style=\"float: left;\">Datensätze: {{filterTable.DataFiltered.length}} von {{filterTable.PassedData.length}}</div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('wwwroot/FilterTable/Views/FilterTableOptions.html',
    "<div class=\"modal-header\">\r" +
    "\n" +
    "    <h3 class=\"modal-title\">Einstellungen</h3>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<div class=\"modal-body\">\r" +
    "\n" +
    "    <uib-tabset>\r" +
    "\n" +
    "        <uib-tab heading=\"Spalten\" ng-if=\"FilterTable.CanSelectCols\">\r" +
    "\n" +
    "            <table class=\"table table-bordered table-condensed table-responsive table-striped table-hover\">\r" +
    "\n" +
    "                <thead>\r" +
    "\n" +
    "                    <tr>\r" +
    "\n" +
    "                        <th>Name</th>\r" +
    "\n" +
    "                        <th>Sichtbar</th>\r" +
    "\n" +
    "                        <th>Dropdown</th>\r" +
    "\n" +
    "                    </tr>\r" +
    "\n" +
    "                    <tr>\r" +
    "\n" +
    "                        <td>\r" +
    "\n" +
    "                            <input name=\"theColFilter.Display\" ng-model=\"theColFilter.Display\" placeholder=\"Name\" />\r" +
    "\n" +
    "                        </td>\r" +
    "\n" +
    "                        <td>\r" +
    "\n" +
    "                            <input type=\"checkbox\" ng-model=\"visible.all\" ng-change=\"ChangeVisible(visible.all)\" /> Alle\r" +
    "\n" +
    "                        </td>\r" +
    "\n" +
    "                        <td></td>\r" +
    "\n" +
    "                    </tr>\r" +
    "\n" +
    "                </thead>\r" +
    "\n" +
    "                <tbody>\r" +
    "\n" +
    "                    <tr ng-repeat=\"col in FilterTable.CurrentCols | filter: theColFilter\">\r" +
    "\n" +
    "                        <td>{{::col.Display}}</td>\r" +
    "\n" +
    "                        <td><input type=\"checkbox\" ng-model=\"col.Visible\" /></td>\r" +
    "\n" +
    "                        <td ng-switch=\"FilterTable.NoSearchSelects\">\r" +
    "\n" +
    "                            <input ng-switch-when=\"true\" type=\"checkbox\" ng-model=\"noSelect\" ng-disabled=\"true\" />\r" +
    "\n" +
    "                            <input ng-switch-when=\"false\" type=\"checkbox\" ng-model=\"col.BuildSelect\" ng-disabled=\"!col.CanBuildSelect\" />\r" +
    "\n" +
    "                        </td>\r" +
    "\n" +
    "                    </tr>\r" +
    "\n" +
    "                </tbody>\r" +
    "\n" +
    "            </table>\r" +
    "\n" +
    "        </uib-tab>\r" +
    "\n" +
    "        <uib-tab heading=\"Tabelle\" ng-if=\"true\">\r" +
    "\n" +
    "            <table class=\"table table-bordered table-condensed table-responsive table-striped table-hover\">\r" +
    "\n" +
    "                <thead>\r" +
    "\n" +
    "                    <tr>\r" +
    "\n" +
    "                        <th>Setting</th>\r" +
    "\n" +
    "                        <th>Wert</th>\r" +
    "\n" +
    "                    </tr>\r" +
    "\n" +
    "                </thead>\r" +
    "\n" +
    "                <tbody>\r" +
    "\n" +
    "                    <tr>\r" +
    "\n" +
    "                        <td>Suche aktiv</td>\r" +
    "\n" +
    "                        <td><input type=\"checkbox\" ng-model=\"FilterTable.SearchActive\" /></td>\r" +
    "\n" +
    "                    </tr>\r" +
    "\n" +
    "                    <tr>\r" +
    "\n" +
    "                        <td>Keine Dropdowns</td>\r" +
    "\n" +
    "                        <td><input type=\"checkbox\" ng-model=\"FilterTable.NoSearchSelects\" /></td>\r" +
    "\n" +
    "                    </tr>\r" +
    "\n" +
    "                    <tr>\r" +
    "\n" +
    "                        <td>Dropdowns einschränken</td>\r" +
    "\n" +
    "                        <td><input type=\"checkbox\" ng-model=\"FilterTable.ReduceSelects\" /></td>\r" +
    "\n" +
    "                    </tr>\r" +
    "\n" +
    "                    <tr>\r" +
    "\n" +
    "                        <td>Datensätze pro Seite</td>\r" +
    "\n" +
    "                        <td><input type=\"number\" ng-model=\"FilterTable.PageSize\" ng-model-options=\"ModelOptions\" /></td>\r" +
    "\n" +
    "                    </tr>\r" +
    "\n" +
    "                </tbody>\r" +
    "\n" +
    "            </table>\r" +
    "\n" +
    "        </uib-tab>\r" +
    "\n" +
    "    </uib-tabset>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<div class=\"modal-footer\">\r" +
    "\n" +
    "    <button class=\"btn btn-primary\" type=\"button\" ng-click=\"ok()\">OK</button>\r" +
    "\n" +
    "    <!--<button class=\"btn btn-warning\" type=\"button\" ng-click=\"cancel()\">Cancel</button>-->\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n"
  );

}]);
