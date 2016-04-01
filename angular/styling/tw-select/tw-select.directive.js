(function(angular) {
	'use strict';

	angular
		.module('tw.form-components')
		.directive('twSelect', TwSelectDirective);

	function TwSelectDirective() {
		return {
			require: 'ngModel',
			bindToController: true,
			controller: 'TwSelectController',
			controllerAs: 'vm',
			replace: false,
			restrict: 'EA',
			scope: {
				ngModel: '=',
				ngRequired: '=',
				ngDisabled: '=',
				ngChange: '&',
				twOptions: '=',
				name: "@",
				disabled: '@',
				required: '@',
				placeholder: '@'
			},
			template: "<div class='btn-group btn-block'> \
					<button type='button' class='btn btn-input dropdown-toggle' \
						data-toggle='dropdown' aria-expanded='false' \
						ng-disabled='vm.ngDisabled' \
						tw-focusable> \
						<span class='form-control-placeholder' ng-if='!vm.selectedText'>{{vm.placeholder}}</span> \
						<span ng-if='vm.selectedText'>{{vm.selectedText}}</span> <span class='caret'></span> \
					</button> \
					<ul class='dropdown-menu' role='menu'> \
						<li ng-repeat='option in vm.twOptions' \
							ng-class='{active: vm.ngModel === option.value}'> \
							<a href='' ng-click='vm.clickOption(option)'>{{option.label}}</a> \
						</li> \
					</ul> \
					<select class='hidden' \
						ng-options='option.value as option.label for option in vm.twOptions' \
						ng-model='vm.ngModel'> \
					</select> \
					<input type='hidden' name='{{vm.name}}' value='{{vm.ngModel}}' /> \
				</div>"
		};
	}

	angular
		.module('tw.form-components')
		.controller('TwSelectController', TwSelectController);

	TwSelectController.$inject = ['$scope', '$element'];

	function TwSelectController($scope, $element) {
		var vm = this,
			formGroup;

		vm.clickOption = clickOption;
		vm.unset = unset;

		function init() {
			formGroup = $element.closest('.form-group');

			$scope.$watch('vm.ngModel', modelChange);

			modelChange(vm.ngModel);

			$element.find(".btn").on("blur", function() {
				checkValid($element, formGroup);
			});
			$element.find(".btn").on("keypress", function(event) {
				console.log(event.key);
				// Select first option beginning with this key code
			});
		}

		function modelChange(newVal, oldVal) {
			if (newVal === oldVal) {
				return;
			}

			var option = findOptionFromValue(newVal);
			if (option) {
				vm.selectedText = option.label;
			} else {
				vm.selectedText = null;
			}

			if (vm.ngChange) {
				console.log("change");
				vm.ngChange();
			} else {
				console.log("no chnage");
			}

			checkValid($element, formGroup);
		}

		function findOptionFromValue(value) {
			return vm.twOptions.find(function(option) {
				return option.value === value;
			});
		}

		function clickOption(option) {
			vm.ngModel = option.value;
		}

		function unset() {
			vm.ngModel = null;
		}

		function checkValid(select, formGroup) {
			setTimeout(function() {
				if (select.hasClass("ng-invalid")) {
					formGroup.addClass("has-error");
				} else {
					formGroup.removeClass("has-error");
				}
			});
		}

		init();
	}

})(window.angular);
