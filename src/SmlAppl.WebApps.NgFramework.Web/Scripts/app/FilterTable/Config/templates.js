angular.module('smlAppl.webApps.framework.filterTable').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('wwwroot/FilterTable/Views/FilterTable.html',
    "<style>\r" +
    "\n" +
    "	select[value=\"\"] {\r" +
    "\n" +
    "		color: gray;\r" +
    "\n" +
    "	}\r" +
    "\n" +
    "</style>\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div class=\"row\">\r" +
    "\n" +
    "	<div class=\"col-md-12\" style=\"text-align: center;\">\r" +
    "\n" +
    "		<span ng-hide=\"!loading\">Loading <img src=\"Content/images/loader-horizontal.gif\" /></span>\r" +
    "\n" +
    "	</div>\r" +
    "\n" +
    "	<div class=\"col-md-12\" style=\"text-align: center;\">\r" +
    "\n" +
    "		<span ng-show=\"error\">Fehler beim Beziehen der Daten.</span>\r" +
    "\n" +
    "	</div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "<script type=\"text/ng-template\" id=\"myModalContent.html\">\r" +
    "\n" +
    "    <div class=\"modal-header\">\r" +
    "\n" +
    "        <h3 class=\"modal-title\">Einstellungen</h3>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"modal-body\">\r" +
    "\n" +
    "        <uib-tabset>\r" +
    "\n" +
    "            <uib-tab heading=\"Spalten\" ng-if=\"Options.CanSelectCols\">\r" +
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
    "                                <input name=\"theColFilter.display\" ng-model=\"theColFilter.display\" placeholder=\"Name\" />\r" +
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
    "                        <tr ng-repeat=\"col in Options.CurrentCols | filter: theColFilter\">\r" +
    "\n" +
    "                            <td>{{::col.display | translate}}</td>\r" +
    "\n" +
    "                            <td><input type=\"checkbox\" ng-model=\"col.visible\" /></td>\r" +
    "\n" +
    "                            <td><input type=\"checkbox\" ng-model=\"col.select\" ng-change=\"ChangeDropDown(col)\" ng-disabled=\"Options.NoSearchSelects || !col.canSelect\" /></td>\r" +
    "\n" +
    "                        </tr>\r" +
    "\n" +
    "                    </tbody>\r" +
    "\n" +
    "                </table>\r" +
    "\n" +
    "            </uib-tab>\r" +
    "\n" +
    "            <uib-tab heading=\"Tabelle\" ng-if=\"true\">\r" +
    "\n" +
    "                <table class=\"table table-bordered table-condensed table-responsive table-striped table-hover\">\r" +
    "\n" +
    "                    <thead>\r" +
    "\n" +
    "                        <tr>\r" +
    "\n" +
    "                            <th>Setting</th>\r" +
    "\n" +
    "                            <th>Wert</th>\r" +
    "\n" +
    "                        </tr>\r" +
    "\n" +
    "                    </thead>\r" +
    "\n" +
    "                    <tbody>\r" +
    "\n" +
    "                        <tr>\r" +
    "\n" +
    "                            <td>Suche aktiv</td>\r" +
    "\n" +
    "                            <td><input type=\"checkbox\" ng-model=\"Options.SearchActive\" /></td>\r" +
    "\n" +
    "                        </tr>\r" +
    "\n" +
    "                        <tr>\r" +
    "\n" +
    "                            <td>Keine Dropdowns</td>\r" +
    "\n" +
    "                            <td><input type=\"checkbox\" ng-model=\"Options.NoSearchSelects\" /></td>\r" +
    "\n" +
    "                        </tr>\r" +
    "\n" +
    "                        <tr>\r" +
    "\n" +
    "                            <td>Dropdowns einschränken</td>\r" +
    "\n" +
    "                            <td><input type=\"checkbox\" ng-model=\"Options.ReduceSelects\" /></td>\r" +
    "\n" +
    "                        </tr>\r" +
    "\n" +
    "                        <tr>\r" +
    "\n" +
    "                            <td>Datensätze pro Seite</td>\r" +
    "\n" +
    "                            <td><input type=\"number\" ng-model=\"Options.PageSize\" ng-model-options=\"ModelOptions\" /></td>\r" +
    "\n" +
    "                        </tr>\r" +
    "\n" +
    "                    </tbody>\r" +
    "\n" +
    "                </table>\r" +
    "\n" +
    "            </uib-tab>\r" +
    "\n" +
    "        </uib-tabset>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"modal-footer\">\r" +
    "\n" +
    "        <button class=\"btn btn-primary\" type=\"button\" ng-click=\"ok()\">OK</button>\r" +
    "\n" +
    "        <!--<button class=\"btn btn-warning\" type=\"button\" ng-click=\"cancel()\">Cancel</button>-->\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "</script>\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div ng-hide=\"loading || error\">\r" +
    "\n" +
    "    <div class=\"row\">\r" +
    "\n" +
    "        <div class=\"col-md-12\">\r" +
    "\n" +
    "            <div style=\"overflow: auto;\">\r" +
    "\n" +
    "                <table class=\"table table-bordered table-condensed table-responsive table-striped table-hover\">\r" +
    "\n" +
    "                    <thead>\r" +
    "\n" +
    "                        <tr>\r" +
    "\n" +
    "                            <th>\r" +
    "\n" +
    "                                <span type=\"button\" class=\"btn btn-default btn-sm\" ng-click=\"open()\" ng-show=\"Options.CanCustomize\"><span class=\"glyphicon glyphicon-cog\"></span></span>\r" +
    "\n" +
    "                            </th>\r" +
    "\n" +
    "                            <th ng-repeat=\"col in Options.VisibleCols\" style=\"padding-left: 10px; padding-right: 40px; vertical-align: middle;\">\r" +
    "\n" +
    "                                <span class=\"pull-left\">{{::col.display | translate}}</span>\r" +
    "\n" +
    "                                <span style=\"margin-right: -30px; opacity: 0.5; cursor: pointer;\" class=\"pull-right {{GetOrderIndicator(col)}}\" ng-click=\"OrderBy(col)\"></span>\r" +
    "\n" +
    "                            </th>\r" +
    "\n" +
    "                        </tr>\r" +
    "\n" +
    "                        <tr ng-show=\"Options.SearchActive\">\r" +
    "\n" +
    "                            <th>\r" +
    "\n" +
    "                                <span type=\"button\" class=\"btn btn-default btn-sm\" ng-click=\"clearFilter()\"><span class=\"glyphicon glyphicon-remove\"></span></span>\r" +
    "\n" +
    "                            </th>\r" +
    "\n" +
    "                            <th ng-repeat=\"col in Options.VisibleCols\">\r" +
    "\n" +
    "                                <select class=\"select2\" name=\"theFilter{{::col.key}}\" ng-model=\"theFilter[col.key]\" ng-if=\"col.select && hasDistincts(col.key)\">\r" +
    "\n" +
    "                                    <!-- acts as placeholder -->\r" +
    "\n" +
    "                                    <option ng-repeat=\"item in Distincts[col.key] | orderBy \" value=\"{{::item}}\">{{ ::item | translate }}</option>\r" +
    "\n" +
    "                                </select>\r" +
    "\n" +
    "                                <input type=\"text\" name=\"theFilter{{::col.key}}\" ng-model=\"theFilter[col.key]\" ng-model-options=\"ModelOptions\" ng-if=\"!col.select || !hasDistincts(col.key)\" />\r" +
    "\n" +
    "                            </th>\r" +
    "\n" +
    "                        </tr>\r" +
    "\n" +
    "                    </thead>\r" +
    "\n" +
    "                    <tbody>\r" +
    "\n" +
    "                        <tr ng-if=\"PassedData.length === 0 && !Options.InitialEmpty\">\r" +
    "\n" +
    "                            <td colspan=\"100%\" class=\"warning\">Keine Daten gefunden.</td>\r" +
    "\n" +
    "                        </tr>\r" +
    "\n" +
    "                        <tr ng-if=\"Options.VisibleCols.length > 0\" ng-repeat=\"item in DisplayedData\">\r" +
    "\n" +
    "                            <td></td>\r" +
    "\n" +
    "                            <!--<td ng-repeat=\"col in Options.VisibleCols\">{{::GetVal(item, col)}}</td>-->\r" +
    "\n" +
    "                            <td ng-\r" +
    "\n" +
    "                            <td ng-repeat=\"col in Options.VisibleCols\"><span ng-bind-html=\"::GetVal(item, col)\"></span></td>\r" +
    "\n" +
    "                        </tr>\r" +
    "\n" +
    "                        <tr ng-if=\"PassedData.length > 0 && (FilteredData.length == 0)\">\r" +
    "\n" +
    "                            <td colspan=\"100%\" class=\"warning\">Filter enthält keine Daten.</td>\r" +
    "\n" +
    "                        </tr>\r" +
    "\n" +
    "                    </tbody>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                </table>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"row\">\r" +
    "\n" +
    "        <div class=\"col-md-12\">\r" +
    "\n" +
    "            <div class=\"pull-right\">\r" +
    "\n" +
    "                <button class=\"btn btn-default\" style=\"float: left;\" ng-click=\"SetCurrentPage(1)\" ng-disabled=\"settings.backwardDisabled\"><i class=\"fa fa-fast-backward\"></i></button>\r" +
    "\n" +
    "                <button class=\"btn btn-default\" style=\"float: left;\" ng-click=\"SetCurrentPage(settings.currentPage-1)\" ng-disabled=\"settings.backwardDisabled\"><i class=\"fa fa-step-backward\"></i></button>\r" +
    "\n" +
    "                <div style=\"float: left; text-align: right;\">\r" +
    "\n" +
    "                    <select ng-model=\"settings.currentPage\" ng-change=\"SetCurrentPage(settings.currentPage)\"\r" +
    "\n" +
    "                            ng-options=\"item as item for item in settings.filterPageArray\"></select>\r" +
    "\n" +
    "                    Seite {{ settings.currentPage }} von {{ settings.filterPageCount }} ({{settings.totalPageCount}} Total)\r" +
    "\n" +
    "\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <button class=\"btn btn-default\" style=\"float: right;\" ng-click=\"SetCurrentPage(settings.filterPageCount)\" ng-disabled=\"settings.forwardDisabled\"><i class=\"fa fa-fast-forward\"></i></button>\r" +
    "\n" +
    "                <button class=\"btn btn-default\" style=\"float: right;\" ng-click=\"SetCurrentPage(settings.currentPage+1)\" ng-disabled=\"settings.forwardDisabled\"><i class=\"fa fa-step-forward\"></i></button>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div style=\"float: left;\">Datensätze: {{FilteredData.length}} von {{PassedData.length}}</div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );

}]);
