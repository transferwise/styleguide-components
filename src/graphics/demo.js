import angular from 'angular';

import template from './demo.html';

import Icon from './icon/icon.demo';
import './icon.less';

export default angular
  .module('tw.styleguide.demo.graphics', [Icon])
  .component('graphicsDocs', { template }).name;
