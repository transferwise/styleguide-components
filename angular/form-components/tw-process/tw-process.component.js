
  const TwProcess = {
    bindings: {
      state: '<',
      size: '@',
      onStop: '&',
      promise: '<'
    },
    controller: ['$scope', '$interval', '$timeout', TwProcessController],
    template:
    "<span class='process' \
      ng-class='{ \
        \"process-success\": $ctrl.processing === 1, \
        \"process-danger\": $ctrl.processing === -1, \
        \"process-stopped\": $ctrl.processing === 0, \
        \"process-xs\": $ctrl.size === \"xs\", \
        \"process-sm\": $ctrl.size === \"sm\", \
        \"process-md\": $ctrl.size === \"md\", \
        \"process-lg\": $ctrl.size === \"lg\", \
        \"process-xl\": $ctrl.size === \"xl\" \
      }'> \
      <span class='process-icon-container'> \
        <span class='process-icon-horizontal'></span> \
        <span class='process-icon-vertical'></span> \
      </span> \
      <svg version='1.1' \
        xmlns='http://www.w3.org/2000/svg' \
        xml:space='preserve'> \
        <circle class='process-circle' cx='50%' cy='50%' ng-attr-r='{{$ctrl.radius}}' \
          fill-opacity='0.0' /> \
      </svg> \
    </span>"
  };

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

  export default angular
    .module('tw.styleguide.navigation.process', [])
    .component('twProcess', TwProcess).name;
