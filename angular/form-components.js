import angular from 'angular';

import DateService from './services/date/tw-date.service.js';
import CurrencyService from './services/currency/tw-currency.service.js';

import Checkbox from './forms/checkbox/tw-checkbox.component.js';
import Radio from './forms/radio/tw-radio.component.js';
import Select from './forms/select/tw-select.component.js';
import Upload from './forms/upload/tw-upload.component.js';
import DateControl from './forms/date/tw-date.component.js';
import DateLookup from './forms/date-lookup/tw-date-lookup.component.js';
import CurrencyInput from './forms/currency-input/tw-currency-input.component.js';
import AmountCurrencySelect from './forms/amount-currency-select/tw-amount-currency-select.component.js';
import DynamicFormControl from './forms/dynamic-form-control/tw-dynamic-form-control.component.js';
import Fieldset from './forms/fieldset/tw-fieldset.component.js';
import RequirementsForm from './forms/requirements-form/tw-requirements-form.component.js';
import Focusable from './forms/focusable/tw-focusable.directive.js';

import Tabs from './navigation/tabs/tw-tabs.component.js';
import Loader from './styling/loader/tw-loader.component.js';
import Process from './styling/process/tw-process.component.js';

// Deprecated
import UploadDroppable from './forms/upload-droppable/tw-upload-droppable.directive.js';

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
  Focusable,

  Tabs,
  Loader,
  Process,

  UploadDroppable
]).name;
