'use strict';

describe('Given a library for validating data types', function() {
  var schema, typeValidators;

  beforeEach(function() {
    angular.mock.module('tw.json-schema.validation');

    angular.mock.inject(function($injector) {
      var SchemaValidation = $injector.get('SchemaValidation');
      typeValidators = SchemaValidation.typeValidators;
    });
  });

  describe('when validating a string', function() {
    it('should return true when the value is a string', function() {
      expect(typeValidators.isString('a')).toBe(true);
      expect(typeValidators.isString('')).toBe(true);
    });
    it('should return false when the value is not string', function() {
      expect(typeValidators.isString(1)).toBe(false);
      expect(typeValidators.isString(true)).toBe(false);
      expect(typeValidators.isString([])).toBe(false);
      expect(typeValidators.isString({})).toBe(false);
    });
  });

  describe('when validating a number', function() {
    it('should return true when the value is a number', function() {
      expect(typeValidators.isNumber(1)).toBe(true);
      expect(typeValidators.isNumber(0)).toBe(true);
      expect(typeValidators.isNumber(1.23)).toBe(true);
      expect(typeValidators.isNumber(-1)).toBe(true);
    });
    it('should return false when the value is not number', function() {
      expect(typeValidators.isNumber('a')).toBe(false);
      expect(typeValidators.isNumber(true)).toBe(false);
      expect(typeValidators.isNumber([])).toBe(false);
      expect(typeValidators.isNumber({})).toBe(false);
    });
  });

  describe('when validating an integer', function() {
    it('should return true when the value is a integer', function() {
      expect(typeValidators.isInteger(1)).toBe(true);
      expect(typeValidators.isInteger(0)).toBe(true);
      expect(typeValidators.isInteger(-1)).toBe(true);
    });
    it('should return false when the value is not an integer', function() {
      expect(typeValidators.isInteger(1.23)).toBe(false);
      expect(typeValidators.isInteger('a')).toBe(false);
      expect(typeValidators.isInteger(true)).toBe(false);
      expect(typeValidators.isInteger([])).toBe(false);
      expect(typeValidators.isInteger({})).toBe(false);
    });
  });

  describe('when validating a boolean', function() {
    it('should return true when the value is a boolean', function() {
      expect(typeValidators.isBoolean(true)).toBe(true);
      expect(typeValidators.isBoolean(false)).toBe(true);
    });
    it('should return false when the value is not a boolean', function() {
      expect(typeValidators.isBoolean(1)).toBe(false);
      expect(typeValidators.isBoolean('a')).toBe(false);
      expect(typeValidators.isBoolean([])).toBe(false);
      expect(typeValidators.isBoolean({})).toBe(false);
    });
  });

  describe('when validating an array', function() {
    it('should return true when the value is an array', function() {
      expect(typeValidators.isArray([1])).toBe(true);
      expect(typeValidators.isArray([])).toBe(true);
    });
    it('should return false when the value is not an array', function() {
      expect(typeValidators.isArray(1)).toBe(false);
      expect(typeValidators.isArray('a')).toBe(false);
      expect(typeValidators.isArray(true)).toBe(false);
      expect(typeValidators.isArray({})).toBe(false);
    });
  });

  describe('when validating an object', function() {
    it('should return true when the value is an object', function() {
      expect(typeValidators.isObject({a:1})).toBe(true);
      expect(typeValidators.isObject({})).toBe(true);
    });
    it('should return false when the value is not an array', function() {
      expect(typeValidators.isObject(1)).toBe(false);
      expect(typeValidators.isObject('a')).toBe(false);
      expect(typeValidators.isObject(true)).toBe(false);
      expect(typeValidators.isObject([])).toBe(false);
    });
  });
});
