import angular from 'angular';

import { getValidModelParts } from './valid-model';
import { validateSchema } from './validation';

function Utils() {
  this.getValidModelParts = getValidModelParts;
  this.validateSchema = validateSchema;
}

export default angular
  .module('tw.json-schema.utils', [])
  .service('SchemaUtils', Utils).name;
