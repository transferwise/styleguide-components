import angular from 'angular';
import NumberComponent from './number-format.component';
import NumberFilter from './number-format.filter';
import LocaleService from '../../services/locale';

export default angular
  .module('tw.styleguide.formatting.number', [LocaleService])
  .component('twNumberFormat', NumberComponent)
  .filter('twNumberFormat', NumberFilter)
  .name;
