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
  if (!Array.isArray(value)) {
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
  if (value.constructor !== Object) {
    return ['type'];
  }

  if (!Array.isArray(schema.required)) {
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

export {
  validateSchema,
  validateString,
  validateNumber,
  validateBoolean,
  validateArray,
  validateObject
};
