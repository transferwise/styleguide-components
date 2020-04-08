'use strict';

describe('Markdown component, ', function() {
  let $compile;
  let $rootScope;
  let $scope;

  beforeEach(function() {
    angular.mock.module('tw.styleguide.formatting.markdown');

    angular.mock.inject(function($injector) {
      $rootScope = $injector.get('$rootScope');
      $compile = $injector.get('$compile');
      $scope = $rootScope.$new();
      
    });
  });

  describe('Given markdown is provided', () => {
    let template;

    beforeEach(() => {
      $scope.markdown = "# this is a heading";

      template =
      " \
          <tw-markdown \
              markdown='markdown'> \
          </tw-markdown>";
    });


    it('renders the markdown as HTML', () => {
      const element = getCompiledDirectiveElement($scope, template);

      expect(element.querySelector('h1').textContent).toBe('this is a heading');
    });
  });

  describe('Given markdown has raw HTML', () => {
    let template;

    beforeEach(() => {
      $scope.markdown = `## subheading
<img src='dodgyimagesrc' />`;

      template =
      " \
          <tw-markdown \
              markdown='markdown'> \
          </tw-markdown>";
    });

    it('should NOT render the raw HTML', () => {
      const element = getCompiledDirectiveElement($scope, template);

        expect(element.querySelector('h2').textContent).toBe('subheading')
      expect(element.querySelector('img')).toBeFalsy();
    });
  });

  describe('Given markdown is NOT provided', () => {
    let template;

    beforeEach(() => {
        template =
        " \
            <tw-markdown> \
            </tw-markdown>";
    });

    it('should render nothing', () => {
      const element = getCompiledDirectiveElement($scope, template);

      expect(element.textContent).toBe('');
    });
  });

  

  function getCompiledDirectiveElement($scope, template) {
    const element = angular.element(template);
    
    angular.element(document.body).append(element);
    const compiledElement = $compile(element)($scope);

    $scope.$digest();
    return compiledElement[0];
  }
});
