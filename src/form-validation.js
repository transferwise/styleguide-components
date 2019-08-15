/* This module is deprecated, but in use in several places */

import angular from 'angular';

import './polyfill';

import Validation from './validation';
import Services from './services';

export default angular.module('tw.form-validation', [
  Validation,
  Services
]).name;
