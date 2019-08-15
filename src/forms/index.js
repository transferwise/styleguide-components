import angular from 'angular';

import Checkbox from './checkbox';
import Radio from './radio';
import Select from './select';
import Upload from './upload';
import DateControl from './date';
import DateLookup from './date-lookup';
import CurrencyInput from './currency-input';
import AmountCurrencySelect from './amount-currency-select';
import FormControl from './form-control';
import Field from './field';
import Fieldset from './fieldset';
import RequirementsForm from './requirements-form';
import Focusable from './focusable';
import DefinitionList from './definition-list';
import Telephone from './telephone';
import Submit from './submit';

// Deprecated
import UploadDroppable from './upload-droppable';

export default angular.module('tw.styleguide.forms', [
  Checkbox,
  Radio,
  Select,
  Upload,
  DateControl,
  DateLookup,
  CurrencyInput,
  AmountCurrencySelect,
  FormControl,
  Field,
  Fieldset,
  RequirementsForm,
  Focusable,
  DefinitionList,
  Telephone,
  Submit,
  UploadDroppable
]).name;
