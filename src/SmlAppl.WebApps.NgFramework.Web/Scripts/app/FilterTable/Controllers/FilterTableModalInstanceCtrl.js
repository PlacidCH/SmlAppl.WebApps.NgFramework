(function() {
	"use strict";

	angular.module('smlAppl.webApps.framework.filterTable.controllers').controller('FilterTableModalInstanceCtrl', function ($scope, $uibModalInstance, $filter, options) {

		$scope.Options = options;

		$scope.visible = {};
		$scope.visible.all = $scope.Options.CurrentCols.length === ($scope.Options.CurrentCols.filter(function (v, i, a) { return v.visible; })).length;

		$scope.theColFilter = {};

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
			var change = $scope.Options.CurrentCols.filter(function (v, i, a) { return v.visible !== newValue });
			var filtered = $filter('filter')(change, $scope.theColFilter);
			for (var i = 0; i < filtered.length; i++) {
				filtered[i].visible = newValue;
			}
		}

		$scope.ChangeDropDown = function (col) {
			if (col.select) {
				$scope.Options.buildDistinctsFor(col);
			}
		}
	});

})();