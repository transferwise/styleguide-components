describe('Directive: TwDynamicFormControlDirective', function() {
	var $compile,
		$rootScope,
		$scope,
		$timeout,
		directiveElem,
		formGroup;

	beforeEach(function() {
		module('tw.form-components');
	});

	beforeEach(inject(function($injector) {
		$rootScope = $injector.get('$rootScope');
		$scope = $rootScope.$new();
		$compile = $injector.get('$compile');
		$timeout = $injector.get('$timeout');
	}));

	describe('type: text', function() {
		beforeEach(function() {
			directiveElem = compileTemplate(
				"<tw-dynamic-form-control type='text'></tw-dynamic-form-control>"
			);
		});

		it('should render a text input', function() {
			var input = directiveElem.find('input');
			expect(input.length).toBe(1);
			expect(input.attr("type")).toBe("text");
		});
	});

	describe('type: number', function() {
		beforeEach(function() {
			directiveElem = compileTemplate(
				"<tw-dynamic-form-control type='number'></tw-dynamic-form-control>"
			);
		});

		it('should render a number input', function() {
			var input = directiveElem.find('input');
			expect(input.length).toBe(1);
			expect(input.attr("type")).toBe("number");
		});
	});

	describe('type: number - validation', function() {
		beforeEach(function() {
			formGroup = compileTemplate(
				"<div class='form-group'> \
					<label class='control-label'></label> \
					<tw-dynamic-form-control type='number' ng-min='2' ng-max='5' required></tw-dynamic-form-control> \
				</div>"
			);
		});

		it('should add class ng-invalid when value is below min', function() {
			var input = formGroup.find('input');
			directiveElem = formGroup.find('tw-dynamic-form-control');

			/*
			input.val('1');
			$(input).trigger('input');
			$(input).trigger('change');
			$scope.$apply();
			*
			angular
				.element(input)
				.val("1")
				.triggerHandler('input');

			expect(directiveElem.hasClass("ng-invalid")).toBe(true);
			expect(directiveElem.hasClass("ng-invalid-min")).toBe(true);
			/**/
		});
	});

	describe('type: select', function() {
		beforeEach(function() {
			directiveElem = compileTemplate(
				"<tw-dynamic-form-control type='select'></tw-dynamic-form-control>"
			);
		});

		it('should render a select', function() {
			var input = directiveElem.find('select');
			expect(input.length).toBe(1);
		});
	});

	describe('type: checkbox', function() {
		beforeEach(function() {
			directiveElem = compileTemplate(
				"<tw-dynamic-form-control type='checkbox'></tw-dynamic-form-control>"
			);
		});

		it('should render a checkbox input', function() {
			var input = directiveElem.find('input');
			expect(input.length).toBe(1);
			expect(input.attr("type")).toBe("checkbox");
		});
	});

	describe('type: radio', function() {
		beforeEach(function() {
			$scope.options = [
				{value: 1, label: 'One'}
			];
			directiveElem = compileTemplate(
				"<tw-dynamic-form-control type='radio' options='options'></tw-dynamic-form-control>"
			);
		});

		it('should render a radio input', function() {
			var input = directiveElem.find('input');
			expect(input.length).toBe(1);
		});
		it('should use the options correctly for the input value', function() {
			var input = directiveElem.find('input');
			expect(input.attr('value')).toBe('1');
		});
		it('should use the options correctly for the label', function() {
			var label = directiveElem.find('label');
			expect(label.text()).toContain('One');
		});
	});

	function compileTemplate(template) {
		return compileElement(angular.element(template));
	}

	function compileElement(element) {
		var compiledElement = $compile(element)($scope);
		$scope.$digest();
		return compiledElement;
	}
});
