import angular from 'angular';
import Affix from './affix.directive.js';

export default angular
  .module('tw.styleguide.styling.affix', [])
  .directive('twAffix', Affix).name;
