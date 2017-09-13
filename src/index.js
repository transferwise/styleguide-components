import angular from 'angular';

import Forms from './forms/';
import Validation from './validation/';
import Formatting from './formatting/';
import Services from './services/';

import Help from './help/';
import Layout from './layout/';
import Loading from './loading/';
import Navigation from './navigation/';
import Utils from './utils/';

export default angular.module('tw.styleguide-components', [
  Forms,
  Validation,
  Formatting,
  Services,
  Help,
  Layout,
  Loading,
  Navigation,
  Utils
]).name;
