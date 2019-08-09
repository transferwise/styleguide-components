'use strict';

describe('Given a library for validating json schema rules', function() {
  var schema, ruleValidators;

  beforeEach(function() {
    module('tw.styleguide-components');
    module('tw.json-schema');

    inject(function($injector) {
      var SchemaValidation = $injector.get('SchemaValidation');
      ruleValidators = SchemaValidation.ruleValidators;
    });
  });

  describe('when establishing if a value passes required validation', function() {
    it('should return true if required and value defined', function() {
      expect(ruleValidators.isValidRequired('something', true)).toBe(true);
    });
    it('should return false if required and value undefined', function() {
      expect(ruleValidators.isValidRequired(undefined, true)).toBe(false);
    });
    it('should return true if not required', function() {
      expect(ruleValidators.isValidRequired(undefined, false)).toBe(true);
      expect(ruleValidators.isValidRequired('something', false)).toBe(true);
    });
  });

  describe('when establishing if a value passes minLength validation', function() {
    it('should return true if minLength exists and value matches or exceeds it', function() {
      expect(ruleValidators.isValidMinLength('a', 1)).toBe(true);
      expect(ruleValidators.isValidMinLength('ab', 1)).toBe(true);
    });
    it('should return false if minLength exists and value undefined', function() {
      expect(ruleValidators.isValidMinLength(undefined, 1)).toBe(false);
    });
    it('should return false if minLength exists and value too short', function() {
      expect(ruleValidators.isValidMinLength('', 1)).toBe(false);
    });
    it('should return true if minLength not defined', function() {
      expect(ruleValidators.isValidMinLength('a', undefined)).toBe(true);
    });
  });

  describe('when establishing if a value passes maxLength validation', function() {
    it('should return true if maxLength exists and value matches or exceeds it', function() {
      expect(ruleValidators.isValidMaxLength('a', 2)).toBe(true);
      expect(ruleValidators.isValidMaxLength('ab', 2)).toBe(true);
    });
    it('should return false if maxLength exists and value undefined', function() {
      expect(ruleValidators.isValidMaxLength(undefined, 2)).toBe(false);
    });
    it('should return false if maxLength exists and value too long', function() {
      expect(ruleValidators.isValidMaxLength('abc', 2)).toBe(false);
    });
    it('should return true if maxLength not defined', function() {
      expect(ruleValidators.isValidMinLength('a', undefined)).toBe(true);
    });
  });

  describe('when establishing if a value passes pattern validation', function() {
    it('should return true if pattern exists and value matches it', function() {
      expect(ruleValidators.isValidPattern('a', '[a-z]+')).toBe(true);
    });
    it('should return false if pattern exists and value undefined', function() {
      expect(ruleValidators.isValidPattern(undefined, '[a-z]+')).toBe(false);
    });
    it('should return false if pattern exists and value invalid', function() {
      expect(ruleValidators.isValidPattern('012', '[a-z]+')).toBe(false);
    });
    it('should return true if pattern not defined', function() {
      expect(ruleValidators.isValidPattern('a', undefined)).toBe(true);
    });
  });

  describe('when establishing if a value passes min validation', function() {
    it('should return true if min exists and value matches or exceeds it', function() {
      expect(ruleValidators.isValidMin(1, 1)).toBe(true);
      expect(ruleValidators.isValidMin(0, 0)).toBe(true);
    });
    it('should return false if min exists and value undefined', function() {
      expect(ruleValidators.isValidMin(undefined, 1)).toBe(false);
    });
    it('should return false if min exists and value too low', function() {
      expect(ruleValidators.isValidMin(1, 2)).toBe(false);
      expect(ruleValidators.isValidMin(-1, 0)).toBe(false);
    });
    it('should return true if min not defined', function() {
      expect(ruleValidators.isValidMin(1, undefined)).toBe(true);
    });
  });

  describe('when establishing if a value passes max validation', function() {
    it('should return true if max exists and value matches or exceeds it', function() {
      expect(ruleValidators.isValidMax(2, 2)).toBe(true);
      expect(ruleValidators.isValidMax(-1, 0)).toBe(true);
    });
    it('should return false if max exists and value undefined', function() {
      expect(ruleValidators.isValidMax(undefined, 2)).toBe(false);
    });
    it('should return false if max exists and value too high', function() {
      expect(ruleValidators.isValidMax(3, 2)).toBe(false);
    });
    it('should return true if max not defined', function() {
      expect(ruleValidators.isValidMax(2, undefined)).toBe(true);
    });
  });

  describe('when establishing if an array passes minItems validation', function() {
    it('should return true if minItems exists and value matches or exceeds it', function() {
      expect(ruleValidators.isValidMinItems([1], 1)).toBe(true);
      expect(ruleValidators.isValidMinItems([], 0)).toBe(true);
    });
    it('should return false if minItems exists and value undefined', function() {
      expect(ruleValidators.isValidMinItems(undefined, 1)).toBe(false);
    });
    it('should return false if minItems exists and value too short', function() {
      expect(ruleValidators.isValidMinItems([1], 2)).toBe(false);
      expect(ruleValidators.isValidMinItems([], 1)).toBe(false);
    });
    it('should return true if minItems not defined', function() {
      expect(ruleValidators.isValidMinItems([], undefined)).toBe(true);
    });
  });

  describe('when establishing if an array passes maxItems validation', function() {
    it('should return true if maxItems exists and value matches or exceeds it', function() {
      expect(ruleValidators.isValidMaxItems([1], 1)).toBe(true);
      expect(ruleValidators.isValidMaxItems([], 0)).toBe(true);
    });
    it('should return false if maxItems exists and value undefined', function() {
      expect(ruleValidators.isValidMaxItems(undefined, 1)).toBe(false);
    });
    it('should return false if maxItems exists and value too long', function() {
      expect(ruleValidators.isValidMaxItems([1,2], 1)).toBe(false);
    });
    it('should return true if maxItems not defined', function() {
      expect(ruleValidators.isValidMaxItems([], undefined)).toBe(true);
    });
  });
});
