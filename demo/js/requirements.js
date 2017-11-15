angular.module('tw.styleguide.docs', [])
  .config(['$compileProvider', function ($compileProvider) {
    $compileProvider.debugInfoEnabled(false);
  }])
  .controller('PageController', function () {
    this.log = function (message) { console.log(message); };

    this.fieldsetBasic = {
      fields: [{
        type: "text",
        name: "Control label",
        key: "keyName",
        placeholder: "Please enter text"
      }]
    };
    this.fieldsetBasicModel = {
      keyName: "Example"
    };

    this.fieldsetOptions = {
      legend: "Fieldset legend",
      description: "Optionally you can supply a legend, to give you fieldset a title, and a description, with more information about the content.",
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

    this.simpleTypes = {
      fields: [{
        type: "text",
        name: "Text control",
        key: "textProperty",
        placeholder: "Please enter text"
      },{
        type: "number",
        name: "Number control",
        key: "numberProperty",
        placeholder: "Please enter number"
      },{
        type: "date",
        name: "Date control",
        key: "dateProperty"
      },{
        type: "password",
        name: "Password control",
        key: "passwordProperty",
        placeholder: "Please enter password"
      },{
        type: "boolean",
        name: "Checkbox control",
        key: "checkboxProperty",
        placeholder: "Please choose"
      }]
    };
    this.simpleTypesModel = {
      textProperty: "Text",
      numberProperty: 123.45,
      dateProperty: "2000-01-01",
      passwordProperty: "qwerty",
      checkboxProperty: true
    };

    this.valuesAllowed = {
      fields: [{
        type: "select",
        name: "Select control",
        key: "selectProperty",
        placeholder: "Please choose",
        valuesAllowed: [{
          value: 1, label: "One"
        },{
          value: 2, label: "Two"
        }]
      },{
        type: "radio",
        name: "Radio control",
        key: "radioProperty",
        valuesAllowed: [{
          value: 1, label: "One"
        },{
          value: 2, label: "Two"
        }]
      }]
    };
    this.valuesAllowedModel = {
      selectProperty: 1,
      radioProperty: 2
    };

    this.uploadComponent = {
      fields: [{
        type: "upload",
        name: "Upload control",
        key: "uploadProperty",
        placeholder: "Please choose a file",
        uploadOptions: {
          buttonText: "Choose file..."
        }
      }]
    };
    this.uploadComponentModel = {
      uploadProperty: null
    };

    this.validationTypes = {
      fields: [{
        type: "text",
        name: "Text control",
        key: "textProperty",
        placeholder: "Please enter text",
        pattern: '^[A-Z]*$',
        minLength: 4,
        maxLength: 6,
        validationMessages: {
          minLength: "Must contain at least 4 characters",
          maxLength: "Must contain 6 characters or less",
          pattern: "Must only contain capital letters A to Z"
        }
      },{
        type: "number",
        name: "Number control",
        key: "numberProperty",
        placeholder: "Please enter number",
        minimum: 10,
        maximum: 99,
        validationMessages: {
          minimum: "Must be 10 or greater",
          maximum: "Must be 99 or less"
        }
      },{
        type: "date",
        name: "Date control",
        key: "dateProperty",
        minimum: '2000-01-01',
        maximum: '2020-01-01',
        validationMessages: {
          minimum: "Must be after Jan 1st, 2000",
          maximum: "Must be before Jan 1st, 2020"
        }
      }]
    };
    this.validationTypesModel = {
      textProperty: "Tex",
      numberProperty: 123
    };

    this.helpTypes = {
      fields: [{
        type: "text",
        name: "Help text",
        key: "helpText",
        placeholder: "Please enter text",
        helpText: "Some helpful information"
      },{
        type: "text",
        name: "Help list",
        key: "helpList",
        placeholder: "Please enter number",
        helpList: [
          "Make sure of this",
          "And this",
          "And avoid this"
        ]
      },{
        type: "text",
        name: "Help image",
        key: "helpImage",
        placeholder: "Please enter number",
        helpImage: "images/captcha.png"
      }]
    };
    this.helpTypesModel = {
      helpText: "Tex",
      helpList: "123",
      helpImage: "123"
    };
  })
  .component('requirementsDocs', {
    bindings: {
      model: '=',
      requirements: '='
    },
    template: ' \
      <div class="row"> \
        <div class="col-sm-6"> \
          <tw-fieldset \
            legend="{{ $ctrl.requirements.legend }}" \
            description="{{ $ctrl.requirements.description }}" \
            fields="$ctrl.requirements.fields" \
            model="$ctrl.model"> \
          </tw-fieldset> \
          <pre>model: {{ $ctrl.model | json }}</pre> \
        </div> \
        <div class="col-sm-6"> \
          <pre>fieldset: {{ $ctrl.requirements | json }}</pre> \
        </div> \
      </div>'
  });
