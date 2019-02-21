class Controller {
  onModelChange(model) {
    if (this.onChange) {
      this.onChange({ model });
    }
  }
}

export default Controller;
