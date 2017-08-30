import Select from '../select/';
import Radio from '../radio/';
import Checkbox from '../checkbox/';
import DateControl from '../date/';
import Upload from '../upload/';

import FormControl from './form-control.component.js';

export default angular
  .module('tw.styleguide.forms.form-control', [])
  .component('twDynamicFormControl', FormControl).name;
