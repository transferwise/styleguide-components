import angular from 'angular';
import template from './demo.html';

// import schema from './demo.json';
import schema from './recipient.json';

class controller {
  $onInit() {
    this.errors = {
      currency: 'This one is bad',
      accountNumber: 'Also this one',
      streetAddress: 'And this one could be better',
      shareholders: [{
        firstName: 'Will it...'
      }, {
        lastName: 'Wont it...'
      }]
    };

    this.errors = {
      shareholders: [
        {},
        {
          lastName: 'Last name is required'
        }
      ]
    };
    this.schema = schema;

    this.model = {
      name: 'Example',
      taxRegistered: true,
      shareholders: [{
        firstName: 'Joe',
        lastName: 'Blogs'
      }, {
        firstName: 'Joe'
      }],
      streetAddress: '22 Accacia Avenue'
    };

    this.model = {};

    this.translations = {
      array: {
        add: 'Add',
        remove: 'Remove'
      },
      validation: {
        required: 'Field is required',
        minLength: 'Too short',
        maxLength: 'Too long',
        minimum: 'Too low',
        maximum: 'Too high',
        pattern: 'Invalid characters'
      },
      upload: {
        choose: 'Choose file',
        processing: 'Working...',
        success: 'Success!',
        failed: 'Upload failed',
        cancel: 'Choose another file'
      }
    };
  }

  onModelChange(model) {
    console.log('outer', model); // eslint-disable-line
    this.model = model;
  }

  onRefreshRequirements(model) { // eslint-disable-line
    console.log('refresh', model); // eslint-disable-line
  }
}

export default angular
  .module('tw.styleguide.demo.json-schema', [])
  .component('jsonSchemaDocs', {
    controller,
    template
  }).name;
