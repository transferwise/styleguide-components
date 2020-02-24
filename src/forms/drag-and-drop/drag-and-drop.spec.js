
describe('given drag and drop directives', () => {
  let $compile;
  let $rootScope;
  let $scope;
  let element;

  beforeEach(() => {
    angular.mock.module('tw.styleguide.forms.drag-and-drop');

    angular.mock.inject(($injector) => {
      $rootScope = $injector.get('$rootScope');
      $compile = $injector.get('$compile');
      $scope = $rootScope.$new();
    });

    $scope.onDragEnter = jasmine.createSpy('onDragEnter');
    $scope.onDragLeave = jasmine.createSpy('onDragLeave');
    $scope.onDrop = jasmine.createSpy('onDrop');

    element = getCompiledTemplate($scope);
  });

  describe('when a file is dragged over the element', () => {
    beforeEach(() => {
      element.dispatchEvent(new CustomEvent('dragenter'));
      $scope.$apply();
    });

    it('should trigger the twDragEnter handler', () => {
      expect($scope.onDragEnter).toHaveBeenCalled();
    });
  });

  describe('when the dragged file leaves the element', () => {
    beforeEach(() => {
      element.dispatchEvent(new CustomEvent('dragleave'));
      $scope.$apply();
    });

    it('should trigger the twDragLeave handler', () => {
      expect($scope.onDragLeave).toHaveBeenCalled();
    });
  });

  describe('when files are dropped', () => {
    const files = [{ size: 2 }];

    beforeEach(() => {
      const fakeDropEvent = new CustomEvent('drop');
      fakeDropEvent.dataTransfer = { files };
      element.dispatchEvent(fakeDropEvent);
      $scope.$apply();
    });

    it('should trigger the onDrop handler', () => {
      expect($scope.onDrop).toHaveBeenCalledWith(files);
    });
  });

  function getCompiledTemplate($scope, template) {
    if (!template) {
      template = " \
        <div \
          tw-drop='onDrop(files)' \
          tw-drag-enter='onDragEnter()' \
          tw-drag-leave='onDragLeave()'> \
        </div>";
    }
    const element = angular.element(template);
    // append to document so we can test document.activeElement
    angular.element(document.body).append(element);
    const compiledElement = $compile(element)($scope);

    $scope.$digest();
    return compiledElement[0];
  }
});
