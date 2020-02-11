import template from './default-card.html';
import controller from './default-card.controller';

const DefaultCard = {
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

export default DefaultCard;
