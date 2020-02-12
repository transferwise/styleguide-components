import template from './upload-button.html';
import controller from './upload-button.controller';

const UploadButton = {
  template,
  controller,
  bindings: {
    name: '<',
    label: '<',
    accept: '<',
    model: '<',
    disabled: '<',
    onClick: '&',
    onCapture: '&'
  }
};

export default UploadButton;
