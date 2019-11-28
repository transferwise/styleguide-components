import controller from './image-details-modal.controller.js';
import template from './image-details-modal.html';
import './image-details-modal.less';

const ImageDetailsModal = {
  controller,
  template,
  bindings: {
    visibility: '<',
    image: '<',
    title: '<',
    messages: '<',
    toggleModal: '&',
  }
};

export default ImageDetailsModal;
