angular.module('smlAppl.webApps.framework.superAdmin').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('wwwroot/superAdmin/views/layout.html',
    "<div ui-view></div>"
  );


  $templateCache.put('wwwroot/superAdmin/views/navigation.html',
    "    \r" +
    "\n" +
    "<div class=\"panel panel-default\">\r" +
    "\n" +
    "    <div class=\"panel-heading\">\r" +
    "\n" +
    "        <h4>\r" +
    "\n" +
    "            <i class=\"fa fa-cog\"></i> {{ \"Ui_SuperAdmin\" | translate }}\r" +
    "\n" +
    "        </h4>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div class=\"panel-body\">\r" +
    "\n" +
    "        <ul class=\"nav nav-pills nav-stacked\">\r" +
    "\n" +
    "            \r" +
    "\n" +
    "            <li role=\"presentation\">\r" +
    "\n" +
    "                <a class=\"list-group-item\" ui-sref=\"superadmin.user\" ui-sref-active=\"active\">\r" +
    "\n" +
    "                    <h4 class=\"list-group-item-heading\">{{ \"Ui_SuperAdmin_User\" | translate }}</h4>\r" +
    "\n" +
    "                </a>\r" +
    "\n" +
    "            </li>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        </ul>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('wwwroot/superAdmin/views/userList/userList.html',
    "\r" +
    "\n" +
    "<filter-table items=\"$ctrl.data\" options=\"$ctrl.TOptions\" initial-empty=\"true\"></filter-table>"
  );


  $templateCache.put('wwwroot/superAdmin/views/userList/userOvertake.html',
    "<div>\r" +
    "\n" +
    "    <div class=\"modal-header\">\r" +
    "\n" +
    "        <h3 class=\"modal-title\">Overtake user {{ data.FullName }} ({{ data.UserName }})</h3>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"modal-body\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <div class=\"form-group\">\r" +
    "\n" +
    "            <label>Your userName</label>\r" +
    "\n" +
    "            <input class=\"form-control\" type=\"text\" ng-model=\"credentials.userName\">\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <div class=\"form-group\">\r" +
    "\n" +
    "            <label>Your password</label>\r" +
    "\n" +
    "            <input class=\"form-control\" type=\"password\" ng-model=\"credentials.password\">\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"modal-footer\">\r" +
    "\n" +
    "        <button class=\"btn btn-primary\" type=\"button\" ng-click=\"ok()\">{{ \"Ui_Ok\" | translate }}</button>\r" +
    "\n" +
    "        <button class=\"btn btn-default\" type=\"button\" ng-click=\"cancel()\">{{ \"Ui_Close\" | translate }}</button>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );

}]);
