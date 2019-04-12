import angular from 'angular';

import { getValidModelParts } from './valid-model';
import { getValidationFailures, isValidSchema } from './validation';

function Utils() {
  this.getValidModelParts = getValidModelParts;
  this.getValidationFailures = getValidationFailures;
  this.isValidSchema = isValidSchema;
}

export default angular
  .module('tw.json-schema.utils', [])
  .service('SchemaUtils', Utils).name;
