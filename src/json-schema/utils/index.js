import angular from 'angular';

import { cleanModel } from './clean-model';
import { validateSchema } from './validation';

function Utils() {
  this.cleanModel = cleanModel;
  this.validateSchema = validateSchema;
}

export default angular
  .module('tw.json-schema.utils', [])
  .service('SchemaUtils', Utils).name;
