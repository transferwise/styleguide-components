function PopOverController($scope, $element, PopoverService) {
  const ELEMENT = $element[0];
  const unregisterEventListeners = registerEventListeners(getTriggeringEvent());

  ELEMENT.setAttribute('tabindex', '0');
  ELEMENT.setAttribute('role', 'button');
  ELEMENT.setAttribute('data-toggle', 'popover');

  $scope.$on('$destroy', unregisterEventListeners);

  function registerEventListeners(triggeringEvent) {
    if (triggeringEvent === 'hover') {
      ELEMENT.addEventListener('mouseover', showPopover);
      ELEMENT.addEventListener('mouseout', PopoverService.hidePopover);
    } else {
      ELEMENT.addEventListener('click', showPopover);
    }

    return function unregisterListeners() {
      if (triggeringEvent === 'hover') {
        ELEMENT.removeEventListener('mouseover', showPopover);
        ELEMENT.removeEventListener('mouseout', PopoverService.hidePopover);
      } else {
        ELEMENT.removeEventListener('click', showPopover);
      }
    };
  }

  /**
   * [showPopover  We need to bake the element callback in order to be able
   *               to unregister it when the scope is unmounted / destroyed]
   */
  function showPopover() {
    return PopoverService.showPopover(ELEMENT, getElementOptions(ELEMENT));
  }

  /**
   * [getTriggeringEvent Get the triggering event that was passed to this
   *                     directive via data attributes, i.e. as a value
   *                     ['click' | 'hover'] in the data-trigger attribute]
   * @return {String}   [Triggering event]
   */
  function getTriggeringEvent() {
    const popoverOptions = getElementOptions(ELEMENT);

    return popoverOptions && popoverOptions.trigger;
  }
}

/**
 * [getElementOptions             Extract all the values passed through data
 *                                attributes to the popover directive]
 * @param  {HTMLElement} element [Element for which we want to extract the values
 *                                from predefined data attributes]
 * @return {Object}              [Map of data attributes and their values]
 */
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
  if (element.dataset.trigger) {
    options.trigger = element.dataset.trigger;
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
