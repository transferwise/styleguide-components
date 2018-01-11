'use strict';

describe('Upload', function() {
  var $compile,
    $rootScope,
    $scope,
    $timeout,
    controller,
    isolateScope,
    directiveElement;

  var INPUT_SELECTOR = '.hidden';
  var LIST_ITEMS_SELECTOR = '.tw-select-option-link';
  var FILTER_INPUT_SELECTOR = '.tw-select-filter';

  beforeEach(module('tw.styleguide.forms'));

  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $compile = $injector.get('$compile');
    $scope = $rootScope.$new();
    $timeout = $injector.get('$timeout');
  }));

  describe('transclusion', function() {
    beforeEach(function() {
      $scope.onUpload = function() {};
      var template = " \
        <tw-upload \
          title='Drag and drop here' \
          buttonText='or click here' \
          placeholder='please choose' \
          on-upload='onUpload' \
          ng-accept='csv'> \
          <a class='transcluded-content'></a> \
        </tw-upload>";
      directiveElement = getCompiledDirectiveElement($scope, template);
    });
    it('should render transcluded content', function() {
      var transcluded = directiveElement.find('.transcluded-content');
      expect(transcluded.length).toBe(1);
    });
  });

  describe('Failure state', function() {
    beforeEach(function() {
      directiveElement = getCompiledDirectiveElement($scope);
      controller = directiveElement.controller('twUpload');
    });
    it('when a big file is sent', function() {
      controller.reset();
      controller.maxSize = 1;
      var file = { size: 2 };

      expect(controller.isError).toBe(false);
      controller.fileDropped(file);
      $timeout.flush(3001);
      expect(controller.isError).toBe(true);
    });
  });

  function getCompiledDirectiveElement($scope, template) {
    if (!template) {
      template = " \
        <tw-upload \
          title='Drag and drop here' \
          buttonText='or click here' \
          placeholder='please choose' \
          on-upload='uploadFunction' \
          ng-accept='csv'> \
        </tw-upload>";
    }
    var element = angular.element(template);
    // append to document so we can test document.activeElement
    angular.element(document.body).append(element);
    var compiledElement = $compile(element)($scope);

    $scope.$digest();
    return compiledElement;
  }
});
