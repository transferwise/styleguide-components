class Controller {
  onButtonClick() {
    if (this.onClick) {
      this.onClick();
    }
  }
}

export default Controller;
