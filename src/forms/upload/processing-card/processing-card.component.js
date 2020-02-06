import template from './processing-card.html';

const ProcessingCard = {
  template,
  bindings: {
    isProcessing: '<',
    isSuccess: '<',
    isError: '<',
    isDone: '<',

    processingText: '<',
    successText: '<',
    failureText: '<',
    processingState: '<',
    uploadingText: '<',
  }
};

export default ProcessingCard;
