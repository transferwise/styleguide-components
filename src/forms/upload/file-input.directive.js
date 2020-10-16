
function FileInputDirective() {
  return {
    restrict: 'A',
    controller: FileInputController,
    controllerAs: '$ctrl',
    bindToController: true,
    scope: {
      onUserInput: '&'
    }
  };
}

class FileInputController {
  constructor($element, $scope) {
    const element = $element[0];
    element.addEventListener('change', () => {
      if (this.onUserInput
        && typeof this.onUserInput === 'function') {
        this.onUserInput();
        // TODO remove this log once digest bug fully resolved.
        console.log('DEBUG: file input value changed'); // eslint-disable-line
        // Here, we force a digest because we were seeing failures to begin
        // processing when used in other projects.
        if ($scope.$root.$$phase !== '$apply' && $scope.$root.$$phase !== '$digest') {
          $scope.$apply();
        }
      }
    });
  }
}

FileInputController.$inject = ['$element', '$scope'];

export default FileInputDirective;
