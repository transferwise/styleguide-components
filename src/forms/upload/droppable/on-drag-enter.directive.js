function onDragEnter($parse, $rootScope) {
  return {
    restrict: 'A',
    require: 'onDrop',
    link: (scope, elem, attr) => {
      elem[0].addEventListener('dragenter', (event) => {
        const fn = $parse(attr.onDragEnter);
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

onDragEnter.$inject = ['$parse', '$rootScope'];

export default onDragEnter;
