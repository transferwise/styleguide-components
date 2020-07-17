import template from './capture-card.html';
import controller from './capture-card.controller';
import './capture-card.less';

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
    noCameraText: '<',
    noCameraMessage: '<',

    isLiveCameraUpload: '<',
    cameraGuidelines: '<',

    onFileCapture: '&'
  }
};

export default CaptureCard;
