class FormGroupController {
  constructor(RequirementsService) {
    this.RequirementsService = RequirementsService;
  }

  $onInit() {
    this.RequirementsService.prepField(this.field, this.model, []);
  }

  // onBlur(field) {
  //   this.removeFieldError(field.key);
  //
  //   if (!field.refreshRequirementsOnChange) {
  //     // eslint-disable-next-line no-useless-return
  //     return;
  //   }
  //   // TODO disabled the form while we refresh requirements?
  //   if (this.onRefreshRequirements) {
  //     // Should post the current model back to the requirements end
  //     // point and update the requirements.
  //     if (!fieldTypeRefreshesOnChange(field.type)) {
  //       this.onRefreshRequirements();
  //     }
  //   }
  // }

  // onChange(field) {
  //   this.removeFieldError(field.key);
  //   if (fieldTypeRefreshesOnChange(field.type)) {
  //     this.onRefreshRequirements();
  //   }
  // }

  // removeFieldError(fieldKey) {
  //   if (this.errorMessages) {
  //     delete this.errorMessages[fieldKey];
  //   }
  // }
}

FormGroupController.$inject = ['TwRequirementsService'];

export default FormGroupController;
