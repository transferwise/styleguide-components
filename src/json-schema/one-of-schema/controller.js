class Controller {
  $onInit() {
    this.tabs = this.schema.oneOf.map(schema => schema.title);
    this.activeIndex = 0;
  }

  onTabChange(index) {
    this.model = {}; // TODO can do better
    this.activeIndex = index;
  }

  onModelChange(model) {
    console.log('oneOf', model);
    if (this.onChange) {
      this.onChange({ model });
    }
  }
}

export default Controller;
