
function ToolTip() {
  return {
    restrict: 'A',
    link: ToolTipLink
  };
}

function ToolTipLink(scope, element) {
  if (!element.tooltip) {
    // eslint-disable-next-line no-console
    console.log('twToolTip requires bootstrap.js');
    return;
  }
  const tag = element[0];
  const options = {};
  if (!tag.getAttribute('data-placement')) {
    options.placement = 'top';
  }
  element.tooltip(options);
  tag.setAttribute('tabindex', '0');
  tag.setAttribute('data-toggle', 'tooltip');
}

export default ToolTip;
