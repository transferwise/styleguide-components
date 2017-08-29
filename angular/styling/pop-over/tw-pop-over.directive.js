
function TwPopOver() {
  return {
    restrict: 'A',
    link: function(scope, element) {
      if (!element.popover) {
        console.log("twPopOver requires tooltip from bootstrap.js");
        return;
      }
      var options = {};
      var tag = element[0];

      if (!tag.getAttribute('data-trigger')) {
        options.trigger = 'focus';
      } else if (tag.getAttribute('data-trigger') === 'hover') {
        options.trigger = 'hover focus';
      }
      if (!tag.getAttribute('data-placement')) {
        options.placement = 'top';
      }
      if (tag.getAttribute('data-content-html')) {
        options.html = true;
      }

      element.popover(options);

      tag.setAttribute('tabindex', '0');
      tag.setAttribute('role', 'button');
      tag.setAttribute('data-toggle', 'popover');

      // TODO can we reinitialise popove when copy changes.
      //scope.$watch(attrs.title, function() {
        //console.log("watch.title " + element.attr('title'));
      //});
    }
  };
}

export default angular
  .module('tw.styleguide.styling.popover', [])
  .directive('twPopOver', TwPopOver).name;
