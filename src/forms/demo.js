import angular from 'angular';

import Checkbox from './checkbox/checkbox.demo.js';
import Radio from './radio/radio.demo.js';
import Select from './select/select.demo.js';
import Upload from './upload/upload.demo.js';
import Date from './date/date.demo.js';
import DateLookup from './date-lookup/date-lookup.demo.js';
import Telephone from './telephone/telephone.demo.js';

import FormControl from './form-control/form-control.demo.js';
import Fieldset from './fieldset/fieldset.demo.js';

export default angular.module('tw.styleguide.demo.forms', [
  Checkbox,
  Radio,
  Select,
  Date,
  DateLookup,
  Upload,
  Telephone,
  FormControl,
  Fieldset
]).name;
