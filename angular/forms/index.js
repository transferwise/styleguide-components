import angular from 'angular';

import DateService from '../services/date/tw-date.service.js';
import CurrencyService from '../services/currency/tw-currency.service.js';

import Checkbox from './checkbox/tw-checkbox.component.js';
import Radio from './radio/tw-radio.component.js';
import Select from './select/tw-select.component.js';
import Upload from './upload/tw-upload.component.js';
import DateControl from './date/tw-date.component.js';
import DateLookup from './date-lookup/tw-date-lookup.component.js';
import CurrencyInput from './currency-input/tw-currency-input.component.js';
import AmountCurrencySelect from './amount-currency-select/tw-amount-currency-select.component.js';
import DynamicFormControl from './dynamic-form-control/tw-dynamic-form-control.component.js';
import Fieldset from './fieldset/tw-fieldset.component.js';
import RequirementsForm from './requirements-form/tw-requirements-form.component.js';
import Focusable from './focusable/tw-focusable.directive.js';

// Deprecated
import UploadDroppable from './upload-droppable/tw-upload-droppable.directive.js';

export default angular.module('tw.styleguide.forms', [
  DateService,
  CurrencyService,

  Checkbox,
  Radio,
  Select,
  Upload,
  DateControl,
  DateLookup,
  CurrencyInput,
  AmountCurrencySelect,
  DynamicFormControl,
  Fieldset,
  RequirementsForm,
  Focusable,

  UploadDroppable
]).name;
