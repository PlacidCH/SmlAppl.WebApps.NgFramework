	angular.module("smlAppl.webApps.framework.filterTable.directives")
        .controller('FilterTableModalMultiSelectCtrl', ["$scope", "$uibModalInstance", "$filter", "filterTable", "column", function ($scope, $uibModalInstance, $filter, filterTable, column) {

        $scope.FilterTable = filterTable;
        $scope.column = angular.copy(column);

        function getdistincts(excludeEmpty) {
            var distincts = $filter('orderBy')($scope.column.Distincts);
            if (excludeEmpty) {
                var l = distincts.length;
                for (var i = l; i > 0; i--) {
                    var val = distincts[i-1];
                    if (val === null || val === undefined || val.trim() === "") {
                        distincts.splice(i-1, 1);
                    }
                }
            }
            return distincts;
        }
        $scope.Distincts = getdistincts(true);

        $scope.ModelOptions = {
            debounce: {
                default: 500,
                blur: 0
            }
        };

        $scope.Reset = function() {
            $scope.column.CustomFilter.FnReset();
            $uibModalInstance.close($scope.column);
        }

        $scope.All = function () {
            for (var i=0; i < $scope.Distincts.length; i++) {
                var x = $scope.Distincts[i];
                $scope.column.CustomFilter.Selected[x] = true;
            }
        }
        $scope.None = function () {
            $scope.column.CustomFilter.FnReset();
        }

        $scope.ok = function () {
            var selected = Object.keys($scope.column.CustomFilter.Selected);
            for (var i = 0; i < selected.length; i++) {
                var key = selected[i];
                if (!$scope.column.CustomFilter.Selected[key]) {
                    delete $scope.column.CustomFilter.Selected[key];
                }
            }
            selected = Object.keys($scope.column.CustomFilter.Selected);
            if (selected.length === 0) {
                $scope.column.CustomFilter.FnReset();
            } else {
                $scope.column.CustomFilter.Text = selected.length + " gewählt";
                $scope.column.CustomFilter.Tooltip = selected.join(', ');
            }
            $uibModalInstance.close($scope.column);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

}]);