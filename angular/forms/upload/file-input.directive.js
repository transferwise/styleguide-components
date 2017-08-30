
function TwFileInputDirective() {
  return {
    bindToController: true,
    controller: TwFileInputController,
    controllerAs: '$ctrl',
    replace: false,
    restrict: 'A',
    scope: {
      onUserInput: '='
    }
  };
}

function TwFileInputController($element) {
  var $ctrl = this;
  $element.on('change', function (event) {
    if ($ctrl.onUserInput &&
      typeof $ctrl.onUserInput === 'function') {
      $ctrl.onUserInput(event);
    }
  });
}

TwFileInputController.$inject = ['$element'];

export default TwFileInputDirective;
