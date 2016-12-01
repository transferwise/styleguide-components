(function(angular) {
	'use strict';

	angular
		.module('tw.form-components')
		.directive('twProcess', TwProcess);

	function TwProcess() {
		return {
			restrict: 'E',
			controllerAs: '$ctrl',
			bindToController: true,
			scope: {
				state: '=',
				size: '@',
				onStop: '&'
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
	}

	function TwProcessController($scope, $interval, $timeout) {
		var $ctrl = this;
		$ctrl.processing = $ctrl.state;
		var promise;

		// This allows us to cancel the interval when not needed.
		$scope.$watch('$ctrl.state', function(newVal) {
			if ($ctrl.processing === -1 ||
				$ctrl.processing === 0 ||
				$ctrl.processing === 1) {
				// We're stopped so restart
				$ctrl.processing = null;
				$ctrl.startProcess();
			}
		});

		$scope.$watch('$ctrl.size', function(newVal) {
			// Kill the promise and restart on size change as animation will restart
			$interval.cancel(promise);
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

		$ctrl.startProcess = function() {
			promise = $interval(function() {
				$ctrl.processing = $ctrl.state;
				if ($ctrl.state === -1 ||
					$ctrl.state === 0 ||
					$ctrl.state === 1) {
					$ctrl.stopProcess();
				}
			}, 1500);
		};

		$ctrl.stopProcess = function() {
			$interval.cancel(promise);

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
})(window.angular);
