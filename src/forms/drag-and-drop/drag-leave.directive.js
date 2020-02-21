function twDragLeave($parse, $rootScope) {
  return {
    restrict: 'A',
    require: 'twDrop',
    link: (scope, elem, attr) => {
      elem[0].addEventListener('dragleave', (event) => {
        const fn = $parse(attr.twDragLeave);
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

twDragLeave.$inject = ['$parse', '$rootScope'];

export default twDragLeave;
