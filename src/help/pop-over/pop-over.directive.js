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
      <h3 class="popover-title">${options.title}</h3>
      <div class="popover-content">
        ${options.content}
      </div>`;

    return popoverContainer;
  }

  function setPopoverPosition() {
    popover.setAttribute('style', 'display:block; visibility:hidden;');

    const {
      offsetX,
      offsetY,
    } = getPopoverPosition(options, popover);

    popover.setAttribute('style', `display:block; visibility:visible; top:${offsetY}px; left:${offsetX}px`);
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

      setPopoverPosition();
    }

    /**
     Otherwise display it
     */
    if (!isElementVisible(popover)) {
      popover.style.display = 'block';
    }
  }

  function documentCallback(event) {
    if (popover) {
      const clickedOutsidePopover = !popover.contains(event.target);

      if (clickedOutsidePopover) {
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
  const {
    offsetX,
    offsetY,
  } = getBoundingOffset(options.element);

  /**
   * The element's size, for which we want to display the popover
   */
  const {
    offsetWidth,
    offsetHeight,
  } = getOffsetDimensions(options.element);

  /**
   * Popover's default coordinates
   */
  let popoverOffsets = {
    offsetX: 0,
    offsetY: 0,
  };

  const popoverDimensions = getOffsetDimensions(popover);
  const popoverStyles = getComputedStyle(popover, null);

  const popoverTopBorder = getIntegerProperty('border-top')(popoverStyles);
  const popoverBottomBorder = getIntegerProperty('border-bottom')(popoverStyles);

  /*
   * The visible arrow is a pseudo-element
   */
  const popoverArrowStyles = getComputedStyle(popover, ':before');

  const popoverArrowTopOffset = getIntegerProperty('top')(popoverArrowStyles);
  const popoverArrowHeight = getIntegerProperty('height')(popoverArrowStyles);
  const popoverArrowMarginTop = getIntegerProperty('margin-top')(popoverArrowStyles);

  if (options.placement === 'top') {
    popoverOffsets = {
      offsetX: (offsetX - (popoverDimensions.offsetWidth / 2)) + (offsetWidth / 2),
      offsetY: (offsetY - popoverDimensions.offsetHeight - 5),
    };
  }

  if (options.placement === 'right') {
    const popoverOffsetX = offsetX + offsetWidth + 5;
    const popoverOffsetY = (offsetY - (popoverArrowTopOffset + popoverArrowMarginTop +
      (popoverArrowHeight / 2))) + ((offsetHeight / 2) -
      (popoverTopBorder + popoverBottomBorder));

    popoverOffsets = {
      offsetX: popoverOffsetX,
      // offsetY: (offsetY - (popoverDimensions.offsetHeight / 2))
      // + (offsetHeight / 2),
      offsetY: popoverOffsetY,
    };
  }

  if (options.placement === 'bottom') {
    popoverOffsets = {
      offsetX: (offsetX - (popoverDimensions.offsetWidth / 2)) + (offsetWidth / 2),
      offsetY: (offsetY + offsetHeight + 5),
    };
  }

  if (options.placement === 'left') {
    const popoverOffsetX = (offsetX - (popoverDimensions.offsetWidth - 5));
    const popoverOffsetY = (offsetY - (popoverArrowTopOffset + popoverArrowMarginTop +
      (popoverArrowHeight / 2))) + ((offsetHeight / 2) -
      (popoverTopBorder + popoverBottomBorder));

    popoverOffsets = {
      offsetX: popoverOffsetX,
      //
      /* offsetY: (offsetY - (popoverDimensions.offsetHeight / 2))
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

function getIntegerProperty(property) {
  return compose(parseInt, curry(getPropertyValue)(property));
}

function getPropertyValue(prop, obj) {
  return obj.getPropertyValue(prop);
}

function compose(...fns) {
  return fns.reverse().reduce((fn1, fn2) =>
    (...args) => fn2(fn1(...args)));
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
