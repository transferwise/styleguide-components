import angular from 'angular';
import template from './fieldset.demo.html';

export default angular
  .module('tw.styleguide.demo.forms.fieldset', [])
  .component('twFieldsetDocs', {
    bindings: {
      model: '=',
      fields: '='
    },
    controller() {
      this.model = {
        text: 'helloworld',
        number: 123456,
        select: '1',
        date: '2000-01-01T00:00:00.000Z',
        checkbox: true,
        radio: '2',
        password: 'qwerty',
        telephone: '+441234567890'
      };

      this.refresh = function () {
        console.log('onRefreshRequirements');
      };

      this.onModelChange = function (model) {
        console.log(model);
      };

      this.fields = [
        {
          name: 'Text',
          key: 'text',
          type: 'text',
          displayFormat: '***** - *****||*-*-*',
          width: 'md',
          refreshRequirementsOnChange: true
        },
        {
          name: 'Number',
          key: 'number',
          type: 'number',
          width: 'md',
          refreshRequirementsOnChange: true
        },
        {
          name: 'Select',
          key: 'select',
          type: 'select',
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
        {
          name: 'Date',
          key: 'date',
          type: 'date',
          width: 'md',
          refreshRequirementsOnChange: true
        },
        {
          name: 'Password',
          key: 'password',
          type: 'password',
          width: 'md',
          refreshRequirementsOnChange: true
        },
        {
          name: 'Checkbox',
          key: 'checkbox',
          type: 'checkbox',
          placeholder: 'Label',
          width: 'md',
          refreshRequirementsOnChange: true
        },
        {
          name: 'Radio',
          key: 'radio',
          type: 'radio',
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
        {
          name: 'Telephone',
          key: 'telephone',
          type: 'tel',
          placeholder: 'Enter...',
          width: 'md'
        },
        {
          name: 'File',
          key: 'file',
          type: 'upload',
          width: 'md',
          refreshRequirementsOnChange: true
        },
      ];
    },
    template
  }).name;
