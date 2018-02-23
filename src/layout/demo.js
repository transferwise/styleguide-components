import angular from 'angular';

import Affix from './affix/affix.demo.js';
import Cards from './cards/cards.demo.js';

export default angular.module('tw.styleguide.demo.layout', [
  Affix,
  Cards
]).name;
