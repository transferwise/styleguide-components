describe('Given a component from rendering allOf schemas', function() {
  var $scope,
    component,
    $compile,
    genericSchema;

  beforeEach(module('tw.styleguide-components'));
  beforeEach(module('tw.json-schema'));

  beforeEach(function() {
    genericSchema = getMockComponent('genericSchema');
    angular.mock.module('tw.json-schema.generic', genericSchema);
  });

  beforeEach(inject(function($injector) {
    $compile = $injector.get('$compile');
    $scope = $injector.get('$rootScope').$new();
  }));

  beforeEach(function() {
    var template = ' \
      <all-of-schema \
        schema="schema" \
        model="model" \
        errors="errors" \
        locale="locale" \
        translations="translations" \
        on-change="onChange(model)" \
        on-refresh="onRefresh(model)" \
      ></all-of-schema>';

    $scope.onChange = jasmine.createSpy('onChange');
    $scope.onRefresh = jasmine.createSpy('onRefresh');

    component = getComponent($compile, $scope, template);
  });

  describe('when given a single schema', function() {
    beforeEach(function() {
      $scope.schema = {
        title: 'All of the following',
        description: 'Description of stuff',
        allOf: [{
          type: 'object',
          properties: {
            a: {
              type: 'number'
            }
          },
          width: 'md'
        }]
      };
      $scope.$apply();
    });

    it('should pass it to a generic schema component', function() {
      expect(genericSchema.bindings.schema).toEqual($scope.schema.allOf[0]);
    });

    it('should render the title', function() {
      expect(component.querySelector('.page-header').innerText.trim()).toEqual($scope.schema.title);
    });
    it('should render the description', function() {
      expect(component.querySelector('p').innerText.trim()).toEqual($scope.schema.description);
    });

    describe('with a width', function() {
      it('should render the generic-schema inside a column', function() {
        var column = component.querySelector('.col-sm-6');
        expect(column).toBeTruthy();
        expect(column.querySelector('generic-schema')).toBeTruthy();
      });
    });

    describe('with a model', function() {
      beforeEach(function() {
        $scope.model = { a: 1 };
        $scope.$apply();
      });
      it('should pass it to a generic schema component', function() {
        expect(genericSchema.bindings.model).toEqual($scope.model);
      });
    });
  });

  describe('when given multiple schemas', function() {
    var genericSchemas, schema1controller, schema2controller;

    beforeEach(function() {
      $scope.schema = {
        allOf: [{
          type: 'object',
          properties: {
            a: {
              type: 'string'
            }
          }
        },{
          type: 'object',
          properties: {
            b: {
              type: 'number'
            }
          }
        }]
      };

      $scope.model = {
        a: 'hello',
        b: 1,
        c: 'not in schema'
      };

      $scope.errors = {
        a: 'wrong',
        b: 'wronger'
      };

      $scope.locale = 'es-ES';

      $scope.translations = {
        save: 'Save'
      };

      $scope.$apply();

      genericSchemas = component.querySelectorAll('generic-schema');

      schema1controller = angular.element(genericSchemas[0]).controller('genericSchema');
      schema2controller = angular.element(genericSchemas[1]).controller('genericSchema');
    });

    it('should render a generic-schema for each', function() {
      expect(genericSchemas.length).toBe(2);
    });

    it('should pass the correct pieces of the schema to each generic-schema', function() {
      expect(schema1controller.schema).toEqual($scope.schema.allOf[0]);
      expect(schema2controller.schema).toEqual($scope.schema.allOf[1]);
    });

    it('should pass the correct pieces of the model to each generic-schema', function() {
      expect(schema1controller.model).toEqual({ a: 'hello' });
      expect(schema2controller.model).toEqual({ b: 1 });
    });

    it('should pass the error messages to both generic-schema', function() {
      expect(schema1controller.errors).toEqual($scope.errors);
      expect(schema2controller.errors).toEqual($scope.errors);
    });

    it('should pass the translations to both generic-schema', function() {
      expect(schema1controller.translations).toEqual($scope.translations);
      expect(schema2controller.translations).toEqual($scope.translations);
    });

    it('should pass the locale to both generic-schema', function() {
      expect(schema1controller.locale).toEqual($scope.locale);
      expect(schema2controller.locale).toEqual($scope.locale);
    });

    describe('when a child schema triggers onChange', function() {
      beforeEach(function() {
        // refers to second generic-schema component
        genericSchema.bindings.onChange({ model: { b: 2 } });
      });
      it('should trigger the components onChange once', function() {
        expect($scope.onChange.calls.count()).toBe(1);
      });
      it('should combine the changed model with the other parts of the model', function() {
        expect($scope.onChange).toHaveBeenCalledWith({ a: 'hello', b: 2 });
      });
    });

    describe('when a child schema triggers onRefresh', function() {
      beforeEach(function() {
        // refers to second generic-schema component
        genericSchema.bindings.onRefresh({ model: { b: 3 } });
      });
      it('should trigger the components onChange once', function() {
        expect($scope.onRefresh.calls.count()).toBe(1);
      });
      it('should combine the changed model with the other parts of the model', function() {
        expect($scope.onRefresh).toHaveBeenCalledWith({ a: 'hello', b: 3 });
      });
    });
  });
});

function getComponent($compile, $scope, template) {
  var compiledElement = $compile(template)($scope);
  $scope.$digest();
  return compiledElement[0];
}
