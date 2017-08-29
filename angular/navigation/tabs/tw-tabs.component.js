import TwTabsController from './tw-tabs.controller.js';

const TwTabs = {
  bindings: {
    tabs: '<',
    active: '=',
    onChange: '&'
  },
  controller: TwTabsController,
  template: " \
  <ul ng-if='$ctrl.tabs.length > 0' \
    class='nav nav-tabs m-b-3'> \
    <li ng-repeat='tab in $ctrl.tabs track by $index' \
      ng-class='{\"active\": $ctrl.active === tab.type}'> \
      <a href='' ng-click='$ctrl.switchTab(tab.type)'> \
        {{tab.label}} \
      </a> \
    </li> \
  </ul>"
};

export default TwTabs;
