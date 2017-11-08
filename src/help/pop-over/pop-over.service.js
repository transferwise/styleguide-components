export default function () {
  /**
   * Register the global event listeners for clicks on the body element and
   * viewport resizing
   */
  registerGlobalEventListeners();

  const BODY = document.getElementsByTagName('body')[0];
  const POPOVER_SPACING = 8;

  let elementWithPopover = null;

  let popover = null;
  let popoverPosition = 'right';

  /**
   * [showPopover          Call this method to display a popover next to an
   *                       element]
   * @param  {HTMLElement} highlightedElement [Element for which we want to show
   *                                           a popover]
   * @param  {Object}      popoverOptions     [Map of key value options which
   *                                           include the title, content,
   *                                           template and other data and
   *                                           metadata for the popover]
   * @return {null}
   */
  function showPopover(highlightedElement, popoverOptions) {
    if (highlightedElement instanceof HTMLElement && validateOptions(popoverOptions)) {
      elementWithPopover = highlightedElement;
      popoverPosition = getPopoverPlacement(popoverOptions);

      if (!document.body.contains(popover)) {
        popover = getPopover(popoverPosition);
        BODY.appendChild(popover);
      }

      popover.innerHTML = getPopoverContent(popoverOptions);
      compose(displayPopover, setPopoverPosition)(popoverPosition);
    } else {
      throw Error('Invalid element type or options object passed to the @showPopover function');
    }
  }

  /**
   * [getPopover                        Gets the popover container in which we
   *                                    will append the binded content to the
   *                                    template]
   * @param  {String} placement        [Can be either 'top', 'right', 'bottom',
   *                                    'left']
   * @return {HTMLElement}             [Popover container]
   */
  function getPopover(placement) {
    const popoverContainer = document.createElement('div');
    const popoverClasses = [
      'popover', 'in', placement, 'animate', 'scale-down'
    ];

    popoverContainer.classList.add(...popoverClasses);
    popoverContainer.setAttribute('role', 'popover');

    return popoverContainer;
  }

  /**
   * [setPopoverPosition        Based on the @placement, we compute and set the
   *                            popover's coordinates relative to its pointing
   *                            element]
   * @param {String} placement [Can be either 'top', 'right', 'bottom', 'left']
   */
  function setPopoverPosition(placement) {
    popover.setAttribute('style', 'display:block; visibility:hidden;');

    const { offsetX, offsetY } = getPopoverPosition(placement);

    popover.setAttribute(
      'style',
      `display:block; visibility:visible; top:${offsetY}px; left:${offsetX}px`
    );
  }

  /**
   * [getPopoverPosition         Before computing the coordinates of the popover,
   *                             it checks if the @placement is not causing the
   *                             popover to overflow. If it's causing it to
   *                             overflow, we switch the placement]
   * @param  {String} placement [Can be either 'top', 'right', 'bottom', 'left']
   * @return {Object}           [Popover coordinates]
   */
  function getPopoverPosition(placement) {
    const verifyPopoverPlacement = compose(updatePopoverClass, checkPopoverPlacement);

    return compose(getPopoverCoordinates, verifyPopoverPlacement)(placement);
  }

  /**
   * [updatePopoverClass         Update the CSS class that denotes the
   *                             @placement of the @popover]
   * @param  {String} placement [Can be either 'top', 'right', 'bottom', 'left']
   * @return {String}           [Popover's new placement]
   */
  function updatePopoverClass(placement) {
    const popoverPlacements = ['left', 'right', 'bottom', 'top'];

    popover.classList.remove(...popoverPlacements);
    popover.classList.add(placement);

    return placement;
  }

  /**
   * [checkPopoverPlacement      Check if the @placement is not making the
   *                             @popover overflow the viewport]
   * @param  {String} placement [Can be either 'top', 'right', 'bottom', 'left']
   * @return {String}           [Popover's new placement]
   */
  function checkPopoverPlacement(placement) {
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

    if (overflowsRight && overflowsLeft) {
      placement = 'bottom';
    }

    if (placement === 'right' && overflowsRight) {
      placement = 'left';
    }

    if (placement === 'left' && overflowsLeft) {
      placement = 'right';
    }

    return placement;
  }

  /**
   * [getPopoverCoordinates      Computes and returns the popover coordinates
   *                             relative to the pointing element]
   * @param  {String} placement [Can be either 'top', 'right', 'bottom', 'left']
   * @return {Object}           [Popover's coordinates]
   */
  function getPopoverCoordinates(placement) {
    /**
     * The promoted element's coordinates, for which we want to display the popover
     */
    const elementOffset = getBoundingOffset(elementWithPopover);

    /**
     * The promoted element's size, for which we want to display the popover
     */
    const elementOffsetDimensions = getOffsetDimensions(elementWithPopover);

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

    if (placement === 'top') {
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

    if (placement === 'right') {
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

    if (placement === 'bottom') {
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

    if (placement === 'left') {
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

  /**
   * [registerGlobalEventListeners Instead of exposing the methods and handling
   *                               the responsability of things such as closing
   *                               the popover when clicking outside of it or
   *                               keeping the position relative to its pointing
   *                               element consistent when the viewport is
   *                               resizing, we register the event listeners
   *                               once, taking advantage of the singleton
   *                               nature of Services]
   * @return {null}
   */
  function registerGlobalEventListeners() {
    document.documentElement.addEventListener('click', documentCallback, true);
    window.addEventListener('resize', resizeCallback);
  }

  /**
   * [unregisterGlobalEventListeners This should be called when the scope that
   *                                 uses this service gets destroyed to prevent
   *                                 memory leeks]
   * @return {null}
   */
  function unregisterGlobalEventListeners() {
    document.documentElement.removeEventListener('click', documentCallback, true);
    window.removeEventListener('resize', resizeCallback);
  }

  /**
   * [documentCallback       Callback to check for clicks outside the popover
   *                         element OR on the element with the .popover-close
   *                         class inside the popover]
   * @param  {Object} event [An object that implements the Event interface]
   * @return {null}
   */
  function documentCallback(event) {
    if (popover) {
      const clickedOutsidePopover = !popover.contains(event.target);
      const clickedInsidePopover = popover.contains(event.target);
      const clickedPopoverClose = event.target.classList.contains('popover-close');

      if (clickedOutsidePopover || (clickedInsidePopover && clickedPopoverClose)) {
        hidePopover();
      }
    }
  }

  /**
   * [resizeCallback          Callback to keep the positioning of the popover
   *                          consistent when the viewport resizes]
   * @return {null}
   */
  function resizeCallback() {
    if (elementWithPopover instanceof HTMLElement && popover) {
      setPopoverPosition(popoverPosition);
    }
  }

  /**
   * [getBoundingOffset            Get the X and Y coordinates of the element on
   *                               the page]
   * @param {HTMLElement} element [Element for which we want to get the coordinates]
   *
   * @return {Object}             [Coordinates of the element]
   */
  function getBoundingOffset(element) {
    const elementRect = element.getBoundingClientRect();
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    return {
      offsetY: elementRect.top + scrollTop,
      offsetX: elementRect.left + scrollLeft,
    };
  }

  /**
   * [getOffsetDimensions         Get the element's offset dimensions,
   *                              i.e. measurement which includes the element
   *                              borders, the element horizontal padding, the
   *                              element vertical scrollbar (if present, if
   *                              rendered) and the element CSS width]
   * @param {HTMLElement} element
   *
   * @return {Object}
   */
  function getOffsetDimensions(element) {
    return {
      offsetWidth: element.offsetWidth,
      offsetHeight: element.offsetHeight,
    };
  }

  /**
   * [getNumericValue              Get an integer value for given DOMString
   *                               property]
   * @param  {DOMString} property [DOMString representing the property name to
   *                               be checked]
   * @return {Number}             [Integer value of the DOMString which
   *                               represents the CSS property value]
   */
  function getNumericValue(property) {
    return compose(parseInt, curry(getPropertyValue)(property));
  }

  /**
   * [getPropertyValue                   Get the DOMString containing the value
   *                                     of a specified CSS property]
   * @param  {String}              prop [DOMString representing the property
   *                                     name to be checked]
   * @param  {CSSStyleDeclaration} obj  [CSSStyleDeclaration represents a
   *                                     collection of CSS property-value pairs]
   * @return {DOMString}                [Value of a specified CSS property of a
   *                                     specified CSS propertytion]
   */
  function getPropertyValue(prop, obj) {
    return obj.getPropertyValue(prop);
  }

  /**
   * [displayPopover   Remove the 'scale-down' CSS class from the popover element,
   *                   causing it to display on the screen]
   * @return {String} [CSS class]
   */
  function displayPopover() {
    return removeClass(popover, 'scale-down');
  }

  /**
   * [hidePopover      Add the 'scale-down' CSS class to the popover element,
   *                   causing it to hide from the screen]
   * @return {String} [CSS class]
   */
  function hidePopover() {
    return addClass(popover, 'scale-down');
  }

  /**
   * [removeClass             Remove specified class values via the classList.
   *                          If these classes already exist in attribute of the
   *                          element, then they are ignored.]
   * @param {HTMLElement} element
   * @param {String}      cssClass
   *
   * @return {String}
   */
  function removeClass(element, cssClass) {
    element.classList.remove(cssClass);

    return cssClass;
  }

  /**
   * [addClass                Add specified class values via the classList.
   *                          If these classes already exist in attribute of the
   *                          element, then they are ignored.]
   * @param {HTMLElement} element
   * @param {String}      cssClass
   *
   * @return {String}
   */
  function addClass(element, cssClass) {
    element.classList.add(cssClass);

    return cssClass;
  }

  /**
   * [getPopoverPlacement     Returns the placement of the popover from the
   *                          options object]
   * @param  {Object} popoverOptions
   * @return {String}
   */
  function getPopoverPlacement(popoverOptions) {
    return curry(getObjectProperty)('placement')(popoverOptions);
  }

  /**
   * [getGivenPopoverTemplate Returns the template of the popover from the
   *                          options object]
   * @param  {Object} popoverOptions
   * @return {String}
   */
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

  /**
   * [bindDataToTemplate Takes a @template and some @data and binds them together]
   * @param  {String} template
   * @param  {Object} data
   * @return {String}
   */
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

  /**
   * [getPopoverContent Returns the data in the @options binded to the default
   *                    or given template]
   * @param  {Object} options
   * @return {String}
   */
  function getPopoverContent(options) {
    const optionsTemplate = getGivenPopoverTemplate(options);

    return bindDataToTemplate((optionsTemplate || getPopoverTemplate()), options);
  }

  /**
   * [validateOptions          Define which properties should be mandatory when
   *                           passing the popover options object to the
   *                           @showPopover method]
   * @param  {Object}  object [Popover options object]
   * @return {Boolean}        [Valid popover options]
   */
  function validateOptions(object) {
    return curry(looksLike)({
      title: 'Popover title',
      content: 'Popover content',
    })(object);
  }

  /**
   * [looksLike               A function to compare one object's keys
   *                          to another's. It just checks the first level, no
   *                          recursion is performed for deep checking]
   * @param  {Object} firstObject
   * @param  {Object} secondObject
   * @return {Boolean}
   */
  function looksLike(firstObject, secondObject) {
    return (
      firstObject &&
      secondObject &&
      Object.keys(firstObject).every(firstObjectKey =>
        Object.prototype.hasOwnProperty.call(secondObject, firstObjectKey))
    );
  }

  /**
   * ---------------------------------------------------------------------------
   * FP helper functions
   * ---------------------------------------------------------------------------
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
   * ---------------------------------------------------------------------------
   * FP helper functions
   * ---------------------------------------------------------------------------
   */

  /**
   * Expose the public API of the popover service
   */
  return {
    showPopover,
    hidePopover,
    unregisterGlobalEventListeners,
  };
}
