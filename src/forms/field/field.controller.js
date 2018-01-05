class FieldController {
  constructor(RequirementsService) {
    this.RequirementsService = RequirementsService;
  }

  $onChanges(changes) {
    if (changes.initialField) {
      this.field = this.initialField;
      this.control = this.field.control ? this.field.control :
        this.RequirementsService.getControlType(changes.initialField.currentValue);
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

  sizeOf(obj) {
    return obj ? Object.keys(obj).length : 0;
  }
}


FieldController.$inject = ['TwRequirementsService'];

export default FieldController;
