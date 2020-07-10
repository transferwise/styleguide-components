let $ctrl;

class FormControlController {
  constructor($element) {
    this.$element = $element;
    this.element = $element[0];

    // This is a bit lame, but necessary due to the way twUpload's callbacks work
    // Because they use '=', not '&', we lose reference to this controller.
    $ctrl = this;
  }

  $onInit() {
    this.$ngModel = this.$element.controller('ngModel');
    this.addValidators();

    if (!this.uploadOptions) {
      this.uploadOptions = {};
    }
  }

  change() {
    this.$ngModel.$setDirty();

    // Pass internal value through our validators
    this.$ngModel.$setViewValue(this.internalModel);
  }

  focus() {
    this.element.dispatchEvent(new CustomEvent('focus'));
  }

  blur() {
    this.$ngModel.$setTouched();
    this.element.dispatchEvent(new CustomEvent('blur'));
  }

  // eslint-disable-next-line
  onAsyncUploadSuccess(file, response) {
    if ($ctrl.onAsyncSuccess) {
      $ctrl.onAsyncSuccess({ response });
    }
  }

  // eslint-disable-next-line
  onAsyncUploadFailure(response) {
    if ($ctrl.onAsyncFailure) {
      $ctrl.onAsyncFailure({ response });
    }
  }

  /**
   * autocomplete hides our form help so we need to disable it when help text
   * is present. Chrome ignores autocomplete=off, the only way to disable it is
   * to provide an 'invalid' value, for which 'disabled' serves.
   */
  getAutocompleteStatus() {
    return this.help && (this.help.message || this.help.list || this.help.image)
      ? 'disabled'
      : 'on';
  }

  addValidators() {
    const $ngModel = this.$ngModel;

    $ngModel.$formatters.push((modelValue) => {
      this.internalModel = modelValue;
      return modelValue;
    });
  }
}

FormControlController.$inject = ['$element'];

export default FormControlController;
