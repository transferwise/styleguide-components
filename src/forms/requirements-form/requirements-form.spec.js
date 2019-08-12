'use strict';

describe('RequirementsForm', function() {
  var $compile,
    $rootScope,
    $scope,
    $timeout,
    component,
    Fieldset,
    Tabs,
    RequirementsService;

  beforeEach(function() {
    module('tw.styleguide.forms');
    module('tw.styleguide.navigation');
    module('tw.styleguide.services');

    Fieldset = getMockComponent('twFieldset');
    Tabs = getMockComponent('twTabs');

    angular.mock.module('tw.styleguide.forms.fieldset', Fieldset);
    angular.mock.module('tw.styleguide.navigation.tabs', Tabs);

    inject(function($injector) {
      $rootScope = $injector.get('$rootScope');
      $compile = $injector.get('$compile');
      $timeout = $injector.get('$timeout');
      RequirementsService = $injector.get('TwRequirementsService');
    });

    $scope = $rootScope.$new();

    spyOn(RequirementsService, 'prepRequirements').and.callFake(function(requirements) {
      return requirements;
    });

    $scope.model = getSingleRequirementsModel();
    $scope.requirements = getSingleRequirement();
    $scope.locale = 'en_GB';
    $scope.validationMessages = { sortCode: 'validation' };
    $scope.errorMessages = { accountNumber: 'error' };

    $scope.onRefreshRequirements = jasmine.createSpy('onRefreshRequirements');
    $scope.onModelChange = jasmine.createSpy('onModelChange');

    component = getComponent($scope);
  });

  describe('when a single set of requirements is supplied', function() {
    var requirements;
    beforeEach(function() {
      requirements = getSingleRequirement();
    });
    it('should render the description', function() {
      expect(component.querySelector('p').innerText).toContain(requirements[0].description);
    });
    it('should render a single fieldset', function() {
      var fieldsets = component.querySelectorAll('tw-fieldset');
      expect(fieldsets.length).toBe(1);
    });
    it('should not render tabs', function() {
      expect(component.querySelector('tw-tabs')).toBeFalsy();
    });

    it('should use the RequirementsService to prepare the requirements', function() {
      expect(RequirementsService.prepRequirements).toHaveBeenCalledWith(requirements);
    });

    it('should pass the properties to the fieldset', function() {
      expect(Fieldset.bindings.initialFields).toEqual(requirements[0].properties);
    });
    it('should pass the model to the fieldset', function() {
      expect(Fieldset.bindings.model).toEqual(getSingleRequirementsModel());
    });
    it('should pass the locale to the fieldset', function() {
      expect(Fieldset.bindings.locale).toEqual('en_GB');
    });
    it('should pass the validation messages to the fieldset', function() {
      expect(Fieldset.bindings.validationMessages).toEqual($scope.validationMessages);
    });
    it('should pass the error messages to the fieldset', function() {
      expect(Fieldset.bindings.errorMessages).toEqual($scope.errorMessages);
    });
  });

  describe('when multiple requirements are supplied', function() {
    var requirements = getMultipleRequirements();

    beforeEach(function() {
      $scope.model = getMultipleRequirementsModel();
      $scope.requirements = getMultipleRequirements();
      $scope.$apply();
    });

    it('should render the description of the first set', function() {
      expect(component.querySelector('p').innerText).toContain(requirements[0].description);
    });
    it('should render a single fieldset', function() {
      var fieldsets = component.querySelectorAll('tw-fieldset');
      expect(fieldsets.length).toBe(1);
    });
    it('should render the tabs', function() {
      expect(component.querySelector('tw-tabs')).toBeTruthy();
    });

    it('should pass the requirement titles to the tabs', function() {
      var titles = requirements.map(function(requirement) { return requirement.title });
      expect(Tabs.bindings.tabs).toEqual(titles);
    });

    describe('when the active tab is changed', function() {
      beforeEach(function() {
        Tabs.bindings.onChange({index: 1});
      })

      it('should only retain model properties shared by both requirements', function() {
        // sort_code is retained as it's a shared prop.  twField will chnage
        // the value when it finds there is only one valid enum for this prop.
        // In our test twField is mocked so this change doesn't happen.
        expect($scope.model).toEqual({
          type: 'sort_code',
          shared: 'should stay on tab change'
        });
      });
    });
  });

  describe('when the fieldset triggers onRefreshRequirements', function() {
    beforeEach(function() {
      Fieldset.bindings.onRefreshRequirements();
    });
    it('should trigger form onRefreshRequirements', function() {
      expect($scope.onRefreshRequirements).toHaveBeenCalled();
    });
  });

  describe('when the fieldset triggers onModelChange', function() {
    beforeEach(function() {
      Fieldset.bindings.onModelChange({a:1});
    });
    it('should trigger form onModelChange', function() {
      expect($scope.onModelChange).toHaveBeenCalled();
    });
  });


  describe('when the fieldset is valid', function() {
    beforeEach(function() {
      Fieldset.bindings.isValid = true;
      $scope.$apply();
    });

    it('should set isValid true', function() {
      expect($scope.isValid).toBe(true);
    });
  });

  describe('when the model is invalid', function() {
    beforeEach(function() {
      Fieldset.bindings.isValid = false;
      $scope.$apply();
    });

    it('should set isValid false', function() {
      expect($scope.isValid).toBe(false);
    });
  });

  function getComponent($scope) {
    var template = " \
      <tw-requirements-form \
        model='model' \
        requirements='requirements' \
        on-model-change='onModelChange()' \
        on-refresh-requirements='onRefreshRequirements()' \
        validation-messages='validationMessages' \
        error-messages='errorMessages' \
        is-valid='isValid' \
        locale='{{ locale }}'> \
      </tw-requirements-form>";
    var compiledElement = $compile(template)($scope);

    $scope.$digest();
    return compiledElement[0];
  }

  function getSingleRequirementsModel() {
    return {
      type: "sort_code",
      sortCode: "123456"
    };
  }

  function getMultipleRequirementsModel() {
    return {
      type: "sort_code",
      sortCode: "123456",
      shared: 'should stay on tab change'
    }
  }

  function getSingleRequirement() {
    return [getMultipleRequirements()[0]];
  }

  function getMultipleRequirements() {
    return [
      {
        type: "object",
        title: "Sort code",
        description: "Description",
        properties: {
          type: {
            type: "string",
            enum: ["sort_code"],
            required: true
          },
          sortCode: {
            title: "UK Sort code",
            type: "string",
            required: true,
            displayFormat: "**-**-**",
            placeholder: "40-30-20",
            minLength: 6,
            maxLength: 8
          },
          shared: {
            title: "Shared field",
            type: "string"
          }
        }
      },
      {
        type: "object",
        title: 'IBAN',
        decsription: "IBAN description",
        properties: {
          type: {
            type: 'string',
            enum: ['iban_With_unDerscOres'],
            required: true,
            hidden: true
          },
          IBAN: {
            title: "IBAN",
            type: "text",
            required: true,
            displayFormat: "**** **** **** **** **** **** **** ****",
            placeholder: "GB89370400440532013000",
            minLength: 2
          },
          shared: {
            title: "Shared field",
            type: "string"
          }
        }
      }
    ];
  }
});
