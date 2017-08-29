
const TwCards = {
  bindings: {
    inactive: '=?'
  },
  controller: function() {},
  transclude: true,
  template: ' \
    <ul ng-transclude \
      class="list-group panel-list-group list-group-slide-out" \
      ng-class="{\'list-group-inactive\': $ctrl.inactive}"> \
    </ul>',
};

export default angular
  .module('tw.styleguide.layout.cards', [])
  .component('twCards', TwCards).name;
