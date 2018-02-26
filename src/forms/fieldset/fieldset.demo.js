import angular from 'angular';
import template from './fieldset.demo.html';

export default angular
  .module('tw.styleguide.demo.forms.fieldset', [])
  .component('twFieldsetDocs', {
    controller: fieldsetDocsController,
    template
  })
  .component('fieldsetExample', {
    bindings: {
      model: '=',
      requirements: '<',
      onRefreshRequirements: '&?',
      onModelChangeHandler: '&?onModelChange',
      onFieldFocusHandler: '&?onFieldFocus',
      onFieldBlurHandler: '&?onFieldBlur',
      onFieldChangeHandler: '&?onFieldChange'
    },
    controller() {
      this.isValid = false;
      this.onFieldFocus = (key, field) => {
        if (this.onFieldFocusHandler) {
          this.onFieldFocusHandler({ key, field });
        }
      };
      this.onFieldBlur = (key, field) => {
        if (this.onFieldBlurHandler) {
          this.onFieldBlurHandler({ key, field });
        }
      };
      this.onFieldChange = (value, key, field) => {
        if (this.onFieldChangeHandler) {
          this.onFieldChangeHandler({ value, key, field });
        }
      };
      this.onModelChange = (model) => {
        if (this.onModelChangeHandler) {
          this.onModelChangeHandler({ model });
        }
      };
    },
    template: `
    <div class="row">
      <div class="col-md-6">
        <tw-fieldset
          title="{{ $ctrl.requirements.title }}"
          description="{{ $ctrl.requirements.description }}"
          model="$ctrl.model"
          fields="$ctrl.requirements.fields"
          is-valid="$ctrl.isValid"
          on-model-change="$ctrl.onModelChange(model)"
          on-field-focus="$ctrl.onFieldFocus(key, field)"
          on-field-blur="$ctrl.onFieldBlur(key, field)"
          on-field-change="$ctrl.onFieldChange(value, key, field)"
          on-refresh-requirements="$ctrl.onRefreshRequirements()"
          upload-options="{buttonText: 'Choose file'}">
        </tw-fieldset>
      </div>
      <div class="col-md-6 p-t-3">
<pre>&lt;tw-fieldset<span ng-if="$ctrl.requirements.title">
  title="{{ $ctrl.requirements.title }}"</span><span ng-if="$ctrl.requirements.description">
  description="{{ $ctrl.requirements.description }}"</span>
  is-valid="{{ $ctrl.isValid }}"<span ng-if="$ctrl.onModelChangeHandler">
  on-model-change="(model) => { console.log(model); }"</span><span ng-if="$ctrl.onFieldFocusHandler">
  on-field-focus="(key, field) => { console.log('focus: ' + key); }"</span><span ng-if="$ctrl.onFieldBlurHandler">
  on-field-blur="(key, field) => { console.log('blur: ' + key); }"</span><span ng-if="$ctrl.onFieldChangeHandler">
  on-field-change="(value, key, field) => { console.log('changed: '+ key + ' to ' + value); }"</span>
  model="{{ $ctrl.model | json }}"
  fields="<div class="m-l-2">{{ $ctrl.requirements.fields | json }}"&gt;</div>&lt;/tw-fieldset&gt;</pre>
      </div>
    </div>`
  }).name;

function fieldsetDocsController() {
  this.onFieldChange = (value, key) => {
    this.log(`change: ${key} to ${value}`);
  };
  this.refresh = () => {
    this.log('onRefreshRequirements');
  };
  this.log = (message) => {
    console.log(message); // eslint-disable-line
  };

  this.fieldsetBasic = {
    fields: {
      stringProperty: {
        type: 'string',
        title: 'String label',
        placeholder: 'Please enter text'
      },
      numberProperty: {
        type: 'number',
        title: 'Number label',
        placeholder: 'Please enter number',
        required: true,
        min: 5
      }
    }
  };
  this.fieldsetBasicModel = {
    stringProperty: 'Example',
    numberProperty: 123
  };

  this.fieldsetOptions = {
    title: 'Fieldset legend',
    description: 'Optional fieldset description, with more information about the content.',
    fields: {
      keyName: {
        type: 'text',
        title: 'Control label',
        placeholder: 'Please enter text'
      }
    }
  };
  this.fieldsetOptionsModel = {
    keyName: 'Example'
  };

  this.fieldsetLayout = {
    fields: {
      stringProperty: {
        type: 'string',
        title: 'String label',
        placeholder: 'Please enter text',
        width: 'md'
      },
      booleanProperty: {
        type: 'boolean',
        title: 'Boolean label',
        placeholder: 'Check it',
        width: 'md'
      },
      numberProperty: {
        type: 'number',
        title: 'Number label',
        placeholder: 'Please enter number',
        width: 'sm',
        required: true
      }
    }
  };
  this.fieldsetLayoutModel = {};

  this.fieldsetFull = {
    fields: {
      text: {
        title: 'Text',
        type: 'text',
        displayFormat: '***** - *****||*-*-*',
        width: 'md',
        refreshRequirementsOnChange: true
      },
      number: {
        title: 'Number',
        type: 'number',
        width: 'md',
        refreshRequirementsOnChange: true
      },
      select: {
        title: 'Select',
        type: 'string',
        control: 'select',
        width: 'md',
        refreshRequirementsOnChange: true,
        values: [
          {
            key: '1',
            name: 'One'
          },
          {
            key: '2',
            name: 'Two'
          }
        ]
      },
      password: {
        title: 'Password',
        type: 'string',
        control: 'password',
        width: 'md',
        refreshRequirementsOnChange: true
      },
      date: {
        title: 'Date',
        type: 'string',
        format: 'date',
        refreshRequirementsOnChange: true
      },
      telephone: {
        title: 'Telephone',
        type: 'string',
        control: 'tel',
        placeholder: 'Enter...'
      },
      radio: {
        title: 'Radio',
        type: 'string',
        control: 'radio',
        width: 'md',
        refreshRequirementsOnChange: true,
        values: [
          {
            key: '1',
            name: 'One'
          },
          {
            key: '2',
            name: 'Two'
          }
        ]
      },
      checkbox: {
        title: 'Checkbox',
        type: 'boolean',
        placeholder: 'Label',
        width: 'md',
        refreshRequirementsOnChange: true
      },
      textarea: {
        title: 'Textarea',
        type: 'string',
        control: 'textarea',
        refreshRequirementsOnChange: true
      },
      file: {
        title: 'File',
        type: 'UPLOAD',
        refreshRequirementsOnChange: true
      }
    }
  };

  this.fieldsetFullModel = {
    text: 'helloworld',
    number: 123456,
    select: '1',
    date: '2000-01-01T00:00:00.000Z',
    checkbox: true,
    radio: '2',
    password: 'qwerty',
    telephone: '+441234567890'
  };
}
