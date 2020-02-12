import template from './camera-button.html';
import controller from './camera-button.controller';

const CameraButton = {
  template,
  controller,
  bindings: {
    label: '<',
    disabled: '<',
    onClick: '&',
    onCapture: '&'
  }
};

export default CameraButton;
