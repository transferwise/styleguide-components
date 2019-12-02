class ImageDetailsModal {
  handleOverlayClick(event) {
    const targetElement = event.target;
    if (targetElement.classList.contains('modal__overlay')) {
      this.toggleModal();
    }
  }
}

export default ImageDetailsModal;
