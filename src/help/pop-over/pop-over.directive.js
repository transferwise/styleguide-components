export default function () {
  return {
    restrict: 'A',
    controller: PopOverController,
  };
}

PopOverController.$inject = ['$scope', '$element', 'twPopOverService'];

function PopOverController($scope, $element, PopoverService) {
  const ELEMENT = $element[0];

  ELEMENT.setAttribute('tabindex', '0');
  ELEMENT.setAttribute('role', 'button');
  ELEMENT.setAttribute('data-toggle', 'popover');

  ELEMENT.addEventListener('click', ELEMENT_CALLBACK);
  document.documentElement.addEventListener('click', PopoverService.hide, true);
  window.addEventListener('resize', PopoverService.reposition);

  $scope.$on('destroy', () => {
    ELEMENT.removeEventListener('click', ELEMENT_CALLBACK);
    document.documentElement.removeEventListener('click', PopoverService.hide, true);
    window.removeEventListener('resize', PopoverService.reposition);
  });

  /**
   * [ELEMENT_CALLBACK  We need to bake the element callback in order to be able
   *                    to unregister it when the scope is unmounted / destroyed]
   */
  function ELEMENT_CALLBACK() {
    const ELEMENT_OPTIONS = getElementOptions(ELEMENT);

    PopoverService.show(ELEMENT, ELEMENT_OPTIONS);
  }
}

function getElementOptions(element) {
  const OPTIONS = {
    placement: 'right',
  };

  if (element.dataset.placement) {
    OPTIONS.placement = element.dataset.placement;
  }
  if (element.dataset.title) {
    OPTIONS.title = element.dataset.title;
  }
  if (element.dataset.originalTitle) {
    OPTIONS.title = element.dataset.originalTitle;
  }
  if (element.dataset.content) {
    OPTIONS.content = `, do not use with user entered data
    , do not use with user entered data
    , do not use with user entered data
    , do not use with user entered data
    , do not use with user entered data
      `;
  }
  if (element.dataset.contentHtml) {
    OPTIONS.html = true; // TODO add support for this
  }

  return OPTIONS;
}
