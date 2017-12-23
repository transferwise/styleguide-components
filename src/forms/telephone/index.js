import angular from 'angular';
import TelephoneControl from './telephone.component.js';

export default angular
  .module('tw.styleguide.forms.telephone', [])
  .component('twTelephone', TelephoneControl).name;
