'use strict';

describe('Fieldset', function() {
  var $compile,
      $rootScope,
      $scope,
      element;

  beforeEach(module('tw.styleguide-components'));

  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $compile = $injector.get('$compile');
    $scope = $rootScope.$new();
    $scope.onRefreshRequirements = function () {}
    spyOn($scope, 'onRefreshRequirements');
  }));

  describe('when given an array of fields', function() {
    beforeEach(function() {
      $scope.fields = getFields();
      element = getCompiledDirectiveElement();
    });
    it('should show the correct number of fields', function() {
      expect(element.querySelectorAll('tw-field').length).toBe(2);
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
      expect(errorBlock.innerText.trim()).toBe($scope.errorMessages.sortCode);
    });
  });

  describe('when a field has refreshRequirementsOnChange: true', function() {
    beforeEach(function() {
      $scope.fields = getFields();
      element = getCompiledDirectiveElement();
      var formControl = element.querySelector('.form-control');
      formControl.dispatchEvent(new Event('blur'));
    });

    it('should trigger the handler on field blur', function() {
      expect($scope.onRefreshRequirements).toHaveBeenCalled()
    });
  });

  describe('when given validation messages', function() {
    beforeEach(function() {
      $scope.fields = getFields();
      $scope.validationMessages = {
        required: 'default required'
      };
      element = getCompiledDirectiveElement();
    });

    it('should use them instead of the default messages', function() {
      var requiredErrorSortCode =
        element.querySelector('.tw-field-sortCode .error-messages .error-required');
      var requiredErrorIBAN =
        element.querySelector('.tw-field-iban .error-messages .error-required');

      expect(requiredErrorSortCode.innerText).toContain('sortCode required');
      expect(requiredErrorIBAN.innerText).toContain('default required');
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

  function getCompiledDirectiveElement() {
    var template = " \
      <tw-fieldset \
        model='model' \
        fields='fields' \
        validation-messages='validationMessages' \
        error-messages='errorMessages' \
        on-refresh-requirements='onRefreshRequirements()' \
        is-valid='isValid'> \
      </tw-fieldset>";
    var compiledElement = $compile(template)($scope);

    $scope.$digest();
    return compiledElement[0];
  }

  function getFieldsWithGroups() {
    return [
      {
        "name": "UK Sort code",
        "group": [
          {
            "key": "sortCode",
            "type": "text",
            "refreshRequirementsOnChange": true,
            "required": true,
            "displayFormat": "**-**-**",
            "minLength": 6,
            "maxLength": 8,
            "validationMessages": {
              "required": "sortCode required"
            }
          }
        ]
      },
      {
        "name": "IBAN",
        "group": [
          {
            "key": "iban",
            "type": "text",
            "refreshRequirementsOnChange": true,
            "required": true,
            "displayFormat": "**-**-**",
            "minLength": 6,
            "maxLength": 8
          }
        ]
      }
    ];
  }

  function getFields() {
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
        "required": true,
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

});
