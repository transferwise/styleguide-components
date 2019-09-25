'use strict';

describe('Given a component for rendering object schemas', function() {
  var $scope,
    component,
    $compile,
    genericSchema;

  beforeEach(function() {
    angular.mock.module('tw.json-schema.object');

    genericSchema = getMockComponent('genericSchema');
    angular.mock.module('tw.json-schema.generic', genericSchema);

    angular.mock.inject(function($injector) {
      $compile = $injector.get('$compile');
      $scope = $injector.get('$rootScope').$new();
    });

    var template = ' \
      <object-schema \
        schema="schema" \
        model="model" \
        errors="errors" \
        locale="locale" \
        translations="translations" \
        on-change="onChange(model, schema)" \
      ></object-schema>';

    $scope.onChange = jasmine.createSpy('onChange');

    component = getComponent($compile, $scope, template);
  });

  describe('when the object contains a property', function() {
    beforeEach(function() {
      $scope.schema = {
        type: "object",
        properties: {
          foo: {
            type: "string"
          }
        }
      };
      $scope.model = {
        foo: "bar"
      };
      $scope.errors = {
        foo: "error"
      };
      $scope.$apply();
    });

    it('should display one generic-schema', function() {
      expect(component.querySelectorAll('generic-schema').length).toBe(1);
    });
    it('should pass the property schema to a generic schema', function() {
      expect(genericSchema.bindings.schema).toEqual($scope.schema.properties.foo);
    });
    it('should pass the correct part of the model to the generic schema', function() {
      expect(genericSchema.bindings.model).toEqual($scope.model.foo);
    });
    it('should pass the correct part of the errors collection to the generic schema', function() {
      expect(genericSchema.bindings.errors).toEqual($scope.errors.foo);
    });
    it('should pass the locale to the generic-schema', function() {
      expect(genericSchema.bindings.locale).toEqual($scope.locale);
    });
    it('should pass the translations to the generic-schema', function() {
      expect(genericSchema.bindings.translations).toEqual($scope.translations);
    });

    describe('when the child component triggers onChange', function() {
      beforeEach(function() {
        genericSchema.bindings.onChange({
          model: "barbar",
          schema: $scope.schema.properties.foo
        });
      });
      it('should trigger the components onChange with the new value under the correct key', function() {
        expect($scope.onChange.calls.count()).toBe(1);
        expect($scope.onChange).toHaveBeenCalledWith(
          { foo: "barbar" },
          $scope.schema.properties.foo
        );
      });

      it('should not change the original model', function() {
        expect($scope.model).not.toBe({ foo: "barbar" });
        expect($scope.model).toEqual({ foo: "bar" });
      });
    });
  });

  describe('when the object contains multiple properties', function() {
    beforeEach(function() {
      $scope.schema = {
        type: "object",
        properties: {
          a: {
            type: "number"
          },
          b: {
            type: "number"
          },
        }
      };
      $scope.$apply();
    });

    it('should display a generic-schema for each', function() {
      expect(component.querySelectorAll('generic-schema').length).toBe(2);
    });
  });
});

function getComponent($compile, $scope, template) {
  var compiledElement = $compile(template)($scope);
  $scope.$digest();
  return compiledElement[0];
}
