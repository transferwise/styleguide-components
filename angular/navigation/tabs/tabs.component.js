import controller from './tabs.controller.js';
import template from './tabs.html';

const Tabs = {
  controller,
  template,
  bindings: {
    tabs: '<',
    active: '=',
    onChange: '&'
  }
};

export default Tabs;
