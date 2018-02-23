import angular from 'angular';
import template from './field.demo.html';

export default angular
  .module('tw.styleguide.demo.forms.field', [])
  .component('twFieldDocs', {
    controller: fieldDocsController,
    template
  })
  .component('fieldExample', {
    bindings: {
      name: '@',
      model: '=',
      field: '<',
      errorMessage: '<',
      warningMessage: '<',
      onFocusHandler: '&?onFocus',
      onBlurHandler: '&?onBlur',
      onChangeHandler: '&?onChange'
    },
    controller() {
      this.onFocus = () => {
        if (this.onFocusHandler) {
          this.onFocusHandler();
        }
      };
      this.onBlur = () => {
        if (this.onBlurHandler) {
          this.onBlurHandler();
        }
      };
      this.onChange = (newValue) => {
        if (this.onChangeHandler) {
          this.onChangeHandler({ value: newValue });
        }
      };
    },
    template: `
    <div class="row">
      <div class="col-md-6">
        <tw-field
          name="$ctrl.name"
          model="$ctrl.model"
          field="$ctrl.field"
          error-message="$ctrl.errorMessage"
          warning-message="$ctrl.warningMessage"
          on-focus="$ctrl.onFocus()"
          on-blur="$ctrl.onBlur()"
          on-change="$ctrl.onChange(value)">
        </tw-field>
      </div>
      <div class="col-md-6" ng-class="{'p-t-3': $ctrl.field.format !== 'base64url'}">
<pre>&lt;tw-field
  name="{{ $ctrl.name }}"
  model="{{ $ctrl.model }}"<span ng-if="$ctrl.errorMessage">
  error-message="'{{ $ctrl.errorMessage }}'"</span><span ng-if="$ctrl.warningMessage">
  warning-message="'{{ $ctrl.warningMessage }}'"</span><span ng-if="$ctrl.onFocusHandler">
  on-focus="console.log('focus')"</span><span ng-if="$ctrl.onBlurHandler">
  on-blur="console.log('blur')"</span><span ng-if="$ctrl.onChangeHandler">
  on-change="console.log(value)"</span>
  field="
<div class="m-l-2">{{ $ctrl.field | json }}"&gt;</div>&lt;/tw-field&gt;</pre>
      </div>
    </div>`
  }).name;


function fieldDocsController() {
  this.log = (message) => {
    console.log(message); // eslint-disable-line
  };

  // Basic types
  this.stringBasic = {
    type: 'string',
    title: 'String label',
    placeholder: 'Please enter string'
  };
  this.numberBasic = {
    type: 'number',
    title: 'Number control',
    placeholder: 'Please enter number'
  };
  this.booleanBasic = {
    type: 'boolean',
    title: 'Boolean control',
    placeholder: 'Please choose'
  };

  this.basicTypesModel = {
    stringProperty: 'Example',
    numberProperty: 123,
    booleanProperty: false
  };

  // Formats
  this.dateBasic = {
    type: 'string',
    format: 'date',
    title: 'Date control'
  };
  this.phoneBasic = {
    type: 'string',
    format: 'phone',
    title: 'Phone control'
  };
  this.uploadBasic = {
    type: 'string',
    format: 'base64url',
    title: 'Upload control',
    placeholder: 'Choose file...'
  };

  this.basicFormatsModel = {
    dateProperty: '2017-12-01',
    passwordProperty: 'qwerty'
  };

  this.selectBasic = {
    type: 'number',
    title: 'Select control',
    placeholder: 'Please choose',
    values: [{
      value: 1, label: 'One'
    }, {
      value: 2, label: 'Two'
    }, {
      value: 3, label: 'Three'
    }, {
      value: 4, label: 'Four'
    }]
  };
  this.radioBasic = {
    type: 'string',
    title: 'Radio control',
    values: [{
      value: '1', label: 'One'
    }, {
      value: '2', label: 'Two'
    }]
  };
  this.selectionsModel = {
    selectProperty: 1,
    radioProperty: '2'
  };

  // Control type overrides
  this.passwordOverride = {
    type: 'string',
    control: 'password',
    title: 'Password override',
    placeholder: 'Choose password...'
  };
  this.telephoneOverride = {
    type: 'string',
    control: 'tel',
    title: 'Telephone override'
  };
  this.selectOverride = {
    type: 'string',
    title: 'Select override',
    control: 'select',
    values: [{
      value: '1', label: 'One'
    }, {
      value: '2', label: 'Two'
    }]
  };

  this.override = {
    telephone: '+441234567890',
    password: 'qwerty',
    select: '1'
  };

  // Values Async
  this.valuesAsync = {
    type: 'number',
    title: 'Values async',
    control: 'select',
    placeholder: 'Please choose',
    valuesAsync: {
      method: 'GET',
      url: 'json/values-async.json'
    }
  };
  this.valuesAsyncModel = null;

  // Validation
  this.stringValidation = {
    type: 'string',
    title: 'String validation',
    placeholder: 'Please enter text',
    required: true,
    pattern: '^[A-Z]*$',
    minLength: 4,
    maxLength: 6,
    validationMessages: {
      required: 'String is required',
      minlength: 'Must contain at least 4 characters',
      maxlength: 'Must contain 6 characters or less',
      pattern: 'Must only contain capital letters A to Z'
    }
  };
  this.numberValidation = {
    type: 'number',
    title: 'Number control',
    placeholder: 'Please enter number',
    required: true,
    minimum: 10,
    maximum: 99,
    validationMessages: {
      required: 'Number is required',
      minimum: 'Must be 10 or greater',
      maximum: 'Must be 99 or less'
    }
  };
  this.dateValidation = {
    type: 'string',
    format: 'date',
    title: 'Date control',
    required: true,
    minimum: '2000-01-01',
    maximum: '2020-01-01',
    validationMessages: {
      required: 'Date is required',
      minimum: 'Must be after Jan 1st, 2000',
      maximum: 'Must be before Jan 1st, 2020'
    }
  };
  this.validationModel = {
    stringProperty: 'Tex',
    numberProperty: 123,
    dateProperty: null
  };

  // Custom messages
  this.customErrors = {
    type: 'string',
    title: 'Custom error',
    placeholder: 'Please enter text'
  };
  this.customErrorsMessage = 'Custom error message';

  this.customWarning = {
    type: 'string',
    title: 'Warning message',
    key: 'stringProperty',
    placeholder: 'Please enter text'
  };
  this.customWarningMessage = 'This is a warning!';

  // Help information
  this.helpText = {
    type: 'string',
    title: 'Help text',
    placeholder: 'Please enter text',
    helpText: 'Some helpful information'
  };
  this.helpList = {
    type: 'string',
    title: 'Help list',
    placeholder: 'Please enter number',
    helpList: [
      'Make sure of this',
      'And this',
      'And avoid this'
    ]
  };
  this.helpImage = {
    type: 'string',
    title: 'Help image',
    placeholder: 'Please enter number',
    helpImage: 'images/captcha.png'
  };

  // Presentation options
  this.displayFormat = {
    type: 'string',
    title: 'String display format',
    placeholder: 'Please enter...',
    displayFormat: '** - ** - **'
  };

  this.presentationModel = {
    displayFormat: '123456',
    disabledControl: "I'm disabled",
    hiddenControl: "I'm hidden"
  };

  this.uploadComponent = {
    type: 'string',
    format: 'base64url',
    title: 'Upload options',
    placeholder: 'Please choose a file',
    uploadOptions: {
      buttonText: 'Choose file...',
      cancelText: 'Choose a different file?',
      processingText: 'Processing...',
      successText: 'Upload complete!',
      failureText: 'Upload failed'
    }
  };
  this.disabledControl = {
    type: 'string',
    title: 'Disabled control',
    placeholder: 'Please enter...',
    disabled: true
  };
  this.hiddenControl = {
    type: 'string',
    hidden: true
  };
}
