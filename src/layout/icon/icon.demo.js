import angular from 'angular';
import template from './icon.demo.html';

import Icon from './';

export default angular.module('tw.styleguide.demo.layout.icon', [Icon]).component('twIconDocs', {
  template,
}).name;
