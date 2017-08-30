import TabsController from './tabs.controller.js';

const Tabs = {
  bindings: {
    tabs: '<',
    active: '=',
    onChange: '&'
  },
  controller: TabsController,
  template: require('./tabs.html')
};

export default Tabs;
