import TwTabsController from './tw-tabs.controller.js';
import template from './tabs.html';

const TwTabs = {
  bindings: {
    tabs: '<',
    active: '=',
    onChange: '&'
  },
  controller: TwTabsController,
  template
};

export default TwTabs;
