class Controller {
  constructor($element) {
    this.$element = $element;
  }

  onButtonClick() {
    if (this.onClick) {
      this.onClick();
    }
  }

  onButtonCapture() {
    const element = this.$element[0];
    const uploadInput = element.querySelector('.tw-droppable-input');
    const files = uploadInput.files;

    this.onCapture({ files });
  }
}

Controller.$inject = ['$element'];

export default Controller;
