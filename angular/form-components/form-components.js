import angular from 'angular';

import TwDateService from '../services/tw-date/tw-date.service.js';
import TwCurrencyService from '../services/tw-currency/tw-currency.service.js';

import TwCheckbox from './tw-checkbox/tw-checkbox.component.js';
import TwRadio from './tw-radio/tw-radio.component.js';
import TwSelect from './tw-select/tw-select.component.js';
import TwLoader from './tw-loader/tw-loader.component.js';
import TwProcess from './tw-process/tw-process.component.js';
import TwUpload from './tw-upload/tw-upload.component.js';
import TwDate from './tw-date/tw-date.component.js';
import TwDateLookup from './tw-date-lookup/tw-date-lookup.component.js';
import TwCurrencyInput from './tw-currency-input/tw-currency-input.component.js';
import TwAmountCurrencySelect from './tw-amount-currency-select/tw-amount-currency-select.component.js';
import TwTabs from './tw-tabs/tw-tabs.component.js';
import TwDynamicFormControl from './tw-dynamic-form-control/tw-dynamic-form-control.component.js';
import TwFieldset from './tw-requirements-form/tw-fieldset.component.js';
import TwRequirementsForm from './tw-requirements-form/tw-requirements-form.component.js';

// Deprecated
import TwUploadDroppable from './tw-upload-droppable/tw-upload-droppable.directive.js';

export default angular.module('tw.form-components', [
  TwDateService,
  TwCurrencyService,

  TwCheckbox,
  TwRadio,
  TwSelect,
  TwUpload,
  TwDate,
  TwDateLookup,
  TwCurrencyInput,
  TwAmountCurrencySelect,
  TwFieldset,
  TwRequirementsForm,
  TwTabs,
  TwLoader,
  TwProcess,

  TwUploadDroppable
]).name;
