import angular from 'angular';
import { TwIconsModule } from '@transferwise/icons/lib/angular';

import './polyfill';

import Forms from './forms';
import Validation from './validation';
import Formatting from './formatting';
import Services from './services';

import Help from './help';
import Layout from './layout';
import Loading from './loading';
import Navigation from './navigation';

// DEPRECATED This is required to support old usages of the sub modules when
// importing the full JS library.
import OldFormComponentModule from './form-components.js';
import OldFormValidationModule from './form-validation.js';

export default angular.module('tw.styleguide-components', [
  Forms,
  Validation,
  Formatting,
  Services,
  Help,
  Layout,
  Loading,
  Navigation,
  OldFormComponentModule,
  OldFormValidationModule,
  TwIconsModule
]).name;
