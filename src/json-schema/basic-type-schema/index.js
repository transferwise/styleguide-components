import angular from 'angular';
import Component from './component';
import Field from '../../forms/field';

export default angular
  .module('tw.json-schema.basic-type', [
    Field
  ])
  .component('basicTypeSchema', Component).name;
