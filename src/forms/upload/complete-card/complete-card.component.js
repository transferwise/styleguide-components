import template from './complete-card.html';
import controller from './complete-card.controller';

const CompleteCard = {
  template,
  controller,
  bindings: {
    image: '<',
    fileName: '<',
    accept: '<',

    isImage: '<',
    isError: '<',
    isDone: '<',

    successMessage: '<',
    errorMessage: '<',
    cancelText: '<',

    isTooLarge: '<',
    tooLargeMessage: '<',
    isWrongType: '<',
    firstError: '<',

    isLiveCameraUpload: '<',
    clear: '&',

    viewImageText: '<',
    toggleImageModal: '&',
    onFileCapture: '&'
  }
};

export default CompleteCard;
