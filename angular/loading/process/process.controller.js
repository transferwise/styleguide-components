
function TwProcessController($scope, $interval, $timeout) {
  var $ctrl = this;
  $ctrl.processing = $ctrl.state;
  var interval;

  // This allows us to cancel the interval when not needed.
  $scope.$watch('$ctrl.state', function(newVal) {
    if (isStopped($ctrl.processing)) {
      $ctrl.processing = null;
      $ctrl.startProcess();
    }
  });

  $scope.$watch('$ctrl.size', function(newVal) {
    // Kill the interval and restart on size change as animation will restart
    $interval.cancel(interval);
    $ctrl.startProcess();

    if (!$ctrl.size) {
      $ctrl.size = 'sm';
    }
    // 46% is ok for most cases, but we can make it perfect.
    switch($ctrl.size) {
      case 'xs':
        $ctrl.radius = '11';
        break;
      case 'sm':
        $ctrl.radius = '22';
        break;
      case 'xl':
        $ctrl.radius = '61';
        break;
      default:
        $ctrl.radius = '46%';
    }
  });

  function isStopped(state) {
    return state === -1 || state === 0 || state === 1;
  }

  $ctrl.startProcess = function() {
    interval = $interval(function() {
      $ctrl.processing = $ctrl.state;
      if (isStopped($ctrl.state)) {
        $ctrl.stopProcess();
      }
    }, 1500);
  };

  $ctrl.stopProcess = function() {
    $interval.cancel(interval);

    if ($ctrl.onStop) {
      if ($ctrl.state === 0) {
        $ctrl.onStop();
      } else {
        // 1800 matches 1.5s delay and 0.3s animation
        $timeout($ctrl.onStop, 1800);
      }
    }
  };

  $ctrl.startProcess();
}

TwProcessController.$inject = ['$scope', '$interval', '$timeout'];

export default TwProcessController;
