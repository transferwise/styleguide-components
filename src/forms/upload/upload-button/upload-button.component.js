import template from './upload-button.html';
import controller from './upload-button.controller';

const UploadButton = {
  template,
  controller,
  bindings: {
    name: '<',
    label: '<',
    isSecondary: '<',
    accept: '<',
    model: '<',
    multiple: '<',
    disabled: '<',
    onClick: '&',
    onCapture: '&'
  }
};

export default UploadButton;
