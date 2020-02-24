import template from './capture-card.html';
import controller from './capture-card.controller';

const CaptureCard = {
  template,
  controller,
  bindings: {
    label: '<',
    icon: '<',
    accept: '<',
    buttonText: '<',
    ngDisabled: '<',
    placeholder: '<',
    inputFile: '<',
    helpImage: '<',

    isLiveCameraUpload: '<',
    cameraOverlay: '<',
    cameraDirection: '<',

    onFileCapture: '&'
  }
};

export default CaptureCard;
