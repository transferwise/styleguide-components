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
      this.changeHandler({ newValue });
    }
    this.errorMessage = false;
  }
}

FieldController.$inject = ['TwRequirementsService'];

export default FieldController;
