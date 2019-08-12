'use strict';

describe('Upload', function() {
  var $compile,
    $rootScope,
    $scope,
    $timeout,
    isolateScope,
    directiveElement;

  var INPUT_SELECTOR = '.hidden';
  var LIST_ITEMS_SELECTOR = '.tw-select-option-link';
  var FILTER_INPUT_SELECTOR = '.tw-select-filter';

  beforeEach(function() {
    module('tw.styleguide.forms');

    inject(function($injector) {
      $rootScope = $injector.get('$rootScope');
      $compile = $injector.get('$compile');
      $scope = $rootScope.$new();
      $timeout = $injector.get('$timeout');
    });
  });

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
      var template = " \
        <tw-upload \
          too-large-message='File is too large' \
          max-size='1'> \
        </tw-upload>";
      directiveElement = getCompiledDirectiveElement($scope, template);
    });
    it('when a big file is sent', function() {
      var fakeDropEvent = new CustomEvent('drop'); // file drop can be mocked
      fakeDropEvent.dataTransfer = { files : [{ size: 2 }] };
      directiveElement[0].dispatchEvent(fakeDropEvent);

      // after 4.1s the failure flow shall be done
      $timeout.flush(4100);
      // and complete-card is visible
      var completeCard = directiveElement.find('.droppable-complete-card[aria-hidden="false"]');
      expect(completeCard.text().trim()).toBe('File is too large');
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
