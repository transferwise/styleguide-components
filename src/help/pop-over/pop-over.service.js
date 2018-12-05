class PopOverService {
  constructor($rootScope) {
    this.popover = null;
    this.$rootScope = $rootScope;

    this.documentCallback = this.documentCallback.bind(this);
    this.resizeCallback = this.resizeCallback.bind(this);

    this.registerGlobalEventListeners();
  }

  showPopover(config) {
    /**
     * Cache the passed config in order to access the configuration
     * from the document resize and click handlers
     */
    this.config = config;

    const parent = getPopoverParent(config);

    if (!parent.contains(this.popover)) {
      const existingPopover = parent.querySelector('.popover-service');

      if (existingPopover) {
        this.popover = existingPopover;
      } else {
        this.popover = getPopoverElement(config);
        parent.appendChild(this.popover);
      }
    }

    updatePopoverContent(config, this.popover);
    handlePopoverOptions(config, this.popover);

    this.popover.classList.remove('scale-down');

    return this.popover;
  }

  hidePopover(config) {
    const {
      popover
    } = this;

    const popoverIsVisible = popover && !popover.classList.contains('scale-down');

    if (popoverIsVisible) {
      teardownPopoverOptions(config, popover);

      popover.classList.add('scale-down');

      this.$rootScope.$emit('promotion:close', config.popover);
    }

    return this.popover;
  }

  documentCallback(event) {
    const { popover, config } = this;

    if (popover) {
      const clickedOutsidePopover = !popover.contains(event.target);
      const clickedInsidePopover = popover.contains(event.target);

      const clickedPopoverClose = event.target.classList.contains('popover-close');
      const clickedModalOverlay = event.target.classList.contains('popover-modal-cover');
      const popoverIsVisible = !popover.classList.contains('scale-down');

      const closeModalCondition =
        popoverIsVisible &&
        (clickedOutsidePopover || clickedModalOverlay ||
          (clickedInsidePopover && clickedPopoverClose));

      if (closeModalCondition) {
        this.hidePopover(config);
      }
    }
  }

  resizeCallback() {
    const { config, popover } = this;

    const popoverIsVisible = popover && !popover.classList.contains('scale-down');

    if (popoverIsVisible) {
      handlePopoverOptions(config, popover);
    }
  }

  registerGlobalEventListeners() {
    document.documentElement.addEventListener('click', this.documentCallback, true);
    window.addEventListener('resize', this.resizeCallback);
  }

  unregisterGlobalEventListeners() {
    document.documentElement.removeEventListener('click', this.documentCallback, true);
    window.removeEventListener('resize', this.resizeCallback);
  }
}

function getPopoverElement(config) {
  const {
    popover: {
      options: { placement }
    }
  } = config;

  const popoverTemplate = getPopoverTemplate(config);
  const popoverElement = angular.element(popoverTemplate)[0];

  const isPopoverModal = getModalCondition(config);
  const cssClasses = ['popover', 'in', placement, 'scale-down', 'popover-service'];

  if (isPopoverModal) {
    cssClasses.push('popover-modal');
  } else {
    cssClasses.push('animate');
  }

  popoverElement.classList.add(...cssClasses);
  popoverElement.setAttribute('role', 'popover');

  return popoverElement;
}

function updatePopoverContent(config, popover) {
  const {
    popover: {
      content,
      options: { contentHtml }
    }
  } = config;

  ['title', 'content'].forEach((property) => {
    const element = popover.querySelector(`.popover-${property}`);

    element.textContent = '';

    if (contentHtml) {
      element.insertAdjacentHTML('beforeend', content[property]);
    } else {
      element.insertAdjacentText('beforeend', content[property]);
    }
  });

  const imageElement = popover.querySelector('.popover-image');
  const imageUrl = content.image;

  if (imageElement && imageUrl) {
    imageElement.src = imageUrl;
  }
}

function handlePopoverOptions(config, popover) {
  const {
    element: { node },
    popover: {
      customOptions: { highlightElement, fixedPosition }
    }
  } = config;

  const popoverShouldBeModal = getModalCondition(config);

  if (popoverShouldBeModal) {
    if (popover.classList.contains('animate')) {
      popover.classList.remove('animate');
    }

    if (!popover.classList.contains('popover-modal')) {
      popover.classList.add('popover-modal');
    }

    addPopoverOverlay(config, popover);
  } else {
    if (!popover.classList.contains('animate')) {
      popover.classList.add('animate');
    }

    if (popover.classList.contains('popover-modal')) {
      popover.classList.remove('popover-modal');
    }

    removePopoverOverlay(config, popover);
    setPopoverPosition(popover, config);
  }

  if (highlightElement) {
    node.classList.add('promoted');
  }

  if (fixedPosition) {
    popover.style.position = 'fixed';
  }
}

function teardownPopoverOptions(config, popover) {
  const {
    element: { node },
    popover: {
      customOptions: { highlightElement }
    }
  } = config;

  const popoverIsModal = getModalCondition(config);

  if (popoverIsModal) {
    removePopoverOverlay(config, popover);
  }

  if (highlightElement) {
    node.classList.remove('promoted');
  }
}

function getPopoverParent(config) {
  const {
    element: { node },
    popover: {
      options: { container }
    }
  } = config;

  if (container && container.toLowerCase() === 'body') {
    return document.body;
  } else if (typeof container === 'string' && document.querySelector(container)) {
    return document.querySelector(container);
  }

  return node.parentNode;
}

function getPopoverTemplate(config) {
  const {
    popover: {
      options: { template }
    }
  } = config;

  const DEFAULT_TEMPLATE = `<div class='popover'>
      <h3 class='popover-title'></h3>
      <div class='popover-content'></div>
    </div>`;

  return template || DEFAULT_TEMPLATE;
}

function setPopoverPosition(popover, config) {
  const placements = [
    'top',
    'right',
    'bottom',
    'left',

    'top-left',
    'top-right',

    'right-top',
    'right-bottom',

    'bottom-left',
    'bottom-right',

    'left-top',
    'left-bottom'
  ];

  popover.classList.remove(...placements);

  const placement = checkPopoverPlacement(popover, config);

  popover.classList.add(placement);

  popover.style.visibility = 'hidden';

  const { offsetX, offsetY } = getPopoverCoordinates(popover, config, placement);

  popover.style.visibility = 'visible';
  popover.style.top = `${offsetY}px`;
  popover.style.left = `${offsetX}px`;
}

function checkPopoverPlacement(popover, config) {
  const {
    element: {
      node
    },
    popover: {
      customOptions: { spacing }
    }
  } = config;

  let {
    popover: {
      options: { placement }
    }
  } = config;

  const elementOffset = getBoundingOffset(node);
  const viewportClientDimensions = getClientDimensions(document.documentElement);
  const elementOffsetDimensions = getOffsetDimensions(node);
  const popoverOffsetDimensions = getOffsetDimensions(popover);

  const popoverOffsetWidth = elementOffset.offsetX +
    elementOffsetDimensions.offsetWidth + spacing +
    popoverOffsetDimensions.offsetWidth;
  const popoverLeftOffset = elementOffset.offsetX -
    (popoverOffsetDimensions.offsetWidth + spacing);

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

  if (placement === 'right-bottom' && overflowsRight) {
    placement = 'left-bottom';
  }

  if (placement === 'left' && overflowsLeft) {
    placement = 'right';
  }

  if (placement === 'left-top' && overflowsLeft) {
    placement = 'right-top';
  }

  if (placement === 'left-bottom' && overflowsLeft) {
    placement = 'right-bottom';
  }

  return placement;
}

function getPopoverCoordinates(popover, config, placement) {
  const parent = getPopoverParent(config);

  const {
    element: {
      node
    },
    popover: {
      customOptions: { spacing }
    }
  } = config;

  const coordinateComputeFunction = parent === document.body ? getBoundingOffset : getParentOffset;

  const elementOffset = coordinateComputeFunction(node);
  const elementOffsetDimensions = getOffsetDimensions(node);

  let popoverOffsets = {
    offsetX: 0,
    offsetY: 0,
  };

  const popoverOffsetDimensions = getOffsetDimensions(popover);

  const popoverArrowStyles = getComputedStyle(popover, ':before');

  const popoverArrowTopOffset = getNumericValue('top', popoverArrowStyles);
  const popoverArrowHeight = getNumericValue('height', popoverArrowStyles);
  const popoverArrowLeftOffset = getNumericValue('left', popoverArrowStyles);
  const popoverArrowRightOffset = getNumericValue('right', popoverArrowStyles);
  const popoverArrowMarginTop = getNumericValue('margin-top', popoverArrowStyles);

  if (placement === 'top') {
    const popoverOffsetX = (elementOffset.offsetX -
      (popoverOffsetDimensions.offsetWidth / 2)) +
      (elementOffsetDimensions.offsetWidth / 2);
    const popoverOffsetY = elementOffset.offsetY -
      popoverOffsetDimensions.offsetHeight - spacing;

    popoverOffsets = {
      offsetX: popoverOffsetX,
      offsetY: popoverOffsetY,
    };
  }

  if (placement === 'top-right') {
    const popoverOffsetX = ((elementOffset.offsetX +
      (elementOffsetDimensions.offsetWidth / 2)) -
      popoverArrowLeftOffset
    );
    const popoverOffsetY = elementOffset.offsetY -
      popoverOffsetDimensions.offsetHeight - spacing;

    popoverOffsets = {
      offsetX: popoverOffsetX,
      offsetY: popoverOffsetY,
    };
  }

  if (placement === 'top-left') {
    const popoverOffsetX = ((elementOffset.offsetX -
      popoverOffsetDimensions.offsetWidth) +
      ((elementOffsetDimensions.offsetWidth / 2) +
      popoverArrowRightOffset)
    );
    const popoverOffsetY = elementOffset.offsetY -
      popoverOffsetDimensions.offsetHeight - spacing;

    popoverOffsets = {
      offsetX: popoverOffsetX,
      offsetY: popoverOffsetY,
    };
  }

  if (placement === 'right-top' || placement === 'right' || placement === 'right-bottom') {
    const popoverOffsetX = elementOffset.offsetX +
      elementOffsetDimensions.offsetWidth + spacing;
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
      elementOffsetDimensions.offsetHeight + spacing;

    popoverOffsets = {
      offsetX: popoverOffsetX,
      offsetY: popoverOffsetY,
    };
  }

  if (placement === 'bottom-right') {
    const popoverOffsetX = ((elementOffset.offsetX +
      (elementOffsetDimensions.offsetWidth / 2)) -
      popoverArrowLeftOffset
    );
    const popoverOffsetY = elementOffset.offsetY +
      elementOffsetDimensions.offsetHeight + spacing;

    popoverOffsets = {
      offsetX: popoverOffsetX,
      offsetY: popoverOffsetY,
    };
  }

  if (placement === 'bottom-left') {
    const popoverOffsetX = ((elementOffset.offsetX -
      popoverOffsetDimensions.offsetWidth) +
      ((elementOffsetDimensions.offsetWidth / 2) +
      popoverArrowRightOffset)
    );
    const popoverOffsetY = elementOffset.offsetY +
      elementOffsetDimensions.offsetHeight + spacing;

    popoverOffsets = {
      offsetX: popoverOffsetX,
      offsetY: popoverOffsetY,
    };
  }

  if (placement === 'left-top' || placement === 'left' || placement === 'left-bottom') {
    const popoverOffsetX = elementOffset.offsetX -
      popoverOffsetDimensions.offsetWidth - spacing;
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

function getModalCondition(config) {
  const {
    popover: {
      customOptions: { modalTransform }
    }
  } = config;

  const viewportClientDimensions = getClientDimensions(document.documentElement);

  return modalTransform && viewportClientDimensions.clientWidth <= 991;
}

function removePopoverOverlay() {
  const overlayNode = document.body.querySelector('.popover-modal-cover');

  if (overlayNode) {
    overlayNode.parentNode.removeChild(overlayNode);
  }
}

function addPopoverOverlay(config, popover) {
  const overlayNode = document.body.querySelector('.popover-modal-cover');

  if (overlayNode === null) {
    const popoverParent = getPopoverParent(config);

    const popoverOverlay = document.createElement('div');
    popoverOverlay.classList.add('popover-modal-cover');

    popoverParent.insertBefore(popoverOverlay, popover);
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

function getParentOffset(element) {
  return {
    offsetY: element.offsetTop,
    offsetX: element.offsetLeft,
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

function getNumericValue(property, styles) {
  return parseInt(styles.getPropertyValue(property), 10);
}

PopOverService.$inject = ['$rootScope'];

export default PopOverService;
