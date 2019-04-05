
describe('Given a library for cleaning models based on a schema', function() {
  var result, schema, cleanModel;

  beforeEach(module('tw.styleguide-components'));
  beforeEach(module('tw.json-schema'));

  beforeEach(inject(function($injector) {
    var SchemaUtils = $injector.get('SchemaUtils');
    cleanModel = SchemaUtils.cleanModel;
  }));

  describe('when cleaning a string schema', function() {
    beforeEach(function() {
      schema = { type: "string" };
    });

    describe('with a string model', function() {
      beforeEach(function() {
        result = cleanModel("string", schema);
      });
      it('should return the original string', function() {
        expect(result).toBe("string");
      });
    });

    describe('with any non string model', function() {
      beforeEach(function() {
        result = cleanModel({a:1}, schema);
      });
      it('should return undefined', function() {
        expect(result).toBeUndefined();
      });
    });
  });

  describe('when cleaning a number schema', function() {
    beforeEach(function() {
      schema = { type: "number" };
    });

    describe('with a number model', function() {
      beforeEach(function() {
        result = cleanModel(12345, schema);
      });
      it('should return the original number', function() {
        expect(result).toBe(12345);
      });
    });

    describe('with any non number model', function() {
      beforeEach(function() {
        result = cleanModel("string", schema);
      });
      it('should return undefined', function() {
        expect(result).toBeUndefined();
      });
    });
  });

  describe('when cleaning a boolean schema', function() {
    beforeEach(function() {
      schema = { type: "boolean" };
    });

    describe('with a boolean model', function() {
      beforeEach(function() {
        result = cleanModel(false, schema);
      });
      it('should return the original boolean', function() {
        expect(result).toBe(false);
      });
    });

    describe('with any non number model', function() {
      beforeEach(function() {
        result = cleanModel("string", schema);
      });
      it('should return undefined', function() {
        expect(result).toBeUndefined();
      });
    });
  });

  describe('when cleaning a simple object schema', function() {
    var schema
    beforeEach(function() {
      schema = {
        type: "object",
        properties: {
          a: {
            type: "number"
          }
        }
      };
    });

    describe('if the model has a property with the correct name and the correct type', function() {
      beforeEach(function() {
        result = cleanModel({ a: 1 }, schema);
      });
      it('should return the property', function() {
        expect(result).toEqual({ a: 1 });
      });
    });

    describe('if the model has a property with the correct name and an incorrect typs', function() {
      beforeEach(function() {
        result = cleanModel({ a: "1" }, schema);
      });
      it('should return an empty object', function() {
        expect(result).toEqual({ });
      });
    });

    describe('if the model contains properties not in the schema', function() {
      beforeEach(function() {
        result = cleanModel({ a: 1, b: 2 }, schema);
      });
      it('should return the object without those properties', function() {
        expect(result).toEqual({ a: 1 });
      });
    });
  });

  describe('when cleaning an object schema with nested objects', function() {
    beforeEach(function() {
      schema = {
        type: "object",
        properties: {
          a: {
            type: "number"
          },
          b: {
            type: "object",
            properties: {
              c: {
                type: "number"
              }
            }
          }
        }
      }
    });

    describe('if the nested model is valid', function() {
      beforeEach(function() {
        result = cleanModel({ a: 1, b: { c: 2 } }, schema);
      });
      it('should be returned', function() {
        expect(result).toEqual({ a: 1, b: { c: 2 } });
      });
    });

    describe('if the nested model contains invalid properties', function() {
      beforeEach(function() {
        result = cleanModel({ a: 1, b: { c: 2, d: 3 }, e: 4 }, schema);
      });
      it('should remove them', function() {
        expect(result).toEqual({ a: 1, b: { c: 2 } });
      });
    });
  });

  describe('when cleaning an allOf schema', function() {
    beforeEach(function() {
      schema = {
        allOf: [{
          type: "object",
          properties: {
            a: {
              type: "number"
            }
          }
        },{
          type: "object",
          properties: {
            b: {
              type: "number"
            }
          }
        }]
      }
    });

    describe('if all of the properties are valid', function() {
      beforeEach(function() {
        result = cleanModel({ a: 1, b: 2 }, schema);
      });
      it('should return them', function() {
        expect(result).toEqual({ a: 1, b: 2 });
      });
    });

    describe('if the nested model contains invalid properties', function() {
      beforeEach(function() {
        result = cleanModel({ a: 1, b: "2" }, schema);
      });
      it('should remove them', function() {
        expect(result).toEqual({ a: 1 });
      });
    });
  });
});
