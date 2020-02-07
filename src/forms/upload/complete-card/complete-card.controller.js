class CompleteCardController {
  constructor($element) {
    this.$element = $element;
  }


  onManualReupload() {
    const element = this.$element[0];
    const uploadInput = element.querySelector('.tw-droppable-input-reupload');
    const file = uploadInput.files[0];

    this.onFileCapture(file);
  }
}

CompleteCardController.$inject = ['$element'];

export default CompleteCardController;
