/* eslint-disable import/prefer-default-export */

export function safeToLowerCase(value) {
  return typeof value === 'string' ? value.toLowerCase() : value;
}
