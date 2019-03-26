describe('Given ', function() {
  var $scope,
    component,
    $compile,
    oneOfSchema,
    allOfSchema,
    objectSchema,
    arraySchema,
    basicTypeSchema,
    childComponent;

  beforeEach(module('tw.styleguide-components'));
  beforeEach(module('tw.json-schema'));

  beforeEach(function() {
    oneOfSchema = getMockComponent('oneOfSchema');
    allOfSchema = getMockComponent('allOfSchema');
    objectSchema = getMockComponent('objectSchema');
    arraySchema = getMockComponent('arraySchema');
    basicTypeSchema = getMockComponent('basicTypeSchema');

    angular.mock.module('tw.json-schema.one-of', oneOfSchema);
    angular.mock.module('tw.json-schema.all-of', allOfSchema);
    angular.mock.module('tw.json-schema.object', objectSchema);
    angular.mock.module('tw.json-schema.array', arraySchema);
    angular.mock.module('tw.json-schema.basic-type', basicTypeSchema);
  });

  beforeEach(inject(function($injector) {
    $compile = $injector.get('$compile');
    $scope = $injector.get('$rootScope').$new();
  }));

  beforeEach(function() {
    const template = ' \
      <generic-schema \
        schema="schema" \
        model="model" \
        errors="errors" \
        locale="locale" \
        translations="translations" \
        on-change="onChange(model)" \
        on-refresh="onRefresh(model)" \
      ></generic-schema>';

    $scope.onChange = jasmine.createSpy('onChange');
    $scope.onRefresh = jasmine.createSpy('onRefresh');

    component = getComponent($compile, $scope, template);
  });

  describe('when a oneOf schema is supplied ', function() {
    beforeEach(function() {
      $scope.schema = {
        oneOf: [{
          type: "string"
        }]
      };
      $scope.$apply();

      childComponent = oneOfSchema;
    });

    it('should render a one-of-schema', function() {
      expect(component.querySelectorAll('one-of-schema').length).toBe(1);
    });

    testBindingsArePassedToChild();
    testOnChangePropogation();
    testOnRefreshPropogation();
  });

  describe('when an allOf schema is supplied ', function() {
    beforeEach(function() {
      $scope.schema = {
        allOf: [{
          type: "string"
        }]
      };
      $scope.$apply();

      childComponent = allOfSchema;
    });

    it('should render an all-of-schema', function() {
      expect(component.querySelectorAll('all-of-schema').length).toBe(1);
    });

    testBindingsArePassedToChild();
    testOnChangePropogation();
    testOnRefreshPropogation();
  });

  describe('when an object schema is supplied ', function() {
    beforeEach(function() {
      $scope.schema = {
        type: "object",
        properties: []
      };
      $scope.$apply();

      childComponent = objectSchema;
    });

    it('should render an object-schema', function() {
      expect(component.querySelectorAll('object-schema').length).toBe(1);
    });

    testBindingsArePassedToChild();
    testOnChangePropogation();
    testOnRefreshPropogation();
  });

  describe('when an array schema is supplied ', function() {
    beforeEach(function() {
      $scope.schema = {
        type: "array",
        items: {
          type: "string"
        }
      };
      $scope.$apply();

      childComponent = arraySchema;
    });

    it('should render an array-schema', function() {
      expect(component.querySelectorAll('array-schema').length).toBe(1);
    });

    testBindingsArePassedToChild();
    testOnChangePropogation();
    testOnRefreshPropogation();
  });

  describe('when a basic type schema is supplied ', function() {
    beforeEach(function() {
      $scope.schema = {
        type: "string"
      };
      $scope.$apply();

      childComponent = basicTypeSchema;
    });

    it('should render a basic-type-schema', function() {
      expect(component.querySelectorAll('basic-type-schema').length).toBe(1);
    });

    testBindingsArePassedToChild();
    testOnChangePropogation();
    testOnRefreshPropogation();
  });

  function testBindingsArePassedToChild() {
    it('should pass through the supplied data', function() {
      expect(childComponent.bindings.schema).toEqual($scope.schema);
      expect(childComponent.bindings.model).toEqual($scope.model);
      expect(childComponent.bindings.errors).toEqual($scope.errors);
      expect(childComponent.bindings.locale).toEqual($scope.locale);
      expect(childComponent.bindings.translations).toEqual($scope.translations);
    });
  }

  function testOnChangePropogation() {
    describe('when the child component triggers onChange', function() {
      beforeEach(function() {
        childComponent.bindings.onChange({ model: { b: 2 } });
      });
      it('should trigger the components onChange with the model', function() {
        expect($scope.onChange.calls.count()).toBe(1);
        expect($scope.onChange).toHaveBeenCalledWith({ b: 2 });
      });
    });
  }

  function testOnRefreshPropogation() {
    describe('when the child component triggers onRefreshRequirements', function() {
      beforeEach(function() {
        childComponent.bindings.onRefresh({ model: { b: 2 } });
      });
      it('should trigger the components onChange with the model', function() {
        expect($scope.onRefresh.calls.count()).toBe(1);
        expect($scope.onRefresh).toHaveBeenCalledWith({ b: 2 });
      });
    });
  }
});


function getComponent($compile, $scope, template) {
  var compiledElement = $compile(template)($scope);
  $scope.$digest();
  return compiledElement[0];
}
