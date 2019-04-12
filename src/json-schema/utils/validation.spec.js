
describe('Given a library for validating json schema models', function() {
  var schema, getValidationFailures, isValidSchema;

  beforeEach(module('tw.styleguide-components'));
  beforeEach(module('tw.json-schema'));

  beforeEach(inject(function($injector) {
    var SchemaUtils = $injector.get('SchemaUtils');
    getValidationFailures = SchemaUtils.getValidationFailures;
    isValidSchema = SchemaUtils.isValidSchema;
  }));

  describe('when validating a string schema', function() {
    beforeEach(function() {
      schema = {
        type: 'string' ,
        minLength: 3,
        maxLength: 6,
        pattern: '^[a-z]+$'
      };
    });

    it('should return an empty array for valid string', function() {
      expect(getValidationFailures('string', schema)).toEqual([]);
    });
    it('should return minLength when too short', function() {
      expect(getValidationFailures('st', schema)).toEqual(['minLength']);
    });
    it('should return [maxLength] when too long', function() {
      expect(getValidationFailures('strings', schema)).toEqual(['maxLength']);
    });
    it('should return [pattern] when does not pass regex', function() {
      expect(getValidationFailures('STRING', schema)).toEqual(['pattern']);
    });
    it('should return [type] when incorrect data type', function() {
      expect(getValidationFailures(1234, schema)).toEqual(['type']);
    });
  });

  describe('when validating a string date', function() {
    beforeEach(function() {
      schema = {
        type: 'string' ,
        min: '2000-01-01T00:00:00Z',
        max: '2010-01-01T00:00:00Z'
      };
    });

    it('should return an empty array for valid date', function() {
      expect(getValidationFailures('2005-01-01T00:00:00Z', schema)).toEqual([]);
    });
    it('should return [min] when date is too early', function() {
      expect(getValidationFailures('1999-01-01T00:00:00Z', schema)).toEqual(['min']);
    });
    it('should return [max] when date is too late', function() {
      expect(getValidationFailures('2011-01-01T00:00:00Z', schema)).toEqual(['max']);
    });
  });

  describe('when validating a number schema', function() {
    beforeEach(function() {
      schema = {
        type: 'number',
        min: 0,
        max: 20
       };
    });

    it('should return an empty array for an integer in range', function() {
      expect(getValidationFailures(10, schema)).toEqual([]);
    });
    it('should return an empty array for a float in range', function() {
      expect(getValidationFailures(12.34, schema)).toEqual([]);
    });
    it('should return an empty array for a number that matches our min', function() {
      expect(getValidationFailures(0, schema)).toEqual([]);
    });
    it('should return an empty array for a number that matches our max', function() {
      expect(getValidationFailures(20, schema)).toEqual([]);
    });
    it('should return [min] when number is too low', function() {
      expect(getValidationFailures(-1, schema)).toEqual(['min']);
    });
    it('should return [max] when number is too high', function() {
      expect(getValidationFailures(21, schema)).toEqual(['max']);
    });
    it('should return [type] when incorrect data type', function() {
      expect(getValidationFailures('string', schema)).toEqual(['type']);
    });
  });

  describe('when validating an integer schema', function() {
    beforeEach(function() {
      schema = {
        type: 'integer'
      };
    });

    it('should return an empty array for valid integer', function() {
      expect(getValidationFailures(15, schema)).toEqual([]);
    });
    it('should return [type] when a number is not an integer', function() {
      expect(getValidationFailures(12.34, schema)).toEqual(['type']);
    });
  });

  describe('when validating a boolean schema', function() {
    beforeEach(function() {
      schema = {
        type: 'boolean'
      };
    });

    it('should return an empty array for valid boolean', function() {
      expect(getValidationFailures(true, schema)).toEqual([]);
      expect(getValidationFailures(false, schema)).toEqual([]);
    });
    it('should return [type] when incorrect data type', function() {
      expect(getValidationFailures(1, schema)).toEqual(['type']);
    });
  });

  describe('when validating an array schema', function() {
    beforeEach(function() {
      schema = {
        type: 'array',
        items: {
          type: 'number'
        },
        minItems: 2,
        maxItems: 2
      };
    });

    it('should return an empty array for a valid array', function() {
      expect(getValidationFailures([1,2], schema)).toEqual([]);
    });
    it('should return [minItems] when the array is too small', function() {
      expect(getValidationFailures([1], schema)).toEqual(['minItems']);
    });
    it('should return [maxItems] when the array is too big', function() {
      expect(getValidationFailures([1,2,3], schema)).toEqual(['maxItems']);
    });
    it('should return [type] when incorrect data type', function() {
      expect(getValidationFailures({a:1}, schema)).toEqual(['type']);
    });
  });

  describe('when validating an object schema', function() {
    beforeEach(function() {
      schema = {
        type: 'object',
        properties: {
          a: {
            type: 'number'
          }
        },
        required: ['a']
      };
    });

    it('should return an empty array for a valid object', function() {
      expect(getValidationFailures({ a:1 }, schema)).toEqual([]);
    });
    it('should return [required] when required properties are missing', function() {
      expect(getValidationFailures({}, schema)).toEqual(['required']);
    });
    it('should return [type] when incorrect data type', function() {
      expect(getValidationFailures([1], schema)).toEqual(['type']);
    });
  });

  describe('when validating an object schema', function() {
    beforeEach(function() {
      schema = {
        type: 'object',
        properties: {
          a: {
            type: 'number',
            min: 2
          },
          b: {
            type: 'string',
            minLength: 3
          }
        },
        required: ['a']
      };
    });

    it('should return false if the value is of an incorrect type', function() {
      expect(isValidSchema([1], schema)).toBe(false);
    });
    it('should return false if a required property is missing', function() {
      expect(isValidSchema({}, schema)).toBe(false);
    });
    it('should return false is a required property does not validate', function() {
      expect(isValidSchema({ a: 1 }, schema)).toBe(false);
    });
    it('should return false if an optional property is invalid', function() {
      expect(isValidSchema({ a: 2, b: 'c' }, schema)).toBe(false);
    });

    it('should return true if required properties validate and non-required fields are missing', function() {
      expect(isValidSchema({ a: 2 }, schema)).toBe(true);
    });
    it('should return true if all properties validate', function() {
      expect(isValidSchema({ a: 2, b: 'cde' }, schema)).toBe(true);
    });
  });

  describe('when validating an array schema', function() {
    beforeEach(function() {
      schema = {
        type: 'array',
        items: {
          type: 'string',
          minLength: 2
        },
        minItems: 2,
        maxItems: 2
      };
    });

    it('should return false if not an array', function() {
      expect(isValidSchema({a:1}, schema)).toBe(false);
    });
    it('should return false if the array is too small', function() {
      expect(isValidSchema(['ab'], schema)).toBe(false);
    });
    it('should return false if the array is too long', function() {
      expect(isValidSchema(['ab', 'cd', 'ef'], schema)).toBe(false);
    });
    it('should return false if any of the items do not validate', function() {
      expect(isValidSchema(['ab', 'c'], schema)).toBe(false);
    });
    it('should return true is the array is correct size and items are valid', function() {
      expect(isValidSchema(['ab', 'cd'], schema)).toBe(true);
    });
  });

  describe('when validating a oneOf schema', function() {
    beforeEach(function() {
      schema = {
        oneOf: [{
          type: 'string',
          minLength: 2
        },{
          type: 'number',
          min: 2
        }]
      };
    });

    it('should return false if neither schema validates', function() {
      expect(isValidSchema(true, schema)).toBe(false);
      expect(isValidSchema('a', schema)).toBe(false);
      expect(isValidSchema(1, schema)).toBe(false);
    });
    it('should return true if either schema validates', function() {
      expect(isValidSchema('ab', schema)).toBe(true);
      expect(isValidSchema(2, schema)).toBe(true);
    });
  });

  describe('when validating an allOf schema', function() {
    beforeEach(function() {
      schema = {
        allOf: [{
          type: 'object',
          properties: {
            a: {
              type: 'string',
              minLength: 2
            }
          },
          required: ['a']
        },{
          type: 'object',
          properties: {
            b: {
              type: 'number',
              min: 2
            }
          },
          required: ['b']
        }]
      };
    });

    it('should return false if only one schema is present', function() {
      expect(isValidSchema({a: 'bc'}, schema)).toBe(false);
      expect(isValidSchema({b: 2}, schema)).toBe(false);
    });
    it('should return false if any schemas are invalid', function() {
      expect(isValidSchema({a: 'bc', b: 1}, schema)).toBe(false);
    });
    it('should return true if both schemas validate', function() {
      expect(isValidSchema({a: 'bc', b: 2}, schema)).toBe(true);
    });
  });
});
