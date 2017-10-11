import angular from 'angular';
import PhoneNumberControl from './phone-number.component.js';

export default angular
  .module('tw.styleguide.forms.phone-number', [])
  .component('twPhoneNumber', PhoneNumberControl).name;
