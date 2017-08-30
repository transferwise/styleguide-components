import angular from 'angular';

import Forms from './forms/';
import Validation from './validation/';
import Formatting from './formatting/';

import Help from './help/';
import Layout from './layout/';
import Loading from './loading/';
import Navigation from './navigation/';

export default angular.module('tw.styleguide-components', [
  Forms,
  Validation,
  Formatting,
  Help,
  Layout,
  Loading,
  Navigation
]).name;
