
function TwAffix() {
  return {
    restrict: 'A',
    link: AffixLink
  };
}

function AffixLink(scope, element) {
  if (!element.affix) {
    // eslint-disable-next-line no-console
    console.log('twAffix requires bootstrap.js');
    return;
  }

  const tag = element[0];
  const options = {};

  if (tag.getAttribute('data-offset-top') || tag.getAttribute('data-offset-bottom')) {
    options.offset = {};
  }
  if (tag.getAttribute('data-offset-top')
      && Number(tag.getAttribute('data-offset-top'))) {
    options.offset.top = Number(tag.getAttribute('data-offset-top'));
  }
  if (tag.getAttribute('data-offset-bottom')
      && Number(tag.getAttribute('data-offset-bottom'))) {
    options.offset.bottom = Number(tag.getAttribute('data-offset-bottom'));
  }
  element.affix(options);
}

export default TwAffix;
