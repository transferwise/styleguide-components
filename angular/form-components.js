import angular from 'angular';

import DateService          from './services/date/tw-date.service.js';
import CurrencyService      from './services/currency/tw-currency.service.js';

import Checkbox             from './forms/checkbox/';
import Radio                from './forms/radio/';
import Select               from './forms/select/';
import Upload               from './forms/upload/';
import DateControl          from './forms/date/';
import DateLookup           from './forms/date-lookup/';
import CurrencyInput        from './forms/currency-input/';
import AmountCurrencySelect from './forms/amount-currency-select/';
import DynamicFormControl   from './forms/dynamic-form-control/';
import Fieldset             from './forms/fieldset/';
import Focusable            from './forms/focusable/';

import Tabs                 from './navigation/tabs/';
import Loader               from './loading/loader/';
import Process              from './loading/process/';

import RequirementsForm     from './forms/requirements-form/';

// Deprecated
import UploadDroppable      from './forms/upload-droppable/';

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
  Focusable,

  Tabs,
  Loader,
  Process,

  RequirementsForm,

  UploadDroppable
]).name;
