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
		var input, ngModelController;
		beforeEach(function() {
			$scope.model = null;
			directiveElem = compileTemplate(
				"<tw-dynamic-form-control type='text' \
					ng-model='model'> \
				</tw-dynamic-form-control>"
			);
			input = directiveElem.find('input');
			ngModelController = directiveElem.controller('ngModel');
		});

		it('should render a text input', function() {
			expect(input.length).toBe(1);
			expect(input.attr("type")).toBe("text");
		});

		it('should set $dirty when changed', function() {
			input.val('example').trigger('input');
			expect(ngModelController.$dirty).toBe(true);
			expect(directiveElem.hasClass("ng-dirty")).toBe(true);
		});

		it('should set $touched when blurred', function() {
			input.focus().blur();
			expect(ngModelController.$touched).toBe(true);
			expect(directiveElem.hasClass("ng-touched")).toBe(true);
		});
	});

	describe('type: text - validation', function() {
		var input, directiveElem, ngModelController;
		beforeEach(function() {
			$scope.model = '';
			$scope.pattern = '[a-z]+';
			formGroup = compileTemplate(
				"<div class='form-group'> \
					<label class='control-label'></label> \
					<tw-dynamic-form-control type='text' \
						ng-model='model' \
						ng-minlength='4' \
						ng-maxlength='6' \
						ng-pattern='pattern' \
						ng-required='true'> \
					</tw-dynamic-form-control> \
				</div>"
			);
			input = formGroup.find('input');
			directiveElem = formGroup.find('tw-dynamic-form-control');
			ngModelController = directiveElem.controller('ngModel');
		});

		it('should set ngModel.$invalid when required value not set', function() {
			input.val('').triggerHandler('input');
			expect(ngModelController.$invalid).toBe(true);
			expect(directiveElem.hasClass("ng-invalid")).toBe(true);
			expect(directiveElem.hasClass("ng-invalid-required")).toBe(true);
		});
		it('should set ngModel.$valid when required value set', function() {
			input.val('abcd').triggerHandler('input');
			expect(directiveElem.hasClass("ng-valid-required")).toBe(true);
		});
		it('should set ngModel.$invalid when value is shorter than ngMinlength', function() {
			input.val('abc').triggerHandler('input');
			expect(ngModelController.$invalid).toBe(true);
			expect(directiveElem.hasClass("ng-invalid")).toBe(true);
			expect(directiveElem.hasClass("ng-invalid-minlength")).toBe(true);
		});
		it('should set ngModel.$valid when value is longer than ngMinlength', function() {
			input.val('abcd').triggerHandler('input');
			expect(directiveElem.hasClass("ng-valid-minlength")).toBe(true);
		});
		it('should set ngModel.$invalid when value is longer than ngMaxlength', function() {
			input.val('abcdefg').triggerHandler('input');
			expect(ngModelController.$invalid).toBe(true);
			expect(directiveElem.hasClass("ng-invalid")).toBe(true);
			expect(directiveElem.hasClass("ng-invalid-maxlength")).toBe(true);
		});
		it('should set ngModel.$valid when value is shorter than ngMaxlength', function() {
			input.val('abcd').triggerHandler('input');
			expect(directiveElem.hasClass("ng-valid-maxlength")).toBe(true);
		});

		it('should set ngModel.$invalid when value does not match ngPattern', function() {
			input.val('1').triggerHandler('input');
			expect(ngModelController.$invalid).toBe(true);
			expect(directiveElem.hasClass("ng-invalid")).toBe(true);
			expect(directiveElem.hasClass("ng-invalid-pattern")).toBe(true);
		});
		it('should set ngModel.$valid when value does match ngPattern', function() {
			input.val('abcd').triggerHandler('input');
			expect(directiveElem.hasClass("ng-valid-pattern")).toBe(true);
		});
	});

	describe('type: password', function() {
		var input, ngModelController;
		beforeEach(function() {
			$scope.model = null;
			directiveElem = compileTemplate(
				"<tw-dynamic-form-control type='password' \
					ng-model='model'> \
				</tw-dynamic-form-control>"
			);
			input = directiveElem.find('input');
			ngModelController = directiveElem.controller('ngModel');
		});

		it('should render a password input', function() {
			expect(input.length).toBe(1);
			expect(input.attr("type")).toBe("password");
		});

		it('should set $dirty when changed', function() {
			input.val('example').trigger('input');
			expect(ngModelController.$dirty).toBe(true);
			expect(directiveElem.hasClass("ng-dirty")).toBe(true);
		});

		it('should set $touched when blurred', function() {
			input.focus().blur();
			expect(ngModelController.$touched).toBe(true);
			expect(directiveElem.hasClass("ng-touched")).toBe(true);
		});
	});

	describe('type: password - validation', function() {
		var input, directiveElem, ngModelController;
		beforeEach(function() {
			$scope.model = '';
			$scope.pattern = '[a-z]+';
			formGroup = compileTemplate(
				"<div class='form-group'> \
					<label class='control-label'></label> \
					<tw-dynamic-form-control type='password' \
						ng-model='model' \
						ng-minlength='4' \
						ng-maxlength='6' \
						ng-pattern='pattern' \
						ng-required='true'> \
					</tw-dynamic-form-control> \
				</div>"
			);
			input = formGroup.find('input');
			directiveElem = formGroup.find('tw-dynamic-form-control');
			ngModelController = directiveElem.controller('ngModel');
		});

		it('should set ngModel.$invalid when required value not set', function() {
			input.val('').triggerHandler('input');
			expect(ngModelController.$invalid).toBe(true);
			expect(directiveElem.hasClass("ng-invalid")).toBe(true);
			expect(directiveElem.hasClass("ng-invalid-required")).toBe(true);
		});
		it('should set ngModel.$valid when required value set', function() {
			input.val('abcd').triggerHandler('input');
			expect(directiveElem.hasClass("ng-valid-required")).toBe(true);
		});
		it('should set ngModel.$invalid when value is shorter than ngMinlength', function() {
			input.val('abc').triggerHandler('input');
			expect(ngModelController.$invalid).toBe(true);
			expect(directiveElem.hasClass("ng-invalid")).toBe(true);
			expect(directiveElem.hasClass("ng-invalid-minlength")).toBe(true);
		});
		it('should set ngModel.$valid when value is longer than ngMinlength', function() {
			input.val('abcd').triggerHandler('input');
			expect(directiveElem.hasClass("ng-valid-minlength")).toBe(true);
		});
		it('should set ngModel.$invalid when value is longer than ngMaxlength', function() {
			input.val('abcdefg').triggerHandler('input');
			expect(ngModelController.$invalid).toBe(true);
			expect(directiveElem.hasClass("ng-invalid")).toBe(true);
			expect(directiveElem.hasClass("ng-invalid-maxlength")).toBe(true);
		});
		it('should set ngModel.$valid when value is shorter than ngMaxlength', function() {
			input.val('abcd').triggerHandler('input');
			expect(directiveElem.hasClass("ng-valid-maxlength")).toBe(true);
		});

		it('should set ngModel.$invalid when value does not match ngPattern', function() {
			input.val('1').triggerHandler('input');
			expect(ngModelController.$invalid).toBe(true);
			expect(directiveElem.hasClass("ng-invalid")).toBe(true);
			expect(directiveElem.hasClass("ng-invalid-pattern")).toBe(true);
		});
		it('should set ngModel.$valid when value does match ngPattern', function() {
			input.val('abcd').triggerHandler('input');
			expect(directiveElem.hasClass("ng-valid-pattern")).toBe(true);
		});
	});

	describe('type: number', function() {
		var input, ngModelController;

		beforeEach(function() {
			$scope.model = null;
			directiveElem = compileTemplate(
				"<tw-dynamic-form-control type='number' \
					ng-model='model'> \
				</tw-dynamic-form-control>"
			);
			input = directiveElem.find('input');
			ngModelController = directiveElem.controller('ngModel');
		});

		it('should render a number input', function() {
			expect(input.length).toBe(1);
			expect(input.attr("type")).toBe("number");
		});

		it('should set $dirty when changed', function() {
			input.val(2).trigger('input');
			expect(ngModelController.$dirty).toBe(true);
			expect(directiveElem.hasClass("ng-dirty")).toBe(true);
		});

		it('should set $touched when blurred', function() {
			input.focus().blur();
			expect(ngModelController.$touched).toBe(true);
			expect(directiveElem.hasClass("ng-touched")).toBe(true);
		});
	});

	describe('type: number - validation', function() {
		var input, directiveElem, ngModelController;
		beforeEach(function() {
			$scope.model = null;
			formGroup = compileTemplate(
				"<div class='form-group'> \
					<label class='control-label'></label> \
					<tw-dynamic-form-control type='number' \
						ng-model='model' \
						ng-min='2' \
						ng-max='5' \
						required> \
					</tw-dynamic-form-control> \
				</div>"
			);
			input = formGroup.find('input');
			directiveElem = formGroup.find('tw-dynamic-form-control');
			ngModelController = directiveElem.controller('ngModel');
		});

		it('should set ngModel.$invalid when required value not set', function() {
			expect(ngModelController.$invalid).toBe(true);
			expect(directiveElem.hasClass('ng-invalid')).toBe(true);
			expect(directiveElem.hasClass('ng-invalid-required')).toBe(true);
		});
		it('should set ngModel.$invalid when value is below ngMin', function() {
			input.val('1').triggerHandler('input');
			expect(ngModelController.$invalid).toBe(true);
			expect(directiveElem.hasClass('ng-invalid')).toBe(true);
			expect(directiveElem.hasClass('ng-invalid-min')).toBe(true);
		});
		it('should set ngModel.$invalid when value is above ngMax', function() {
			input.val('6').triggerHandler('input');

			expect(ngModelController.$invalid).toBe(true);
			expect(directiveElem.hasClass('ng-invalid')).toBe(true);
			expect(directiveElem.hasClass('ng-invalid-max')).toBe(true);
		});
	});

	describe('type: select', function() {
		var selectElem, directiveElem, ngModelController;
		beforeEach(function() {
			$scope.model = null;
			$scope.options = [{
				'value': '1',
				'label': 'one'
			},{
				'value': '2',
				'label': 'two'
			}];

			directiveElem = compileTemplate(
				"<tw-dynamic-form-control type='select' \
					ng-model='model' \
					options='options' \
					ng-required='true'> \
				</tw-dynamic-form-control>"
			);
			selectElem = directiveElem.find('tw-select');
			ngModelController = directiveElem.controller('ngModel');
		});

		it('should render a select', function() {
			expect(selectElem.length).toBe(1);
		});

		// Select presets if ngRequired and no ngModel supplied
		xit('should set ngModel.$invalid when required value not set', function() {
			expect(ngModelController.$invalid).toBe(true);
			expect(directiveElem.hasClass('ng-invalid')).toBe(true);
			expect(directiveElem.hasClass('ng-invalid-required')).toBe(true);
		});

		it('should set $dirty when changed', function() {
			var selectModelController = selectElem.controller('ngModel');
			selectModelController.$setViewValue('2');
			expect(ngModelController.$dirty).toBe(true);
			expect(directiveElem.hasClass("ng-dirty")).toBe(true);
		});

		it('should set $touched when blurred', function() {
			selectElem.trigger('blur');
			expect(ngModelController.$touched).toBe(true);
			expect(directiveElem.hasClass("ng-touched")).toBe(true);
		});
	});

	describe('type: checkbox', function() {
		var checkbox, ngModelController;
		beforeEach(function() {
			$scope.model = null;
			directiveElem = compileTemplate(
				"<tw-dynamic-form-control type='checkbox' \
					ng-model='model' \
					ng-required='true'> \
				</tw-dynamic-form-control>"
			);
			checkbox = directiveElem.find('tw-checkbox');
			ngModelController = directiveElem.controller('ngModel');
		});

		it('should render a checkbox input', function() {
			expect(checkbox.length).toBe(1);
		});

		it('should set $dirty when clicked', function() {
			checkbox.click();
			expect(ngModelController.$dirty).toBe(true);
			expect(directiveElem.hasClass("ng-dirty")).toBe(true);
		});

		it('should set $touched when blurred', function() {
			checkbox.focus().blur();
			expect(ngModelController.$touched).toBe(true);
			expect(directiveElem.hasClass("ng-touched")).toBe(true);
		});

		describe(' - validation', function() {
			it('should not set ngModel.$valid to undefined', function() {
				expect(ngModelController.$valid).not.toBeUndefined();
			});
			it('should set ngModel.$invalid when required value not set', function() {
				expect(ngModelController.$invalid).toBe(true);
				//expect(directiveElem.hasClass('ng-invalid')).toBe(true);
				expect(directiveElem.hasClass('ng-invalid-required')).toBe(true);
			});
		});
	});

	describe('type: radio', function() {
		var radio, directiveElem, ngModelController, template;
		beforeEach(function() {
			template = "<tw-dynamic-form-control type='radio' \
				options='options' \
				ng-model='model' \
				ng-required='required'> \
			</tw-dynamic-form-control>";

			$scope.model = null;
			$scope.options = [
				{value: 1, label: 'One'},
				{value: 2, label: 'Two'}
			];
			$scope.required = true;
			directiveElem = compileTemplate(template);
			ngModelController = directiveElem.controller('ngModel');
			radio = directiveElem.find('tw-radio');
		});

		it('should render two radio buttons', function() {
			expect(radio.length).toBe(2);
		});
		it('should set correct value when clicked', function() {
			$(radio[0]).find('button').trigger('click');
			expect($scope.model).toBe(1);
		});
		it('should use the options correctly for the label', function() {
			var label = directiveElem.find('label');
			expect(label.text()).toContain('One');
		});

		it('should set $dirty when changed ', function() {
			radio.click();
			expect(ngModelController.$dirty).toBe(true);
			expect(directiveElem.hasClass("ng-dirty")).toBe(true);
		});

		it('should set $touched when blurred', function() {
			radio.focus().blur();
			expect(ngModelController.$touched).toBe(true);
			expect(directiveElem.hasClass("ng-touched")).toBe(true);
		});

		describe(' - validation', function() {
			it('should set ngModel.$invalid when required', function() {
				$scope.required = true;
				directiveElem = compileTemplate(template);
				ngModelController = directiveElem.controller('ngModel');

				expect(ngModelController.$invalid).toBe(true);
				expect(directiveElem.hasClass('ng-invalid')).toBe(true);
				expect(directiveElem.hasClass('ng-invalid-required')).toBe(true);
			});
			it('should set ngModel.$valid when not required', function() {
				$scope.required = false;
				directiveElem = compileTemplate(template);
				ngModelController = directiveElem.controller('ngModel');

				expect(ngModelController.$valid).toBe(true);
				expect(directiveElem.hasClass('ng-valid')).toBe(true);
				expect(directiveElem.hasClass('ng-valid-required')).toBe(true);
			});
		});
	});

	describe('type: upload - validation', function() {
		var directiveElem, ngModelController;
		beforeEach(function() {
			$scope.model = null;
			formGroup = compileTemplate(
				"<div class='form-group'> \
					<label class='control-label'></label> \
					<tw-dynamic-form-control type='upload' \
						ng-model='model' \
						required> \
					</tw-dynamic-form-control> \
				</div>"
			);
			directiveElem = formGroup.find('tw-dynamic-form-control');
			ngModelController = directiveElem.controller('ngModel');
		});
		it('should render twUpload', function() {
			expect(directiveElem.find('tw-upload').length).toBe(1);
		});
	});

	describe('type: date - validation', function() {
		var input, directiveElem, ngModelController;
		beforeEach(function() {
			$scope.model = null;
			formGroup = compileTemplate(
				"<div class='form-group'> \
					<label class='control-label'></label> \
					<tw-dynamic-form-control type='date' \
						ng-model='model' \
						locale='en-GB' \
						ng-min='2016-04-01' \
						ng-max='2017-03-24' \
						required> \
					</tw-dynamic-form-control> \
				</div>"
			);
			directiveElem = formGroup.find('tw-dynamic-form-control');
			ngModelController = directiveElem.controller('ngModel');
		});

		it('should set ngModel.$invalid when required value not set', function() {
			expect(ngModelController.$invalid).toBe(true);
			expect(directiveElem.hasClass('ng-invalid')).toBe(true);
			expect(directiveElem.hasClass('ng-invalid-required')).toBe(true);
		});
		it('should set ngModel.$invalid when value is below ngMin', function() {
			ngModelController.date = new Date('2010-01-01');
			expect(ngModelController.$invalid).toBe(true);
			expect(directiveElem.hasClass('ng-invalid')).toBe(true);
			expect(directiveElem.hasClass('ng-invalid-min')).toBe(true);
			expect(directiveElem.hasClass('ng-invalid-max')).toBe(false);
		});
		it('should set ngModel.$invalid when value is above ngMax', function() {
			ngModelController.date = new Date('2020-01-01');
			expect(ngModelController.$invalid).toBe(true);
			expect(directiveElem.hasClass('ng-invalid')).toBe(true);
			expect(directiveElem.hasClass('ng-invalid-min')).toBe(false);
			expect(directiveElem.hasClass('ng-invalid-max')).toBe(true);
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
