function twDragEnter($parse, $rootScope) {
  return {
    restrict: 'A',
    require: 'twDrop',
    link: (scope, elem, attr) => {
      elem[0].addEventListener('dragenter', (event) => {
        const fn = $parse(attr.twDragEnter);
        scope.counter++;

        if (scope.counter >= 1) {
          const callback = () => {
            fn(scope, { $event: event });
          };

          if (!$rootScope.$$phase) {
            scope.$apply(callback);
          } else {
            scope.$evalAsync(callback);
          }
        }

        event.preventDefault();
      }, false);
    }
  };
}

twDragEnter.$inject = ['$parse', '$rootScope'];

export default twDragEnter;
