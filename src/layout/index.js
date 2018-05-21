import angular from 'angular';

import Affix from './affix/';
import Cards from './cards/';
import Icon from './icon/';

export default angular.module('tw.styleguide.layout', [Affix, Cards, Icon]).name;
