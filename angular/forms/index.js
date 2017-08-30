import angular from 'angular';

import DateService          from '../services/date/';
import CurrencyService      from '../services/currency/';

import Checkbox             from './checkbox/';
import Radio                from './radio/';
import Select               from './select/';
import Upload               from './upload/';
import DateControl          from './date/';
import DateLookup           from './date-lookup/';
import CurrencyInput        from './currency-input/';
import AmountCurrencySelect from './amount-currency-select/';
import FormControl          from './dynamic-form-control/';
import Fieldset             from './fieldset/';
import RequirementsForm     from './requirements-form/';
import Focusable            from './focusable/';

// Deprecated
import UploadDroppable      from './upload-droppable/';

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
  FormControl,
  Fieldset,
  RequirementsForm,
  Focusable,

  UploadDroppable
]).name;
