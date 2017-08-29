import angular from 'angular';

import Forms from './forms/';
import Validation from './validation/';
import Formatting from './formatting/';

import Styling from './styling/';
import Layout from './layout/';
import Navigation from './navigation/';

export default angular.module('tw.styleguide-components', [
  Forms,
  Validation,
  Formatting,
  Styling,
  Layout,
  Navigation
]).name;
