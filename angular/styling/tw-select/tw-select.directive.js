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
						ng-click='vm.clickButton()' \
						ng-keypress='vm.keyPress($event)' \
						tw-focusable> \
						<i class='icon {{vm.selected.icon}}' ng-if='vm.selected && vm.selected.icon'> \
						</i><span ng-if='vm.selected'>{{vm.selected.label}}</span> \
						<span class='form-control-placeholder' ng-if='!vm.selected'>{{vm.placeholder}}</span> \
						<span class='caret'></span> \
					</button> \
					<ul class='dropdown-menu' role='menu'> \
						<li ng-repeat='option in vm.twOptions' \
							ng-class='{active: vm.ngModel === option.value}'> \
							<a href='' ng-click='vm.clickOption(option)' \
								ng-focus='vm.focusOption(option)' \
								ng-keypress='vm.keyPress($event)'> \
								<i class='icon {{option.icon}}' ng-if='option.icon'></i>{{option.label}}</a> \
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

	// <span class='form-control-placeholder' ng-if='!vm.selectedText'>{{vm.placeholder}}</span> \
	// <span ng-if='vm.selectedText'>{{vm.selectedText}}</span> <span class='caret'></span> \

	angular
		.module('tw.form-components')
		.controller('TwSelectController', TwSelectController);

	TwSelectController.$inject = ['$scope', '$element', '$timeout'];

	function TwSelectController($scope, $element, $timeout) {
		var vm = this,
			formGroup;

		vm.clickButton = clickButton;
		vm.clickOption = clickOption;
		vm.focusOption = focusOption;
		vm.keyPress = keyPress;
		vm.unset = unset;

		function init() {
			formGroup = $element.closest('.form-group');

			$scope.$watch('vm.ngModel', modelChange);
		}

		function getOptionByValue(options, value) {
			return options.find(function(option) {
				return option.value === value;
			});
		}

		function higlightFirstItemMatcingLetter(list, letter) {
			var letterLower = letter.toLowerCase(),
				currentVal = vm.ngModel,
				foundIndex, found, listElements;

			list.find(function(item, index) {
				if (item.label.substring(0,1).toLowerCase() === letterLower) {
					// Timeout forces changes ot be applied
					$timeout(function() {
						clickOption(item);
					});
					foundIndex = index;
					return true;
				}
			});

			listElements = $element.find("li");
			if (listElements[foundIndex]) {
				listElements.removeClass("active");
				$(listElements[foundIndex]).addClass("active").find("a").focus();
			}
		}

		function modelChange(newVal, oldVal) {
			//console.log("change: " + newVal + ", " + oldVal);
			if (newVal === oldVal) {
				return;
			}

			var option = findOptionFromValue(newVal);
			if (option) {
				vm.selectedText = option.label;
				vm.selected = option;
			} else {
				vm.selectedText = null;
				vm.selected = null;
			}

			// Manually trigger external change handler
			if (vm.ngChange) {
				vm.ngChange();
			}

			$element.find("li").removeClass("active");

			// TODO move this to separate validation???
			checkValid($element, formGroup);
		}

		function findOptionFromValue(value) {
			return vm.twOptions.find(function(option) {
				return option.value === value;
			});
		}

		function clickButton() {
			// TODO maybe this can be better achieved another way.
			// Once dropdown is open, focus on active item for keyboard support
			$timeout(function() {
				$element.find(".active a").focus();
			});
		}

		function clickOption(option) {
			vm.ngModel = option.value;
			// Reset focus onto the button for continued keyboard support
			$element.find(".btn").focus();
		}

		function focusOption(option) {
			vm.ngModel = option.value;
		}

		function keyPress(event) {
			higlightFirstItemMatcingLetter(vm.twOptions, event.key);
		}

		function unset() {
			vm.ngModel = null;
		}

		function checkValid(select, formGroup) {
			$timeout(function() {
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
