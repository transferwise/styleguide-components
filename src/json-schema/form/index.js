import angular from 'angular';
/**
 * The entry point is just a generic-schema component, so we import the code
 * from there.  This presents a better named component for consumers, and gives
 * us a bit more flexibility to change the generic-schema in future.
 */
import Component from '../generic-schema/component';

export default angular
  .module('tw.json-schema.form', [])
  .component('jsonSchemaForm', Component).name;
