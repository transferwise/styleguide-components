class Controller {
  $onInit() {
    console.log('playground'); // eslint-disable-line
    this.schema = {};
  }

  onSchemaChange(schemaString) {
    try {
      this.schema = JSON.parse(schemaString);
      console.log('valid JSON!'); // eslint-disable-line
    } catch (ex) {
      console.log('invalid'); // eslint-disable-line
    }
  }

  onModelChange(model, isValid) {
    console.log('new model', model); // eslint-disable-line
    this.myModel = model;
    this.isValid = isValid;
  }
}

export default Controller;
