import angular from 'angular';

import DateService from '../services/tw-date/tw-date.service.js';
import CurrencyService from '../services/tw-currency/tw-currency.service.js';

import Checkbox from './tw-checkbox/tw-checkbox.component.js';
import Radio from './tw-radio/tw-radio.component.js';
import Select from './tw-select/tw-select.component.js';
import Loader from './tw-loader/tw-loader.component.js';
import Process from './tw-process/tw-process.component.js';
import Upload from './tw-upload/tw-upload.component.js';
import DateControl from './tw-date/tw-date.component.js';
import DateLookup from './tw-date-lookup/tw-date-lookup.component.js';
import CurrencyInput from './tw-currency-input/tw-currency-input.component.js';
import AmountCurrencySelect from './tw-amount-currency-select/tw-amount-currency-select.component.js';
import Tabs from './tw-tabs/tw-tabs.component.js';
import DynamicFormControl from './tw-dynamic-form-control/tw-dynamic-form-control.component.js';
import Fieldset from './tw-requirements-form/tw-fieldset.component.js';
import RequirementsForm from './tw-requirements-form/tw-requirements-form.component.js';

// Deprecated
import UploadDroppable from './tw-upload-droppable/tw-upload-droppable.directive.js';

export default angular.module('tw.form-components', [
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
  Tabs,
  Loader,
  Process,

  UploadDroppable
]).name;
