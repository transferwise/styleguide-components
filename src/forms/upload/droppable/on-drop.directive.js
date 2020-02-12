function onDrop($parse, $rootScope, $exceptionHandler) {
  return {
    restrict: 'A',
    controller: () => {

    },
    link: (scope, elem, attr) => {
      scope.counter = 0;
      elem[0].addEventListener('drop', (event) => {
        const fn = $parse(attr.onDrop);

        const callback = () => {
          fn(scope, {
            files: event.dataTransfer.files
          });
        };

        if (!$rootScope.$$phase) {
          scope.$apply(callback);
        } else {
          try {
            callback();
          } catch (error) {
            $exceptionHandler(error);
          }
        }

        event.preventDefault();
        scope.counter = 0;
      }, false);

      elem[0].addEventListener('dragover', (event) => {
        event.preventDefault();
      }, false);
    }
  };
}

onDrop.$inject = ['$parse', '$rootScope', '$exceptionHandler'];

export default onDrop;
