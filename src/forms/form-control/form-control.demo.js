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
      this.log = (message) => {
        console.log(message); // eslint-disable-line
      };
    },
    template
  })
  .directive('validateRegexp', ['$q', $q => ({
    require: 'ngModel',
    link(scope, element, attrs, ngModel) {
      ngModel.$asyncValidators.async = () => { // (modelValue, viewValue) {
        try {
          // const reg = new RegExp(viewValue);
          return $q.when(true);
        } catch (error) {
          return $q.reject(false);
        }
      };
    }
  })]).name;
