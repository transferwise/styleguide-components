/* eslint-disable import/prefer-default-export */


/**
 * Safely returns the lowercased value of a string
 * @param {string} value
 * @returns {string}
 */
export function safeToLowerCase(value) {
  return typeof value === 'string' ? value.toLowerCase() : value;
}
