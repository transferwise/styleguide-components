class ProcessController {
  constructor($scope, $interval, $timeout) {
    this.$interval = $interval;
    this.$timeout = $timeout;

    this.interval = null;

    this.processing = this.state;

    // This allows us to cancel the interval when not needed.
    $scope.$watch('$ctrl.state', () => {
      if (isStopped(this.processing)) {
        this.processing = null;
        this.startProcess();
      }
    });

    $scope.$watch('$ctrl.size', () => {
      // Kill the interval and restart on size change as animation will restart
      $interval.cancel(this.interval);
      this.startProcess();

      if (!this.size) {
        this.size = 'sm';
      }
      // 46% is ok for most cases, but we can make it perfect.
      switch (this.size) {
        case 'xs':
          this.radius = '11';
          break;
        case 'sm':
          this.radius = '22';
          break;
        case 'xl':
          this.radius = '61';
          break;
        default:
          this.radius = '46%';
      }
    });

    this.startProcess();
  }

  startProcess() {
    this.interval = this.$interval(() => {
      this.processing = this.state;
      if (isStopped(this.state)) {
        this.stopProcess();
      }
    }, 1500);
  }

  stopProcess() {
    if (this.interval) {
      this.$interval.cancel(this.interval);
    }

    if (this.onStop) {
      if (this.state === 0) {
        this.onStop();
      } else {
        // 1800 matches 1.5s delay and 0.3s animation
        this.$timeout(this.onStop, 1800);
      }
    }
  }
}

function isStopped(state) {
  return state === -1 || state === 0 || state === 1;
}

ProcessController.$inject = ['$scope', '$interval', '$timeout'];

export default ProcessController;
