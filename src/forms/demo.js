import angular from 'angular';
import template from './demo.html';

import Checkbox from './checkbox/checkbox.demo.js';
import Radio from './radio/radio.demo.js';
import Select from './select/select.demo.js';
import Upload from './upload/upload.demo.js';
import Date from './date/date.demo.js';
import DateLookup from './date-lookup/date-lookup.demo.js';
import Telephone from './telephone/telephone.demo.js';
import Submit from './submit/submit.demo.js';
import DecisionList from './decision-list/decision-list.demo.js';

import CurrencyInput from './currency-input/currency-input.demo.js';
import AmountCurrencySelect from './amount-currency-select/amount-currency-select.demo.js';

import FormControl from './form-control/form-control.demo.js';
import Field from './field/field.demo.js';
import Fieldset from './fieldset/fieldset.demo.js';
import RequirementsForm from './requirements-form/requirements-form.demo.js';
import DefinitionList from './definition-list/definition-list.demo.js';

import Focusable from './focusable/focusable.demo.js';

export default angular.module('tw.styleguide.demo.forms', [
  Checkbox,
  Radio,
  Select,
  Date,
  DateLookup,
  Upload,
  Telephone,
  CurrencyInput,
  AmountCurrencySelect,
  FormControl,
  Field,
  Fieldset,
  RequirementsForm,
  DefinitionList,
  Focusable,
  Submit,
  DecisionList
]).component('formDocs', {
  bindings: {
    model: '=',
    locales: '<'
  },
  controller() {
    this.sizes = [
      { value: 'sm', label: 'Small' },
      { value: 'md', label: 'Medium' },
      { value: 'lg', label: 'Large' }
    ];
  },
  template
}).name;
