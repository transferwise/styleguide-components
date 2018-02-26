import angular from 'angular';
import template from './text-format.demo.html';

export default angular
  .module('tw.styleguide.demo.formatting.text-format', [])
  .component('twTextFormatDocs', {
    controller() {
      const $ctrl = this;
      $ctrl.patterns = [
        {
          value: {
            format: '**** **** **** ****',
            minlength: 16,
            maxlength: 20,
            pattern: '^[0-9]*$',
            placeholder: 'Number on the front of your card',
            helpText: 'Credit/debit cards have either 16 or 20 digits'
          },
          label: 'Credit card number',
          note: '**** **** **** ****'
        },
        {
          value: {
            format: '** / **',
            minlength: 4,
            maxlength: 4,
            pattern: '^[0-9]*$',
            placeholder: 'MM / YY',
            helpText: 'Month, then year'
          },
          label: 'Card expiry',
          note: '** / **'
        },
        {
          value: {
            format: '** - ** - **',
            minlength: 6,
            maxlength: 7,
            pattern: '^[0-9]*$',
            placeholder: '** - ** - **',
            helpText: 'UK sort codes have 6 or 7 digits'
          },
          label: 'UK sort code',
          note: '** - ** - **',
        },
        {
          value: {
            format: '(+**) **** *** ***',
            minlength: 10,
            maxlength: 12,
            placeholder: '(+**) **** *** ***'
          },
          label: 'UK phone number',
          note: '(+**) **** *** ***',
        },
        {
          value: {
            format: '***.***.***-**',
            minlength: 11,
            maxlength: 11,
            placeholder: '***.***.***-**'
          },
          label: 'Brazilian CPF ID',
          note: '***.***.***-**',
        },
        {
          value: {
            format: '**.***.*** - *',
            minlength: 9,
            maxlength: 9,
            placeholder: '**.***.*** - *'
          },
          label: 'Chilean RUT ID',
          note: '**.***.*** - *',
        },
      ];
    },
    bindings: {
      model: '='
    },
    template
  }).name;
