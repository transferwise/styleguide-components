/* DEPRECATED in favour of upload */

function TwFileSelectDirective() {
  return {
    bindToController: true,
    controller: function(){},
    controllerAs: '$ctrl',
    replace: false,
    restrict: 'A',
    scope: {
      onUserInput: '='
    },
    link: function(scope, element) {
      element.on('change', function (event) {
        if (scope.$ctrl.onUserInput && typeof scope.$ctrl.onUserInput === 'function') {
          scope.$ctrl.onUserInput(event);
        }
      });
    }
  };
}

export default TwFileSelectDirective;
