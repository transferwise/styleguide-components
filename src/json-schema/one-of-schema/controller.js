import { getValidModelParts } from '../utils/valid-model';

class Controller {
  $onInit() {
    this.options = [];
    this.activeIndex = 1;
  }

  onSchemaChange(newSchema) {
    const validModel = getValidModelParts(this.model, newSchema);
    this.onModelChange(validModel, newSchema);
  }

  onModelChange(model, schema) {
    if (this.onChange) {
      this.onChange({ model, schema });
    }
  }
}

export default Controller;
