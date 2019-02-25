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

    it('should convert old valuesAllowed to new values', function() {
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
          help: {
            message: "Tool tip"
          },
          minimum: 1,
          maximum: 2,
          pattern: "[A-Z]"
        }
      };

      expect(service.prepFields(legacy)).toEqual(current);
    });

    describe('when fields contain groups of nested fields', function() {
      var legacy;
      beforeEach(function() {
        legacy = [{
          name: "whatever",
          group: [{
            key: "first",
            type: "text"
          },{
            name: "override",
            key: "second",
            type: "number"
          }]
        }];
      });

      it('should flatten out the nested fields', function() {
        var prepped = service.prepFields(legacy);
        expect(prepped).toEqual({
          first:  {
            title: "whatever",
            type: "string",
            control: "text",
            width: "md"
          },
          second:  {
            title: "override",
            type: "number",
            control: "number",
            width: "md"
          }
        });
      });
    });

    describe('when fields have keys containing periods for nesting', function() {
      var legacy;
      beforeEach(function() {
        legacy = [{
          key: "nested.first",
          type: "string"
        },{
          key: "nested.second",
          type: "string"
        },{
          key: "parent",
          type: "number"
        }];
      });

      it('should convert those fields into nested specs', function() {
        expect(service.prepFields(legacy)).toEqual({
          nested: {
            type: "object",
            properties: {
              first: {
                type: "string"
              },
              second: {
                type: "string"
              }
            }
          },
          parent:  {
            type: "number",
            control: "number"
          }
        });
      });
    });

    describe('when given requirements with fieldGroups', function() {
      var result;
      beforeEach(function() {
        result = service.prepFields(requirementsWithFieldGroups.fieldGroups);
      });

      it('should flatten them to a fields', function() {
        expect(Object.keys(result).length).toBe(3);
      });
    });
  });
});

var requirementsWithFieldGroups = {
  "type": "IBAN",
  "title": "IBAN",
  "specialCreateTreatment": false,
  "allowedReceiverTypes": [
    "PRIVATE",
    "BUSINESS"
  ],
  "nameTooltip": "",
  "fieldGroups": [
    {
      "fields": [
        {
          "name": "receiverType",
          "minLength": null,
          "validationRegexp": null,
          "presentationPattern": null,
          "displayFormat": null,
          "rules": [],
          "valuesResource": null,
          "valuesAllowed": [
            {
              "title": "PRIVATE",
              "code": "PRIVATE"
            },
            {
              "title": "BUSINESS",
              "code": "BUSINESS"
            }
          ],
          "valuesTop": null,
          "title": "Recipient type",
          "forceShowOnMobile": false,
          "required": false,
          "type": "SELECT",
          "maxLength": null,
          "autocomplete": false,
          "example": "",
          "valuesTopHeader": null,
          "keyboardType": "TEXT"
        }
      ],
      "name": "receiverType",
      "title": "Recipient type",
      "tooltip": "",
      "imageTooltip": "",
      "info": null,
      "presentationPattern": "*"
    },
    {
      "fields": [
        {
          "name": "IBAN",
          "minLength": 2,
          "validationRegexp": null,
          "presentationPattern": null,
          "displayFormat": "**** **** **** **** **** **** **** ****",
          "rules": [],
          "valuesResource": null,
          "valuesAllowed": null,
          "valuesTop": null,
          "title": "IBAN",
          "forceShowOnMobile": false,
          "required": true,
          "type": "TEXT",
          "maxLength": null,
          "autocomplete": false,
          "example": "AF89370400440532013000",
          "valuesTopHeader": null,
          "keyboardType": "TEXT"
        }
      ],
      "name": "IBAN",
      "title": "IBAN",
      "tooltip": "IBANs are long account numbers used by banks for cross-border transfers. Each country structures this number differently, but it always starts with a 2 digit country code (e.g. DE for Germany).",
      "imageTooltip": "",
      "info": null,
      "presentationPattern": "*"
    },
    {
      "fields": [
        {
          "name": "BIC",
          "minLength": null,
          "validationRegexp": "(?i)[A-Z]{6}[A-Z\\d]{2}([A-Z\\d]{3})?",
          "presentationPattern": null,
          "displayFormat": null,
          "rules": [],
          "valuesResource": null,
          "valuesAllowed": null,
          "valuesTop": null,
          "title": "Bank code (BIC/SWIFT)",
          "forceShowOnMobile": false,
          "required": false,
          "type": "TEXT",
          "maxLength": null,
          "autocomplete": false,
          "example": "ABCDDE22 (Optional)",
          "valuesTopHeader": null,
          "keyboardType": "TEXT"
        }
      ],
      "name": "BIC",
      "title": "Bank code (BIC/SWIFT)",
      "tooltip": "The BIC (SWIFT code) is used to identify a bank when making cross-border money transfers. It’s 8-11 characters long and often includes part of the bank’s name.",
      "imageTooltip": "",
      "info": null,
      "presentationPattern": "*"
    }
  ]
};
