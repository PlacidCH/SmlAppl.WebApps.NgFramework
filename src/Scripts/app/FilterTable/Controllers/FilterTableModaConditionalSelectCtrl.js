	angular.module("smlAppl.webApps.framework.filterTable.directives")
        .controller('FilterTableModalConditionalSelectCtrl', ["$scope", "$uibModalInstance", "$filter", "filterTable", "column", "$translate", function ($scope, $uibModalInstance, $filter, filterTable, column, $translate) {

            $scope.conditionalFilterItem = {
                condition: null,
                value: null
            };

            $scope.FilterTable = filterTable;
            $scope.column = angular.copy(column);

            console.log("Selected",$scope.column.CustomFilter.Selected);
            $scope.currentConditionalFilter = $scope.column.CustomFilter.Selected;
            $scope.Search = '';
            $scope.ResetSearch = function() {
                $scope.Search = '';
            }
                /**
                 * [
                 {condition: '<=', value: 100}

                 ]
                 * @type {Array}
                 */


            $scope.ModelOptions = {
                debounce: {
                    default: 500,
                    blur: 0
                }
            };

            $scope.addCondition = function(){
                $scope.currentConditionalFilter.push(angular.copy($scope.conditionalFilterItem));
                $scope.conditionalFilterItem = {
                    condition: null,
                    value: null
                }
            }

            $scope.removeCondition = function(conditionItem){
                var sortedConditionalFilter = [];
                angular.forEach($scope.currentConditionalFilter, function(item){
                    if(conditionItem !== item){
                        sortedConditionalFilter.push(item);
                    }
                });

                $scope.currentConditionalFilter = angular.copy(sortedConditionalFilter);
            }

            $scope.Reset = function() {
                $scope.column.CustomFilter.FnReset();
                $uibModalInstance.close($scope.column);
            }

            $scope.ok = function () {
                $scope.column.CustomFilter.Selected = $scope.currentConditionalFilter;
                /*
                var selected = Object.keys($scope.column.CustomFilter.Selected);

                for (var i = 0; i < selected.length; i++) {
                    var key = selected[i];
                    if (!$scope.column.CustomFilter.Selected[key]) {
                        delete $scope.column.CustomFilter.Selected[key];
                    }
                }

                //The selected items in the modal
                selected = Object.keys($scope.column.CustomFilter.Selected);
                if (selected.length === 0) {
                    $scope.column.CustomFilter.FnReset();
                } else {
                    $scope.column.CustomFilter.Text = selected.length + " " + filterTable.Translations.FilterTable_0_Selected;
                    $scope.column.CustomFilter.Tooltip = selected.join(', ');
                }*/

                $uibModalInstance.close($scope.column);
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };

}]);