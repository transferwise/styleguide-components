fdescribe('Given a component for arrays of schemas', function() {
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
      <array-schema \
        schema="schema" \
        model="model" \
        errors="errors" \
        locale="locale" \
        translations="translations" \
        on-change="onChange(model)" \
        on-refresh="onRefresh(model)" \
      ></array-schema>';

    $scope.onChange = jasmine.createSpy('onChange');
    $scope.onRefresh = jasmine.createSpy('onRefresh');

    component = getComponent($compile, $scope, template);
  });

  describe('when no model is supplied', function() {
    beforeEach(function() {
      $scope.schema = {
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

    describe('when the child component triggers onChange', function() {
      beforeEach(function() {
        genericSchema.bindings.onChange({ model: { foo: "bar" }});
      });
      it('should trigger the components onChange with the new value under the correct key', function() {
        expect($scope.onChange.calls.count()).toBe(1);
        expect($scope.onChange).toHaveBeenCalledWith([{ foo: "bar" }]);
      });
    });
    describe('when the child component triggers onRefresh', function() {
      beforeEach(function() {
        genericSchema.bindings.onRefresh({ model: { foo: "bar" } });
      });
      it('should trigger the components onRefresh with the new value under the correct key', function() {
        expect($scope.onRefresh.calls.count()).toBe(1);
        expect($scope.onRefresh).toHaveBeenCalledWith([{ foo: "bar" }]);
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
      $scope.model = [{
        foo: "bar"
      },
      {
        foo: "barbar"
      }];
      $scope.errors = [
      {},
      {
        foo: "error"
      }];
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
