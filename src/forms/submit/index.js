import angular from 'angular';
import Submit from './submit.component.js';
import Process from '../../loading/process/';

export default angular
  .module('tw.styleguide.forms.submit', [
    Process
  ])
  .component('twSubmit', Submit).name;
