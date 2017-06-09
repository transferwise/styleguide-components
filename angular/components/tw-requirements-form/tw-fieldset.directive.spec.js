'use strict';

describe('Directive: TwFieldset', function() {
	var $compile,
		$rootScope,
		$scope,
		directiveElement;

	beforeEach(module('tw.form-components'));

	beforeEach(inject(function($injector) {
		$rootScope = $injector.get('$rootScope');
		$compile = $injector.get('$compile');
		$scope = $rootScope.$new();
	}));

	describe('validation', function() {
		beforeEach(function() {
			$scope.model = {
			  type: 'sort_code',
			  sortCode: '101010'
			};
			$scope.fields = getRequirement()[0].fields;
			$scope.isValid = null;
			$scope.errorMessages = {
				sortCode: "Sort code not found"
			};
			directiveElement = getCompiledDirectiveElement();
		});
		it('should show supplied error message on the correct field', function() {
			var errorBlock = directiveElement.find('.tw-form-group-sortCode .error-provided');
			expect(errorBlock.text().trim()).toBe($scope.errorMessages.sortCode);
		});
		it('should remove supplied error message from the correct field onChange event', function() {
            var input = directiveElement.find('input');
            input.val('1010102').triggerHandler('input');

			var errorBlock = directiveElement.find('.tw-form-group-sortCode .error-provided');
			expect(errorBlock.text().trim()).not.toBeTruthy();
		});
	});

	function getCompiledDirectiveElement() {
		var template = " \
		  <tw-fieldset \
			model='model' \
			fields='fields' \
			validation-messages='validationMessages' \
			error-messages='errorMessages' \
			is-valid='isValid'> \
		  </tw-fieldset>";
		var compiledElement = $compile(template)($scope);

		$scope.$digest();
		return compiledElement;
	}


	function getRequirement() {
		return [
		  {
			"type": "sort_code",
			"label": "Use sort code",
			"fields": [
			  {
				"name": "UK Sort code",
				"group": [
				  {
					"key": "sortCode",
					"type": "text",
					"refreshRequirementsOnChange": false,
					"required": true,
					"displayFormat": "**-**-**",
					"example": "40-30-20",
					"minLength": 6,
					"maxLength": 8,
					"validationRegexp": null,
					"validationAsync": {
					  "url": "https://api.transferwise.com/v1/validators/sort-code",
					  "params": [
						{
						  "key": "sortCode",
						  "parameterName": "sortCode",
						  "required": true
						}
					  ]
					},
					"valuesAllowed": null
				  }
				]
			  }
			]
		  }
	   ];
	}
});
