class Controller {
  $onChanges(changes) {
    if (changes.schema) {
      const newSchema = changes.schema.currentValue;

      // If this schema is just a single enum, set the value
      if (newSchema && newSchema.enum && newSchema.enum.length === 1) {
        this.onModelChange(newSchema.enum[0]);
      }
    }
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
