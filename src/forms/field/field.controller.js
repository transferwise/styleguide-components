class FieldController {
  constructor(RequirementsService) {
    this.RequirementsService = RequirementsService;
  }

  $onChanges(changes) {
    if (changes.rawField) {
      this.field = this.RequirementsService.prepField(this.rawField, this.model, []);
    }
  }

  onFocus() {
    if (this.focusHandler) {
      this.focusHandler();
    }
  }

  onBlur() {
    if (this.blurHandler) {
      this.blurHandler();
    }
  }

  onChange(newValue) {
    if (this.changeHandler) {
      this.changeHandler({ value: newValue });
    }
    if (this.errorMessage) {
      delete this.errorMessage;
    }
  }
}

FieldController.$inject = ['TwRequirementsService'];

export default FieldController;
