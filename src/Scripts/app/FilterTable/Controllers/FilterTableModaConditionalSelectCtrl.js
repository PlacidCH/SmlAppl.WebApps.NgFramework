	angular.module("smlAppl.webApps.framework.filterTable.directives")
        .controller('FilterTableModalConditionalSelectCtrl', ["$scope", "$uibModalInstance", "$filter", "filterTable", "column", "$translate", function ($scope, $uibModalInstance, $filter, filterTable, column, $translate) {

            $scope.formulaText = "";
            $scope.conditionalFilterItem = {
                condition: null,
                value: null
            };

            $scope.FilterTable = filterTable;
            $scope.column = angular.copy(column);

            if( Object.prototype.toString.call( $scope.column.CustomFilter.Selected ) !== '[object Array]' ) {
                $scope.column.CustomFilter.Selected = [];
            }

            $scope.currentConditionalFilter = $scope.column.CustomFilter.Selected || [];
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

                updateFilterFormulaText();
            }

            $scope.removeCondition = function(conditionItem){
                var sortedConditionalFilter = [];
                angular.forEach($scope.currentConditionalFilter, function(item){
                    if(conditionItem !== item){
                        sortedConditionalFilter.push(item);
                    }
                });

                $scope.currentConditionalFilter = angular.copy(sortedConditionalFilter);
                updateFilterFormulaText();
            }

            $scope.Reset = function() {
                $scope.column.CustomFilter.Selected = [];
                updateFilterFormulaText();
                $uibModalInstance.close($scope.column);
            }

            $scope.ok = function () {
                $scope.column.CustomFilter.Selected = $scope.currentConditionalFilter;
                updateFilterFormulaText();
                $uibModalInstance.close($scope.column);
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };

            function updateFilterFormulaText(){
                var formulaText = "";

                angular.forEach($scope.currentConditionalFilter, function(filter){
                    if(formulaText != ""){
                        formulaText += " && ";
                    }

                    formulaText = formulaText+ "("+$scope.column.Display + " "+filter.condition+" "+filter.value+")";

                });

                $scope.formulaText = formulaText;
                $scope.column.CustomFilter.Tooltip = formulaText;
                $scope.column.CustomFilter.Text = formulaText;
            }

            updateFilterFormulaText();
}]);