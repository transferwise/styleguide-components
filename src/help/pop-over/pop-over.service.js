function PopoverService() {
  /**
   * Register the global event listeners for clicks on the body element and
   * viewport resizing
   */
  registerGlobalEventListeners();

  const BODY = document.getElementsByTagName('body')[0];
  const POPOVER_SPACING = 8;

  let elementWithPopover = null;
  let elementPopoverOptions = {
    placement: 'right',
    trigger: 'click',
  };

  let popover = null;
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
      /**
       * Store the passed element and the options as properties of the Service
       * object for reference
       */
      elementWithPopover = highlightedElement;
      elementPopoverOptions = mergeObjects(elementPopoverOptions, popoverOptions);

      const isModalModeEnabled = getModalMode(elementPopoverOptions);

      let displayHandlers = [displayPopover];

      if (!document.body.contains(popover)) {
        popover = compose(getPopover, getPopoverPlacement)(elementPopoverOptions);
        BODY.appendChild(popover);
      }

      popover.innerHTML = getPopoverContent(elementPopoverOptions);

      /**
       * Build the display handler function array depending on the display mode,
       * either modal mode or normal mode, i.e. depending on the modalMode flag
       * set in the passed options, thus saving the need to compute the
       * coordinates of the popover when modal mode is enabled
       */
      if (!isModalModeEnabled) {
        displayHandlers = [...displayHandlers, setPopoverPosition, getPopoverPlacement];
      }

      /**
       * Append overlay and add the popover-modal class to the popover element
       */
      toggleModalMode(isModalModeEnabled);

      /**
       * Display the popover with or without computing its position
       */
      compose(...displayHandlers)(elementPopoverOptions);
    } else {
      throw Error('Invalid element type or options object passed to the @showPopover function');
    }
  }

  /**
   * [getPopover                        Gets the popover container in which we
   *                                    will append the binded content to the
   *                                    template]
   * @param  {String} placement        [Can be either 'top', 'right', 'bottom',
   *                                    'left', 'left-top', 'right-top']
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
   * @param {String} placement [Can be either 'top', 'right', 'bottom', 'left',
   *                            'left-top', 'right-top']
   */
  function setPopoverPosition(placement) {
    setElementInlineStyles({
      display: 'block',
      visibility: 'hidden',
    }, popover);

    const { offsetX, offsetY } = getPopoverPosition(placement);

    setElementInlineStyles({
      visibility: 'visible',
      top: `${offsetY}px`,
      left: `${offsetX}px`,
    }, popover);
  }

  /**
   * [getPopoverPosition         Before computing the coordinates of the popover,
   *                             it checks if the @placement is not causing the
   *                             popover to overflow. If it's causing it to
   *                             overflow, we switch the placement]
   * @param  {String} placement [Can be either 'top', 'right', 'bottom', 'left',
   *                             'left-top', 'right-top']
   * @return {Object}           [Popover coordinates]
   */
  function getPopoverPosition(placement) {
    const verifyPopoverPlacement = compose(updatePopoverClass, checkPopoverPlacement);

    return compose(getPopoverCoordinates, verifyPopoverPlacement)(placement);
  }

  /**
   * [updatePopoverClass         Update the CSS class that denotes the
   *                             @placement of the @popover]
   * @param  {String} placement [Can be either 'top', 'right', 'bottom', 'left',
   *                             'left-top', 'right-top']
   * @return {String}           [Popover's new placement]
   */
  function updatePopoverClass(placement) {
    const popoverPlacements = ['top', 'right', 'bottom', 'left', 'left-top', 'right-top'];

    popover.classList.remove(...popoverPlacements);
    popover.classList.add(placement);

    return placement;
  }

  /**
   * [checkPopoverPlacement      Check if the @placement is not making the
   *                             @popover overflow the viewport]
   * @param  {String} placement [Can be either 'top', 'right', 'bottom', 'left',
   *                             'left-top', 'right-top']
   * @return {String}           [Popover's new placement]
   */
  function checkPopoverPlacement(placement) {
    const viewportClientDimensions = getClientDimensions(document.documentElement);

    const elementOffsetDimensions = getOffsetDimensions(elementWithPopover);
    const elementOffset = getBoundingOffset(elementWithPopover);

    const popoverOffsetDimensions = getOffsetDimensions(popover);

    const popoverOffsetWidth = elementOffset.offsetX +
      elementOffsetDimensions.offsetWidth + POPOVER_SPACING +
      popoverOffsetDimensions.offsetWidth;
    const popoverLeftOffset = elementOffset.offsetX -
      (popoverOffsetDimensions.offsetWidth + POPOVER_SPACING);

    const overflowsRight = popoverOffsetWidth > viewportClientDimensions.clientWidth;
    const overflowsLeft = popoverLeftOffset < 0;

    if (overflowsRight && overflowsLeft) {
      placement = 'bottom';
    }

    if (placement === 'right' && overflowsRight) {
      placement = 'left';
    }

    if (placement === 'right-top' && overflowsRight) {
      placement = 'left-top';
    }

    if (placement === 'left' && overflowsLeft) {
      placement = 'right';
    }

    if (placement === 'left-top' && overflowsLeft) {
      placement = 'right-top';
    }

    return placement;
  }

  /**
   * [getPopoverCoordinates      Computes and returns the popover coordinates
   *                             relative to the pointing element]
   * @param  {String} placement [Can be either 'top', 'right', 'bottom', 'left',
   *                             'left-top', 'right-top']
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

    if (placement === 'right' || placement === 'right-top') {
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

    if (placement === 'left' || placement === 'left-top') {
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
      const closeModalCondition = clickedOutsidePopover ||
        (clickedInsidePopover && clickedPopoverClose);

      const isModalModeEnabled = getModalMode(elementPopoverOptions);

      if (closeModalCondition) {
        if (isModalModeEnabled) {
          toggleModalMode(false);

          setElementInlineStyles({
            top: 'auto',
            left: 'auto'
          }, popover);
        }

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
      const isModalModeEnabled = getModalMode(elementPopoverOptions);
      const isPopoverVisible = popover && !popover.classList.contains('scale-down');

      /**
       * Compute the coordinates of the popover only if the popover is visible
       * and we're not in modal mode
       */
      if (isPopoverVisible) {
        if (!isModalModeEnabled) {
          compose(setPopoverPosition, getPopoverPlacement)(elementPopoverOptions);
        }

        toggleModalMode(isModalModeEnabled);
      }
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
   * [getClientDimensions Get the inner width of an element in pixels. It includes
   *                      padding but not the vertical scrollbar (if present,
   *                      if rendered), border or margin.]
   * @param  {HTMLElement} element
   * @return {Object}
   */
  function getClientDimensions(element) {
    return {
      clientWidth: element.clientWidth,
      clientHeight: element.clientHeight,
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
    const isModalModeEnabled = getModalMode(elementPopoverOptions);
    const popoverTriggerEvent = getTriggeringEvent(elementPopoverOptions);

    if ((popoverTriggerEvent === 'hover' && !isModalModeEnabled) || popoverTriggerEvent === 'click') {
      return addClass(popover, 'scale-down');
    }

    return 'scale-down';
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
   * [setElementInlineStyles Set @element's inline styles according to the
   *                         @styles object]
   * @param {Object}      styles
   * @param {HTMLElement} element
   */
  function setElementInlineStyles(styles, element) {
    Object.keys(styles).forEach((styleKey) => {
      element.style[styleKey] = styles[styleKey];
    });
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
    return curry(getObjectProperty)('template')(popoverOptions);
  }

  /**
   * [getHtmlRenderingMode    Check if we should render the passed HTML, in the
   *                          dataset attributes, as part of the popover]
   * @param  {Object} popoverOptions
   * @return {Boolean}
   */
  function getHtmlRenderingMode(popoverOptions) {
    return curry(getObjectProperty)('html')(popoverOptions);
  }

  /**
   * [getPopoverModalMode Check if we should morph the popover into a modal]
   * @param  {Object} popoverOptions
   * @return {Boolean}
   */
  function getPopoverModalMode(popoverOptions) {
    return curry(getObjectProperty)('modalMode')(popoverOptions);
  }

  /**
   * [getTriggeringEvent Get the popover trigger mode, either 'click' or 'hover']
   * @param  {Object} popoverOptions
   * @return {String}
   */
  function getTriggeringEvent(popoverOptions) {
    return curry(getObjectProperty)('trigger')(popoverOptions);
  }

  function getModalOverlayNode() {
    return BODY.querySelector('.popover-modal-cover');
  }

  function getPopoverOverlay() {
    const popoverOverlay = document.createElement('div');
    popoverOverlay.classList.add('popover-modal-cover');

    return popoverOverlay;
  }

  function removePopoverOverlay() {
    const overlayNode = getModalOverlayNode();

    return overlayNode && BODY.removeChild(overlayNode);
  }

  function addPopoverOverlay() {
    const overlayNode = getModalOverlayNode();

    return overlayNode === null && BODY.appendChild(getPopoverOverlay());
  }

  function setPopoverToModal() {
    return addClass(popover, 'popover-modal');
  }

  function revertModalToPopover() {
    return removeClass(popover, 'popover-modal');
  }

  function enableModalMode() {
    return compose(setPopoverToModal, addPopoverOverlay)();
  }

  function disableModalMode() {
    return compose(revertModalToPopover, removePopoverOverlay)();
  }

  function toggleModalMode(modalModeEnabled) {
    return modalModeEnabled ? enableModalMode() : disableModalMode();
  }

  function getModalMode(popoverOptions) {
    const isModalModeEnabled = getPopoverModalMode(popoverOptions);
    const viewportClientDimensions = getClientDimensions(document.documentElement);

    return isModalModeEnabled && viewportClientDimensions.clientWidth <= 991;
  }

  /**
   * [getPopoverTemplate Each value in the template, which is equivalent to the
   *                     keys of the binded object, is prefixed and suffixed with
   *                     '__'. For example '__title__' corresponds to the value
   *                     of the 'title' property of the binded object.]
   * @return {String}   [Popover template]
   */
  function getPopoverTemplate() {
    return "<div class='popover'>\n" +
      "<button class='popover-close'>&times;</button>\n" +
      "<h3 class='popover-title'></h3>\n" +
      "<div class='popover-content'></div>\n" +
      '</div>';
  }

  /**
   * [getPopoverContent Returns the data in the @options binded to the default
   *                    or given template]
   * @param  {Object} options
   * @return {String}
   */
  function getPopoverContent(popoverValues) {
    const popoverTemplate = getGivenPopoverTemplate(popoverValues) || getPopoverTemplate();
    const shouldRenderHTML = getHtmlRenderingMode(popoverValues);

    /**
     * Create in-memory element based on provided template
     */
    const popoverContainer = angular.element(popoverTemplate)[0];

    /**
     * For the 'title' and 'content' elements, we get their container elements
     * from the in-memory popover container, and, depending if the dataset attribute
     * 'html' is true, we either insert the parsed text, via
     * insertAdjacentHTML, that was passed in the 'popoverValues', or we just insert it
     * as text, via insertAdjacentText. 'beforeend' just specifies where the
     * content is inserted, in our case as the last child of the in-memory
     * 'title' and 'content' elements.
     */
    ['title', 'content'].forEach((property) => {
      const popoverElement = popoverContainer.querySelector(`.popover-${property}`);
      /**
       * Call the 'insertAdjacentHTML' or 'insertAdjacentText' on the HTMLElement,
       * inserting the values passed through the dataset attributes
       *
       * This form is a shorthand for element.insertAdjacentText or
       * element.insertAdjacentHTML
       */
      if (shouldRenderHTML) {
        popoverElement.insertAdjacentHTML('beforeend', popoverValues[property]);
      } else {
        popoverElement.insertAdjacentText('beforeend', popoverValues[property]);
      }
    });

    /**
     * Images are optional, the in-use template should have a child with a
     * .popover-image class and the passed popoverValues should contain a relative /
     * absolute image path
     */
    const popoverImageElement = popoverContainer.querySelector('.popover-image');
    const popoverImageURL = curry(getObjectProperty)('image')(popoverValues);

    if (popoverImageElement && popoverImageURL) {
      popoverImageElement.src = popoverImageURL;
    }

    return popoverContainer.innerHTML;
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

  function mergeObjects(obj, src) {
    Object.keys(src).forEach((key) => {
      obj[key] = src[key];
    });
    return obj;
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

export default PopoverService;
