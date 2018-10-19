class PopOverController {
  constructor($element, PopoverService) {
    const unwrappedEl = $element[0];

    this.showPopover = (event) => {
      event.preventDefault();
      return PopoverService.showPopover(getPopoverOptions(unwrappedEl));
    };

    this.hidePopover = (event) => {
      event.preventDefault();
      return PopoverService.hidePopover(getPopoverOptions(unwrappedEl));
    };

    this.registerEventListeners = this.registerEventListeners.bind(this);
    this.unregisterEventListeners = this.registerEventListeners(getPopoverOptions(unwrappedEl));
  }

  $onDestroy() {
    this.unregisterEventListeners();
  }

  registerEventListeners(config) {
    const {
      element: { node },
      popover: {
        options: { trigger }
      }
    } = config;

    if (trigger === 'hover') {
      node.addEventListener('mouseover', this.showPopover);
      node.addEventListener('mouseout', this.hidePopover);
    } else {
      node.addEventListener('click', this.showPopover);
    }

    // eslint-disable-next-line func-names
    return function () {
      if (trigger === 'hover') {
        node.removeEventListener('mouseover', this.showPopover);
        node.removeEventListener('mouseout', this.hidePopover);
      } else {
        node.removeEventListener('click', this.showPopover);
      }
    };
  }
}

function getPopoverOptions(element) {
  const config = {
    content: {
      title: '',
      content: ''
    },
    options: {
      placement: 'right',
      trigger: 'click'
    },
    customOptions: {
      spacing: 0
    }
  };

  const dataAttributes = ['title', 'content', 'image'];
  const optionAttributes = ['trigger', 'template', 'container', 'placement'];

  dataAttributes.forEach((attr) => {
    if (element.dataset[attr]) {
      config.content[attr] = element.dataset[attr];
    }
  });

  optionAttributes.forEach((attr) => {
    if (element.dataset[attr]) {
      config.options[attr] = element.dataset[attr];
    }
  });

  if (element.dataset.originalTitle) {
    config.content.title = element.dataset.originalTitle;
  }

  if (element.dataset.contentHtml) {
    config.options.contentHtml = element.dataset.contentHtml === 'true';
  }

  return {
    element: {
      node: element
    },
    popover: config
  };
}

PopOverController.$inject = ['$element', 'twPopOverService'];

export default PopOverController;
