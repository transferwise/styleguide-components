import { isObject, isArray } from './type-validators';

import {
  getStringValidationFailures,
  getNumberValidationFailures,
  getIntegerValidationFailures,
  getBooleanValidationFailures,
  getArrayValidationFailures
} from './validation-failures';

function isValidStringSchema(value, schema) {
  return !getStringValidationFailures(value, schema).length;
}
function isValidNumberSchema(value, schema) {
  return !getNumberValidationFailures(value, schema).length;
}
function isValidIntegerSchema(value, schema) {
  return !getIntegerValidationFailures(value, schema).length;
}
function isValidBooleanSchema(value, schema) {
  return !getBooleanValidationFailures(value, schema).length;
}

function isValidObjectSchema(value, schema) {
  if (!isObject(value) || schema.type !== 'object' || !isObject(schema.properties)) {
    return false;
  }

  return Object.keys(schema.properties)
    .map(propertyName => isObjectPropertyValid(
      value[propertyName],
      schema.properties[propertyName],
      schema.required.indexOf(propertyName) >= 0
    ))
    .reduce((validSoFar, validProperty) => validSoFar && validProperty, true);
}

function isObjectPropertyValid(propertyValue, propertySchema, isRequired) {
  if (typeof propertyValue === 'undefined') {
    return !isRequired;
  }
  return isValidSchema(propertyValue, propertySchema);
}

function isValidArraySchema(value, schema) { // eslint-disable-line
  if (schema.type !== 'array' || !isObject(schema.items)) {
    return false;
  }

  if (getArrayValidationFailures(value, schema).length) {
    return false;
  }

  return value.reduce((validSoFar, iter) => isValidSchema(iter, schema.items), true);
}

function isValidOneOfSchema(value, schema) { // eslint-disable-line
  if (!isArray(schema.oneOf)) {
    return false;
  }
  return schema.oneOf.reduce((validSoFar, iter) => validSoFar || isValidSchema(value, iter), false);
}

function isValidAllOfSchema(value, schema) { // eslint-disable-line
  if (!isArray(schema.allOf)) {
    return false;
  }
  return schema.allOf.reduce((validSoFar, iter) => validSoFar && isValidSchema(value, iter), true);
}

/**
 * Validate any value against a given schema
 */
function isValidSchema(value, schema) {
  if (schema.oneOf) {
    return isValidOneOfSchema(value, schema);
  } else if (schema.allOf) {
    return isValidAllOfSchema(value, schema);
  }

  switch (schema.type) {
    case 'string':
      return isValidStringSchema(value, schema);
    case 'number':
      return isValidNumberSchema(value, schema);
    case 'integer':
      return isValidIntegerSchema(value, schema);
    case 'boolean':
      return isValidBooleanSchema(value, schema);
    case 'array':
      return isValidArraySchema(value, schema);
    case 'object':
      return isValidObjectSchema(value, schema);
    default:
      return false;
  }
}

export { isValidSchema }; // eslint-disable-line
