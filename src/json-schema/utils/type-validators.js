
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

export {
  isObject,
  isArray,
  isString,
  isNumber,
  isInteger,
  isBoolean
};
