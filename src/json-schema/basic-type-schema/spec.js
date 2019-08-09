'use strict';

describe('Given a component for rendering basic type schemas', function() {
  var $scope,
    component,
    $compile,
    twField;

  beforeEach(function() {
    module('tw.styleguide-components');
    module('tw.json-schema');

    twField = getMockComponent('twField');
    angular.mock.module('tw.styleguide.forms.field', twField);

    inject(function($injector) {
      $compile = $injector.get('$compile');
      $scope = $injector.get('$rootScope').$new();
    });

    var template = ' \
      <basic-type-schema \
        schema="schema" \
        model="model" \
        required="required" \
        errors="errors" \
        locale="locale" \
        translations="translations" \
        on-change="onChange(model, schema)" \
      ></basic-type-schema>';

    $scope.schema = {
      type: "string",
      default: "initial"
    };

    $scope.required = true;
    $scope.errors = "error";
    $scope.locale = "en-GB";
    $scope.translations = {};

    $scope.onChange = jasmine.createSpy('onChange');

    component = getComponent($compile, $scope, template);
  });

  describe('when initialised', function() {
    it('should display one twField', function() {
      expect(component.querySelectorAll('tw-field').length).toBe(1);
    });
    it('should pass the schema to twField', function() {
      expect(twField.bindings.initialField).toEqual($scope.schema);
    });
    it('should pass the error message to twField', function() {
      expect(twField.bindings.errorMessage).toEqual($scope.errors);
    });
    it('should pass the locale to twField', function() {
      expect(twField.bindings.locale).toEqual($scope.locale);
    });

    describe('when there is no model and a default', function() {
      it('should call the onChange handler with the default ', function() {
        expect($scope.onChange).toHaveBeenCalledWith(
          $scope.schema.default,
          $scope.schema
        );
      });
    });

    describe('when there is a model ', function() {
      beforeEach(function() {
        $scope.model = "hello world";
        $scope.$apply();
      });
      it('should pass it to twField', function() {
        expect(twField.bindings.model).toEqual($scope.model);
      });
    });

    describe('when twField triggers onChange', function() {
      beforeEach(function() {
        $scope.onChange = jasmine.createSpy('onChange');
        $scope.$apply();
        twField.bindings.changeHandler({ value: "foo" });
      });
      it('should trigger the components onChange with the new value', function() {
        expect($scope.onChange.calls.count()).toBe(1);
        expect($scope.onChange).toHaveBeenCalledWith("foo", $scope.schema);
      });
    });
  });
});

function getComponent($compile, $scope, template) {
  var compiledElement = $compile(template)($scope);
  $scope.$digest();
  return compiledElement[0];
}
