import template from './complete-card.html';

const CompleteCard = {
  template,
  bindings: {
    image: '<',
    fileName: '<',
    accept: '<',

    isImage: '<',
    isError: '<',
    isDone: '<',

    hasTranscluded: '<',
    successMessage: '<',
    errorMessage: '<',
    cancelText: '<',

    isTooLarge: '<',
    tooLargeMessage: '<',
    isWrongType: '<',
    firstError: '<',
    onManualReupload: '&',

    isLiveCameraUpload: '<',
    clear: '&',

    viewImageText: '<',
    toggleImageModal: '&'
  }
  // ,transclude: true
};

export default CompleteCard;
