
describe('Given a library for validating json schema models', function() {
  var schema, validateSchema;

  beforeEach(module('tw.styleguide-components'));
  beforeEach(module('tw.json-schema'));

  beforeEach(inject(function($injector) {
    var SchemaUtils = $injector.get('SchemaUtils');
    validateSchema = SchemaUtils.validateSchema;
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
      expect(validateSchema('string', schema)).toEqual([]);
    });
    it('should return minLength when too short', function() {
      expect(validateSchema('st', schema)).toEqual(['minLength']);
    });
    it('should return [maxLength] when too long', function() {
      expect(validateSchema('strings', schema)).toEqual(['maxLength']);
    });
    it('should return [pattern] when does not pass regex', function() {
      expect(validateSchema('STRING', schema)).toEqual(['pattern']);
    });
    it('should return [type] when incorrect data type', function() {
      expect(validateSchema(1234, schema)).toEqual(['type']);
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
      expect(validateSchema('2005-01-01T00:00:00Z', schema)).toEqual([]);
    });
    it('should return [min] when date is too early', function() {
      expect(validateSchema('1999-01-01T00:00:00Z', schema)).toEqual(['min']);
    });
    it('should return [max] when date is too late', function() {
      expect(validateSchema('2011-01-01T00:00:00Z', schema)).toEqual(['max']);
    });
  });

  describe('when validating a number schema', function() {
    beforeEach(function() {
      schema = {
        type: 'number',
        min: 10,
        max: 20
       };
    });

    it('should return an empty array for valid number', function() {
      expect(validateSchema(15, schema)).toEqual([]);
      expect(validateSchema(12.34, schema)).toEqual([]);
      expect(validateSchema(10, schema)).toEqual([]);
      expect(validateSchema(20, schema)).toEqual([]);
    });
    it('should return [min] when number is too low', function() {
      expect(validateSchema(9, schema)).toEqual(['min']);
    });
    it('should return [max] when number is too high', function() {
      expect(validateSchema(21, schema)).toEqual(['max']);
    });
    it('should return [type] when incorrect data type', function() {
      expect(validateSchema('string', schema)).toEqual(['type']);
    });
  });

  describe('when validating an integer schema', function() {
    beforeEach(function() {
      schema = {
        type: 'integer'
      };
    });

    it('should return an empty array for valid integer', function() {
      expect(validateSchema(15, schema)).toEqual([]);
    });
    it('should return [type] when a number is not an integer', function() {
      expect(validateSchema(12.34, schema)).toEqual(['type']);
    });
  });

  describe('when validating a boolean schema', function() {
    beforeEach(function() {
      schema = {
        type: 'boolean'
      };
    });

    it('should return an empty array for valid boolean', function() {
      expect(validateSchema(true, schema)).toEqual([]);
      expect(validateSchema(false, schema)).toEqual([]);
    });
    it('should return [type] when incorrect data type', function() {
      expect(validateSchema(1, schema)).toEqual(['type']);
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
      expect(validateSchema([1,2], schema)).toEqual([]);
    });
    it('should return [minItems] when the array is too small', function() {
      expect(validateSchema([1], schema)).toEqual(['minItems']);
    });
    it('should return [maxItems] when the array is too big', function() {
      expect(validateSchema([1,2,3], schema)).toEqual(['maxItems']);
    });
    it('should return [type] when incorrect data type', function() {
      expect(validateSchema({a:1}, schema)).toEqual(['type']);
    });

    // TODO recursive checks?
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
      expect(validateSchema({ a:1 }, schema)).toEqual([]);
    });
    it('should return [required] when required properties are missing', function() {
      expect(validateSchema({}, schema)).toEqual(['required']);
    });
    it('should return [type] when incorrect data type', function() {
      expect(validateSchema([1], schema)).toEqual(['type']);
    });

    // TODO recursive checks?
  });
});
