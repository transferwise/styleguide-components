import { getValidModelParts } from '../utils/clean-model';

class Controller {
  $onInit() {
    this.options = [];
    this.activeIndex = 1;
  }

  onSchemaChange(newSchema) {
    const validModel = getValidModelParts(this.model, newSchema);
    this.onModelChange(validModel);
  }

  onModelChange(model) {
    if (this.onChange) {
      this.onChange({ model });
    }
  }

  onRefreshRequirements(model) {
    if (this.onRefresh) {
      this.onRefresh({ model });
    }
  }
}

export default Controller;
