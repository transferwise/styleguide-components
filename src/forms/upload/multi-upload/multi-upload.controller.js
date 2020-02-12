class Controller {
  constructor(
    $element,
    $scope,
    $attrs,
  ) {
    this.$element = $element;
    this.$attrs = $attrs;
    this.files = [];
    this.model = [];
  }

  onFileCapture(files) {
    if (this.ngDisabled) {
      return;
    }

    if (!files) {
      throw new Error('Could not retrieve file');
    }

    this.files = files;
  }

  // eslint-disable-next-line
  onProcessSuccess(index, file, dataUrl, id, response) {
    this.model[index] = dataUrl;
    this.setNgModel(this.model);
  }

  // eslint-disable-next-line
  onProcessCancel(index) {
    // TODO remove the index from array
  }

  reset() {
    // this.clearHtmlInput();
    this.setNgModel(null);
  }

  // clearHtmlInput() {
  //   if (this.$element[0].querySelectorAll('input')) {
  //     this.$element[0].querySelectorAll('input').forEach((input) => {
  //       input.value = null;
  //     });
  //   }
  // }

  setNgModel(value) {
    // If ngModel not assignable, we don't want to error.
    if (typeof this.$attrs.ngModel !== 'undefined') {
      const $ngModel = this.$element.controller('ngModel');
      if (!$ngModel.$setViewValue) {
        return;
      }
      $ngModel.$setViewValue(value);
    }
  }
}

Controller.$inject = [
  '$element',
  '$scope',
  '$attrs'
];

export default Controller;
