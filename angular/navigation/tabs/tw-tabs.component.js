import TwTabsController from './tw-tabs.controller.js';

const TwTabs = {
  bindings: {
    tabs: '<',
    active: '=',
    onChange: '&'
  },
  controller: TwTabsController,
  template: require('./tabs.html')
};

export default TwTabs;
