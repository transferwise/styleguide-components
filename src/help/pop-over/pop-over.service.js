export default function () {
  const BODY = document.getElementsByTagName('body')[0];
  const POPOVER_SPACING = 8;

  let popover = null;
  let elementWithPopover = null;
  let popoverPosition = 'right';

  function showPopover(highlightedElement, popoverOptions) {
    if (highlightedElement instanceof HTMLElement && isOptionsObject(popoverOptions)) {
      elementWithPopover = highlightedElement;
      popoverPosition = getPopoverPlacement(popoverOptions);

      if (!document.body.contains(popover)) {
        popover = getPopover(popoverPosition);
        BODY.appendChild(popover);
      }

      popover.innerHTML = getPopoverContent(popoverOptions);
      compose(displayPopover, setPopoverPosition)(popoverPosition);
    } else {
      throw Error('Invalid element type or options object passed as arguments');
    }
  }

  function getPopover(popoverPlacement) {
    const popoverContainer = document.createElement('div');
    const popoverClasses = ['popover', 'in', popoverPlacement, 'animate', 'scale-down'];

    popoverContainer.classList.add(...popoverClasses);
    popoverContainer.setAttribute('role', 'popover');

    return popoverContainer;
  }

  function setPopoverPosition(popoverPlacement) {
    popover.setAttribute('style', 'display:block; visibility:hidden;');

    const { offsetX, offsetY } = getPopoverPosition(popoverPlacement);

    popover.setAttribute(
      'style',
      `display:block; visibility:visible; top:${offsetY}px; left:${offsetX}px`
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

    const elementOffsetDimensions = getOffsetDimensions(elementWithPopover);
    const elementOffset = getBoundingOffset(elementWithPopover);

    const popoverOffsetDimensions = getOffsetDimensions(popover);

    const popoverOffsetWidth = elementOffset.offsetX +
      elementOffsetDimensions.offsetWidth + POPOVER_SPACING +
      popoverOffsetDimensions.offsetWidth;
    const popoverLeftOffset = elementOffset.offsetX -
      (popoverOffsetDimensions.offsetWidth + POPOVER_SPACING);

    const overflowsRight = popoverOffsetWidth > viewportOffsetDimensions.offsetWidth;
    const overflowsLeft = popoverLeftOffset < 0;

    /**
     * If it sticks outside on both sides, put it on the bottom
     */
    if (overflowsRight && overflowsLeft) {
      popoverPlacement = 'bottom';
    }

    if (popoverPlacement === 'right' && overflowsRight) {
      popoverPlacement = 'left';
    }

    if (popoverPlacement === 'left' && overflowsLeft) {
      popoverPlacement = 'right';
    }

    return popoverPlacement;
  }

  function getPopoverCoordinates(popoverPlacement) {
    /**
     * The element's coordinates, for which we want to display the popover
     */
    const elementOffset = getBoundingOffset(elementWithPopover);

    /**
     * The element's size, for which we want to display the popover
     */
    const elementOffsetDimensions = getOffsetDimensions(elementWithPopover);

    /**
     * Popover's default coordinates
     */
    let popoverOffsets = {
      offsetX: 0,
      offsetY: 0,
    };

    const popoverOffsetDimensions = getOffsetDimensions(popover);

    /*
     * The visible arrow is a pseudo-element
     */
    const popoverArrowStyles = getComputedStyle(popover, ':before');

    const popoverArrowTopOffset = getNumericValue('top')(popoverArrowStyles);
    const popoverArrowHeight = getNumericValue('height')(popoverArrowStyles);
    const popoverArrowMarginTop = getNumericValue('margin-top')(popoverArrowStyles);

    if (popoverPlacement === 'top') {
      const popoverOffsetX = (elementOffset.offsetX -
        (popoverOffsetDimensions.offsetWidth / 2)) +
        (elementOffsetDimensions.offsetWidth / 2);
      const popoverOffsetY = elementOffset.offsetY -
        popoverOffsetDimensions.offsetHeight - POPOVER_SPACING;

      popoverOffsets = {
        offsetX: popoverOffsetX,
        offsetY: popoverOffsetY,
      };
    }

    if (popoverPlacement === 'right') {
      const popoverOffsetX = elementOffset.offsetX +
        elementOffsetDimensions.offsetWidth + POPOVER_SPACING;
      const popoverOffsetY =
        (elementOffset.offsetY -
        (popoverArrowTopOffset + popoverArrowMarginTop +
          (popoverArrowHeight / 2))) +
        (elementOffsetDimensions.offsetHeight / 2);

      popoverOffsets = {
        offsetX: popoverOffsetX,
        offsetY: popoverOffsetY,
      };
    }

    if (popoverPlacement === 'bottom') {
      const popoverOffsetX = (elementOffset.offsetX -
        (popoverOffsetDimensions.offsetWidth / 2)) +
        (elementOffsetDimensions.offsetWidth / 2);
      const popoverOffsetY = elementOffset.offsetY +
        elementOffsetDimensions.offsetHeight + POPOVER_SPACING;

      popoverOffsets = {
        offsetX: popoverOffsetX,
        offsetY: popoverOffsetY,
      };
    }

    if (popoverPlacement === 'left') {
      const popoverOffsetX = elementOffset.offsetX -
        popoverOffsetDimensions.offsetWidth - POPOVER_SPACING;
      const popoverOffsetY =
        (elementOffset.offsetY -
        (popoverArrowTopOffset + popoverArrowMarginTop +
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
    if (elementWithPopover instanceof HTMLElement && popover) {
      setPopoverPosition(popoverPosition);
    }
  }

  /**
   * Instead of exposing the methods and handling the responsability of things
   * such as closing the popover when clicking outside of it or keeping the
   * position relative to its pointing element consistent when the viewport
   * is resizing, we register the event listeners once, taking advantage of the
   * singleton nature of Services
   */
  function registerGlobalEventListeners() {
    document.documentElement.addEventListener('click', hideCallback, true);
    window.addEventListener('resize', repositionCallback);
  }

  /**
   * [unregisterGlobalEventListeners This should be called when the scope that
   *                                 uses this service gets destroyed to prevent
   *                                 memory leeks]
   */
  function unregisterGlobalEventListeners() {
    document.documentElement.removeEventListener('click', hideCallback, true);
    window.removeEventListener('resize', repositionCallback);
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

  function getNumericValue(property) {
    return compose(parseInt, curry(getPropertyValue)(property));
  }

  function getPropertyValue(prop, obj) {
    return obj.getPropertyValue(prop);
  }

  function displayPopover() {
    return removeClass(popover, 'scale-down');
  }

  function hidePopover() {
    return addClass(popover, 'scale-down');
  }

  function removeClass(element, cssClass) {
    element.classList.remove(cssClass);

    return cssClass;
  }

  function addClass(element, cssClass) {
    element.classList.add(cssClass);

    return cssClass;
  }

  function getPopoverPlacement(popoverOptions) {
    return curry(getObjectProperty)('placement')(popoverOptions);
  }

  function getGivenPopoverTemplate(popoverOptions) {
    return curry(getObjectProperty)('html')(popoverOptions);
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
    /**
     * \w stands for "word character", usually [A-Za-z0-9_]
     * '*' stands for Zero or more times
     *
     * For example, if the RegEX /(\a+)(\b+)/ was given,
     * parenthesizedSubmatch is the match for \a+
     *
     * Thus, match all the word characters prefixed and suffixed by two __
     * get their parenthesized submatch value and replace them in the @template with
     * data found at the parenthesized submatch property on the @data object
     */
    return template.replace(
      /__(\w*)__/g,
      (matchedSubstring, parenthesizedSubmatch) =>
        (Object.prototype.hasOwnProperty.call(data, parenthesizedSubmatch)
          ? data[parenthesizedSubmatch]
          : '')
    );
  }

  function getPopoverContent(options) {
    const optionsTemplate = getGivenPopoverTemplate(options);

    return bindDataToTemplate((optionsTemplate || getPopoverTemplate()), options);
  }

  /**
   * [isOptionsObject          Define which properties should be mandatory when
   *                           passing the popover options object to the
   *                           @showPopover method]
   * @param  {Object}  object [Popover options object]
   * @return {Boolean}        [Valid popover options]
   */
  function isOptionsObject(object) {
    return curry(looksLike)({
      title: 'Popover title',
      content: 'Popover content',
    })(object);
  }

  function looksLike(firstObject, secondObject) {
    return (
      firstObject &&
      secondObject &&
      Object.keys(firstObject).every(firstObjectKey =>
        Object.prototype.hasOwnProperty.call(secondObject, firstObjectKey))
    );
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

  registerGlobalEventListeners();

  /**
   * Expose the public API of the popover service
   */
  return {
    showPopover,
    hidePopover,
    unregisterGlobalEventListeners,
  };
}
