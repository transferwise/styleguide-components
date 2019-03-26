describe('Given ', function() {
  var $scope,
    component,
    $compile,
    oneOfSchema,
    allOfSchema,
    objectSchema,
    arraySchema,
    basicTypeSchema;

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
        on-change="onChange()" \
        on-refresh="onRefresh()" \
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
    });

    it('should render a one-of-schema', function() {
      expect(component.querySelectorAll('one-of-schema').length).toBe(1);
    });
    it('should pass through the supplied data', function() {
      expect(oneOfSchema.bindings.schema).toEqual($scope.schema);
      expect(oneOfSchema.bindings.model).toEqual($scope.model);
      expect(oneOfSchema.bindings.errors).toEqual($scope.errors);
      expect(oneOfSchema.bindings.locale).toEqual($scope.locale);
      expect(oneOfSchema.bindings.translations).toEqual($scope.translations);
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
    it('should pass through the supplied data', function() {
      expect(allOfSchema.bindings.schema).toEqual($scope.schema);
      expect(allOfSchema.bindings.model).toEqual($scope.model);
      expect(allOfSchema.bindings.errors).toEqual($scope.errors);
      expect(allOfSchema.bindings.locale).toEqual($scope.locale);
      expect(allOfSchema.bindings.translations).toEqual($scope.translations);
    });
  });

  describe('when an object schema is supplied ', function() {
    beforeEach(function() {
      $scope.schema = {
        type: "object",
        properties: []
      };
      $scope.$apply();
    });

    it('should render an object-schema', function() {
      expect(component.querySelectorAll('object-schema').length).toBe(1);
    });
    it('should pass through the supplied data', function() {
      expect(objectSchema.bindings.schema).toEqual($scope.schema);
      expect(objectSchema.bindings.model).toEqual($scope.model);
      expect(objectSchema.bindings.errors).toEqual($scope.errors);
      expect(objectSchema.bindings.locale).toEqual($scope.locale);
      expect(objectSchema.bindings.translations).toEqual($scope.translations);
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
    it('should pass through the supplied data', function() {
      expect(arraySchema.bindings.schema).toEqual($scope.schema);
      expect(arraySchema.bindings.model).toEqual($scope.model);
      expect(arraySchema.bindings.errors).toEqual($scope.errors);
      expect(arraySchema.bindings.locale).toEqual($scope.locale);
      expect(arraySchema.bindings.translations).toEqual($scope.translations);
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
    it('should pass through the supplied data', function() {
      expect(basicTypeSchema.bindings.schema).toEqual($scope.schema);
      expect(basicTypeSchema.bindings.model).toEqual($scope.model);
      expect(basicTypeSchema.bindings.errors).toEqual($scope.errors);
      expect(basicTypeSchema.bindings.locale).toEqual($scope.locale);
      expect(basicTypeSchema.bindings.translations).toEqual($scope.translations);
    });
  });
});

function getComponent($compile, $scope, template) {
  var compiledElement = $compile(template)($scope);
  $scope.$digest();
  return compiledElement[0];
}
