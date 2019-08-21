import angular from 'angular';
import DateControl from './date.component';
import DateService from '../../services/date';
import DateFormat from '../../formatting/date-format';
import Select from '../select';
import Focusable from '../focusable';

export default angular
  .module('tw.styleguide.forms.date', [
    DateService,
    DateFormat,
    Select,
    Focusable
  ])
  .component('twDate', DateControl).name;
