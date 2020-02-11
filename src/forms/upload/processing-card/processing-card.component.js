import controller from './processing-card.controller';
import template from './processing-card.html';

const ProcessingCard = {
  controller,
  template,
  bindings: {
    name: '<',
    file: '<',

    onStart: '&',
    onSuccess: '&',
    onFailure: '&',
    onCancel: '&',

    maxSize: '<',
    accepts: '<',
    httpOptions: '<',

    processingMessage: '<',
    successMessage: '<',
    errorMessage: '<',
    tooLargeMessage: '<',

    // uploadingText: '<',

    cancelText: '<'
  }
};

export default ProcessingCard;
