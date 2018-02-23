import angular from 'angular';
import TelephoneControl from './telephone.component.js';
import DomService from '../../services/dom/';
import LocaleService from '../../services/locale/';

export default angular
  .module('tw.styleguide.forms.telephone', [
    DomService,
    LocaleService
  ])
  .component('twTelephone', TelephoneControl).name;
