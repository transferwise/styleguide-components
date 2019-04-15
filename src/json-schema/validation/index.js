import angular from 'angular';

import { getValidModelParts } from './valid-model';
import { getValidationFailures } from './validation-failures';
import { isValidSchema } from './schema-validators';
import * as ruleValidators from './rule-validators';
import * as typeValidators from './type-validators';

function Validation() {
  this.getValidModelParts = getValidModelParts;
  this.getValidationFailures = getValidationFailures;
  this.isValidSchema = isValidSchema;
  this.ruleValidators = ruleValidators;
  this.typeValidators = typeValidators;
}

export default angular
  .module('tw.json-schema.validation', [])
  .service('SchemaValidation', Validation).name;
