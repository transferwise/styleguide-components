import angular from 'angular';
import template from './demo.html';

class controller {
  $onInit() {
    this.errors = {};
    this.schema = {
      allOf: [
        {
          type: 'object',
          properties: {
            currency: {
              title: 'Currency',
              type: 'string',
              values: [
                {value: 'EUR', label: 'Euro'},
                {value: 'USD', label: 'US Dollar'}
              ],
              control: 'select',
              default: 'EUR'
            }
          }
        },
        {
          oneOf: [
            {
              type: 'object',
              title: 'Local bank account',
              properties: {
                fullName: { title: 'Full name', type: 'string' },
                sortCode: {
                  title: 'Sort code',
                  type: 'string',
                  placeholder: '40-30-20'
                },
                accountNumber: {
                  title: 'Account number',
                  type: 'string',
                  placeholder: '12345678'
                }
              }
            },
            {
              type: 'object',
              title: 'IBAN',
              properties: {
                iban: { title: 'IBAN', type: 'string' }
              }
            }
          ]
        },
        {
          type: 'object',
          title: 'Address details',
          properties: {
            streetAddress: { title: 'Street address', type: 'string' }
          }
        },
        {
          type: 'object',
          title: 'Shareholders',
          properties: {
            shareholders: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  firstName: { type: 'string', title: 'First name' },
                  lastName: { type: 'string', title: 'Last name' }
                }
              }
            }
          }
        }
      ]
    };
  }

  onModelChange(model) {
    console.log('outer', model);
    this.model = model;
  }
}

export default angular
  .module('tw.styleguide.demo.json-schema', [])
  .component('jsonSchemaDocs', {
    controller,
    template
  }).name;
