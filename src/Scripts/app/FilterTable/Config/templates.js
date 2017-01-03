angular.module('smlAppl.webApps.framework.filterTable').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('./src/Scripts/app/FilterTable/Views/FilterConditionalDate.html',
    "<div class=\"modal-header\">\r" +
    "\n" +
    "    <h3 class=\"modal-title\">Conditional filter: {{column.Display}}</h3>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<div class=\"modal-body\">\r" +
    "\n" +
    "    <div class=\"row\" ng-repeat=\"conditionItem in currentConditionalFilter\">\r" +
    "\n" +
    "        <div class=\"col-md-2\">{{column.Display}}</div>\r" +
    "\n" +
    "        <div class=\"col-md-2\">\r" +
    "\n" +
    "            <select class=\"form-control\" ng-model=\"conditionItem.condition\">\r" +
    "\n" +
    "                <option value=\"==\">==</option>\r" +
    "\n" +
    "                <option value=\"!=\">!=</option>\r" +
    "\n" +
    "                <option value=\">\">></option>\r" +
    "\n" +
    "                <option value=\">=\">>=</option>\r" +
    "\n" +
    "                <option value=\"<\"><</option>\r" +
    "\n" +
    "                <option value=\"<=\"><=</option>\r" +
    "\n" +
    "            </select>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"col-md-4\">\r" +
    "\n" +
    "            <input type=\"text\" class=\"form-control\" ng-model=\"conditionItem.value\">\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"col-md-3\">\r" +
    "\n" +
    "            <select class=\"form-control\" ng-model=\"conditionItem.conjunction\">\r" +
    "\n" +
    "                <option value=\"\">--</option>\r" +
    "\n" +
    "                <option value=\"AND\">AND</option>\r" +
    "\n" +
    "                <option value=\"OR\">OR</option>\r" +
    "\n" +
    "            </select>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"col-md-1\">\r" +
    "\n" +
    "            <div class=\"form-group\">\r" +
    "\n" +
    "                <button class=\"btn btn-xs btn-danger\" ng-click=\"removeCondition(conditionItem)\"><i class=\"fa fa-trash\" aria-hidden=\"true\"></i></button>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <!-- input for a new condition -->\r" +
    "\n" +
    "    <div class=\"row\">\r" +
    "\n" +
    "        <div class=\"col-md-2\">{{column.Display}}</div>\r" +
    "\n" +
    "        <div class=\"col-md-2\">\r" +
    "\n" +
    "            <div class=\"form-group\">\r" +
    "\n" +
    "                <select class=\"form-control\" ng-model=\"conditionalFilterItem.condition\">\r" +
    "\n" +
    "                    <option value=\"==\">==</option>\r" +
    "\n" +
    "                    <option value=\"!=\">!=</option>\r" +
    "\n" +
    "                    <option value=\">\">></option>\r" +
    "\n" +
    "                    <option value=\">=\">>=</option>\r" +
    "\n" +
    "                    <option value=\"<\"><</option>\r" +
    "\n" +
    "                    <option value=\"<=\"><=</option>\r" +
    "\n" +
    "                </select>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"col-md-4\">\r" +
    "\n" +
    "            <div class=\"form-group\">\r" +
    "\n" +
    "                <input type=\"text\" class=\"form-control\" ng-model=\"conditionalFilterItem.value\" placeholder=\"dd.MM.yyyy\">\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"col-md-3\">\r" +
    "\n" +
    "            <select class=\"form-control\" ng-model=\"conditionItem.conjunction\">\r" +
    "\n" +
    "                <option value=\"\">--</option>\r" +
    "\n" +
    "                <option value=\"AND\">AND</option>\r" +
    "\n" +
    "                <option value=\"OR\">OR</option>\r" +
    "\n" +
    "            </select>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"col-md-1\">\r" +
    "\n" +
    "            <div class=\"form-group\">\r" +
    "\n" +
    "                <button class=\"btn btn-xs btn-primary\" ng-click=\"addCondition()\"><i class=\"fa fa-plus\" aria-hidden=\"true\"></i></button>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <!-- formal overview -->\r" +
    "\n" +
    "    <div class=\"row\" ng-if=\"formulaText != ''\">\r" +
    "\n" +
    "        <div class=\"col-md-12\">\r" +
    "\n" +
    "            <hr />\r" +
    "\n" +
    "            <h4>Bedingungen als Formel</h4>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"col-md-12\">\r" +
    "\n" +
    "            <p>{{formulaText}}</p>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<div class=\"modal-footer\">\r" +
    "\n" +
    "    <button class=\"btn btn-default\" type=\"button\" ng-click=\"Reset()\">{{FilterTable.Translations.FilterTable_Reset_Filter}}</button>\r" +
    "\n" +
    "    <button class=\"btn btn-primary\" type=\"button\" ng-click=\"ok()\">{{FilterTable.Translations.FilterTable_Accept}}</button>\r" +
    "\n" +
    "    <button class=\"btn btn-warning\" type=\"button\" ng-click=\"cancel()\">{{FilterTable.Translations.FilterTable_Cancel}}</button>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n"
  );


  $templateCache.put('./src/Scripts/app/FilterTable/Views/FilterConditionalNumber.html',
    "<div class=\"modal-header\">\r" +
    "\n" +
    "    <h3 class=\"modal-title\">Conditional filter: {{column.Display}}</h3>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<div class=\"modal-body\">\r" +
    "\n" +
    "    <!-- current filter condition list -->\r" +
    "\n" +
    "    <div class=\"row\" ng-repeat=\"conditionItem in currentConditionalFilter\">\r" +
    "\n" +
    "        <div class=\"col-md-2\">{{column.Display}}</div>\r" +
    "\n" +
    "        <div class=\"col-md-2\">\r" +
    "\n" +
    "            <select class=\"form-control\" ng-model=\"conditionItem.condition\">\r" +
    "\n" +
    "                <option value=\"==\">==</option>\r" +
    "\n" +
    "                <option value=\"!=\">!=</option>\r" +
    "\n" +
    "                <option value=\">\">></option>\r" +
    "\n" +
    "                <option value=\">=\">>=</option>\r" +
    "\n" +
    "                <option value=\"<\"><</option>\r" +
    "\n" +
    "                <option value=\"<=\"><=</option>\r" +
    "\n" +
    "            </select>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"col-md-4\">\r" +
    "\n" +
    "            <input type=\"text\" class=\"form-control\" ng-model=\"conditionItem.value\">\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"col-md-3\">\r" +
    "\n" +
    "            <select class=\"form-control\" ng-model=\"conditionItem.conjunction\">\r" +
    "\n" +
    "                <option value=\"\">--</option>\r" +
    "\n" +
    "                <option value=\"AND\">AND</option>\r" +
    "\n" +
    "                <option value=\"OR\">OR</option>\r" +
    "\n" +
    "            </select>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"col-md-1\">\r" +
    "\n" +
    "            <div class=\"form-group\">\r" +
    "\n" +
    "                <button class=\"btn btn-xs btn-danger\" ng-click=\"removeCondition(conditionItem)\"><i class=\"fa fa-trash\" aria-hidden=\"true\"></i></button>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <!-- input for a new condition -->\r" +
    "\n" +
    "    <div class=\"row\">\r" +
    "\n" +
    "        <div class=\"col-md-2\">{{column.Display}}</div>\r" +
    "\n" +
    "        <div class=\"col-md-2\">\r" +
    "\n" +
    "            <div class=\"form-group\">\r" +
    "\n" +
    "                <select class=\"form-control\" ng-model=\"conditionalFilterItem.condition\">\r" +
    "\n" +
    "                    <option value=\"==\">==</option>\r" +
    "\n" +
    "                    <option value=\"!=\">!=</option>\r" +
    "\n" +
    "                    <option value=\">\">></option>\r" +
    "\n" +
    "                    <option value=\">=\">>=</option>\r" +
    "\n" +
    "                    <option value=\"<\"><</option>\r" +
    "\n" +
    "                    <option value=\"<=\"><=</option>\r" +
    "\n" +
    "                </select>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"col-md-4\">\r" +
    "\n" +
    "            <div class=\"form-group\">\r" +
    "\n" +
    "                <input type=\"text\" class=\"form-control\" ng-model=\"conditionalFilterItem.value\">\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"col-md-3\">\r" +
    "\n" +
    "            <select class=\"form-control\" ng-model=\"conditionItem.conjunction\">\r" +
    "\n" +
    "                <option value=\"\">--</option>\r" +
    "\n" +
    "                <option value=\"AND\">AND</option>\r" +
    "\n" +
    "                <option value=\"OR\">OR</option>\r" +
    "\n" +
    "            </select>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"col-md-1\">\r" +
    "\n" +
    "            <div class=\"form-group\">\r" +
    "\n" +
    "                <button class=\"btn btn-xs btn-primary\" ng-click=\"addCondition()\"><i class=\"fa fa-plus\" aria-hidden=\"true\"></i></button>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <!-- formal overview -->\r" +
    "\n" +
    "    <div class=\"row\" ng-if=\"formulaText != ''\">\r" +
    "\n" +
    "        <div class=\"col-md-12\">\r" +
    "\n" +
    "            <hr />\r" +
    "\n" +
    "            <h4>Bedingungen als Formel</h4>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"col-md-12\">\r" +
    "\n" +
    "            <p>{{formulaText}}</p>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<div class=\"modal-footer\">\r" +
    "\n" +
    "    <button class=\"btn btn-default\" type=\"button\" ng-click=\"Reset()\">{{FilterTable.Translations.FilterTable_Reset_Filter}}</button>\r" +
    "\n" +
    "    <button class=\"btn btn-primary\" type=\"button\" ng-click=\"ok()\">{{FilterTable.Translations.FilterTable_Accept}}</button>\r" +
    "\n" +
    "    <button class=\"btn btn-warning\" type=\"button\" ng-click=\"cancel()\">{{FilterTable.Translations.FilterTable_Cancel}}</button>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n"
  );


  $templateCache.put('./src/Scripts/app/FilterTable/Views/FilterTable.html',
    "<div ng-switch=\"filterTable.Status\" class=\"filtertable-container\">\r" +
    "\n" +
    "    <div class=\"row\">\r" +
    "\n" +
    "        <div ng-switch-when=\"Loading\" class=\"col-md-12\" style=\"text-align: center;\">\r" +
    "\n" +
    "            <span>Loading <img src=\"bower_components/SmlAppl-WebApps-NgFramework/dist/images/loader-horizontal.gif\" /></span>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div ng-switch-when=\"Error\" class=\"col-md-12\" style=\"text-align: center;\">\r" +
    "\n" +
    "            <span>{{::Translations.FilterTable_Error_Getting_Data}}</span>\r" +
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
    "                            <th ng-repeat=\"col in filterTable.VisibleCols\" ng-style=\"col._style\" style=\"padding-left: 10px; padding-right: 40px; vertical-align: middle; cursor: pointer;\"  ng-click=\"filterTable.UpdateOrderBy(col, $event)\">\r" +
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
    "                            <td>\r" +
    "\n" +
    "                                <span type=\"button\" class=\"btn btn-default btn-sm\" ng-click=\"filterTable.ClearFilter()\"><span class=\"glyphicon glyphicon-remove\"></span></span>\r" +
    "\n" +
    "                            </td>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            <td ng-repeat=\"col in filterTable.VisibleCols\" ng-switch=\"col.FilterType\" ng-style=\"col._style\" >\r" +
    "\n" +
    "                                <div ng-switch-when=\"CustomHtml\" title=\"{{col.CustomFilter.Tooltip}}\" style=\"cursor: pointer; min-height: 28px;\" ng-click=\"defineFilter(col)\">\r" +
    "\n" +
    "                                    <span ng-bind-html=\"col.CustomFilter.InputHtml\"></span>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                                <div class=\"input-group\" ng-switch-when=\"Custom\" title=\"{{col.CustomFilter.Tooltip}}\" style=\"cursor: pointer; width: 1px;\" ng-click=\"defineFilter(col)\">\r" +
    "\n" +
    "                                    <input type=\"text\" class=\"form-control\" style=\"cursor: pointer;\" ng-style=\"{'width': col._style.width ? col._style.width : 'auto'}\" value=\"{{col.CustomFilter.Text}}\" readonly=\"readonly\" disabled=\"disabled\" ng-model-options=\"ModelOptions\"/>\r" +
    "\n" +
    "                                    <span class=\"input-group-addon\">...</span>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                                <!--<div class=\"input-group\" ng-switch-when=\"Custom\" title=\"{{col.CustomFilter.Tooltip}}\" style=\"cursor: pointer; width: 1px;\" ng-click=\"defineFilter(col)\">\r" +
    "\n" +
    "                                    <input type=\"text\" class=\"form-control\" style=\"cursor: pointer; width: auto;\" value=\"{{col.CustomFilter.Text}}\" readonly=\"readonly\" disabled=\"disabled\" ng-model-options=\"ModelOptions\" />\r" +
    "\n" +
    "                                    <div class=\"input-group-btn\">\r" +
    "\n" +
    "                                        <button type=\"button\" class=\"btn btn-default\">...</button>\r" +
    "\n" +
    "                                        <button type=\"button\" class=\"btn btn-default\" title=\"reset\" ng-click=\"resetFilter(col, $event)\"><span class=\"glyphicon glyphicon-remove\"></span></button>\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "                                </div>-->\r" +
    "\n" +
    "                                <select ng-switch-when=\"Select\" class=\"select2\" name=\"filterTable.TableFilter[col.Key]\" ng-model=\"filterTable.TableFilter[col.Key]\">\r" +
    "\n" +
    "                                    <option ng-repeat=\"item in col.GetDistincts(filterTable.ReduceSelects, true)\">{{::item}}</option>\r" +
    "\n" +
    "                                </select>\r" +
    "\n" +
    "                                <input ng-switch-when=\"Input\" type=\"text\" name=\"filterTable.TableFilter[col.Key]\" ng-model=\"filterTable.TableFilter[col.Key]\" ng-model-options=\"ModelOptions\" ng-style=\"{'width': col._width}\"/>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                            </td>\r" +
    "\n" +
    "                        </tr>\r" +
    "\n" +
    "						<tr ng-repeat=\"headerRow in filterTable.HeaderRows\">\r" +
    "\n" +
    "							<th>\r" +
    "\n" +
    "								<span ng-bind-html=\"::headerRow.Title\"></span>\r" +
    "\n" +
    "							</th>\r" +
    "\n" +
    "							<th ng-repeat=\"col in filterTable.VisibleCols\" ng-style=\"col._style\" >\r" +
    "\n" +
    "								<span ng-bind-html=\"headerRow.GetValue(col)\"></span>\r" +
    "\n" +
    "							</th>\r" +
    "\n" +
    "						</tr>\r" +
    "\n" +
    "                    </thead>\r" +
    "\n" +
    "                    <tbody class=\"filtertable-table-body\" ng-if=\"filterTable.VisibleCols.length > 0\">\r" +
    "\n" +
    "                        <tr ng-repeat=\"item in filterTable.DataDisplayed\">\r" +
    "\n" +
    "                            <td class=\"text-center\" ng-class=\"::{'filtertable-cell-clickable' : filterTable.ActionCol.HasClickAction}\" ng-click=\"filterTable.ActionCol.HasClickAction && filterTable.ExecuteClickAction(filterTable.ActionCol, item)\">\r" +
    "\n" +
    "                                <span ng-bind-html=\"::item[filterTable.ActionCol.Key]\" compile-template compile-scope=\"ParentScope\"></span>\r" +
    "\n" +
    "                            </td>\r" +
    "\n" +
    "                            <td ng-style=\"col._style\"  ng-repeat=\"col in filterTable.VisibleCols\" ng-class=\"::{'filtertable-cell-clickable' : col.HasClickAction}\" ng-click=\"col.HasClickAction && filterTable.ExecuteClickAction(col, item)\">\r" +
    "\n" +
    "                                <span ng-bind-html=\"::item[col.Key]\" compile-template compile-scope=\"ParentScope\"></span>\r" +
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
    "                            <td colspan=\"100%\" class=\"none\" style=\"text-align: center;\">Loading <img src=\"bower_components/SmlAppl-WebApps-NgFramework/dist/images/loader-horizontal.gif\" /></td>\r" +
    "\n" +
    "                        </tr>\r" +
    "\n" +
    "                        <tr ng-if=\"filterTable.ShowNoDataMsg\">\r" +
    "\n" +
    "                            <td colspan=\"100%\" class=\"warning\" style=\"text-align: center;\">\r" +
    "\n" +
    "                                {{::Translations.FilterTable_Error_No_Data}}\r" +
    "\n" +
    "                            </td>\r" +
    "\n" +
    "                        </tr>\r" +
    "\n" +
    "                        <tr ng-if=\"filterTable.ShowDataFilteredOutMsg\">\r" +
    "\n" +
    "                            <td colspan=\"100%\" class=\"warning\" style=\"text-align: center;\">\r" +
    "\n" +
    "                                {{::Translations.FilterTable_Error_Filter_No_Data}}\r" +
    "\n" +
    "                            </td>\r" +
    "\n" +
    "                        </tr>\r" +
    "\n" +
    "                        <tr ng-repeat=\"footerRow in filterTable.FooterRows\">\r" +
    "\n" +
    "                            <th>\r" +
    "\n" +
    "                                <span ng-bind-html=\"::footerRow.Title\"></span>\r" +
    "\n" +
    "                            </th>\r" +
    "\n" +
    "                            <th ng-repeat=\"col in filterTable.VisibleCols\">\r" +
    "\n" +
    "                                <span ng-bind-html=\"footerRow.GetValue(col)\"></span>\r" +
    "\n" +
    "                            </th>\r" +
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
    "                    <div class=\"pull-right\" ng-if=\"filterTable.DisablePaging != true\">\r" +
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
    "                            {{::Translations.FilterTable_Page}} {{ filterTable.CurrentPage }} {{::Translations.FilterTable_Of}} {{ filterTable.FilterDataPageCount }} ({{filterTable.PassedDataPageCount}} {{::Translations.FilterTable_Total}})\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <button class=\"btn btn-default\" style=\"float: right;\" ng-click=\"filterTable.CurrentPage = filterTable.FilterDataPageCount\" ng-disabled=\"filterTable.ForwardDisabled\"><i class=\"fa fa-fast-forward\"></i></button>\r" +
    "\n" +
    "                        <button class=\"btn btn-default\" style=\"float: right;\" ng-click=\"filterTable.CurrentPage = (filterTable.CurrentPage + 1)\" ng-disabled=\"filterTable.ForwardDisabled\"><i class=\"fa fa-step-forward\"></i></button>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                    <div style=\"float: left;\">\r" +
    "\n" +
    "                        {{::Translations.FilterTable_Records}}: {{filterTable.DataFiltered.length}} {{::Translations.FilterTable_Of}} {{filterTable.PassedData.length}}\r" +
    "\n" +
    "                    </div>\r" +
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


  $templateCache.put('./src/Scripts/app/FilterTable/Views/FilterTableMultiSelect.html',
    "<div class=\"modal-header\">\r" +
    "\n" +
    "    <h3 class=\"modal-title\">Filter {{column.Display}}</h3>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<div class=\"modal-body\">\r" +
    "\n" +
    "    <div class=\"row\">\r" +
    "\n" +
    "        <div class=\"col-md-12\">\r" +
    "\n" +
    "            <div class=\"input-group\">\r" +
    "\n" +
    "                <span class=\"input-group-addon\"><i class=\"glyphicon glyphicon-search\"></i></span>\r" +
    "\n" +
    "                <input type=\"text\" name=\"Search\" lass=\"form-control\" ng-model=\"Search\" ng-model-options=\"ModelOptions\" />\r" +
    "\n" +
    "                <div class=\"input-group-btn\">\r" +
    "\n" +
    "                    <button class=\"btn btn-default\" ng-click=\"ResetSearch()\"><span class=\"glyphicon glyphicon-remove\"></span></button>\r" +
    "\n" +
    "                    <button class=\"btn btn-default\" ng-click=\"All()\" title=\"Wählen\"><span class=\"glyphicon glyphicon-plus\"></span></button>\r" +
    "\n" +
    "                    <button class=\"btn btn-default\" ng-click=\"None()\" title=\"Abwählen\"><span class=\"glyphicon glyphicon-minus\"></span></button>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"row\" style=\"display: none;\">\r" +
    "\n" +
    "        <div class=\"col-md-4 col-md-offset-1\">\r" +
    "\n" +
    "            <button class=\"btn btn-default\" type=\"button\" ng-click=\"All()\">Wählen</button>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"col-md-4 col-md-offset-2\">\r" +
    "\n" +
    "            <button class=\"btn btn-default\" type=\"button\" ng-click=\"None()\">Abwählen</button>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"row\" style=\"max-height: 400px; overflow-y: auto; margin-top: 20px;\">\r" +
    "\n" +
    "        <div class=\"col-md-12\">\r" +
    "\n" +
    "            <div ng-repeat=\"item in Distincts | filter: Search\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <label ng-class=\"{'margin-bottom-sm': $first && HasEmpty}\">\r" +
    "\n" +
    "                    <input type=\"checkbox\" ng-model=\"column.CustomFilter.Selected[item]\"/>\r" +
    "\n" +
    "                    {{item == \"\" ? FilterTable.Translations.FilterTable_Empty_Value : item}}\r" +
    "\n" +
    "                </label>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<div class=\"modal-footer\">\r" +
    "\n" +
    "    <button class=\"btn btn-default\" type=\"button\" ng-click=\"Reset()\">{{FilterTable.Translations.FilterTable_Reset_Filter}}</button>\r" +
    "\n" +
    "    <button class=\"btn btn-primary\" type=\"button\" ng-click=\"ok()\">{{FilterTable.Translations.FilterTable_Accept}}</button>\r" +
    "\n" +
    "    <button class=\"btn btn-warning\" type=\"button\" ng-click=\"cancel()\">{{FilterTable.Translations.FilterTable_Cancel}}</button>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n"
  );


  $templateCache.put('./src/Scripts/app/FilterTable/Views/FilterTableOptions.html',
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
    "            <div style=\"max-height: 400px; overflow-y: auto;\">\r" +
    "\n" +
    "                <table class=\"table table-bordered table-condensed table-responsive table-striped table-hover\">\r" +
    "\n" +
    "                    <thead>\r" +
    "\n" +
    "                        <tr>\r" +
    "\n" +
    "                            <th>Name</th>\r" +
    "\n" +
    "                            <th>Sichtbar</th>\r" +
    "\n" +
    "                            <th>Dropdown</th>\r" +
    "\n" +
    "                        </tr>\r" +
    "\n" +
    "                        <tr>\r" +
    "\n" +
    "                            <td>\r" +
    "\n" +
    "                                <input name=\"theColFilter.Display\" ng-model=\"theColFilter.Display\" placeholder=\"Name\" />\r" +
    "\n" +
    "                            </td>\r" +
    "\n" +
    "                            <td>\r" +
    "\n" +
    "                                <input type=\"checkbox\" ng-model=\"visible.all\" ng-change=\"ChangeVisible(visible.all)\" /> Alle\r" +
    "\n" +
    "                            </td>\r" +
    "\n" +
    "                            <td></td>\r" +
    "\n" +
    "                        </tr>\r" +
    "\n" +
    "                    </thead>\r" +
    "\n" +
    "                    <tbody>\r" +
    "\n" +
    "                        <tr ng-repeat=\"col in FilterTable.CurrentCols | filter: theColFilter\">\r" +
    "\n" +
    "                            <td>{{::col.Display}}</td>\r" +
    "\n" +
    "                            <td><input type=\"checkbox\" ng-model=\"col.Visible\" /></td>\r" +
    "\n" +
    "                            <td ng-switch=\"FilterTable.NoSearchSelects\">\r" +
    "\n" +
    "                                <input ng-switch-when=\"true\" type=\"checkbox\" ng-model=\"noSelect\" ng-disabled=\"true\" />\r" +
    "\n" +
    "                                <input ng-switch-when=\"false\" type=\"checkbox\" ng-model=\"col.BuildSelect\" ng-disabled=\"!col.CanBuildSelect\" />\r" +
    "\n" +
    "                            </td>\r" +
    "\n" +
    "                        </tr>\r" +
    "\n" +
    "                    </tbody>\r" +
    "\n" +
    "                </table>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </uib-tab>\r" +
    "\n" +
    "        <uib-tab heading=\"Tabelle\" ng-if=\"true\">\r" +
    "\n" +
    "            <div style=\"max-height: 400px; overflow-y: auto;\">\r" +
    "\n" +
    "                <table class=\"table table-bordered table-condensed table-responsive table-striped table-hover\">\r" +
    "\n" +
    "                    <thead>\r" +
    "\n" +
    "                    <tr>\r" +
    "\n" +
    "                        <th>Setting</th>\r" +
    "\n" +
    "                        <th>Wert</th>\r" +
    "\n" +
    "                    </tr>\r" +
    "\n" +
    "                    </thead>\r" +
    "\n" +
    "                    <tbody>\r" +
    "\n" +
    "                    <tr>\r" +
    "\n" +
    "                        <td>Suche aktiv</td>\r" +
    "\n" +
    "                        <td><input type=\"checkbox\" ng-model=\"FilterTable.SearchActive\"/></td>\r" +
    "\n" +
    "                    </tr>\r" +
    "\n" +
    "                    <tr>\r" +
    "\n" +
    "                        <td>Keine Dropdowns</td>\r" +
    "\n" +
    "                        <td><input type=\"checkbox\" ng-model=\"FilterTable.NoSearchSelects\"/></td>\r" +
    "\n" +
    "                    </tr>\r" +
    "\n" +
    "                    <tr>\r" +
    "\n" +
    "                        <td>Dropdowns einschränken</td>\r" +
    "\n" +
    "                        <td><input type=\"checkbox\" ng-model=\"FilterTable.ReduceSelects\"/></td>\r" +
    "\n" +
    "                    </tr>\r" +
    "\n" +
    "                    <tr>\r" +
    "\n" +
    "                        <td>Datensätze pro Seite</td>\r" +
    "\n" +
    "                        <td ng-if=\"!disablePageSizeInput\"><input type=\"number\" ng-model=\"FilterTable.PageSize\" ng-model-options=\"ModelOptions\" /></td>\r" +
    "\n" +
    "                        <td ng-if=\"disablePageSizeInput\"><input type=\"number\" ng-disabled=\"disablePageSizeInput\" /></td>\r" +
    "\n" +
    "                    </tr>\r" +
    "\n" +
    "                    </tbody>\r" +
    "\n" +
    "                </table>\r" +
    "\n" +
    "            </div>\r" +
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
