class Controller {
  onModelChange(model) {
    console.log('generic', model);
    if (this.onChange) {
      this.onChange({ model });
    }
  }
}

export default Controller;
