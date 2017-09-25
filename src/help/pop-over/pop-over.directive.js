
function PopOver() {
  return {
    restrict: 'A',
    link: PopOverLink
  };
}

function PopOverLink(scope, $element) {
  const options = {
    trigger: 'focus',
    placement: 'bottom'
  };

  const element = $element[0];

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

  const body = document.getElementsByTagName('body')[0];

  element.addEventListener('click', () => {
    const popover = document.createElement('div');
    popover.classList.add('popover');
    popover.classList.add('in');
    popover.classList.add(options.placement);
    popover.setAttribute('role', 'popover');

    popover.innerHTML = `
      <div class="arrow"></div>
      <h3 class="popover-title">${options.title}</h3>
      <div class="popover-content">
        ${options.content}
      </div>`;

    body.appendChild(popover);

    const rectangle = element.getBoundingClientRect();

    // TODO position the popover correctly
    const offsetX = rectangle.left; // element.offsetWidth +
    const offsetY = rectangle.top; // element.offsetHeight +

    popover.setAttribute('style', `display: block; left: ${offsetX}px; top: ${offsetY}px`);
  });

  // TODO close all popovers when a click reaches body tag
}

export default PopOver;
