(function() {
    "use strict";

    var componentPath = "wwwroot/superAdmin/views/userList/";

    angular.module("smlAppl.webApps.framework.superAdmin.components")
        .component("userList",
            {
                templateUrl: componentPath + "userList.html",
                bindings: {
                    //data: '=ngModel',
                    //title: '<'
                    //fieldType: '@?',
                    //onUpdate: '&'
                },
                controller: [
                    "$scope", "$element", "$attrs", "User", "$state", "$sce", "$uibModal",
                    function ($scope, $element, $attrs, User, $state, $sce, $uibModal) {
                        var ctrl = this;

                        ctrl.data = [];

                        User.get()
                            .then(function (response) {
                                ctrl.data = response;
                            });

                        ctrl.TOptions = {
                        	CanSelectCols: true,
                        	NoSearchSelects: false,
                        	Columns: [
								{ key: "EditAction", actionCol: true, valueFunction: getTableEditIcon, clickAction: editItem },
								{ key: "UserName", display: "Label_UserName", select: false, visible: true },
								{ key: "FullName", display: "Label_FullName", select: false, visible: true },

								// invisible fields
								{ key: "Id", display: "Id", select: false, visible: false, orderAsc: true },
                        	],
                        };
                        
                        function getTableEditIcon(item) {
                        	return $sce.trustAsHtml('<button class="btn btn-default btn-xs" type="button"><i class="fa fa-edit"></i></button>');
                        };

                        function editItem(item, col) {

                            var moduleInstance = $uibModal.open({
                                animation: true,
                                templateUrl: componentPath + "userOvertake.html",
                                controller: "UserOvertakeCtrl",
                                size: "sm",
                                resolve: {
                                    content: {},
                                    data: item
                                }
                            });

                            moduleInstance.result.then(function() {
                                    $state.go("home");
                                });

                        };
                    }
                ],
            }
        );

})();