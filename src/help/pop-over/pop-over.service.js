export default function () {
  const BODY = document.getElementsByTagName('body')[0];
  const POPOVER_SPACING = 8;

  let POPOVER = null;
  let ELEMENT = null;
  let ELEMENT_PLACEMENT = 'right';

  function show(element, elementOptions) {
    if (element instanceof HTMLElement && isOptionsObject(elementOptions)) {
      ELEMENT = element;
      ELEMENT_PLACEMENT = getPopoverPlacement(elementOptions);

      const popoverAppendedToBody = Array.from(BODY.children).includes(POPOVER);

      if (!popoverAppendedToBody) {
        POPOVER = getPopover(ELEMENT_PLACEMENT);
        BODY.appendChild(POPOVER);
      }

      POPOVER.innerHTML = getPopoverContent(elementOptions);
      compose(showPopover, setPopoverPosition)(ELEMENT_PLACEMENT);
    }
  }

  function hide(event) {
    if (POPOVER) {
      const clickedOutsidePopover = !POPOVER.contains(event.target);
      const clickedInsidePopover = POPOVER.contains(event.target);
      const clickedPopoverClose = event.target.classList.contains('popover-close');

      if (clickedOutsidePopover || (clickedInsidePopover && clickedPopoverClose)) {
        hidePopover();
      }
    }
  }

  function reposition() {
    if (POPOVER) {
      setPopoverPosition(ELEMENT_PLACEMENT);
    }
  }

  function getPopover(popoverPlacement) {
    const popoverContainer = document.createElement('div');

    popoverContainer.classList.add('popover', 'in', popoverPlacement, 'animate', 'scale-down');
    popoverContainer.setAttribute('role', 'popover');

    return popoverContainer;
  }

  function setPopoverPosition(popoverPlacement) {
    POPOVER.setAttribute('style', 'display:block; visibility:hidden;');

    const { offsetX, offsetY } = getPopoverPosition(popoverPlacement);

    POPOVER.setAttribute(
      'style',
      `display:block; visibility:visible; top:${offsetY}px; left:${offsetX}px`,
    );

    return { offsetX, offsetY };
  }

  function getPopoverPosition(popoverPlacement) {
    const verifyPopoverPlacement = compose(updatePopoverClass, checkPopoverPlacement);

    return compose(getPopoverCoordinates, verifyPopoverPlacement)(popoverPlacement);
  }

  function updatePopoverClass(popoverPlacement) {
    const popoverPlacements = ['left', 'right', 'bottom', 'top'];

    POPOVER.classList.remove(...popoverPlacements);
    POPOVER.classList.add(popoverPlacement);

    return popoverPlacement;
  }

  function checkPopoverPlacement(popoverPlacement) {
    const viewportOffsetDimensions = getOffsetDimensions(document.documentElement);

    const elementOffsetDimensions = getOffsetDimensions(ELEMENT);
    const elementOffset = getBoundingOffset(ELEMENT);

    const popoverOffsetDimensions = getOffsetDimensions(POPOVER);

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
    const elementOffset = getBoundingOffset(ELEMENT);

    /**
     * The element's size, for which we want to display the popover
     */
    const elementOffsetDimensions = getOffsetDimensions(ELEMENT);

    /**
     * Popover's default coordinates
     */
    let popoverOffsets = {
      offsetX: 0,
      offsetY: 0,
    };

    const popoverOffsetDimensions = getOffsetDimensions(POPOVER);
    const popoverClientDimensions = getClientDimensions(POPOVER);

    const popoverVerticalBorder = popoverOffsetDimensions.offsetHeight -
      popoverClientDimensions.clientHeight;

    /*
     * The visible arrow is a pseudo-element
     */
    const popoverArrowStyles = getComputedStyle(POPOVER, ':before');

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
        (popoverArrowTopOffset + popoverArrowMarginTop + (popoverArrowHeight / 2))) +
        ((elementOffsetDimensions.offsetHeight / 2) - popoverVerticalBorder);

      popoverOffsets = {
        offsetX: popoverOffsetX,
        // offsetY: (offsetY - (popoverOffsetDimensions.offsetHeight / 2))
        // + (offsetHeight / 2),
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
        (popoverArrowTopOffset + popoverArrowMarginTop + (popoverArrowHeight / 2))) +
        ((elementOffsetDimensions.offsetHeight / 2) - popoverVerticalBorder);

      popoverOffsets = {
        offsetX: popoverOffsetX,
        //
        /* offsetY: (offsetY - (popoverOffsetDimensions.offsetHeight / 2))
        + (offsetHeight / 2), //Center to center
        */
        offsetY: popoverOffsetY,
      };
    }

    return popoverOffsets;
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

  function getClientDimensions(element) {
    return {
      clientWidth: element.clientWidth,
      clientHeight: element.clientHeight,
    };
  }

  function getPopoverPlacement(elementOptions) {
    return curry(getObjectProperty)('placement')(elementOptions);
  }

  function getNumericValue(property) {
    return compose(parseInt, curry(getPropertyValue)(property));
  }

  function getPropertyValue(prop, obj) {
    return obj.getPropertyValue(prop);
  }

  function showPopover() {
    return removePopoverClass('scale-down');
  }

  function hidePopover() {
    return addPopoverClass('scale-down');
  }

  function removePopoverClass(cssClass) {
    return curry(removeClass)(POPOVER)(cssClass);
  }

  function addPopoverClass(cssClass) {
    return curry(addClass)(POPOVER)(cssClass);
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
    return bindDataToTemplate(getPopoverTemplate(), options);
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

  return {
    show,
    hide,
    reposition,
  };
}
