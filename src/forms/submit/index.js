import angular from 'angular';
import Submit from './submit.component.js';
import Process from '../../loading/process';
import DomService from '../../services/dom';

export default angular
  .module('tw.styleguide.forms.submit', [
    Process,
    DomService
  ])
  .component('twSubmit', Submit).name;
