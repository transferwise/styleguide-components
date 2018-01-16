class PopOverController {
  constructor($element, PopoverService) {
    this.element = $element[0];
    this.popoverService = PopoverService;

    this.registerEventListeners = this.registerEventListeners.bind(this);
    this.showPopover = (event) => {
      event.preventDefault();
      return this.popoverService.showPopover(
        this.element,
        getElementOptions(this.element),
      );
    };
  }

  $onInit() {
    this.element.setAttribute('tabindex', '0');
    this.element.setAttribute('role', 'button');
    this.element.setAttribute('data-toggle', 'popover');

    this.unregisterEventListeners = this.registerEventListeners(getTriggeringEvent(this.element));
  }

  $onDestroy() {
    this.unregisterEventListeners();
  }

  registerEventListeners(triggeringEvent) {
    if (triggeringEvent === 'hover') {
      this.element.addEventListener('mouseover', this.showPopover);
      this.element.addEventListener('mouseout', this.popoverService.hidePopover);
    } else {
      this.element.addEventListener('click', this.showPopover);
    }

    return function unregisterListeners() {
      if (triggeringEvent === 'hover') {
        this.element.removeEventListener('mouseover', this.showPopover);
        this.element.removeEventListener('mouseout', this.popoverService.hidePopover);
      } else {
        this.element.removeEventListener('click', this.showPopover);
      }
    };
  }
}

/**
 * [getTriggeringEvent Get the triggering event that was passed to this
 *                     directive via data attributes, i.e. as a value
 *                     ['click' | 'hover'] in the data-trigger attribute]
 * @return {String}   [Triggering event]
 */
function getTriggeringEvent(element) {
  const popoverOptions = getElementOptions(element);

  return popoverOptions && popoverOptions.trigger;
}

/**
 * [getElementOptions             Extract all the values passed through data
 *                                attributes to the popover directive]
 * @param  {HTMLElement} element [Element for which we want to extract the values
 *                                from predefined data attributes]
 * @return {Object}              [Map of data attributes and their values]
 */
function getElementOptions(element) {
  let options = {
    trigger: 'click',
    placement: 'right'
  };

  const dataAttributes = [
    'placement',
    'title',
    'content',
    'trigger',
    'template',
    'image',
    'container'
  ];

  options = dataAttributes.reduce((accumulatedOptions, dataAttr) => {
    if (element.dataset[dataAttr]) {
      accumulatedOptions[dataAttr] = element.dataset[dataAttr];
    }
    return accumulatedOptions;
  }, options);

  /**
   * Special cases
   */
  if (element.dataset.originalTitle) {
    options.title = element.dataset.originalTitle;
  }

  if (element.dataset.contentHtml) {
    options.contentHtml = element.dataset.contentHtml === 'true';
  }

  return options;
}

PopOverController.$inject = ['$element', 'twPopOverService'];

export default PopOverController;
