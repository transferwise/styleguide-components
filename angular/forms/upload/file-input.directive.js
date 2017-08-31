
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

function FileInputController($element) {
  var $ctrl = this;
  $element.on('change', function (event) {
    if ($ctrl.onUserInput &&
      typeof $ctrl.onUserInput === 'function') {
      $ctrl.onUserInput();
    }
  });
}

FileInputController.$inject = ['$element'];

export default FileInputDirective;
