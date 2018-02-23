import angular from 'angular';
import template from './form-control.demo.html';

export default angular
  .module('tw.styleguide.demo.forms.form-control', [])
  .component('twFormControlDocs', {
    bindings: {
      model: '=',
      locales: '<',
      sizes: '<'
    },
    controller() {
      this.dynamic = {
        required: true,
        options: [
          { value: '1', label: 'One' },
          { value: '2', label: 'Two' },
          { value: '3', label: 'Three' },
        ],
        types: [
          { value: 'text', label: 'Text' },
          { value: 'password', label: 'Password' },
          { value: 'number', label: 'Number' },
          { value: 'select', label: 'Select' },
          { value: 'radio', label: 'Radio' },
          { value: 'checkbox', label: 'Checkbox' },
          { value: 'upload', label: 'Upload' },
          { value: 'date', label: 'Date' },
          { value: 'tel', label: 'Telephone' }
        ]
      };
      this.log = function (message) { console.log(message); };
    },
    template
  })
  .directive('validateRegexp', ['$q', function ($q) {
    return {
      require: 'ngModel',
      link(scope, element, attrs, ngModel) {
        ngModel.$asyncValidators.async = function () { // (modelValue, viewValue) {
          try {
            // const reg = new RegExp(viewValue);
            return $q.when(true);
          } catch (error) {
            return $q.reject(false);
          }
        };
      }
    };
  }]).name;
