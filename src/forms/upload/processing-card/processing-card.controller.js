class Controller {
  constructor(
    $timeout,
    AsyncFileReader,
    AsyncFileSaver,
    AsyncTasksConfig,
    FileValidationService
  ) {
    this.$timeout = $timeout;
    this.AsyncFileReader = AsyncFileReader;
    this.AsyncFileSaver = AsyncFileSaver;
    this.AsyncTasksConfig = AsyncTasksConfig;
    this.FileValidation = FileValidationService;

    this.processingState = null;
  }

  $onChanges(changes) {
    if (changes.file && changes.file.currentValue) {
      this.onFileCapture(changes.file.currentValue);
    }
  }

  onFileCapture(file) {
    if (this.ngDisabled) {
      return;
    }

    if (!file) {
      throw new Error('Could not retrieve file');
    }

    this.reset();

    this.file = file;

    this.isProcessing = true;
    this.processingState = null;

    this.onStart({ file });

    if (!this.FileValidation.isSmallerThanMaxSize(file, this.maxSize)) {
      this.validationMessages = [this.tooLargeMessage];
      asyncFailure({
        status: 413,
        data: { message: this.tooLargeMessage }
      }, null, this);
      return;
    }

    if (this.httpOptions) {
      // Post file now
      this.asyncFileRead(file)
        .then(dataUrl => this.asyncFileSave(file, Controller.parseFileName(dataUrl))
          .then(response => asyncSuccess(response, dataUrl, this)))
        .catch(error => asyncFailure(error, null, this));
    } else {
      // Post on form submit
      this.asyncFileRead(file)
        .then(dataUrl => asyncSuccess(null, dataUrl, this))
        .catch(error => asyncFailure(error, null, this));
    }
  }

  static parseFileName(dataUrl) {
    const match = dataUrl.match(/^data:[^/]+\/([^;]+);base64,/);

    return match ? `file.${match[1]}` : undefined;
  }

  asyncFileSave(file, fileName) {
    const httpOptions = this.AsyncTasksConfig.extendHttpOptions(this.httpOptions);
    return this.AsyncFileSaver.save(httpOptions.param || this.name, file, httpOptions, fileName);
  }

  asyncFileRead(file) {
    return this.AsyncFileReader.read(file);
  }

  reset() {
    this.processingState = 0;
    this.isProcessing = false;
    this.isSuccess = false;
    this.isError = false;
  }

  onRemove() {
    this.onCancel();
  }
}

function asyncSuccess(response, dataUrl, $ctrl) {
  $ctrl.processingState = 1;
  let id = null;
  const file = $ctrl.file;
  const httpOptions = $ctrl.httpOptions;

  if (httpOptions
      && httpOptions.idProperty
      && response
      && response.data
      && response.data[httpOptions.idProperty]) {
    id = response.data[httpOptions.idProperty];
  }

  // Time success messaging to match animation
  $ctrl.$timeout(() => {
    $ctrl.isProcessing = false;
    $ctrl.isSuccess = true;
    $ctrl.onSuccess({ file, dataUrl, id, response }); // eslint-disable-line
  }, 3600);

  return dataUrl;
}
function asyncFailure(error, dataUrl, $ctrl) {
  // Start changing process indicator immediately
  $ctrl.processingState = -1;

  if ($ctrl.responseErrorExtractor) {
    $ctrl.errorMessage = $ctrl.responseErrorExtractor({ error }) || $ctrl.errorMessage;
  }

  // Wait before updating text
  $ctrl.$timeout(() => {
    $ctrl.isProcessing = false;
    $ctrl.isError = true;
  }, 3600);
  // Allow a small amount of extra time before notifying external handlers
  $ctrl.$timeout(() => {
    $ctrl.onFailure({ error });
  }, 3600); // 3500); TODO for some reason more time is needed

  return error;
}

Controller.$inject = [
  '$timeout',
  'AsyncFileReader',
  'AsyncFileSaver',
  'AsyncTasksConfig',
  'FileValidationService'
];

export default Controller;
