import angular from 'angular';
import DateControl from './date.component.js';
import DateService from '../../services/date/';

export default angular
  .module('tw.styleguide.forms.date', [
    DateService
  ])
  .component('twDate', DateControl).name;
