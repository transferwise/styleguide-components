describe('Given an allOfSchema component', function() {
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
        on-change="onChange()" \
        on-refresh="onRefresh()" \
      ></all-of-schema>';

    $scope.onChange = jasmine.createSpy('onChange');
    $scope.onRefresh = jasmine.createSpy('onRefresh');

    component = getComponent($compile, $scope, template);
  });

  describe('when given a single schema', function() {
    beforeEach(function() {
      $scope.schema = {
        allOf: [{
          type: "string",
          width: 'md'
        }]
      };
      $scope.$apply();
    });

    it('should pass it to a generic schema component', function() {
      expect(genericSchema.bindings.schema).toEqual($scope.schema.allOf[0]);
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
        $scope.model = {a: 1};
        $scope.$apply();
      });
      it('should pass it to a generic schema component', function() {
        expect(genericSchema.bindings.model).toEqual($scope.model);
      });
    });

    describe('with error messages', function() {
      beforeEach(function() {
        $scope.errors = {a:"error"};
        $scope.$apply();
      });
      it('should pass it to a generic schema component', function() {
        expect(genericSchema.bindings.errors).toEqual($scope.errors);
      });
    });

    describe('with a locale', function() {
      beforeEach(function() {
        $scope.locale = 'es-ES';
        $scope.$apply();
      });
      it('should pass it to a generic schema component', function() {
        expect(genericSchema.bindings.locale).toEqual($scope.locale);
      });
    });

    describe('with translations', function() {
      beforeEach(function() {
        $scope.translations = {};
        $scope.$apply();
      });
      it('should pass them to a generic schema component', function() {
        expect(genericSchema.bindings.translations).toEqual($scope.translations);
      });
    });

    describe('when the generic schema triggers an onChange event', function() {
      beforeEach(function() {
        $scope.model = { a: 1 };
        $scope.$apply();
        genericSchema.bindings.onChange({ model: { b: 2 } });
      });
      it('should trigger the components onChange once', function() {
        expect($scope.onChange.calls.count()).toBe(1);
      });
      // it('should combine the changed model with the internal model', function() {
      //   expect($scope.onChange).toHaveBeenCalledWith({ a: 1, b: 2 });
      // });
    });

    describe('when the generic schema triggers onRefreshRequirements', function() {
      beforeEach(function() {
        $scope.model = { a: 1 };
        $scope.$apply();
        genericSchema.bindings.onRefresh({ model: { b: 2 } });
      });
      it('should propogate that event to consumers', function() {
        expect($scope.onRefresh.calls.count()).toBe(1);
      });
      // it('should combine the changed model with the internal model', function() {
      //   expect($scope.onRefresh).toHaveBeenCalledWith({ a: 1, b: 2 });
      // });
    });
  });

  describe('when given multiple schemas', function() {
    beforeEach(function() {
      $scope.schema = {
        allOf: [{
          type: "string"
        },{
          type: "number"
        }]
      };
      $scope.$apply();
    });
    it('should render a generic-schema for each', function() {
      var genericSchemas = component.querySelectorAll('generic-schema');
      expect(genericSchemas.length).toBe(2);
    });
  });
});

function getComponent($compile, $scope, template) {
  var compiledElement = $compile(template)($scope);
  $scope.$digest();
  return compiledElement[0];
}
