'use strict';

describe('Given an oneOfSchema component', function() {
  var $scope,
    component,
    $compile,
    genericSchema;

  beforeEach(function() {
    angular.mock.module('tw.json-schema.one-of');

    genericSchema = getMockComponent('genericSchema');
    angular.mock.module('tw.json-schema.generic', genericSchema);

    angular.mock.inject(function($injector) {
      $compile = $injector.get('$compile');
      $scope = $injector.get('$rootScope').$new();
    });

    var template = ' \
      <one-of-schema \
        schema="schema" \
        model="model" \
        errors="errors" \
        locale="locale" \
        translations="translations" \
        on-change="onChange(model, schema)" \
      ></one-of-schema>';

    $scope.onChange = jasmine.createSpy('onChange');

    component = getComponent($compile, $scope, template);
  });

  describe('when given multiple schemas', function() {
    beforeEach(function() {
      $scope.schema = {
        oneOf: [{
          type: 'object',
          properties: {
            a: {
              type: 'number'
            }
          },
          required: ['a']
        }, {
          type: 'object',
          properties: {
            b: {
              type: 'number'
            }
          },
          required: ['b']
        }, {
          type: 'object',
          properties: {
            c: {
              type: 'number'
            }
          },
          required: ['c']
        }]
      };

      $scope.model = { b: 2, c: 3 };
      $scope.errors = { a: 'error' };
      $scope.locale = 'es-ES';
      $scope.translations = {};

      $scope.$apply();
    });

    it('should render one generic schema component', function() {
      expect(component.querySelectorAll('generic-schema').length).toBe(1);
    });

    it('should pass the first schema with a valid model', function() {
      expect(genericSchema.bindings.schema).toEqual($scope.schema.oneOf[1]);
    });

    it('should pass the valid part of the model to the generic-schema', function() {
      expect(genericSchema.bindings.model).toEqual({ b: 2 });
    });

    it('should pass errors to the nested generic schema component', function() {
      expect(genericSchema.bindings.errors).toEqual($scope.errors);
    });

    it('should pass locale to the nested generic schema component', function() {
      expect(genericSchema.bindings.locale).toEqual($scope.locale);
    });

    it('should pass translations to the nested generic schema component', function() {
      expect(genericSchema.bindings.translations).toEqual($scope.translations);
    });

    describe('when another schema is selected', function() {
      beforeEach(function() {
        var radios = component.querySelectorAll('tw-radio button')
        radios[2].dispatchEvent(new CustomEvent('click'));
      });
      it('should pass that schema to the nested generic schema', function() {
        expect(genericSchema.bindings.schema).toBe($scope.schema.oneOf[2]);
      });

      it('should pass the valid parts of the original model to the nested generic schema', function() {
        expect(genericSchema.bindings.model).toEqual({ c: 3 });
      });

      it('should trigger onChange with only the properties in the new schema', function() {
        expect($scope.onChange).toHaveBeenCalledWith(
          { c: 3 },
          $scope.schema.oneOf[2]
        );
      })
    });

    describe('when the generic schema triggers an onChange event', function() {
      beforeEach(function() {
        genericSchema.bindings.onChange({
          model: { b: 4 },
          schema: $scope.schema.oneOf[1]
        });
      });

      it('should trigger the components onChange once', function() {
        expect($scope.onChange.calls.count()).toBe(1);
      });

      it('should broadcast the changed model from the child', function() {
        expect($scope.onChange).toHaveBeenCalledWith(
          { b: 4 },
          $scope.schema.oneOf[1]
        );
      });

      it('should not change the input model', function() {
        expect($scope.model).toEqual({ b: 2, c: 3 });
      });

      describe('when the user toggles to another schema, and back again', function() {
        beforeEach(function() {
          var radios = component.querySelectorAll('tw-radio button')
          radios[2].dispatchEvent(new CustomEvent('click'));
          radios[1].dispatchEvent(new CustomEvent('click'));
        });

        it('should remember and pass down the changed value', function() {
          expect( genericSchema.bindings.model).toEqual({ b: 4 });
        });
      });
    });
  });
});

function getComponent($compile, $scope, template) {
  var compiledElement = $compile(template)($scope);
  $scope.$digest();
  return compiledElement[0];
}
