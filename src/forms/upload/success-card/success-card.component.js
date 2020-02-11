import template from './success-card.html';
import controller from './success-card.controller';

const SuccessCard = {
  template,
  controller,
  bindings: {
    label: '<',
    file: '<',
    data: '<',
    isImage: '<',
    successMessage: '<',
    cancelText: '<',
    onCancel: '&',
  }
};

export default SuccessCard;
