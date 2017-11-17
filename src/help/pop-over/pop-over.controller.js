class PopOverController {
  constructor($element, PopoverService) {
    this.element = $element[0];
    this.popoverService = PopoverService;

    this.registerEventListeners = this.registerEventListeners.bind(this);
    this.showPopover = this.showPopover.bind(this);
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

  showPopover() {
    const promotedElement = this.element;

    return this.popoverService.showPopover(promotedElement, getElementOptions(promotedElement));
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
  const options = {
    trigger: 'click',
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
  if (element.dataset.template) {
    options.template = element.dataset.template;
  }
  if (element.dataset.html) {
    options.html = element.dataset.html === 'true';
  }
  if (element.dataset.image) {
    options.image = element.dataset.image;
  }

  return options;
}

PopOverController.$inject = ['$element', 'twPopOverService'];

export default PopOverController;
