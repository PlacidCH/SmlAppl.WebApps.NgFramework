﻿	angular.module("smlAppl.webApps.framework.filterTable.directives")
        .controller('FilterTableModalMultiSelectCtrl', ["$scope", "$uibModalInstance", "$filter", "filterTable", "column", "$translate", function ($scope, $uibModalInstance, $filter, filterTable, column, $translate) {

        $scope.FilterTable = filterTable;
        $scope.column = angular.copy(column);
	    $scope.Search = '';
	    $scope.ResetSearch = function() {
	        $scope.Search = '';
	    }

	    function getdistincts(excludeEmpty) {
            var distincts = $filter('orderBy')($scope.column.Distincts) || [];
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

	    $scope.Distincts = $scope.column.Distincts || [];
        //since we know it will be sorted we can check element at pos 0
	    $scope.HasEmpty = $scope.Distincts.length > 0 && $scope.Distincts[0] === "";
	    

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
            updateFiltered(true);
        }
        $scope.None = function () {
            updateFiltered(false);
        }
        function updateFiltered(setTo) {
            var currents = $filter('filter')($scope.Distincts, $scope.Search);
            for (var i = 0; i < currents.length; i++) {
                var x = currents[i];
                $scope.column.CustomFilter.Selected[x] = setTo;
            }

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
                $scope.column.CustomFilter.Text = selected.length + " " + filterTable.Translations.FilterTable_0_Selected;
                $scope.column.CustomFilter.Tooltip = selected.join(', ');
            }
            $uibModalInstance.close($scope.column);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

}]);