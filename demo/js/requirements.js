angular.module('tw.styleguide.docs', [])
  .config(['$compileProvider', function ($compileProvider) {
    $compileProvider.debugInfoEnabled(false);
  }])
  .controller('PageController', function () {
    this.log = function (message) { console.log(message); };

    // Basic types
    this.stringBasic = {
      type: "string",
      name: "String label",
      key: "stringProperty",
      placeholder: "Please enter string"
    };
    this.numberBasic = {
      type: "number",
      name: "Number control",
      key: "numberProperty",
      placeholder: "Please enter number"
    };
    this.booleanBasic = {
      type: "boolean",
      name: "Boolean control",
      key: "booleanProperty",
      placeholder: "Please choose"
    };

    this.basicTypesModel = {
      stringProperty: "Example",
      numberProperty: 123,
      booleanProperty: false
    }

    // Formats
    this.dateBasic = {
      type: "string",
      format: "date",
      name: "Date control",
      key: "dateProperty"
    };
    this.passwordBasic = {
      type: "string",
      format: "password",
      name: "Password control",
      key: "passwordProperty",
      placeholder: "Choose password..."
    };
    this.uploadBasic = {
      type: "string",
      format: "base64url",
      name: "Upload control",
      key: "base64urlProperty",
      placeholder: "Choose file..."
    };

    this.basicFormatsModel = {
      dateProperty: "2017-12-01",
      passwordProperty: "qwerty"
    };

    this.selectBasic = {
      type: "number",
      name: "Select control",
      key: "selectProperty",
      placeholder: "Please choose",
      valuesAllowed: [{
        value: 1, label: "One"
      },{
        value: 2, label: "Two"
      },{
        value: 3, label: "Three"
      },{
        value: 4, label: "Four"
      }]
    };
    this.radioBasic = {
      type: "string",
      name: "Radio control",
      key: "radioProperty",
      valuesAllowed: [{
        value: "1", label: "One"
      },{
        value: "2", label: "Two"
      }]
    };
    this.selectionsModel = {
      selectProperty: 1,
      radioProperty: "2"
    };


    this.stringValidation = {
      type: "string",
      name: "String validation",
      key: "stringProperty",
      placeholder: "Please enter text",
      required: true,
      pattern: '^[A-Z]*$',
      minLength: 4,
      maxLength: 6,
      validationMessages: {
        required: "String is required",
        minlength: "Must contain at least 4 characters",
        maxlength: "Must contain 6 characters or less",
        pattern: "Must only contain capital letters A to Z"
      }
    };
    this.numberValidation = {
      type: "number",
      name: "Number control",
      key: "numberProperty",
      placeholder: "Please enter number",
      required: true,
      minimum: 10,
      maximum: 99,
      validationMessages: {
        required: "Number is required",
        minimum: "Must be 10 or greater",
        maximum: "Must be 99 or less"
      }
    };
    this.dateValidation = {
      type: "string",
      format: "date",
      name: "Date control",
      key: "dateProperty",
      required: true,
      minimum: '2000-01-01',
      maximum: '2020-01-01',
      validationMessages: {
        required: "Date is required",
        minimum: "Must be after Jan 1st, 2000",
        maximum: "Must be before Jan 1st, 2020"
      }
    };
    this.validationModel = {
      stringProperty: "Tex",
      numberProperty: 123,
      dateProperty: null
    };

    this.customErrors = {
      type: "string",
      name: "Custom error",
      key: "stringProperty",
      placeholder: "Please enter text",
      errorMessage: "Custom error message"
    };

    this.helpText = {
      type: "string",
      name: "Help text",
      key: "helpText",
      placeholder: "Please enter text",
      helpText: "Some helpful information"
    }
    this.helpList = {
      type: "string",
      name: "Help list",
      key: "helpList",
      placeholder: "Please enter number",
      helpList: [
        "Make sure of this",
        "And this",
        "And avoid this"
      ]
    }
    this.helpImage = {
      type: "string",
      name: "Help image",
      key: "helpImage",
      placeholder: "Please enter number",
      helpImage: "images/captcha.png"
    };

    this.displayFormat = {
      type: "string",
      name: "String display format",
      key: "displayFormat",
      placeholder: "Please enter...",
      displayFormat: "** - ** - **"
    };

    this.presentationModel = {
      displayFormat: "123456"
    };

    this.uploadComponent = {
      type: "string",
      format: "base64url",
      name: "Upload options",
      key: "uploadOptions",
      placeholder: "Please choose a file",
      uploadOptions: {
        buttonText: "Choose file..."
      }
    };


    this.fieldsetBasic = {
      fields: [{
        type: "string",
        name: "String label",
        key: "stringProperty",
        placeholder: "Please enter text"
      },{
        type: "number",
        name: "Number label",
        key: "numberProperty",
        placeholder: "Please enter number"
      }]
    };
    this.fieldsetBasicModel = {
      stringProperty: "Example",
      numberProperty: 123
    };

    this.fieldsetOptions = {
      legend: "Fieldset legend",
      description: "Optional fieldset description, with more information about the content.",
      fields: [{
        type: "text",
        name: "Control label",
        key: "keyName",
        placeholder: "Please enter text"
      }]
    };
    this.fieldsetOptionsModel = {
      keyName: "Example"
    };



  })
  .component('fieldsetDocs', {
    bindings: {
      model: '=',
      requirements: '='
    },
    template: ' \
      <div class="row"> \
        <div class="col-md-6"> \
          <tw-fieldset \
            legend="{{ $ctrl.requirements.legend }}" \
            description="{{ $ctrl.requirements.description }}" \
            fields="$ctrl.requirements.fields" \
            model="$ctrl.model"> \
          </tw-fieldset> \
          <pre>model: {{ $ctrl.model | json }}</pre> \
        </div> \
        <div class="col-md-6 p-t-3"> \
          <pre>fieldset: {{ $ctrl.requirements | json }}</pre> \
        </div> \
      </div>'
  })
  .component('fieldDocs', {
    bindings: {
      model: '=',
      field: '='
    },
    template: ' \
      <div class="row"> \
        <div class="col-md-6"> \
          <tw-field \
            options="$ctrl.field" \
            model="$ctrl.model"> \
          </tw-field> \
        </div> \
        <div class="col-md-6" ng-class="{\'p-t-3\': $ctrl.field.format !== \'base64url\'}"> \
          <pre>options: {{ $ctrl.field | json }}</pre> \
        </div> \
      </div>'
  });;
