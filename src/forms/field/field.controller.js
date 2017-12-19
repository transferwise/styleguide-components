class FieldController {
  constructor(RequirementsService) {
    this.RequirementsService = RequirementsService;
  }

  $onChanges(changes) {
    if (changes.options) {
      this.field = this.RequirementsService.prepField(this.options, this.model, []);
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

  onChange() {
    if (this.changeHandler) {
      this.changeHandler();
    }
    this.errorMessage = false;
  }
}

FieldController.$inject = ['TwRequirementsService'];

export default FieldController;
