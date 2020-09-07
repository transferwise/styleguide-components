'use strict';

describe('Fieldset', function() {
  var $compile,
      $rootScope,
      $scope,
      element,
      $timeout;

  beforeEach(function() {
    angular.mock.module('tw.styleguide.forms.fieldset');

    angular.mock.inject(function($injector) {
      $rootScope = $injector.get('$rootScope');
      $compile = $injector.get('$compile');
      $timeout = $injector.get('$timeout');
    });

    $scope = $rootScope.$new();
    $scope.onRefreshRequirements = function() {};
    jest.spyOn($scope, 'onRefreshRequirements').mockImplementation(() => {});

    $scope.onModelChange = function() {};
    jest.spyOn($scope, 'onModelChange').mockImplementation(() => {});
  });

  describe('when given an array of fields', function() {
    beforeEach(function() {
      $scope.fields = getFields();
      element = getCompiledDirectiveElement();
    });
    it('should show the correct number of fields', function() {
      expect(element.querySelectorAll('tw-field').length).toBe(2);
    });
  });

  describe('when rendering checkbox group', () => {
    beforeEach(() => {
      const checkboxGroup = {
        title: 'Checkbox Group',
        type: 'array',
        control: 'checkbox-group',
        width: 'md',
        items: {
          enum: [1, 2],
          values: [{ value: 1, label: 'One' }, { value: 2, label: 'Two' }]
        }
      };
      $scope.fields = { checkboxGroup };
    });

    it('should render preselected value', () => {
      $scope.model = {
        checkboxGroup: '[2]'
      };
      element = getCompiledDirectiveElement();
      const [option1, option2] = element.querySelectorAll('.checkbox label');
      expect(option1.textContent.trim()).toBe('One');
      expect(option2.textContent.trim()).toBe('Two');
      expect(option1.querySelector('button').classList.contains('checked')).toBe(false)
      expect(option2.querySelector('button').classList.contains('checked')).toBe(true)
    });

    it('should return string as a model', () => {
      $scope.model = {
        checkboxGroup: '[2]'
      };
      element = getCompiledDirectiveElement();
      const button = element.querySelector('.checkbox label button');
      button.dispatchEvent(new Event('click'));
      $timeout.flush();
      expect($scope.model).toEqual({
        checkboxGroup: '[1,2]'
      });
    });

    it('should render legacy data structure properly', () => {
      $scope.fields = {
        checkboxGroup: {
          title: 'Checkbox Group',
          type: "SELECT",
          control: 'checkbox-group',
          width: 'md',
          selectType: "CHECKBOX",
          valuesAllowed: [{ key: 1, name: 'One' }, { key: 2, name: 'Two' }]
        }
      };
      $scope.model = {
        checkboxGroup: '[2]'
      };
      element = getCompiledDirectiveElement();
      const [option1, option2] = element.querySelectorAll('.checkbox label');
      expect(option1.textContent.trim()).toBe('One');
      expect(option2.textContent.trim()).toBe('Two');
      expect(option1.querySelector('button').classList.contains('checked')).toBe(false)
      expect(option2.querySelector('button').classList.contains('checked')).toBe(true)
    });
  });

  describe('when some fields are required', function() {
    var fields;
    beforeEach(function() {
      $scope.fields = getFields();
      $scope.requiredFields = ['sortCode'];
      element = getCompiledDirectiveElement();
      fields = element.querySelectorAll('tw-field');
    });

    it('should pass required to the field that were required', function() {
      var sortCodeField = angular.element(fields[0]);
      expect(sortCodeField.controller('twField').required).toBe(true);
    });
    it('should not pass required to the fields that were not required', function() {
      var ibanField = angular.element(fields[1]);
      expect(ibanField.controller('twField').required).toBe(false);
    });
  });

  describe('when given custom error messages', function() {
    beforeEach(function() {
      $scope.model = {
        type: 'sort_code',
        sortCode: '101010'
      };
      $scope.fields = getFields();
      $scope.errorMessages = {
        sortCode: "Sort code not found"
      };
      element = getCompiledDirectiveElement();
    });

    it('should show an error state only on the correct field', function() {
      var errorFields = element.querySelectorAll('.has-error');
      var errorField = element.querySelector('.tw-field-sortCode ');
      expect(errorFields.length).toBe(1);
      expect(errorField.classList.contains('has-error')).toBe(true);
    });

    it('should show the supplied error message', function() {
      var errorBlock = element.querySelector('.tw-field-sortCode .error-provided');
      expect(errorBlock.textContent.trim()).toBe($scope.errorMessages.sortCode);
    });
  });

  describe('when only some custom validation messages are supplied', function() {
    beforeEach(function() {
      $scope.fields = getFields();
      element = getCompiledDirectiveElement();
    });
    it('should fallback to default validation messages for remaining messages', function() {
      var fields = element.querySelectorAll('tw-field');
      var sortCodeField = angular.element(fields[0]);

      expect(sortCodeField.controller('twField').validationStrings.required).toBe('sortCode required');
      expect(sortCodeField.controller('twField').validationStrings.pattern).toBe('Incorrect format');
      expect(sortCodeField.controller('twField').validationStrings.minimum).toBe('The value is too low');
      expect(sortCodeField.controller('twField').validationStrings.maximum).toBe('The value is too high');
      expect(sortCodeField.controller('twField').validationStrings.minLength).toBe('The value is too short');
      expect(sortCodeField.controller('twField').validationStrings.maxLength).toBe('The value is too long');
    });
  });

  describe('when a field has refreshRequirementsOnChange: true', function() {
    beforeEach(function() {
      $scope.fields = getFields();
      element = getCompiledDirectiveElement();
      var formControl = element.querySelector('.form-control');
      formControl.value = 'new';
      formControl.dispatchEvent(new Event('input'));
      $timeout.flush();
    });
    it('should trigger the onRefresh handler', function() {
      expect($scope.onRefreshRequirements).toHaveBeenCalled();
    });
    it('should pass the handler the latest model', function() {
      expect($scope.onRefreshRequirements).toHaveBeenCalledWith({ sortCode: 'new' });
    });
  });

  describe('when given a field with hidden: true', function() {
    beforeEach(function() {
      $scope.fields = getRequirementWithHiddenAndMdSmFields();
      element = getCompiledDirectiveElement();
    });

    it('should hide the field', function() {
      var hiddenFields =
        element.querySelectorAll('.row.row-equal-height .col-xs-12.ng-hide');
      expect(hiddenFields.length).toBe(1);
    });
  });

  describe('when given fields with custom widths', function() {
    beforeEach(function() {
      $scope.fields = getRequirementWithHiddenAndMdSmFields();
      element = getCompiledDirectiveElement();
    });

    it('should have one col-sm-4 fieldset', function() {
      var smFields =
        element.querySelectorAll('.row.row-equal-height .col-xs-12.col-sm-4');
      expect(smFields.length).toBe(1);
    });

    it('should have one col-sm-6 fieldset', function() {
      var mdFields =
        element.querySelectorAll('.row.row-equal-height .col-xs-12.col-sm-6');
      expect(mdFields.length).toBe(1);
    });
  });

  describe('when given a field representing a nested object', function() {
    beforeEach(function() {
      $scope.fields = [nestedObjectField];
      $scope.errorMessages = {
        nested: {
          textInput: 'Nested error'
        }
      }
      element = getCompiledDirectiveElement();
    });

    it('should contain a nested fieldset', function() {
      expect(element.querySelector('tw-fieldset')).toBeTruthy();
    });
    it('should show the nested fields', function() {
      expect(element.querySelector('input[name=textInput]')).toBeTruthy();
    });
    it('should render nested error messages', function() {
      var formGroup = element.querySelector('.tw-field-textInput');
      var errorMessages = formGroup.querySelector('.alert-danger');
      expect(formGroup.classList).toContain('has-error');
      expect(errorMessages.textContent).toContain('Nested error');
    });

    describe('and text is entered', function() {
      beforeEach(function() {
        var nestedInput = element.querySelector('input[name=textInput]');
        nestedInput.value = 'something';
        nestedInput.dispatchEvent(new Event('input'));
        $timeout.flush();
      });
      it('should create a nested model', function() {
        expect($scope.model).toEqual({
          nested: {
            textInput: 'something'
          }
        });
      });
    });
  });

  describe('when fields in a legacy format are supplied', function() {
    var fields;

    beforeEach(function() {
      $scope.fields = getLegacyFields();
      element = getCompiledDirectiveElement();
      fields = element.querySelectorAll('tw-field');
    });

    it('should show the correct number of fields', function() {
      expect(fields.length).toBe(2);
    });

    it('should pass required to the correct fields', function() {
      var sortCodeField = angular.element(fields[0]);
      var ibanField = angular.element(fields[1]);

      expect(sortCodeField.controller('twField').required).toBe(true);
      expect(ibanField.controller('twField').required).toBe(false);
    });
  });

  describe('when the fields change after initialisation', function() {
    beforeEach(function() {
      $scope.model = {
        sortCode: '123456',
        iban: 'ABCD1234EFGH'
      };

      const fields = getFields();

      $scope.fields = fields;
      element = getCompiledDirectiveElement();

      $scope.fields = { sortCode: fields.sortCode };
      $scope.$apply();
    })
    it('should alter the model to remove invalid values', function() {
      expect($scope.model).toEqual({ sortCode: '123456' });
    });
    it('should broadcast a new version of the model with invalid values removed', function() {
      expect($scope.onModelChange).toHaveBeenCalledWith({ sortCode: '123456' });
    });
  });

  function getCompiledDirectiveElement() {
    var template = " \
      <tw-fieldset \
        model='model' \
        fields='fields' \
        required-fields='requiredFields' \
        validation-messages='validationMessages' \
        error-messages='errorMessages' \
        warning-messages='warningMessages' \
        on-model-change='onModelChange(model)' \
        on-refresh-requirements='onRefreshRequirements(model)' \
        is-valid='isValid'> \
      </tw-fieldset>";
    var compiledElement = $compile(template)($scope);

    $scope.$digest();
    return compiledElement[0];
  }

  function getFields() {
    return {
      "sortCode": {
        "title": "UK Sort code",
        "type": "string",
        "refreshRequirementsOnChange": true,
        "displayFormat": "**-**-**",
        "minLength": 6,
        "maxLength": 8,
        "validationMessages": {
          "required": "sortCode required"
        }
      },
      "iban": {
        "title": "IBAN",
        "type": "string",
        "refreshRequirementsOnChange": true,
        "minLength": 6,
        "maxLength": 8,
      }
    };
  }

  function getLegacyFields() {
    return [
      {
        "name": "UK Sort code",
        "key": "sortCode",
        "type": "string",
        "refreshRequirementsOnChange": true,
        "required": true,
        "displayFormat": "**-**-**",
        "minLength": 6,
        "maxLength": 8,
        "validationMessages": {
          "required": "sortCode required"
        }
      },
      {
        "name": "IBAN",
        "key": "iban",
        "type": "string",
        "refreshRequirementsOnChange": true,
        "displayFormat": "**-**-**",
        "minLength": 6,
        "maxLength": 8,
      }
    ]
  }

  function getRequirementWithHiddenAndMdSmFields() {
    return [hiddenField, smField, mdField];
  }

  var hiddenField = {
    "name": "HIDDEN",
    "hidden": true,
    "key": "iban",
    "type": "hidden"
  };

  var smField = {
    "name": "COL-SM-4",
    "width": "sm",
    "key": "colsm4",
    "type": "text"
  };

  var mdField = {
    "name": "COL-SM-6",
    "width": "md",
    "key": "colsm6",
    "type": "text"
  }

  var nestedObjectField = {
    type: "object",
    key: "nested",
    properties: {
      textInput: {
        type: "string",
        title: "Text input"
      }
    }
  };

});
