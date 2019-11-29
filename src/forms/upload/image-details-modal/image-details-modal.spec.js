describe('Image details modal', () => {
  let $compile;
  let $scope;
  let component;
  let $rootScope;
  let template;

  beforeEach(() => {
    angular.mock.module('tw.styleguide.forms.upload');

    angular.mock.inject(($injector) => {
      $rootScope = $injector.get('$rootScope');
      $compile = $injector.get('$compile');
      $scope = $rootScope.$new();
    });

    template = ` 
        <tw-image-details-modal
            title="title"
            messages="messages"
            visibility="visibility"
            image="image"
            toggle-modal="toggleModal()"
        >
        </tw-image-details-modal>`;

    $scope.title = 'Test title';
    $scope.messages = [
      {
        message: 'Message 1'
      },
      { message: 'Message 2' }
    ];
    $scope.visibility = true;
    $scope.image = 'data:image/jpg;base64,qwertyuiop==';
    $scope.toggleModal = jasmine.createSpy('toggleModal');
  });

  describe('when modal is shown', () => {
    beforeEach(() => {
      const $component = getComponent($scope, template);
      component = $component[0];
    });

    it('should render the modal title', () => {
      const content = getTextContent(component, '.modal-header h4');
      expect(content).toBe($scope.title);
    });

    it('should render the image', () => {
      const imgSrc = component.querySelector('img').src;
      expect(imgSrc).toBe($scope.image);
    });

    it('should render messages', () => {
      const firstItem = component.querySelectorAll('.modal-body .sad-smiley-list li')[0].textContent;
      const secondItem = component.querySelectorAll('.modal-body .sad-smiley-list li')[1].textContent;
      expect(firstItem).toBe($scope.messages[0].message);
      expect(secondItem).toBe($scope.messages[1].message);
    });

    it('calls toggleModal when clicking close button', () => {
      const closeButton = component.querySelector('.modal-header .close');
      closeButton.click();
      expect($scope.toggleModal).toHaveBeenCalled();
    });
  });

  // eslint-disable-next-line no-shadow
  function getComponent($scope, template) {
    const element = angular.element(template);
    const compiledElement = $compile(element)($scope);
    $scope.$digest();
    return compiledElement;
  }

  function getTextContent(node, cssSelector) {
    const element = node.querySelector(cssSelector);
    const elementContent = element.textContent;
    return elementContent.trim().replace(/\s\s+/g, ' ');
  }
});
