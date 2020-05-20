class Controller {
  constructor($http) {
    this.$http = $http;
  }

  $onInit() {
    this.locale = 'en-GB';

    this.errors = {
      industry: 'We were hoping you would pick the other one',
      shareholders: [
        {
          firstName: 'Choose a better one'
        },
        {
          lastName: 'And here as well'
        }
      ],
      streetAddress: 'And this one could be better'
    };

    this.schema = {};

    this.model = {};

    this.translations = {
      array: {
        add: 'Add',
        remove: 'Remove'
      },
      validation: {
        required: 'Field is required',
        minLength: 'Too short',
        maxLength: 'Too long',
        minimum: 'Too low',
        maximum: 'Too high',
        pattern: 'Invalid characters'
      },
      upload: {
        choose: 'Choose file',
        processing: 'Working...',
        success: 'Success!',
        failed: 'Upload failed',
        cancel: 'Choose another file'
      }
    };

    this.schemaType = '';

    this.schemaOptions = [
      {
        value: 'json-schema/gbp-recipient.json',
        label: 'GBP recipient'
      },
      {
        value: 'json-schema/usd-recipient.json',
        label: 'USD recipient'
      },
      {
        value: 'json-schema/demo.json',
        label: 'Complex example'
      },
      {
        value: 'json-schema/simple.json',
        label: 'Simple example'
      }
    ];

    this.onSchemaChange(this.schemaOptions[0].value);
  }

  onSchemaChange(schemaType) {
    this.$http.get(schemaType).then((response) => {
      this.schema = response.data;
    });
  }

  onModelChange(model, isValid, originatingShema) {
    this.isValid = isValid;
    console.log('Model changed', model); // eslint-disable-line
    console.log('Is valid?', isValid); // eslint-disable-line
    console.log('Triggered by schema', originatingShema); // eslint-disable-line
    this.model = model;
  }
}

Controller.$inject = ['$http'];

export default Controller;
