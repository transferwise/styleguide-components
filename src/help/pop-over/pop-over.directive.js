
function PopOver() {
  return {
    restrict: 'A',
    link: PopOverLink
  };
}

function PopOverLink(scope, $element) {
  if (!$element.popover) {
    // eslint-disable-next-line no-console
    console.log('twPopOver requires tooltip from bootstrap.js');
    return;
  }
  const options = {
    trigger: 'focus',
    placement: 'bottom'
  };

  const element = $element[0];

  if (element.getAttribute('data-trigger') === 'hover') {
    options.trigger = 'hover focus';
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
    options.html = true;
  }

  element.popover(options);

  element.setAttribute('tabindex', '0');
  element.setAttribute('role', 'button');
  element.setAttribute('data-toggle', 'popover');

  const popover = `
    <div class="popover ${options.placement}">
      <div class="arrow"></div>
      <h3 class="popover-title">${options.title}</h3>
      <div class="popover-content">
        ${options.content}
      </div>
    </div>`;

  const body = document.getElementsByTagName('body')[0];

  element.addEventListener('click', () => {
    const popoverElement = document.createElement('div');
    popoverElement.innerHTml = popover;
    body.appendChild(popoverElement);

    const rectangle = element.getBoundingClientRect();
    const size = {
      width: rectangle.right - rectangle.left,
      height: rectangle.bottom - rectangle.top
    };

    const offsetX = element.offsetWidth + size.width;
    const offsetY = element.offsetHeight + size.height;

    popoverElement.setAttribute('style', `left: ${offsetX}; top: ${offsetY}`);
  });


  // TODO can we reinitialise popove when copy changes.
  // scope.$watch(attrs.title, function() {
  //   console.log('watch.title ' + element.getAttribute('title'));
  // });
}

export default PopOver;
