function onDragLeave($parse, $rootScope) {
  return {
    restrict: 'A',
    require: 'onDrop',
    link: (scope, elem, attr) => {
      elem[0].addEventListener('dragleave', (event) => {
        const fn = $parse(attr.onDragLeave);
        scope.counter--;

        if (scope.counter <= 0) {
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

onDragLeave.$inject = ['$parse', '$rootScope'];

export default onDragLeave;
