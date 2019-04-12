function getValidationFailures(value, schema, isRequired) {
  switch (schema.type) {
    case 'string':
      return getStringValidationFailures(value, schema, isRequired);
    case 'number':
      return getNumberValidationFailures(value, schema, isRequired);
    case 'integer':
      return getIntegerValidationFailures(value, schema, isRequired);
    case 'boolean':
      return getBooleanValidationFailures(value, schema, isRequired);
    case 'array':
      return getArrayValidationFailures(value, schema);
    case 'object':
      return getObjectValidationFailures(value, schema);
    default:
      return [];
  }
}

function getStringValidationFailures(value, schema, isRequired) {
  if (!isString(value)) {
    return ['type'];
  }

  const failures = [];
  if (!isValidRequired(value, isRequired)) {
    failures.push('required');
  }
  if (!isValidMinLength(value, schema.minLength)) {
    failures.push('minLength');
  }
  if (!isValidMaxLength(value, schema.maxLength)) {
    failures.push('maxLength');
  }
  if (!isValidPattern(value, schema.pattern)) {
    failures.push('pattern');
  }
  if (!isValidMin(value, schema.min)) {
    failures.push('min');
  }
  if (!isValidMax(value, schema.max)) {
    failures.push('max');
  }
  return failures;
}

function getNumberValidationFailures(value, schema, isRequired) {
  if (!isNumber(value)) {
    return ['type'];
  }

  const failures = [];
  if (!isValidRequired(value, isRequired)) {
    failures.push('required');
  }
  if (!isValidMin(value, schema.min)) {
    failures.push('min');
  }
  if (!isValidMax(value, schema.max)) {
    failures.push('max');
  }
  return failures;
}

function getIntegerValidationFailures(value, schema, isRequired) {
  if (!isInteger(value)) {
    return ['type'];
  }
  return getNumberValidationFailures(value, schema, isRequired);
}

function getBooleanValidationFailures(value, schema, isRequired) {
  if (!isBoolean(value)) {
    return ['type'];
  }

  const failures = [];
  if (!isValidRequired(value, isRequired)) {
    failures.push('required');
  }
  return failures;
}

function getArrayValidationFailures(value, schema) {
  if (!isArray(value)) {
    return ['type'];
  }

  const failures = [];
  if (!isValidMinItems(value, schema.minItems)) {
    failures.push('minItems');
  }
  if (!isValidMaxItems(value, schema.maxItems)) {
    failures.push('maxItems');
  }
  return failures;
}

/**
 * When validating an object we only checking that it is an object and that it
 * has the required properties, we do not check if the properties are valid.
 */
function getObjectValidationFailures(value, schema) {
  if (!isObject(value)) {
    return ['type'];
  }

  if (!isArray(schema.required)) {
    return [];
  }

  const allPresent = schema.required
    .map(prop => typeof value[prop] !== 'undefined')
    .reduce((propInModel, validSoFar) => propInModel && validSoFar, true);

  return allPresent ? [] : ['required'];
}

function isValidRequired(value, isRequired) {
  return !isRequired || typeof value !== 'undefined';
}

function isValidMinLength(value, minLength) {
  return !minLength || (value && value.length >= minLength);
}

function isValidMaxLength(value, maxLength) {
  return !maxLength || (value && value.length <= maxLength);
}

function isValidPattern(value, pattern) {
  try {
    const regex = new RegExp(pattern);
    return regex.test(value);
  } catch (error) {
    return true;
  }
}

function isValidMax(value, max) {
  return typeof max === 'undefined' || (typeof value !== 'undefined' && value <= max);
}

function isValidMin(value, min) {
  return typeof min === 'undefined' || (typeof value !== 'undefined' && value >= min);
}

function isValidMinItems(value, minItems) {
  return !minItems || (value && value.length >= minItems);
}

function isValidMaxItems(value, maxItems) {
  return !maxItems || (value && value.length <= maxItems);
}

function isObject(value) {
  return value.constructor === Object;
}
function isArray(value) {
  return Array.isArray(value);
}
function isString(value) {
  return typeof value === 'string';
}
function isNumber(value) {
  return typeof value === 'number';
}
function isInteger(value) {
  return isNumber(value) && Math.floor(value) === value;
}
function isBoolean(value) {
  return typeof value === 'boolean';
}

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

export {
  getValidationFailures,
  getStringValidationFailures,
  getNumberValidationFailures,
  getBooleanValidationFailures,
  getArrayValidationFailures,
  getObjectValidationFailures,
  isValidSchema
};
