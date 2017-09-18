import angular from 'angular';

import Affix from './affix/';
import Cards from './cards/';

export default angular.module('tw.styleguide.layout', [
  Affix,
  Cards
]).name;
