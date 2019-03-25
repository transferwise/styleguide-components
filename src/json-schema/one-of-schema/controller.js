class Controller {
  $onInit() {
    this.activeIndex = 1;
  }

  onTabChange(index) {
    this.model = {}; // TODO can do better
    this.activeIndex = index;
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

  convertSchemasToValues(schemas) { // eslint-disable-line
    return schemas.map((schema, index) => ({
      value: index + 1,
      label: schema.title,
      secondary: schema.description
    }));
  }
}

export default Controller;
