/* This module is deprecated, but in use in several places */

import angular from 'angular';

import Forms                from './forms/';
import Loading              from './loading/';
import Services             from './services/';

export default angular.module('tw.form-components', [
  Forms,
  Loading,
  Services
]).name;
