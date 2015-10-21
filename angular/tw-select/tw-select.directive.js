(function(angular) {
	'use strict';

	angular
		.module('tw.styleguide-components')
		.directive('select', TwSelect);

	TwSelect.$inject = ['$parse', '$timeout'];

	function TwSelect($parse, $timeout) {
		return {
			restrict: 'E',
			link: function(scope, element, attrs, ctrl) {
				/*
				function refresh(newVal) {
					if (!$().selectpicker) {
						return;
					}
					scope.$applyAsync(function () {
						//console.log("applyAsync refresh");
						if (attrs.ngOptions && /track by/.test(attrs.ngOptions)) {
							element.val(newVal);
						}
						//console.log("parse");
						//$(element).selectpicker($parse(attrs.selectpicker)());
						$(element).selectpicker('refresh');
					});
				}

				$timeout(function () {
					if (!$().selectpicker) {
						return;
					}
					$(element).selectpicker($parse(attrs.selectpicker)());
					$(element).selectpicker('refresh');

					// Add focus class to form-group based on button
					$(element).next().find('.btn').focus(function() {
						$(this).parents('.form-group').addClass('focus');
					}).blur(function() {
						$(this).parents('.form-group').removeClass('focus');
					});
				});

				if (attrs.ngModel) {
					scope.$watch(attrs.ngModel, refresh, true);
				}

				if (attrs.ngDisabled) {
					scope.$watch(attrs.ngDisabled, refresh, true);
				}

				var scopeCollection = $parse(attrs.ngOption);

				//scope.$watch(scopeCollection, function(newVal) {
				//	console.log("ngOptions changed");
				//	console.log($(element).children());
				//	$(element).selectpicker('render');
				//});

				scope.$on('$destroy', function () {
					$timeout(function () {
						if (!$().selectpicker) {
							return;
						}
						$(element).selectpicker('destroy');
					});
				});
				*/
			}
		};
	}
})(window.angular);
