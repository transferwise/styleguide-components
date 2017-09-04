
function FileInputDirective() {
  return {
    restrict: 'A',
    controller: FileInputController,
    controllerAs: '$ctrl',
    bindToController: true,
    require: {
      UploadController: '^twUpload'
    },
    scope: {
      onUserInput: '&'
    }
  };
}

class FileInputController {
  constructor($element) {
    $element.on('change', () => {
      if (this.onUserInput &&
        typeof this.onUserInput === 'function') {
        this.onUserInput();
      }
    });
  }
}

FileInputController.$inject = ['$element'];

export default FileInputDirective;
