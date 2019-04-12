function validateSchema(value, schema) {
  switch (schema.type) {
    case 'string':
      return validateString(value, schema);
    case 'number':
      return validateNumber(value, schema);
    case 'integer':
      return validateInteger(value, schema);
    case 'boolean':
      return validateBoolean(value, schema);
    case 'array':
      return validateArray(value, schema);
    case 'object':
      return validateObject(value, schema);
    default:
      return [];
  }
}

function validateString(value, schema) {
  if (typeof value !== 'string') {
    return ['type'];
  }

  const failures = [];
  if (schema.required && validateRequired(value)) {
    failures.push('required');
  }
  if (schema.minLength && validateMinLength(value, schema.minLength)) {
    failures.push('minLength');
  }
  if (schema.maxLength && validateMaxLength(value, schema.maxLength)) {
    failures.push('maxLength');
  }
  if (schema.pattern && validatePattern(value, schema.pattern)) {
    failures.push('pattern');
  }
  if (schema.min && validateMin(value, schema.min)) {
    failures.push('min');
  }
  if (schema.max && validateMax(value, schema.max)) {
    failures.push('max');
  }
  return failures;
}

function validateNumber(value, schema) {
  if (typeof value !== 'number') {
    return ['type'];
  }

  const failures = [];
  if (schema.required && validateRequired(value)) {
    failures.push('required');
  }
  if (schema.min && validateMin(value, schema.min)) {
    failures.push('min');
  }
  if (schema.max && validateMax(value, schema.max)) {
    failures.push('max');
  }
  return failures;
}

function validateInteger(value, schema) {
  if (Math.floor(value) !== value) {
    return ['type'];
  }
  return validateNumber(value, schema);
}

function validateBoolean(value, schema) {
  if (typeof value !== 'boolean') {
    return ['type'];
  }

  const failures = [];
  if (schema.required && validateRequired(value)) {
    failures.push('required');
  }
  return failures;
}

/**
 * When validating an array we only checking that it is an array and that it
 * fits our size constraints, we do not check if the items are valid.
 */
function validateArray(value, schema) {
  if (!isArray(value)) {
    return ['type'];
  }

  const failures = [];
  if (schema.required && validateRequired(value)) {
    failures.push('required');
  }
  if (schema.minItems && validateMinItems(value, schema.minItems)) {
    failures.push('minItems');
  }
  if (schema.maxItems && validateMaxItems(value, schema.maxItems)) {
    failures.push('maxItems');
  }
  return failures;
}

/**
 * When validating an object we only checking that it is an object and that it
 * has the required properties, we do not check if the properties are valid.
 */
function validateObject(value, schema) {
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

function validateRequired(value) {
  return !value;
}

function validateMinLength(value, minLength) {
  return value && value.length < minLength;
}

function validateMaxLength(value, maxLength) {
  return value && value.length > maxLength;
}

function validatePattern(value, pattern) {
  try {
    const regex = new RegExp(pattern);
    return !regex.test(value);
  } catch (error) {
    return false;
  }
}

function validateMax(value, max) {
  return value && value > max;
}

function validateMin(value, min) {
  return value && value < min;
}

function validateMinItems(value, minItems) {
  return value && value.length < minItems;
}

function validateMaxItems(value, maxItems) {
  return value && value.length > maxItems;
}


function isValidStringSchema(value, schema) {
  return !validateString(value, schema).length;
}
function isValidNumberSchema(value, schema) {
  return !validateNumber(value, schema).length;
}
function isValidIntegerSchema(value, schema) {
  return !validateInteger(value, schema).length;
}
function isValidBooleanSchema(value, schema) {
  return !validateBoolean(value, schema).length;
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
  if (!isArray(value) || schema.type !== 'array' || !isObject(schema.items)) {
    return false;
  }

  if (schema.minItems && value.length < schema.minItems) {
    return false;
  }
  if (schema.maxItems && value.length > schema.maxItems) {
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

function isObject(value) {
  return value.constructor === Object;
}
function isArray(value) {
  return Array.isArray(value);
}

export {
  validateSchema,
  validateString,
  validateNumber,
  validateBoolean,
  validateArray,
  validateObject,
  isValidSchema
};
