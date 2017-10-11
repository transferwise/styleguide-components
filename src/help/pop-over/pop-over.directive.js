export default function () {
  return {
    restrict: 'A',
    link: PopOverLink,
  };
}

function PopOverLink($scope, $element) {
  let POPOVER = null;

  const element = $element[0];
  const body = document.getElementsByTagName('body')[0];

  element.setAttribute('tabindex', '0');
  element.setAttribute('role', 'button');
  element.setAttribute('data-toggle', 'popover');

  /**
    * Register event listeners
    */
  element.addEventListener('click', ELEMENT_CALLBACK);
  document.documentElement.addEventListener('click', DOCUMENT_CALLBACK, true);
  window.addEventListener('resize', WINDOW_RESIZE_CALLBACK);

  /**
    * Unregister event listeners when component gets unmounted / destroyed
    */
  $scope.$on('destroy', () => {
    element.removeEventListener('click', ELEMENT_CALLBACK);
    document.documentElement.removeEventListener('click', DOCUMENT_CALLBACK);
    window.removeEventListener('resize', WINDOW_RESIZE_CALLBACK);
  });

  function ELEMENT_CALLBACK() {
    const popoverAppendedToBody = Array.from(body.children).includes(POPOVER);
    const popoverOptions = getPopoverOptions();

    if (!popoverAppendedToBody) {
      POPOVER = compose(getPopover, curry(getObjectProperty)('placement'))(popoverOptions);
      body.appendChild(POPOVER);
    }

    if (elementNotVisible(POPOVER)) {
      POPOVER.innerHTML = getPopoverContent(popoverOptions);

      compose(setPopoverPosition, curry(getObjectProperty)('placement'))(popoverOptions);
    }
  }

  function DOCUMENT_CALLBACK(event) {
    if (POPOVER) {
      const clickedOutsidePopover = !POPOVER.contains(event.target);
      const clickedInsidePopover = POPOVER.contains(event.target);
      const clickedPopoverClose = event.target.className
        .split(' ').includes('popover-close');

      if (clickedOutsidePopover || (clickedInsidePopover && clickedPopoverClose)) {
        POPOVER.style.display = 'none';
      }
    }
  }

  function WINDOW_RESIZE_CALLBACK() {
    if (POPOVER && isElementVisible(POPOVER)) {
      const popoverOptions = getPopoverOptions();

      compose(setPopoverPosition, curry(getObjectProperty)('placement'))(popoverOptions);
    }
  }

  function getPopover(popoverPlacement) {
    const popoverContainer = document.createElement('div');

    popoverContainer.classList.add('popover');
    popoverContainer.classList.add('in');
    popoverContainer.classList.add(popoverPlacement);

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
  }

  function getPopoverPosition(popoverPlacement) {
    /**
     * The element's coordinates, for which we want to display the popover
     */
    const elementOffset = getBoundingOffset(element);

    /**
     * The element's size, for which we want to display the popover
     */
    const elementOffsetDimensions = getOffsetDimensions(element);

    const POPOVER_SPACING = 5;

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

  function getPopoverOptions() {
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
      options.html = true; // TODO add support for this
    }

    return options;
  }
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

function isElementVisible(element) {
  return element.offsetWidth > 0 || element.offsetHeight > 0;
}

function elementNotVisible(element) {
  return negate(isElementVisible)(element);
}

function getNumericValue(property) {
  return compose(parseInt, curry(getPropertyValue)(property));
}

function getPropertyValue(prop, obj) {
  return obj.getPropertyValue(prop);
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

function getPopoverTemplate() {
  return `
    <button class='close popover-close'>&times;</button>
    <h3 class='popover-title'>__title__</h3>
    <div class='popover-content'>
      __content__
    </div>`;
}

function getPopoverContent(options) {
  return bindDataToTemplate(getPopoverTemplate(), options);
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

function negate(fn) {
  return args => !fn(args);
}

function getObjectProperty(property, object) {
  return object[property];
}
