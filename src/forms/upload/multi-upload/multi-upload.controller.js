class Controller {
  constructor(
    $element,
    $scope,
    $attrs,
    $timeout,
  ) {
    this.$element = $element;
    this.$attrs = $attrs;
    this.files = [];
    this.model = [];
    this.$timeout = $timeout;
  }

  $onChanges(changes) {
    if (changes.icon) {
      this.viewIcon = changes.icon.currentValue ? changes.icon.currentValue : 'upload';
    }
  }

  onFileCapture(files) {
    if (this.ngDisabled) {
      return;
    }

    if (!files) {
      throw new Error('Could not retrieve file');
    }

    if (this.onStart && this.areAllFilesProcessed()) {
      this.onStart();
    }

    this.files = [...this.files, ...files];

    this.$timeout(() => {
      const objDiv = this.$element[0].querySelector('#processing-list');
      objDiv.scrollTop = objDiv.scrollHeight;
    }, 600);
  }

  // eslint-disable-next-line
  onProcessSuccess(index, file, dataUrl, id, response) {
    const key = this.httpOptions ? 'id' : 'dataUrl';

    this.files[index][key] = this.httpOptions ? id : dataUrl;

    const model = this.files.map(fileObject => fileObject[key]).filter(value => !!value);

    this.setNgModel(model);

    if (this.onFinish && this.areAllFilesProcessed()) {
      this.onFinish();
    }
  }

  areAllFilesProcessed() {
    const key = this.httpOptions ? 'id' : 'dataUrl';

    const processingFile = this.files.some(file => file[key] == null && file.error == null);

    return !processingFile;
  }

  onProcessFailure(index, file, error) {
    this.files[index].error = error;

    this.setNgModel(this.files);

    if (this.onFinish && this.areAllFilesProcessed()) {
      this.onFinish();
    }
  }

  // eslint-disable-next-line
  onProcessCancel(index) {
    const key = this.httpOptions ? 'id' : 'dataUrl';

    this.files.splice(index, 1);

    const model = this.files.map(fileObject => fileObject[key]).filter(value => !!value);

    this.setNgModel(model);
  }

  onDragEnter() {
    this.isDroppable = true;
  }

  onDragLeave() {
    this.isDroppable = false;
  }

  onDrop(files) {
    this.isDroppable = false;
    this.onFileCapture(files);
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
  '$attrs',
  '$timeout',
];

export default Controller;
