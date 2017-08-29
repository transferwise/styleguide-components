import angular from 'angular';

import Affix from './affix/tw-affix.directive.js';
import Card from './cards/tw-card.directive.js';
import Cards from './cards/tw-cards.component.js';

export default angular.module('tw.styleguide.layout', [
  Affix,
  Card,
  Cards
]).name;
