class Controller {
  $onInit() {
    this.schema = {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          title: 'Name'
        },
        details: {
          title: 'Account type',
          oneOf: [{
            title: 'Account number & sort code',
            type: 'object',
            properties: {
              sortCode: { type: 'string', title: 'Sort code' },
              accountNumber: { type: 'string', title: 'Account number' }
            },
            required: ['sortCode', 'accountNumber']
          },
          {
            title: 'IBAN',
            type: 'object',
            properties: {
              iban: { type: 'string', title: 'IBAN', minLength: 10 }
            },
            required: ['iban']
          }]
        }
      }
    };

    this.inputModel = {
      name: 'Joe',
      details: {
        iban: 'ABCDEF1234567'
      }
    };

    this.schemaString = JSON.stringify(this.schema, null, 2);
    this.modelString = JSON.stringify(this.inputModel, null, 2);

    this.myModel = this.model;
  }

  onSchemaChange(schemaString) {
    const quotedSchemaString = quoteUnquotedProperties(schemaString);

    try {
      this.schema = JSON.parse(quotedSchemaString);
    } catch (ex) {
      console.log('invalid schema'); // eslint-disable-line
    }
  }

  onInputModelChange(modelString) {
    const quotedModelString = quoteUnquotedProperties(modelString);

    try {
      this.inputModel = JSON.parse(quotedModelString);
    } catch (ex) {
      console.log('invalid model'); // eslint-disable-line
    }
  }

  onModelChange(model, isValid) {
    this.outputModel = model;
    this.isValid = isValid;
  }
}

// Wrap properties that miss quotes, so more like JS {a:1} => {"a":1}
function quoteUnquotedProperties(rawJsonString) {
  const quotePropertiesRegex = new RegExp('([\\s{,])([a-zA-Z0-9_]+):', 'g');
  return rawJsonString.replace(quotePropertiesRegex, '$1"$2":');
}

export default Controller;
