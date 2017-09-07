describe('DomService', function() {
  'use strict';

  var dom,
    $scope,
    $rootScope,
    $window,
    $document,
    element,
    outer,
    outermost,
    $compile;

  beforeEach(module('tw.styleguide-components'));

  beforeEach(inject(function($injector) {
    dom = $injector.get('TwDomService');
    $rootScope = $injector.get('$rootScope');
    $compile = $injector.get('$compile');
    $window = $injector.get('$window');
    $scope = $rootScope.$new();

    $document = getCompiledElement($scope)[0];
    element = $document.getElementsByClassName('element')[0];
    outer = $document.getElementsByClassName('outer')[0];
    outermost = $document.getElementsByClassName('outermost')[0];
  }));

  describe('when asking for parent tag', function() {
    it('should return the first matching element', function () {
      var parent = dom.getClosestParentByTagName(element, 'div');
      expect(parent).toEqual(outer);
    });
    it('should return null if no matching element', function () {
      var parent = dom.getClosestParentByTagName(element, 'span');
      expect(parent).toBe(null);
    });
  });

  describe('when asking for parent class', function() {
    it('should return the first matching element', function () {
      var parent = dom.getClosestParentByClassName(element, 'sharedClass');
      expect(parent).toEqual(outer);
    });
    it('should return null if no matching element', function () {
      var parent = dom.getClosestParentByClassName(element, 'missing');
      expect(parent).toBe(null);
    });
  });

  function getCompiledElement($scope, template) {
    if (!template) {
      template = " \
        <div class='outermost sharedClass'> \
          <div class='outer sharedClass'> \
            <div class='element'></div> \
          </div> \
        </div>";
    }
    var element = angular.element(template);
    // append to document so we can test document.activeElement
    angular.element(document.body).append(element);
    var compiledElement = $compile(element)($scope);

    $scope.$digest();
    return compiledElement;
  }

});
