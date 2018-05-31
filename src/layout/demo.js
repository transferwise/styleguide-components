import angular from 'angular';

import template from './demo.html';

import Affix from './affix/affix.demo';
import Cards from './cards/cards.demo';

export default angular
  .module('tw.styleguide.demo.layout', [Affix, Cards])
  .component('layoutDocs', { template }).name;
