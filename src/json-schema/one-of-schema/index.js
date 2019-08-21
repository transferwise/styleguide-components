import angular from 'angular';
import Component from './component';
import Radio from '../../forms/radio';

export default angular
  .module('tw.json-schema.one-of', [
    Radio
  ])
  .component('oneOfSchema', Component).name;
