function validateSchema(value, schema) {
  switch (schema.type) {
    case 'string':
      return validateString(value, schema);
    case 'number':
    case 'integer':
      return validateNumber(value, schema);
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
  const failures = [];
  if (schema.required && validateRequired(value)) {
    failures.push('required');
  }
  if (schema.pattern && validatePattern(value, schema.pattern)) {
    failures.push('pattern');
  }
  if (schema.minLength && validateMinLength(value, schema.minLength)) {
    failures.push('minLength');
  }
  if (schema.maxLength && validateMaxLength(value, schema.maxLength)) {
    failures.push('maxLength');
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

function validateBoolean(value, schema) {
  const failures = [];
  if (schema.required && validateRequired(value)) {
    failures.push('required');
  }
  return failures;
}

function validateArray(value, schema) {
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

// TODO think about how we handle required
function validateObject(value, schema) { // eslint-disable-line
  const failures = [];
  // if (schema.required) {
  //
  // }
  return failures;
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
  const regex = new RegExp(pattern);
  return regex.test(value);
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
