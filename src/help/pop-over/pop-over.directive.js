export default function () {
  return {
    restrict: 'A',
    link: PopOverLink,
  };
}

function PopOverLink($scope, $element) {
  const element = $element[0];
  const options = {
    trigger: 'focus',
    placement: 'right',
    element,
  };

  if (element.getAttribute('data-trigger') === 'hover') {
    options.trigger = 'hover focus'; // TODO we don't support this, remove??
  }
  if (element.getAttribute('data-placement')) {
    options.placement = element.getAttribute('data-placement');
  }
  if (element.getAttribute('data-title')) {
    options.title = element.getAttribute('data-title');
  }
  if (element.getAttribute('data-original-title')) {
    options.title = element.getAttribute('data-original-title');
  }
  if (element.getAttribute('data-content')) {
    options.content = element.getAttribute('data-content');
  }
  if (element.getAttribute('data-content-html')) {
    options.html = true; // TODO add support for this
  }

  element.setAttribute('tabindex', '0');
  element.setAttribute('role', 'button');
  element.setAttribute('data-toggle', 'popover');

  const [elementCallback, documentCallback, windowResizeCallback] = getDirectiveCallbacks(options);

  element.addEventListener('click', elementCallback);
  document.documentElement.addEventListener('click', documentCallback, true);
  window.addEventListener('resize', windowResizeCallback);

  $scope.$on('destroy', () => {
    element.removeEventListener('click', elementCallback);
    document.documentElement.removeEventListener('click', documentCallback);
    window.removeEventListener('resize', windowResizeCallback);
  });
}

function getDirectiveCallbacks(options) {
  let popover;

  function getPopover() {
    const popoverContainer = document.createElement('div');

    popoverContainer.classList.add('popover');
    popoverContainer.classList.add('in');
    popoverContainer.classList.add(options.placement);

    popoverContainer.setAttribute('role', 'popover');

    popoverContainer.innerHTML = `
      <button class='close popover-close'>X</button>
      <h3 class="popover-title">${options.title}</h3>
      <div class="popover-content">
        ${options.content}
      </div>`;

    return popoverContainer;
  }

  function setPopoverPosition() {
    popover.setAttribute('style', 'display:block; visibility:hidden;');

    const { offsetX, offsetY } = getPopoverPosition(options, popover);

    popover.setAttribute(
      'style',
      `display:block; visibility:visible; top:${offsetY}px; left:${offsetX}px`,
    );
  }

  function elementCallback() {
    const body = document.getElementsByTagName('body')[0];
    const popoverAppended = Array.from(body.children).includes(popover);

    /**
     If the popover doesn't exist, create, append it and display it
     */
    if (!popoverAppended) {
      popover = getPopover();
      body.appendChild(popover);
    }

    /**
     Otherwise display it
     */
    if (!isElementVisible(popover)) {
      setPopoverPosition();

      popover.style.display = 'block';
    }
  }

  function documentCallback(event) {
    if (popover) {
      const clickedOutsidePopover = !popover.contains(event.target);
      const clickedInsidePopover = popover.contains(event.target);
      const clickedPopoverClose = event.target.className.split(' ').includes('popover-close');

      if (clickedOutsidePopover || (clickedInsidePopover && clickedPopoverClose)) {
        popover.style.display = 'none';
      }
    }
  }

  function windowResizeCallback() {
    if (popover && isElementVisible(popover)) {
      setPopoverPosition();
    }
  }

  function isElementVisible(element) {
    return element.offsetWidth > 0 || element.offsetHeight > 0;
  }

  return [elementCallback, documentCallback, windowResizeCallback];
}

function getPopoverPosition(options, popover) {
  /**
   * The element's coordinates, for which we want to display the popover
   */
  const elementOffset = getBoundingOffset(options.element);

  /**
   * The element's size, for which we want to display the popover
   */
  const elementOffsetDimensions = getOffsetDimensions(options.element);

  const POPOVER_SPACING = 5;

  /**
   * Popover's default coordinates
   */
  let popoverOffsets = {
    offsetX: 0,
    offsetY: 0,
  };

  const popoverOffsetDimensions = getOffsetDimensions(popover);
  const popoverClientDimensions = getClientDimensions(popover);

  const popoverVerticalBorder = popoverOffsetDimensions.offsetHeight -
    popoverClientDimensions.clientHeight;

  /*
   * The visible arrow is a pseudo-element
   */
  const popoverArrowStyles = getComputedStyle(popover, ':before');

  const popoverArrowTopOffset = getIntegerProperty('top')(popoverArrowStyles);
  const popoverArrowHeight = getIntegerProperty('height')(popoverArrowStyles);
  const popoverArrowMarginTop = getIntegerProperty('margin-top')(popoverArrowStyles);

  if (options.placement === 'top') {
    popoverOffsets = {
      offsetX: (elementOffset.offsetX - (popoverOffsetDimensions.offsetWidth / 2)) +
        (elementOffsetDimensions.offsetWidth / 2),
      offsetY: elementOffset.offsetY -
        popoverOffsetDimensions.offsetHeight - POPOVER_SPACING,
    };
  }

  if (options.placement === 'right') {
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

  if (options.placement === 'bottom') {
    popoverOffsets = {
      offsetX: (elementOffset.offsetX - (popoverOffsetDimensions.offsetWidth / 2)) +
        (elementOffsetDimensions.offsetWidth / 2),
      offsetY: elementOffset.offsetY +
        elementOffsetDimensions.offsetHeight + POPOVER_SPACING,
    };
  }

  if (options.placement === 'left') {
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

function getIntegerProperty(property) {
  return compose(parseInt, curry(getPropertyValue)(property));
}

function getPropertyValue(prop, obj) {
  return obj.getPropertyValue(prop);
}

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
