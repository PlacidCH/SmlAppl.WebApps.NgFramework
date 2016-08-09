(function() {
    "use strict";

    angular.module("smlAppl.webApps.framework.superAdmin.controllers")
        .controller("UserOvertakeCtrl", [
			"$scope", "$uibModalInstance", "content", "data", "User", "MsgBox",
			function ($scope, $uibModalInstance, content, data, User, MsgBox) {

			    $scope.content = content;
			    $scope.data = data;

			    $scope.credentials = {
			        userName: null,
			        password: null
			    };


			    $scope.ok = function () {
			        // try to overtake the user
			        User.overtake($scope.credentials.userName, $scope.credentials.password, $scope.data.UserName)
			            .then(function(response) {

			                    $uibModalInstance.close($scope.data);
			                    MsgBox.alert('Ui_UserOvertake', 'Msg_UserOvertakeSuccessful');
			                },
			                function(response) {
			                    alert('Unable to overtake. ' + response);
			                });
			    };

			    $scope.cancel = function () {
			        $uibModalInstance.dismiss('cancel');
			    };

			}
        ]);

})();