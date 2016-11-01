(function(angular) {
	'use strict';

	angular
		.module('tw.form-components')
		.component('twProgressSteps', TwProgressSteps);

	function TwProgressSteps() {
		return {
			bindings: {
				steps: '<',
				onStepSelect: '&'
			},
			controller: TwProgressStepsController,
			template: 
			"<div class='row'>\
				<div class='col-xs-12'>\
					<div class='progress m-b-1'>\
						<div class='progress-bar' role='progressbar' \
						aria-valuenow='{{$ctrl.progressPercentage}}' aria-valuemin='0' \
						aria-valuemax='100' ng-style='{width: $ctrl.progressPercentage + \"%\"}'> \
							<span class='sr-only'>{{$ctrl.progressPercentage}}% Complete</span> \
						</div> \
					</div> \
					<div class='row'> \
						<div class='col-xs-12 hidden-xs hidden-sm'> \
							<div class='step-name p-l-1 p-r-1 text-xs-center pull-left' ng-repeat='step in $ctrl.visibleSteps' \
							ng-style='{width: $ctrl.stepLabelWidth + \"%\"}' ng-class='{\"active\": step.isActive}'> \
								<a ng-if='!step.isActive' ng-click='$ctrl.selectStep(step)' href=''> \
									<small>{{step.label}}</small> \
								</a> \
								<strong ng-if='step.isActive'>\
									<small>{{step.label}}</small>\
								</strong> \
							</div> \
						</div> \
						<div class='col-xs-12 visible-xs visible-sm'>\
							<tw-select \
							name='stepSelect' \
							ng-model='$ctrl.activeStepForTwSelect' \
							options='$ctrl.visibleStepsForTwSelect' \
							ng-change='$ctrl.selectStep()'></tw-select>\
						</div>\
					</div> \
				</div> \
			</div>",
		};
	}

	function TwProgressStepsController() {

		var $ctrl = this;
		var stepsVisibleUpTo;
		var activeStep;

		$ctrl.$onChanges = function(changes) {
			if (changes.steps) {
				activeStep = getActiveStep($ctrl.steps);
				stepsVisibleUpTo = getStepsVisibleUpTo($ctrl.steps, activeStep);
				$ctrl.progressPercentage = getProgressPercentageFromSteps($ctrl.steps, activeStep);
				$ctrl.stepLabelWidth = getStepLabelWidth($ctrl.steps);
				$ctrl.visibleSteps = getVisibleSteps($ctrl.steps);

				$ctrl.activeStepForTwSelect = activeStep;
				$ctrl.visibleStepsForTwSelect = getStepsInTwSelectFormat($ctrl.visibleSteps);
			}
		};

		$ctrl.selectStep = function(step) {
			var newStep = step? step: $ctrl.activeStepForTwSelect;
			var newIndex = $ctrl.visibleSteps.indexOf(step);

			if (newIndex > stepsVisibleUpTo) {
				stepsVisibleUpTo = newIndex + 1;
			}

			$ctrl.onStepSelect({step: newStep});
		};

		function getProgressPercentageFromSteps(steps) {
			var activeStep = getActiveStep(steps);

			if (!steps || !activeStep) {
				return 0;
			}

			var stepCount = steps.length;
			var activeStepIndex = steps.indexOf(activeStep);
			var stepPercentage = 100 / stepCount;
			var progress = stepPercentage * (activeStepIndex) + stepPercentage / 2; // last step needs to be half progress

			return Math.round(progress);
		}

		function getStepsVisibleUpTo(steps, activeStep) {
			if (!stepsVisibleUpTo || stepsVisibleUpTo < steps.indexOf(activeStep) + 1) {
				return steps.indexOf(activeStep) + 1;
			} else {
				return stepsVisibleUpTo;
			}
		}

		function getVisibleSteps(steps) {
			return steps.slice(0, stepsVisibleUpTo);
		}

		function getStepsInTwSelectFormat(steps) {
			return steps.map(function(step) {
				return {value: step, label: step.label};
			});
		}

		function getActiveStep(steps) {
			var value;
			for (var i = 0; i < steps.length; i++) {
				if (steps[i].isActive) {
					value = steps[i];
					break;
				}
			}
			return value;
		}

		function getStepLabelWidth(steps) {
			return Math.floor(100 / steps.length);
		}
	}


})(window.angular);
