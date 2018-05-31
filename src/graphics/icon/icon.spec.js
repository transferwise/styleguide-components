describe('Icon component', function() {
  'use strict';

  var TEMPLATE = '<tw-icon name="{{ name }}" size="{{ size }}"></tw-icon>';

  var $scope;
  var $compile;

  beforeEach(function() {
    angular.mock.module('tw.styleguide.graphics');

    angular.mock.inject(function($injector) {
      $scope = $injector.get('$rootScope').$new();
      $compile = $injector.get('$compile');
    });
  });

  afterEach(function() {
    removeAllSpritesFromDOM();
  });

  it('adds icon sprite to page if it is not there yet', function() {
    expect(spritesOnPage().length).toBe(0);
    mount({ name: 'bank' });
    expect(spritesOnPage().length).toBe(1);
  });

  it('does not add icon sprite to page if it is already there', function() {
    expect(spritesOnPage().length).toBe(0);
    mount({ name: 'bank' });
    expect(spritesOnPage().length).toBe(1);
    mount({ name: 'card' });
    expect(spritesOnPage().length).toBe(1);
  });

  it('passes name as href to use element', function() {
    var component = mount({ name: 'bank' });

    expect(component.useHref()).toBe('#bank');
  });

  it('does not add size class to svg if no size is passed', function() {
    var component = mount({ name: 'bank' });
    expect(component.svgClasses()).not.toContain('tw-icon-');
  });

  it('adds size class to svg if size is passed', function() {
    var component = mount({ name: 'bank', size: 'lg' });

    expect(component.svgClasses()).toContain('tw-icon-lg');
  });

  function mount(bindings) {
    angular.extend($scope, bindings);

    var component = getCompiledDirectiveElement($scope, TEMPLATE);

    component.useHref = function() {
      return findElements(component, 'use')[0].getAttribute('href');
    };

    component.svgClasses = function() {
      return findElements(component, 'svg')[0].classList;
    };

    return component;
  }

  function findElements(componentElem, query) {
    return angular.element(componentElem[0].querySelectorAll(query));
  }

  function spritesOnPage() {
    return document.querySelectorAll('.svg-icon-sprite-container');
  }

  function getCompiledDirectiveElement($scope, template) {
    var element = angular.element(template);
    var compiledElement = $compile(element)($scope);

    $scope.$digest();
    return compiledElement;
  }

  function removeAllSpritesFromDOM() {
    Array.prototype.slice.call(spritesOnPage()).forEach(function(sprite) {
      sprite.parentNode.removeChild(sprite);
    });
  }
});
