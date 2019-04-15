describe('Given a library for validating json schema models', function() {
  var schema, isValidSchema;

  beforeEach(module('tw.styleguide-components'));
  beforeEach(module('tw.json-schema'));

  beforeEach(inject(function($injector) {
    var SchemaValidation = $injector.get('SchemaValidation');
    isValidSchema = SchemaValidation.isValidSchema;
  }));

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
