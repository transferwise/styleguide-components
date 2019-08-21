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

  describe('when given a multiple schemas', function() {
    beforeEach(function() {
      $scope.schema = {
        oneOf: [{
          type: "object",
          properties: {
            a: {
              type: "number"
            },
            b: {
              type: "number"
            }
          }
        },{
          type: "object",
          properties: {
            a: {
              type: "number"
            }
          }
        }]
      };

      $scope.errors = {a:"error"};
      $scope.locale = 'es-ES';
      $scope.translations = {};

      $scope.$apply();
    });

    it('should render one generic schema component', function() {
      expect(component.querySelectorAll('generic-schema').length).toBe(1);
    });

    it('should pass the first schema to the generic-schema', function() {
      expect(genericSchema.bindings.schema).toEqual($scope.schema.oneOf[0]);
    });

    it('should pass the model to the generic-schema', function() {
      expect(genericSchema.bindings.model).toEqual($scope.model);
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
        $scope.model = { a: 1, b: 2 };
        $scope.$apply();
        var radios = component.querySelectorAll('tw-radio button')
        radios[1].dispatchEvent(new CustomEvent('click'));
      });
      it('should pass that schema to the nested generic schema', function() {
        expect(genericSchema.bindings.schema).toBe($scope.schema.oneOf[1]);
      });
      it('should trigger onChange with only the properties in the new schema', function() {
        expect($scope.onChange).toHaveBeenCalledWith(
          { a: 1 },
          $scope.schema.oneOf[1]
        );
      })
    });

    describe('when the generic schema triggers an onChange event', function() {
      beforeEach(function() {
        $scope.model = { a: 1 };
        $scope.$apply();
        genericSchema.bindings.onChange({
          model: { b: 2 },
          schema: $scope.schema.oneOf[0]
        });
      });
      it('should trigger the components onChange once', function() {
        expect($scope.onChange.calls.count()).toBe(1);
      });
      it('should broadcast the changed model from the child', function() {
        expect($scope.onChange).toHaveBeenCalledWith(
          { b: 2 },
          $scope.schema.oneOf[0]
        );
      });
    });
  });
});

function getComponent($compile, $scope, template) {
  var compiledElement = $compile(template)($scope);
  $scope.$digest();
  return compiledElement[0];
}
