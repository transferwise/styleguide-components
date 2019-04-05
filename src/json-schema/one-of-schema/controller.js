import { cleanModel } from '../utils/clean-model';

class Controller {
  $onInit() {
    this.options = [];
    this.activeIndex = 1;
  }

  onSchemaChange(newSchema) {
    const validModel = cleanModel(this.model, newSchema);
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
