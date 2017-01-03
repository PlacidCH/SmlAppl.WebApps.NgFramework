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

                /**
                 * [
                 {condition: '<=', value: 100, conjunction: 'AND'}

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
                if($scope.conditionalFilterItem.condition == null || $scope.conditionalFilterItem.value == null){
                    return false;
                }

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

                //Grouping each statement into and groups for easier processing
                var groupByAnd = new Array();
                var groupIndex = 0;
                angular.forEach($scope.column.CustomFilter.Selected, function(conditionItem){
                    if( Object.prototype.toString.call( groupByAnd[groupIndex] ) !== '[object Array]' ) {
                        groupByAnd[groupIndex] = new Array();
                    }
                    groupByAnd[groupIndex].push(conditionItem);

                    //If the AND statement is closed, a new group will be created
                    if(conditionItem.conjunction == 'AND'){
                        groupIndex++;
                    }
                });

                angular.forEach(groupByAnd, function(groupedConditions, j){
                    formulaText += "(";
                    angular.forEach(groupedConditions, function(filter, i){
                        formulaText = formulaText+ ""+$scope.column.Display + " "+filter.condition+" "+filter.value+"";
                        if(groupedConditions[i+1]){
                            formulaText += " OR ";
                        }
                    });
                    formulaText += ")";

                    if(groupByAnd[j+1]){
                        formulaText += " AND ";
                    }
                });

                $scope.formulaText = formulaText;
                $scope.column.CustomFilter.Tooltip = formulaText;
                $scope.column.CustomFilter.Text = formulaText;
            }

            updateFilterFormulaText();
}]);