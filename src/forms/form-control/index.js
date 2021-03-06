import angular from 'angular';
import Select from '../select';
import Radio from '../radio';
import Checkbox from '../checkbox';
import CheckboxGroup from '../checkbox-group';
import DateControl from '../date';
import Upload from '../upload';

import FormControl from './form-control.component.js';

export default angular
  .module('tw.styleguide.forms.form-control', [
    Select,
    Radio,
    Checkbox,
    CheckboxGroup,
    DateControl,
    Upload
  ])
  .component('twFormControl', FormControl)
  .component('twDynamicFormControl', FormControl) // Deprecated
  .name;
