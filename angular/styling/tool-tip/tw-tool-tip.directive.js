
function TwToolTip() {
  return {
    restrict: 'A',
    link: function(scope, element) {
      if (!element.tooltip) {
        console.log('twToolTip requires bootstrap.js');
        return;
      }
      var tag = element[0];
      var options = {};
      if (!tag.getAttribute('data-placement')) {
        options.placement = 'top';
      }
      element.tooltip(options);
      tag.setAttribute('tabindex', '0');
      tag.setAttribute('data-toggle', 'tooltip');
    }
  };
}

export default angular
  .module('tw.styleguide.styling.tooltip', [])
  .directive('twToolTip', TwToolTip).name;
