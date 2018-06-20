describe('Requirements Service', function() {
  'use strict';

  var service;

  beforeEach(module('tw.styleguide-components'));

  beforeEach(inject(function($injector) {
    service = $injector.get('TwRequirementsService');
  }));

  describe('when preparing legacy field requirements', function() {

    it('should convert arrays of fields to property map', function() {
      var legacy = [{
        key: "propName",
        type: "string"
      }];
      var current = {
        propName: {
          type: "string",
          control: "text"
        }
      };

      expect(service.prepFields(legacy)).toEqual(current);
    });

    it('should convert old types to JSON schema', function() {
      var legacy = {
        typeText: { type: "text" },
        typeDate: { type: "date" },
        typePassword: { type: "password" },
        typeCheckbox: { type: "checkbox" },
        typeUpload: { type: "upload" },
        typeUPLOAD: { type: "UPLOAD" },
        typeSelect: { type: "select", values: [] },
        typeRadio: { type: "radio", values: [], control: "select" },
        typeSelectWithRadioControl: { type: "select", values: [], control: "radio" },
      };

      var current = {
        typeText: { type: "string", control: "text" },
        typeDate: { type: "string", format: "date", control: "date" },
        typePassword: { type: "string", control: "password" },
        typeCheckbox: { type: "boolean", control: "checkbox" },
        typeUpload: { type: "string", format: "base64url", control: "file" },
        typeUPLOAD: { type: "string", format: "base64url", control: "file" },
        typeSelect: { values: [], control: "select" },
        typeRadio: { values: [], control: "radio" },
        typeSelectWithRadioControl: { values: [], control: "radio" },
      };

      expect(service.prepFields(legacy)).toEqual(current);
    });

    it('should convert old values to new', function() {
      var legacy = {
        typeSelect: { type: "select", valuesAllowed: [{ key: 1, name: "One"}] }
      };

      var current = {
        typeSelect: { values: [{ value: 1, label: "One"}], control: "select" }
      };

      expect(service.prepFields(legacy)).toEqual(current);
    });

    it('should convert old props to new', function() {
      var legacy = {
        typeText: {
          name: "Thing",
          type: "string",
          example: "Example",
          tooltip: "Tool tip",
          min: 1,
          max: 2,
          validationRegexp: "[A-Z]"
        }
      };

      var current = {
        typeText:  {
          title: "Thing",
          type: "string",
          control: "text",
          placeholder: "Example",
          helpText: "Tool tip",
          minimum: 1,
          maximum: 2,
          pattern: "[A-Z]"
        }
      };

      expect(service.prepFields(legacy)).toEqual(current);
    });

    it('should convert nested group to flat', function() {
      var legacy = [{
        name: "whatever",
        group: [{
          key: "grouped",
          type: "text"
        },{
          key: "ignored",
          type: "number"
        }]
      }];

      var current = {
        grouped:  {
          title: "whatever",
          type: "string",
          control: "text"
        }
      };

      expect(service.prepFields(legacy)).toEqual(current);
    });

    it('should populate model with hidden fields', function() {
      var legacy = [
        {
          key: "propName",
          value: 123,
          hidden: true
        },
        {
          key: "propName2",
          value: 124,
          control: "hidden"
        },
        {
          key: "propName3",
          value: 125,
          hidden: true
        }
      ];

      var model = {"propName3": 111};
      service.prepFields(legacy, model);
      expect(model.propName).toEqual(123);
      expect(model.propName2).toEqual(124);
      expect(model.propName3).toEqual(111);

    });

  });
});
