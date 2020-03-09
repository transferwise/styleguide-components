class ProcessController {
  constructor($scope, $interval, $timeout) {
    this.$interval = $interval;
    this.$timeout = $timeout;

    this.interval = null;
    this.processing = this.state;
    this.onStateChange();
  }

  $onChanges(changes) {
    if (changes.state) {
      this.onStateChange();
    }

    if (changes.state) {
      this.onSizeChange();
    }
  }

  onStateChange() {
    // This allows us to cancel the interval when not needed.
    if (isStopped(this.processing)) {
      this.processing = null;
      this.startProcess();
    }
  }

  onSizeChange() {
    // Kill the interval and restart on size change as animation will restart
    this.stopProcess();
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
  }

  startProcess() {
    // Don't start a new interval if one is running
    if (this.interval) {
      return;
    }

    // We want to check for state change once per animation cycle.
    this.interval = this.$interval(() => {
      this.processing = this.state;
      if (isStopped(this.state)) {
        this.stopProcess();
        this.notifyConsumers();
      }
    }, 1500);
  }

  stopProcess() {
    if (this.interval) {
      this.$interval.cancel(this.interval);
      this.interval = null;
    }
  }

  notifyConsumers() {
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
