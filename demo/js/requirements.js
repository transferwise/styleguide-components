angular.module('tw.styleguide.docs', [])
  .config(['$compileProvider', function ($compileProvider) {
    $compileProvider.debugInfoEnabled(false);
  }])
  .controller('PageController', function () {
    this.log = function (message) { console.log(message); };

    this.fieldsetBasic = {
      fields: {
        keyName: {
          type: "text",
          name: "Control label",
          placeholder: "Please enter text"
        }
      }
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
        type: "checkbox",
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
