describe('Given a component for rendering basic type schemas', function() {
  var $scope,
    component,
    $compile,
    twField;

  beforeEach(module('tw.styleguide-components'));
  beforeEach(module('tw.json-schema'));

  beforeEach(function() {
    twField = getMockComponent('twField');
    angular.mock.module('tw.styleguide.forms.field', twField);
  });

  beforeEach(inject(function($injector) {
    $compile = $injector.get('$compile');
    $scope = $injector.get('$rootScope').$new();
  }));

  beforeEach(function() {
    var template = ' \
      <basic-type-schema \
        schema="schema" \
        model="model" \
        required="required" \
        errors="errors" \
        locale="locale" \
        translations="translations" \
        on-change="onChange(model)" \
        on-refresh="onRefresh(model)" \
      ></basic-type-schema>';

    $scope.schema = {
      type: "string"
    };
    $scope.model = "hello world";
    $scope.required = true;
    $scope.errors = "error";
    $scope.locale = "en-GB";
    $scope.translations = {};

    $scope.onChange = jasmine.createSpy('onChange');
    $scope.onRefresh = jasmine.createSpy('onRefresh');

    component = getComponent($compile, $scope, template);
  });

  describe('when initialised', function() {
    it('should display one twField', function() {
      expect(component.querySelectorAll('tw-field').length).toBe(1);
    });
    it('should pass the schema to twField', function() {
      expect(twField.bindings.initialField).toEqual($scope.schema);
    });
    it('should pass the model to twField', function() {
      expect(twField.bindings.model).toEqual($scope.model);
    });
    it('should pass the error message to twField', function() {
      expect(twField.bindings.errorMessage).toEqual($scope.errors);
    });
    it('should pass the locale to twField', function() {
      expect(twField.bindings.locale).toEqual($scope.locale);
    });

    describe('when twField triggers onChange and refreshRequirementsOnChange=false', function() {
      beforeEach(function() {
        twField.bindings.changeHandler({ value: "foo" });
      });
      it('should trigger the components onChange with the new value', function() {
        expect($scope.onChange.calls.count()).toBe(1);
        expect($scope.onChange).toHaveBeenCalledWith("foo");
      });
      it('should not trigger the components onRefresh', function() {
        expect($scope.onRefresh.calls.count()).toBe(0);
      });
    });

    describe('when twField triggers onChange and refreshRequirementsOnChange=true', function() {
      beforeEach(function() {
        $scope.schema.refreshRequirementsOnChange = true;
        $scope.$apply();
        twField.bindings.changeHandler({ value: "foo" });
      });
      it('should trigger the components onRefresh with the new value ', function() {
        expect($scope.onRefresh.calls.count()).toBe(1);
        expect($scope.onRefresh).toHaveBeenCalledWith("foo");
      });
    });
  });
});

function getComponent($compile, $scope, template) {
  var compiledElement = $compile(template)($scope);
  $scope.$digest();
  return compiledElement[0];
}
