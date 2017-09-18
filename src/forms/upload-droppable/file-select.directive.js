/* DEPRECATED in favour of upload */

function FileSelectDirective() {
  return {
    restrict: 'A',
    scope: {
      onUserInput: '='
    },
    link: FileSelectLink
  };
}

function FileSelectLink(scope, $element) {
  const element = $element[0];
  element.addEventListener('change', (event) => {
    if (scope.$ctrl.onUserInput && typeof scope.$ctrl.onUserInput === 'function') {
      scope.$ctrl.onUserInput(event);
    }
  });
}

export default FileSelectDirective;
