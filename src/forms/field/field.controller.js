class FieldController {
  constructor(RequirementsService) {
    this.RequirementsService = RequirementsService;
  }

  $onInit() {
    this.RequirementsService.prepField(this.field, this.model, []);
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
    // this.removeFieldError(field.key);
  }

  onChange() {
    if (this.changeHandler) {
      this.changeHandler();
    }
    // this.removeFieldError(field.key);
  }

  getControlType() {
    if (this.field.hidden) {
      return 'hidden';
    }
    if (this.field.enum) {
      return this.field.enum.length > 3 ? 'select' : 'radio';
    }
    if (this.field.values) {
      return this.field.values.length > 3 ? 'select' : 'radio';
    }
    if (this.field.valuesAllowed) {
      return this.field.valuesAllowed.length > 3 ? 'select' : 'radio';
    }
    switch (this.field.type) {
      case 'string':
        switch (this.field.format) {
          case 'date':
            return 'date';
          case 'base64url':
            return 'file';
          case 'password':
            return 'password';
          case 'uri':
            return 'text'; // 'url'; - not implemented
          case 'email':
            return 'text'; // 'email'; - not implemented
          case 'phone':
            return 'text'; // 'tel'; - not implemented
          default:
            return 'text';
        }
      case 'number':
      case 'integer':
        return 'number';
      case 'boolean':
        return 'checkbox';
      default:
        return 'text';
    }
  }

  // removeFieldError(fieldKey) {
  //   if (this.errorMessages) {
  //     delete this.errorMessages[fieldKey];
  //   }
  // }
}

FieldController.$inject = ['TwRequirementsService'];

export default FieldController;
