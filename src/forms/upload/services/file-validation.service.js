import angular from 'angular';

class FileValidationService {
  // eslint-disable-next-line
  isImage(file) {
    return file.type && file.type.indexOf('image') > -1;
  }

  // eslint-disable-next-line
  isSmallerThanMaxSize(file, maxSize) {
    return !angular.isNumber(maxSize) || file.size <= maxSize;
  }

  /*
  // TODO validate file type
  isTypeValid(file, accept) {
    return true;
    // this.isWrongType = true;
  }
  */
}

export default angular
  .module('tw.styleguide.forms.upload.validation-service', [])
  .service('FileValidationService', FileValidationService)
  .name;
