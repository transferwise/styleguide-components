import angular from 'angular';

import { getValidModelParts } from './valid-model';
import { validateSchema, isValidSchema } from './validation';

function Utils() {
  this.getValidModelParts = getValidModelParts;
  this.validateSchema = validateSchema;
  this.isValidSchema = isValidSchema;
}

export default angular
  .module('tw.json-schema.utils', [])
  .service('SchemaUtils', Utils).name;
