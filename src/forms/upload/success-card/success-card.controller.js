class SuccessCardController {
  constructor($element, FileValidationService) {
    this.$element = $element;
    this.FileValidationService = FileValidationService;
  }

  $onChanges(changes) {
    if (changes.file && changes.file.currentValue) {
      this.fileName = changes.file.currentValue.name;
    }
  }

  onManualReupload() {
    const element = this.$element[0];
    const uploadInput = element.querySelector('.tw-droppable-input-reupload');
    const file = uploadInput.files[0];

    this.onFileCapture(file);
  }
}

SuccessCardController.$inject = [
  '$element',
  'FileValidationService'
];

export default SuccessCardController;
