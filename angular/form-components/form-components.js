import angular from 'angular';

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

const formComponentsModule = angular.module('tw.form-components');

formComponentsModule.requires.push(TwCheckbox);
formComponentsModule.requires.push(TwRadio);
formComponentsModule.requires.push(TwSelect);
formComponentsModule.requires.push(TwLoader);
formComponentsModule.requires.push(TwProcess);
formComponentsModule.requires.push(TwUpload);
formComponentsModule.requires.push(TwDate);
formComponentsModule.requires.push(TwDateLookup);
formComponentsModule.requires.push(TwCurrencyInput);
formComponentsModule.requires.push(TwTabs);
formComponentsModule.requires.push(TwAmountCurrencySelect);
formComponentsModule.requires.push(TwDynamicFormControl);
formComponentsModule.requires.push(TwFieldset);

formComponentsModule.requires.push(TwUploadDroppable);

export default formComponentsModule.name;

//export default angular.module('tw.form-components', [TwCheckbox]).name;
