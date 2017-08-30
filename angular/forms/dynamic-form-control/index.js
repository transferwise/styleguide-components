import Select from '../select/';
import Radio from '../radio/';
import Checkbox from '../checkbox/';
import DateControl from '../date/';
import Upload from '../upload/';

import TwDynamicFormControl from './tw-dynamic-form-control.component.js';

export default angular
  .module('tw.styleguide.forms.dynamic-form-control', [])
  .component('twDynamicFormControl', TwDynamicFormControl).name;
