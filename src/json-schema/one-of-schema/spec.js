describe('Given an oneOfSchema component', function() {
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
      <one-of-schema \
        schema="schema" \
        model="model" \
        errors="errors" \
        locale="locale" \
        translations="translations" \
        on-change="onChange()" \
        on-refresh="onRefresh()" \
      ></one-of-schema>';

    $scope.onChange = jasmine.createSpy('onChange');
    $scope.onRefresh = jasmine.createSpy('onRefresh');

    component = getComponent($compile, $scope, template);
  });

  describe('when given a multiple schemas', function() {
    beforeEach(function() {
      $scope.schema = {
        oneOf: [{
          type: "string"
        },{
          type: "number"
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

      });
      it('should ', function() {

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
});

function getComponent($compile, $scope, template) {
  var compiledElement = $compile(template)($scope);
  $scope.$digest();
  return compiledElement[0];
}
