'use strict';

describe('Given a component for arrays of schemas', function() {
  var $scope,
    component,
    $compile,
    genericSchema;

  beforeEach(function() {
    angular.mock.module('tw.json-schema.array');

    genericSchema = getMockComponent('genericSchema');
    angular.mock.module('tw.json-schema.generic', genericSchema);

    angular.mock.inject(function($injector) {
      $compile = $injector.get('$compile');
      $scope = $injector.get('$rootScope').$new();
    });

    var template = ' \
      <array-schema \
        schema="schema" \
        model="model" \
        errors="errors" \
        locale="locale" \
        translations="translations" \
        on-change="onChange(model, schema)" \
      ></array-schema>';

    $scope.onChange = jest.fn();

    component = getComponent($compile, $scope, template);
  });

  describe('when no model is supplied', function() {
    beforeEach(function() {
      $scope.schema = {
        title: "Array of schemas",
        description: "Description of schema",
        type: "array",
        items: {
          foo: {
            type: "string"
          }
        }
      };
      $scope.model = [{
        foo: "bar"
      }];
      $scope.errors = [{
        foo: "error"
      }];
      $scope.$apply();
    });

    it('should display one generic-schema', function() {
      expect(component.querySelectorAll('generic-schema').length).toBe(1);
    });
    it('should pass the items schema to a generic schema', function() {
      expect(genericSchema.bindings.schema).toEqual($scope.schema.items);
    });
    it('should pass the locale to the generic-schema', function() {
      expect(genericSchema.bindings.locale).toEqual($scope.locale);
    });
    it('should pass the translations to the generic-schema', function() {
      expect(genericSchema.bindings.translations).toEqual($scope.translations);
    });
    it('should render the title', function() {
      expect(component.querySelector('.page-header').innerText.trim()).toEqual($scope.schema.title);
    });
    it('should render the description', function() {
      expect(component.querySelector('p').innerText.trim()).toEqual($scope.schema.description);
    });

    describe('when the child component triggers onChange', function() {
      beforeEach(function() {
        genericSchema.bindings.onChange({
          model: { foo: "bar" },
          schema: $scope.schema.items
        });
      });
      it('should trigger the components onChange with the new value under the correct key', function() {
        expect($scope.onChange.mock.calls.length).toBe(1);
        expect($scope.onChange).toHaveBeenCalledWith(
          [{ foo: "bar" }],
          $scope.schema.items
        );
      });
    });
  });

  describe('when an array of models is supplied', function() {
    beforeEach(function() {
      $scope.schema = {
        type: "array",
        items: {
          foo: {
            type: "string"
          }
        }
      };
      $scope.model = [
        { foo: "bar" },
        { foo: "barbar"}
      ];

      $scope.errors = [
        {},
        { foo: "error"}
      ];
      $scope.$apply();
    });
    it('should render the appropriate number of generic-schema', function() {
      expect(component.querySelectorAll('generic-schema').length).toBe(2);
    });
    it('should pass the correct model to each generic schema', function() {
      // The last generic component is the one we interrogate
      expect(genericSchema.bindings.model).toEqual($scope.model[1]);
    });
    it('should pass the correct errors to each generic schema', function() {
      // The last generic component is the one we interrogate
      expect(genericSchema.bindings.errors).toEqual($scope.errors[1]);
    });
  });
});

function getComponent($compile, $scope, template) {
  var compiledElement = $compile(template)($scope);
  $scope.$digest();
  return compiledElement[0];
}
