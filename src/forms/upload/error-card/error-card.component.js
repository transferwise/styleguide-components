import template from './error-card.html';
import controller from './error-card.controller';

const ErrorCard = {
  template,
  controller,
  bindings: {
    image: '<',
    accept: '<',

    isImage: '<',
    isError: '<',

    errorMessage: '<',
    errorDescription: '<',

    cancelText: '<',

    isTooLarge: '<',
    tooLargeMessage: '<',
    isWrongType: '<',

    isLiveCameraUpload: '<',
    clear: '&',

    viewImageText: '<',
    toggleImageModal: '&',
    onFileCapture: '&'
  }
};

export default ErrorCard;
