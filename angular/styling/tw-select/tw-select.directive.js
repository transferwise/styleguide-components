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
				twInitial: "@",
				twOptions: '=',
				ngRequired: '=',
				ngDisabled: '=',
				name: "@",
				disabled: '@',
				required: '@'
			},
			template: "<div class='btn-group btn-block'> \
					<button type='button' class='btn btn-input dropdown-toggle' \
						data-toggle='dropdown' aria-expanded='false' \
						ng-disabled='vm.ngDisabled'> \
						{{vm.selectedText}} <span class='caret'></span> \
					</button> \
					<ul class='dropdown-menu' role='menu'> \
						<li ng-if='!vm.ngRequired'> \
							<a href='' ng-click='vm.unset()'>{{vm.twInitial}}</a> \
						</li> \
						<li ng-repeat='option in vm.twOptions'> \
							<a href='' ng-click='vm.clickOption(option)'>{{option.label}}</a> \
						</li> \
					</ul> \
					<select class='hidden' \
						ng-options='option.value as option.label for option in vm.twOptions' \
						ng-model='vm.ngModel' ng-transclude> \
					</select> \
					<input type='hidden' name='{{vm.name}}' value='{{vm.ngModel}}' /> \
				</div>"
			//,compile: TwSelectCompile
			//<option value='' ng-if='vm.twInitial'>{{vm.twInitial}}</option> \
		};
	}

	angular
		.module('tw.form-components')
		.controller('TwSelectController', TwSelectController);

	function TwSelectController() {
		var vm = this;

		vm.clickOption = clickOption;
		vm.unset = unset;

		function init() {
			vm.selectedText = vm.twInitial;
		}

		function clickOption(option) {
			vm.ngModel = option.value;
			vm.selectedText = option.label;
		}

		function unset() {
			vm.ngModel = null;
			vm.selectedText = vm.twInitial;
		}

		init();
	}
	/*

	function TwSelectCompile(tElm, tAttrs) {
		var watch;

		// Enable watching of the options dataset if in use
		if (tElm.is('select')) {
			repeatOption = tElm.find('option[ng-repeat], option[data-ng-repeat]');

			if (repeatOption.length) {
				repeatAttr = repeatOption.attr('ng-repeat') || repeatOption.attr('data-ng-repeat');
				watch = jQuery.trim(repeatAttr.split('|')[0]).split(' ').pop();
			}
		}

		return function (scope, elm, attrs, controller) {
			// Watch the options dataset for changes
			if (watch) {
				scope.$watch(watch, function (newVal, oldVal, scope) {
					if (!newVal) {
						return;
					}
					// Delayed so that the options have time to be rendered
					$timeout(function () {
						elm.select2('val', controller.$viewValue);
						// Refresh angular to remove the superfluous option
						elm.trigger('change');
					});
				});
			}
		};
	}
	*/

})(window.angular);
