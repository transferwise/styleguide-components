export default function () {
  const BODY = document.getElementsByTagName('body')[0];
  const POPOVER_SPACING = 8;

  let popover = null;
  let enhancedElement = null;
  let elementPlacement = 'right';

  function showPopover(elementWithPopover, popoverOptions) {
    if (elementWithPopover instanceof HTMLElement && isOptionsObject(popoverOptions)) {
      enhancedElement = elementWithPopover;
      elementPlacement = getPopoverPlacement(popoverOptions);

      const popoverAppendedToBody = Array.from(BODY.children).includes(popover);

      if (!popoverAppendedToBody) {
        popover = getPopover(elementPlacement);
        BODY.appendChild(popover);
      }

      popover.innerHTML = getPopoverContent(popoverOptions);
      compose(displayPopover, setPopoverPosition)(elementPlacement);
    } else throw Error('Invalid element type or options object passed as arguments');
  }

  function getPopover(popoverPlacement) {
    const popoverContainer = document.createElement('div');

    popoverContainer.classList.add('popover', 'in', popoverPlacement, 'animate', 'scale-down');
    popoverContainer.setAttribute('role', 'popover');

    return popoverContainer;
  }

  function setPopoverPosition(popoverPlacement) {
    popover.setAttribute('style', 'display:block; visibility:hidden;');

    const { offsetX, offsetY } = getPopoverPosition(popoverPlacement);

    popover.setAttribute(
      'style',
      `display:block; visibility:visible; top:${offsetY}px; left:${offsetX}px`,
    );
  }

  function getPopoverPosition(popoverPlacement) {
    const verifyPopoverPlacement = compose(updatePopoverClass, checkPopoverPlacement);

    return compose(getPopoverCoordinates, verifyPopoverPlacement)(popoverPlacement);
  }

  function updatePopoverClass(popoverPlacement) {
    const popoverPlacements = ['left', 'right', 'bottom', 'top'];

    popover.classList.remove(...popoverPlacements);
    popover.classList.add(popoverPlacement);

    return popoverPlacement;
  }

  function checkPopoverPlacement(popoverPlacement) {
    const viewportOffsetDimensions = getOffsetDimensions(document.documentElement);

    const elementOffsetDimensions = getOffsetDimensions(enhancedElement);
    const elementOffset = getBoundingOffset(enhancedElement);

    const popoverOffsetDimensions = getOffsetDimensions(popover);

    const popoverOffsetWidth = elementOffset.offsetX +
      elementOffsetDimensions.offsetWidth + POPOVER_SPACING +
      popoverOffsetDimensions.offsetWidth;
    const popoverLeftOffset = elementOffset.offsetX -
      (popoverOffsetDimensions.offsetWidth + POPOVER_SPACING);

    /**
     * If it sticks outside on both sides, put it on the bottom
     */
    if ((popoverOffsetWidth > viewportOffsetDimensions.offsetWidth) && popoverLeftOffset < 0) {
      popoverPlacement = 'bottom';
    }

    if (popoverPlacement === 'right' && (popoverOffsetWidth > viewportOffsetDimensions.offsetWidth)) {
      popoverPlacement = 'left';
    }

    if (popoverPlacement === 'left' && popoverLeftOffset < 0) {
      popoverPlacement = 'right';
    }

    return popoverPlacement;
  }

  function getPopoverCoordinates(popoverPlacement) {
    /**
     * The element's coordinates, for which we want to display the popover
     */
    const elementOffset = getBoundingOffset(enhancedElement);

    /**
     * The element's size, for which we want to display the popover
     */
    const elementOffsetDimensions = getOffsetDimensions(enhancedElement);

    /**
     * Popover's default coordinates
     */
    let popoverOffsets = {
      offsetX: 0,
      offsetY: 0,
    };

    const popoverOffsetDimensions = getOffsetDimensions(popover);
    const popoverBorderTop = compose(getNumericValue('border-top'), getComputedStyle)(popover);

    /*
     * The visible arrow is a pseudo-element
     */
    const popoverArrowStyles = getComputedStyle(popover, ':before');

    const popoverArrowTopOffset = getNumericValue('top')(popoverArrowStyles);
    const popoverArrowHeight = getNumericValue('height')(popoverArrowStyles);
    const popoverArrowMarginTop = getNumericValue('margin-top')(popoverArrowStyles);

    if (popoverPlacement === 'top') {
      popoverOffsets = {
        offsetX: (elementOffset.offsetX - (popoverOffsetDimensions.offsetWidth / 2)) +
          (elementOffsetDimensions.offsetWidth / 2),
        offsetY: elementOffset.offsetY -
          popoverOffsetDimensions.offsetHeight - POPOVER_SPACING,
      };
    }

    if (popoverPlacement === 'right') {
      const popoverOffsetX = elementOffset.offsetX +
        elementOffsetDimensions.offsetWidth + POPOVER_SPACING;
      const popoverOffsetY =
        (elementOffset.offsetY -
        (popoverBorderTop + popoverArrowTopOffset + popoverArrowMarginTop +
          (popoverArrowHeight / 2))) +
        (elementOffsetDimensions.offsetHeight / 2);

      popoverOffsets = {
        offsetX: popoverOffsetX,
        offsetY: popoverOffsetY,
      };
    }

    if (popoverPlacement === 'bottom') {
      popoverOffsets = {
        offsetX: (elementOffset.offsetX - (popoverOffsetDimensions.offsetWidth / 2)) +
          (elementOffsetDimensions.offsetWidth / 2),
        offsetY: elementOffset.offsetY +
          elementOffsetDimensions.offsetHeight + POPOVER_SPACING,
      };
    }

    if (popoverPlacement === 'left') {
      const popoverOffsetX = elementOffset.offsetX -
        popoverOffsetDimensions.offsetWidth - POPOVER_SPACING;
      const popoverOffsetY =
        (elementOffset.offsetY -
        (popoverBorderTop + popoverArrowTopOffset + popoverArrowMarginTop +
          (popoverArrowHeight / 2))) +
        (elementOffsetDimensions.offsetHeight / 2);

      popoverOffsets = {
        offsetX: popoverOffsetX,
        offsetY: popoverOffsetY,
      };
    }

    return popoverOffsets;
  }

  function hideCallback(event) {
    if (popover) {
      const clickedOutsidePopover = !popover.contains(event.target);
      const clickedInsidePopover = popover.contains(event.target);
      const clickedPopoverClose = event.target.classList.contains('popover-close');

      if (clickedOutsidePopover || (clickedInsidePopover && clickedPopoverClose)) {
        hidePopover();
      }
    }
  }

  function repositionCallback() {
    if (enhancedElement instanceof HTMLElement && popover) {
      setPopoverPosition(elementPlacement);
    }
  }

  function registerGlobalEventListeners() {
    document.documentElement.addEventListener('click', hideCallback, true);
    window.addEventListener('resize', repositionCallback);
  }

  function getBoundingOffset(element) {
    const elementRect = element.getBoundingClientRect();
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    return {
      offsetY: elementRect.top + scrollTop,
      offsetX: elementRect.left + scrollLeft,
    };
  }

  function getOffsetDimensions(element) {
    return {
      offsetWidth: element.offsetWidth,
      offsetHeight: element.offsetHeight,
    };
  }

  function getPopoverPlacement(popoverOptions) {
    return curry(getObjectProperty)('placement')(popoverOptions);
  }

  function getGivenPopoverTemplate(popoverOptions) {
    return curry(getObjectProperty)('html')(popoverOptions);
  }

  function getNumericValue(property) {
    return compose(parseInt, curry(getPropertyValue)(property));
  }

  function getPropertyValue(prop, obj) {
    return obj.getPropertyValue(prop);
  }

  function displayPopover() {
    return removePopoverClass('scale-down');
  }

  function hidePopover() {
    return addPopoverClass('scale-down');
  }

  function removePopoverClass(cssClass) {
    return curry(removeClass)(popover)(cssClass);
  }

  function addPopoverClass(cssClass) {
    return curry(addClass)(popover)(cssClass);
  }

  function removeClass(element, cssClass) {
    element.classList.remove(cssClass);

    return cssClass;
  }

  function addClass(element, cssClass) {
    element.classList.add(cssClass);

    return cssClass;
  }

  /**
   * [getPopoverTemplate Each value in the template, which is equivalent to the
   *                     keys of the binded object, is prefixed and suffixed with
   *                     '__'. For example '__title__' corresponds to the value
   *                     of the 'title' property of the binded object.]
   * @return {String}   [Popover template]
   */
  function getPopoverTemplate() {
    return `
      <button class='close popover-close'>&times;</button>
      <h3 class='popover-title'>__title__</h3>
      <div class='popover-content'>
        __content__
      </div>`;
  }

  function bindDataToTemplate(template, data) {
    return template.replace(
      /__(\w*)__/g,
      (matchedSubstring, parenthesizedSubmatch) =>
        (Object.prototype.hasOwnProperty.call(data, parenthesizedSubmatch)
          ? data[parenthesizedSubmatch]
          : ''),
    );
  }

  function getPopoverContent(options) {
    const optionsTemplate = getGivenPopoverTemplate(options);

    return bindDataToTemplate((optionsTemplate || getPopoverTemplate()), options);
  }

  function isOptionsObject(object) {
    return curry(looksLike)({
      title: 'Popover title',
      content: 'Popover content',
    })(object);
  }

  function looksLike(a, b) {
    return a && b && Object.keys(a).every(aKey => Object.prototype.hasOwnProperty.call(b, aKey));
  }

  /**
   * FP helper functions
   */
  function compose(...fns) {
    return fns.reverse().reduce((fn1, fn2) => (...args) => fn2(fn1(...args)));
  }

  function curry(fn, arity = fn.length) {
    return (function nextCurried(prevArgs) {
      return (nextArg) => {
        const args = prevArgs.concat([nextArg]);

        if (args.length >= arity) {
          return fn(...args);
        }
        return nextCurried(args);
      };
    }([]));
  }

  function getObjectProperty(property, object) {
    return object[property];
  }

  /**
   * Instead of exposing the methods and handling the responsability of things
   * such as closing the popover when clicking outside of it or keeping the
   * position relative to its pointing element consistent when the viewport
   * is resizing, we register the event listeners once, benefiting from the
   * singleton nature of Services
   */
  registerGlobalEventListeners();

  /**
   * Expose the public API of the popover service
   */
  return {
    showPopover,
    hidePopover,
  };
}
