function PopOverController($scope, $element, PopoverService) {
  const ELEMENT = $element[0];

  ELEMENT.setAttribute('tabindex', '0');
  ELEMENT.setAttribute('role', 'button');
  ELEMENT.setAttribute('data-toggle', 'popover');

  ELEMENT.addEventListener('click', ELEMENT_CALLBACK);

  $scope.$on('$destroy', () => {
    ELEMENT.removeEventListener('click', ELEMENT_CALLBACK);
  });

  /**
   * [ELEMENT_CALLBACK  We need to bake the element callback in order to be able
   *                    to unregister it when the scope is unmounted / destroyed]
   */
  function ELEMENT_CALLBACK() {
    const popoverOptions = getElementOptions(ELEMENT);

    PopoverService.showPopover(ELEMENT, popoverOptions);
  }
}

function getElementOptions(element) {
  const options = {
    placement: 'right',
  };

  if (element.dataset.placement) {
    options.placement = element.dataset.placement;
  }
  if (element.dataset.title) {
    options.title = element.dataset.title;
  }
  if (element.dataset.originalTitle) {
    options.title = element.dataset.originalTitle;
  }
  if (element.dataset.content) {
    options.content = element.dataset.content;
  }
  if (element.dataset.contentHtml) {
    options.html = element.dataset.contentHtml;
  }

  return options;
}

PopOverController.$inject = ['$scope', '$element', 'twPopOverService'];

export default function () {
  return {
    restrict: 'A',
    controller: PopOverController,
  };
}
