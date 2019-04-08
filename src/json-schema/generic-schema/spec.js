describe('Given a component for rendering any generic schema', function() {
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
        on-change="onChange(model, schema)" \
      ></generic-schema>';

    $scope.onChange = jasmine.createSpy('onChange');

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
    });

    it('should render a one-of-schema', function() {
      expect(component.querySelectorAll('one-of-schema').length).toBe(1);
    });
    it('should pass through the supplied data to the oneOfSchema', function() {
      testBindingsArePassedToChild(oneOfSchema, $scope);
    });

    describe('when the child component triggers onChange', function() {
      beforeEach(function() {
        oneOfSchema.bindings.onChange({
          model: { b: 2 },
          schema: $scope.schema.oneOf[0]
        });
      });
      it('should trigger the components onChange with the model', function() {
        expect($scope.onChange.calls.count()).toBe(1);
        expect($scope.onChange).toHaveBeenCalledWith(
          { b: 2 },
          $scope.schema.oneOf[0]
        );
      });
    });
  });

  describe('when an allOf schema is supplied ', function() {
    beforeEach(function() {
      $scope.schema = {
        allOf: [{
          type: "string"
        }]
      };
      $scope.$apply();
    });

    it('should render an all-of-schema', function() {
      expect(component.querySelectorAll('all-of-schema').length).toBe(1);
    });
    it('should pass through the supplied data to the allOfSchema', function() {
      testBindingsArePassedToChild(allOfSchema, $scope);
    });

    describe('when the child component triggers onChange', function() {
      beforeEach(function() {
        allOfSchema.bindings.onChange({
          model: { b: 2 },
          schema: $scope.schema.allOf[0]
        });
      });
      it('should trigger the components onChange with the model', function() {
        expect($scope.onChange.calls.count()).toBe(1);
        expect($scope.onChange).toHaveBeenCalledWith(
          { b: 2 },
          $scope.schema.allOf[0]
        );
      });
    });
  });

  describe('when an object schema is supplied ', function() {
    beforeEach(function() {
      $scope.schema = {
        type: "object",
        properties: {
          foo: {
            type: 'string'
          }
        }
      };
      $scope.$apply();
    });

    it('should render an object-schema', function() {
      expect(component.querySelectorAll('object-schema').length).toBe(1);
    });
    it('should pass through the supplied data to the objectSchema', function() {
      testBindingsArePassedToChild(objectSchema, $scope);
    });

    describe('when the child component triggers onChange', function() {
      beforeEach(function() {
        objectSchema.bindings.onChange({
          model: { b: 2 },
          schema: $scope.schema.properties.foo
        });
      });
      it('should trigger the components onChange with the model', function() {
        expect($scope.onChange.calls.count()).toBe(1);
        expect($scope.onChange).toHaveBeenCalledWith(
          { b: 2 },
          $scope.schema.properties.foo
        );
      });
    });
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
    });

    it('should render an array-schema', function() {
      expect(component.querySelectorAll('array-schema').length).toBe(1);
    });
    it('should pass through the supplied data to the arraySchema', function() {
      testBindingsArePassedToChild(arraySchema, $scope);
    });

    describe('when the child component triggers onChange', function() {
      beforeEach(function() {
        arraySchema.bindings.onChange({
          model: { b: 2 },
          schema: $scope.schema.items
        });
      });
      it('should trigger the components onChange with the model', function() {
        expect($scope.onChange.calls.count()).toBe(1);
        expect($scope.onChange).toHaveBeenCalledWith(
          { b: 2 },
          $scope.schema.items
        );
      });
    });
  });

  describe('when a basic type schema is supplied ', function() {
    beforeEach(function() {
      $scope.schema = {
        type: "string"
      };
      $scope.$apply();
    });

    it('should render a basic-type-schema', function() {
      expect(component.querySelectorAll('basic-type-schema').length).toBe(1);
    });

    it('should pass through the supplied data to the basicTypeSchema', function() {
      testBindingsArePassedToChild(basicTypeSchema, $scope);
    });

    describe('when the child component triggers onChange', function() {
      beforeEach(function() {
        basicTypeSchema.bindings.onChange({
          model: { b: 2 },
          schema: $scope.schema
        });
      });
      it('should trigger the components onChange with the model', function() {
        expect($scope.onChange.calls.count()).toBe(1);
        expect($scope.onChange).toHaveBeenCalledWith(
          { b: 2 },
          $scope.schema
        );
      });
    });
  });

  describe('when an enum schema is supplied with just one value ', function() {
    beforeEach(function() {
      $scope.schema = {
        enum: ["default"]
      };
      $scope.$apply();
    });

    it('should call onChange with the enum value', function() {
      expect($scope.onChange).toHaveBeenCalledWith("default", $scope.schema);
    });
  });

  function testBindingsArePassedToChild(childComponent, $scope) {
    expect(childComponent.bindings.schema).toEqual($scope.schema);
    expect(childComponent.bindings.model).toEqual($scope.model);
    expect(childComponent.bindings.errors).toEqual($scope.errors);
    expect(childComponent.bindings.locale).toEqual($scope.locale);
    expect(childComponent.bindings.translations).toEqual($scope.translations);
  }

  function testOnChangePropogation(schema) {
    describe('when the child component triggers onChange', function() {
      beforeEach(function() {
        childComponent.bindings.onChange({
          model: { b: 2 },
          schema: schema
        });
      });
      it('should trigger the components onChange with the model', function() {
        expect($scope.onChange.calls.count()).toBe(1);
        expect($scope.onChange).toHaveBeenCalledWith({ b: 2 , schema: schema});
      });
    });
  }
});

function getComponent($compile, $scope, template) {
  var compiledElement = $compile(template)($scope);
  $scope.$digest();
  return compiledElement[0];
}
