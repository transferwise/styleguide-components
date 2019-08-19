import angular from 'angular';

import TextFormat from './text-format';
import DateFormat from './date-format';
import NumberFormat from './number-format';
import CurrencyFormat from './currency-format';

export default angular.module('tw.styleguide.formatting', [
  TextFormat,
  DateFormat,
  NumberFormat,
  CurrencyFormat
]).name;
