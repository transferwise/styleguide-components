import angular from 'angular';

import TextFormat from './text-format';
import DateFormat from './date-format';
import NumberFormat from './number-format';
import CurrencyFormat from './currency-format';
import Markdown from './markdown';

export default angular.module('tw.styleguide.formatting', [
  TextFormat,
  DateFormat,
  NumberFormat,
  CurrencyFormat,
  Markdown,
]).name;
