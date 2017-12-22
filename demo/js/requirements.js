angular.module('tw.styleguide.docs', [])
  .config(['$compileProvider', function ($compileProvider) {
    $compileProvider.debugInfoEnabled(false);
  }])
  .controller('PageController', function () {
    this.log = function(message) { console.log(message); };

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
      values: [{
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
      values: [{
        value: "1", label: "One"
      },{
        value: "2", label: "Two"
      }]
    };
    this.selectionsModel = {
      selectProperty: 1,
      radioProperty: "2"
    };

    this.valuesAsync = {
      type: "number",
      name: "Values async",
      key: "asyncProperty",
      control: "select",
      placeholder: "Please choose",
      valuesAsync: {
        method: "GET",
        url: "json/values-async.json"
      }
    }
    this.valuesAsyncModel = null;


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
      placeholder: "Please enter text"
    };
    this.customErrorsMessage = "Custom error message";

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
        buttonText: "Choose file...",
        cancelText: "Choose a different file?",
        processingText: "Processing...",
        successText: "Upload complete!",
        failureText: "Upload failed"
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

    this.fieldsetLayout = {
      fields: [{
        type: "string",
        name: "String label",
        key: "stringProperty",
        placeholder: "Please enter text",
        width: "md"
      },{
        type: "boolean",
        name: "Boolean label",
        key: "booleanProperty",
        placeholder: "Check it",
        width: "md"
      },{
        type: "number",
        name: "Number label",
        key: "numberProperty",
        placeholder: "Please enter number",
        width: "sm",
        required: true
      }]
    };
    this.fieldsetLayoutModel = {};
  })
  .component('fieldsetDocs', {
    bindings: {
      model: '=',
      requirements: '<',
      onRefreshRequirements: '&?',
      onFieldFocus: '&?',
      onFieldBlur: '&?',
      onFieldChange: '&?'
    },
    controller: function() {
      this.isValid = false;
      this.fieldFocus = function(field) {
        this.onFieldFocus && this.onFieldFocus({ field: field });
      };
      this.fieldBlur = function(field) {
        this.onFieldBlur && this.onFieldBlur({ field: field });
      };
      this.fieldChange = function(field) {
        this.onFieldChange && this.onFieldChange({ field: field });
      };
    },
    templateUrl: 'partials/dynamic-forms/fieldset-example.html'
  })
  .component('fieldDocs', {
    bindings: {
      model: '=',
      field: '<',
      errorMessage: '<',
      onFocus: '&?',
      onBlur: '&?',
      onChange: '&?'
    },
    templateUrl: 'partials/dynamic-forms/field-example.html'
  });;
