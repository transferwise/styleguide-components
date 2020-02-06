import template from './default-card.html';
import controller from './default-card.controller';

const DefaultCard = {
  template,
  controller,
  bindings: {
    isDone: '<',
    inputFile: '<',
    helpImage: '<',
    viewIcon: '<',
    buttonText: '<',
    ngDisabled: '<',
    label: '<',
    description: '<',
    accept: '<',

    showVideoPreview: '<',
    isLiveCameraUpload: '<',
    showLiveCameraCaptureScreen: '&',
    cameraOverlay: '<',
    cameraDirection: '<',

    onFileCapture: '&'
  }
};

export default DefaultCard;
