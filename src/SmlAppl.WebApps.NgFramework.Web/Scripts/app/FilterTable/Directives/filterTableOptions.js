(function() {
	"use strict";

	angular.module("smlAppl.webApps.framework.filterTable.directives")
        .controller('FilterTableOptionsCtrl', ["$scope", "$uibModalInstance", "$filter", "filterTable", function ($scope, $uibModalInstance, $filter, filterTable) {

        $scope.FilterTable = filterTable;

        $scope.visible = {};
        $scope.theColFilter = {};
        $scope.visible.all = undefined;

        $scope.noSelect = false;

        $scope.$watch('theColFilter', function (newValue, oldValue) {
            checkAllButtonStati();
        }, true);

        $scope.$watch('FilterTable.CurrentCols', function (newValue, oldValue) {
            checkAllButtonStati();
        }, true);

        function checkAllButtonStati() {
            var current = ($filter('filter')($scope.FilterTable.CurrentCols, $scope.theColFilter));
            var allShown = current.length === (current.filter(function (v, i, a) { return v.Visible; })).length;
            var allHidden = current.length === (current.filter(function (v, i, a) { return !v.Visible; })).length;;
            $scope.visible.all = allShown ? true : allHidden ? false : undefined;    //TODO: tristate ? i kinda like it this way    
        }

        $scope.ModelOptions = {
            debounce: {
                default: 500,
                blur: 0
            }
        };

        $scope.ok = function () {
            $uibModalInstance.close();
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.ChangeVisible = function (newValue) {
            var change = $scope.FilterTable.CurrentCols.filter(function (v, i, a) { return v.Visible !== newValue });
            var filtered = $filter('filter')(change, $scope.theColFilter);
            for (var i = 0; i < filtered.length; i++) {
                filtered[i].Visible = newValue;
            }
            checkAllButtonStati();
        }
    }]);
})();