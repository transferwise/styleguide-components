(function(angular) {
	'use strict';

	angular
		.module('tw.form-components')
		.directive('twDateLookup', TwDateLookupDirective);

	function TwDateLookupDirective() {
		return {
			require: 'ngModel',
			bindToController: true,
			controller: ['$element', '$scope', 'TwDateService', TwDateLookupController],
			controllerAs: '$ctrl',
			replace: false,
			restrict: 'E',
			template: templateAsString,
			scope: {
				ngModel: '=',
				ngChange: '&',
				ngMin: '=',
				ngMax: '=',
				ngRequired: '=',
				ngDisabled: '=',
				placeholder: '@',
				size: '@',
				locale: '@'
			}
		};
	}

	var templateAsString = ' \
		<div class="btn-group btn-block dropdown"> \
			<button class="btn btn-input dropdown-toggle tw-date-lookup-button" data-toggle="dropdown" \
				ng-disabled="$ctrl.ngDisabled" \
				ng-class="{ \
					\'btn-sm\': $ctrl.size === \'sm\', \
					\'btn-lg\': $ctrl.size === \'lg\' \
				}" \
				ng-keydown="$ctrl.keyHandler($event)"> \
				<span ng-if="!$ctrl.ngModel" class="form-control-placeholder tw-date-lookup-placeholder"> \
					{{$ctrl.placeholder}} \
				</span> \
				<span ng-if="$ctrl.ngModel" class="tw-date-lookup-selected"> \
					<span ng-if="$ctrl.monthBeforeDay">{{$ctrl.monthsOfYear[$ctrl.selectedMonth]}}</span> \
					{{$ctrl.selectedDate}} \
					<span ng-if="!$ctrl.monthBeforeDay">{{$ctrl.monthsOfYear[$ctrl.selectedMonth]}}</span> \
					{{$ctrl.selectedYear}} \
				</span> \
				<span class="caret"></span> \
			</button> \
			<div class="dropdown-menu"> \
				<div ng-if="$ctrl.mode === \'year\'"> \
					<div class="text-xs-center p-t-1 p-b-2"> \
						<div class="pull-xs-left p-b-2"> \
							<a href="" ng-click="$ctrl.setYearOffset($event, -20)" class="text-no-decoration"> \
								<i class="icon icon-left icon-lg"></i> \
							</a> \
						</div> \
						<div class="pull-xs-right p-b-2"> \
							<a href="" ng-click="$ctrl.setYearOffset($event, 20)" class="text-no-decoration"> \
								<i class="icon icon-right icon-lg"></i> \
							</a> \
						</div> \
					</div> \
					<table class="table table-condensed table-bordered table-calendar text-xs-center m-b-0"> \
						<tbody> \
							<tr ng-repeat="row in [0,4,8,12,16]"> \
								<td ng-repeat="col in [0,1,2,3]"> \
									<a href="" \
										ng-click="$ctrl.selectYear($event, $ctrl.year - ($ctrl.year % 20) + row + col + $ctrl.yearOffset)" \
										ng-disabled="$ctrl.isDisabled(1, 0, $ctrl.year - ($ctrl.year % 20) + row + col + $ctrl.yearOffset)" \
										ng-class="{\'table-calendar-selected\': $ctrl.selectedYear === ($ctrl.year - ($ctrl.year % 20) + row + col + $ctrl.yearOffset)}" \
										class="text-no-decoration"> \
										{{$ctrl.year - ($ctrl.year % 20) + row + col + $ctrl.yearOffset}} \
									</a> \
								</td> \
							</tr> \
						</tbody> \
					</table> \
				</div> \
				<div ng-if="$ctrl.mode === \'month\'"> \
					<div class="text-xs-center p-t-1 p-b-2"> \
						<div class="pull-xs-left"> \
							<a href="" ng-click="$ctrl.yearBefore($event)" class="text-no-decoration"> \
								<i class="icon icon-left icon-lg"></i> \
							</a> \
						</div> \
						<a href="" ng-click="$ctrl.switchToYears($event)">{{$ctrl.year}}</a> \
						<div class="pull-xs-right"> \
							<a href="" ng-click="$ctrl.yearAfter($event)" class="text-no-decoration"> \
								<i class="icon icon-right icon-lg"></i> \
							</a> \
						</div> \
					</div> \
					<table class="table table-condensed table-bordered table-calendar text-xs-center m-b-0"> \
						<tbody> \
							<tr ng-repeat="row in [0,4,8]"> \
								<td ng-repeat="col in [0,1,2,3]"> \
									<a href="" \
										ng-click="$ctrl.selectMonth($event, row+col)" \
										ng-disabled="$ctrl.isDisabled(1, row + col, $ctrl.year)" \
										ng-class="{\'table-calendar-selected\': $ctrl.selectedMonth === (row + col) && $ctrl.selectedYear === $ctrl.year}" \
										class="text-no-decoration"> \
										{{$ctrl.shortMonthsOfYear[row+col]}} \
									</a> \
								</td> \
							</tr> \
						</tbody> \
					</table> \
				</div> \
				<div ng-if="$ctrl.mode === \'day\'"> \
					<div class="text-xs-center p-t-1 p-b-2"> \
						<div class="pull-xs-left"> \
							<a href="" ng-click="$ctrl.monthBefore($event)" class="text-no-decoration"> \
								<i class="icon icon-left icon-lg"></i> \
							</a> \
						</div> \
						<a href="" ng-click="$ctrl.switchToYears($event)"> \
							{{$ctrl.monthsOfYear[$ctrl.month]}} {{$ctrl.year}} \
						</a> \
						<div class="pull-xs-right"> \
							<a href="" ng-click="$ctrl.monthAfter($event)" class="text-no-decoration"> \
								<i class="icon icon-right icon-lg"></i> \
							</a> \
						</div> \
					</div> \
					<table class="table table-condensed table-bordered table-calendar text-xs-center m-b-0"> \
						<thead> \
							<tr> \
								<th ng-repeat="day in $ctrl.daysOfWeek track by $index" class="text-xs-center"> \
									<span class="hidden-xs">{{day}}</span> \
									<span class="visible-xs-inline-block">{{$ctrl.shortDaysOfWeek[$index]}}</span> \
								</th> \
							</tr> \
						</thead> \
						<tbody> \
							<tr ng-repeat="week in $ctrl.weeks"> \
								<td ng-repeat="day in week track by $index" \
									ng-class="{ \
										\'table-calendar-weekend\': $index > 4 \
									}"> \
									<a href="" ng-if="day" \
										ng-click="$ctrl.selectDate(day)" \
										ng-disabled="$ctrl.isDisabled(day, $ctrl.month, $ctrl.year)" \
										ng-class="{ \
											\'table-calendar-selected\': $ctrl.isCurrentlySelected(day, $ctrl.month, $ctrl.year) \
										}" \
										class="text-no-decoration" tabindex="0"> \
										{{day}} \
									</a> \
								</td> \
							</tr> \
						</tbody> \
					</table> \
				</div> \
			</div> \
		</div>';
	/*
	<div class="row text-xs-center"> \
		<div class="col-xs-4 m-b-2" ng-repeat="month in $ctrl.monthsOfYear track by $index"> \
			<button class="btn btn-info btn-block btn-sm" \
				ng-click="$ctrl.selectMonth($event, $index)">{{month}}</button> \
		</div> \
	</div> \

	<a href="" ng-click="$ctrl.yearBefore($event)" class="text-no-decoration"> \
		<i class="icon icon-left icon-lg"></i> \
	</a> \

	<a href="" ng-click="$ctrl.yearAfter($event)" class="text-no-decoration"> \
		<i class="icon icon-right icon-lg"></i> \
	</a> \
	*/
	function TwDateLookupController($element, $scope, TwDateService) {
		var $ctrl = this,
			ngModelCtrl,
			minDay, minMonth, minYear,
			maxDay, maxMonth, maxYear;

		function init() {
			$ctrl.mode = 'day';
			$ctrl.yearOffset = 0;

			ngModelCtrl = $element.controller('ngModel');

			$scope.$watch('$ctrl.locale', function(newValue, oldValue) {
				if (newValue && newValue !== oldValue) {
					setLocale(newValue);
				}
			});
			$scope.$watch('$ctrl.ngMin', function(newValue, oldValue) {
				if (newValue && newValue !== oldValue) {
					updateMinDate($ctrl.ngMin);

					// If selected value is less than new min, set to min
					if ($ctrl.ngModel < $ctrl.ngMin) {
						updateModelDate($ctrl.ngMin);
					}
				}
			});
			$scope.$watch('$ctrl.ngMax', function(newValue, oldValue) {
				if (newValue && newValue !== oldValue) {
					updateMaxDate($ctrl.ngMax);

					// If selected value is less than new min, set to min
					if ($ctrl.ngModel > $ctrl.ngMax) {
						updateModelDate($ctrl.ngMax);
					}
				}
			});

			$ctrl.resetToToday();
			setLocale($ctrl.locale);
			updateModelDate($ctrl.ngModel, true); // TODO maybe don't want to update viewModel on this call
			updateMinDate($ctrl.ngMin);
			updateMaxDate($ctrl.ngMax);
			updateCalendar();
		}

		$ctrl.selectDate = function(day) {
			$ctrl.day = day;
			updateModelDate(TwDateService.getUTCDate($ctrl.year, $ctrl.month, day));
		};
		$ctrl.monthBefore = function($event) {
			// Prevent dropdown closing
			$event.stopPropagation();
			if ($ctrl.month === 0) {
				$ctrl.year--;
				$ctrl.month = 11;
			} else {
				$ctrl.month--;
			}
			$ctrl.weeks = getTableStructure();
		};
		$ctrl.yearBefore = function($event) {
			// Prevent dropdown closing
			$event.stopPropagation();
			$ctrl.year--;
			$ctrl.weeks = getTableStructure();
		};
		$ctrl.monthAfter = function($event) {
			// Prevent dropdown closing
			$event.stopPropagation();
			if ($ctrl.month === 11) {
				$ctrl.year++;
				$ctrl.month = 0;
			} else {
				$ctrl.month++;
			}
			$ctrl.weeks = getTableStructure();
		};
		$ctrl.yearAfter = function($event) {
			// Prevent dropdown closing
			$event.stopPropagation();
			$ctrl.year++;
			$ctrl.weeks = getTableStructure();
		};
		$ctrl.resetToToday = function() {
			var now = new Date();

			$ctrl.day = now.getUTCDate();
			$ctrl.month = now.getUTCMonth();
			$ctrl.year = now.getUTCFullYear();

			$ctrl.weeks = getTableStructure();
		};

		$ctrl.isCurrentlySelected = function(day, month, year) {
			return day === $ctrl.selectedDate &&
				month === $ctrl.selectedMonth &&
				year === $ctrl.selectedYear;
		};
		$ctrl.isDisabled = function(day, month, year) {
			return (minYear && year < minYear ||
				(year === minYear && month < minMonth) ||
				(year === minYear && month === minMonth && day < minDay)) ||
				(maxYear && year > maxYear ||
				(year === maxYear && month > maxMonth) ||
				(year === maxYear && month === maxMonth && day > maxDay));
		};

		$ctrl.switchToMonths = function($event) {
			$event.stopPropagation();
			$ctrl.mode = 'month';
		};
		$ctrl.switchToYears = function($event) {
			$event.stopPropagation();
			$ctrl.mode = 'year';
		};
		$ctrl.selectMonth = function($event, month) {
			$event.stopPropagation();
			$ctrl.month = month;
			$ctrl.weeks = getTableStructure();
			$ctrl.mode = 'day';
		};
		$ctrl.selectYear = function($event, year) {
			$event.stopPropagation();
			$ctrl.year = year;
			$ctrl.mode = 'month';
		};
		$ctrl.setYearOffset = function($event, addtionalOffset) {
			$event.stopPropagation();
			$ctrl.yearOffset += addtionalOffset;
		};

		function getTableStructure() {
			var firstDayOfMonth = TwDateService.getWeekday($ctrl.year, $ctrl.month, 1);
			if (firstDayOfMonth === 0) {
				firstDayOfMonth = 7;
			}
			var daysInMonth = TwDateService.getLastDayOfMonth($ctrl.year, $ctrl.month);

			var days = [];
			var weekNumber = 0;
			var week = [];
			var weeks = [];
			// Pad first week
			for (var i=1; i<firstDayOfMonth; i++) {
				week.push(false);
			}
			// Fill in days
			for (i=1; i<=daysInMonth; i++) {
				week.push(i);
				if ((firstDayOfMonth + i - 1) % 7 === 0) {
					weeks.push(week);
					week = [];
				}
			}
			if (week.length) {
				// Pad last week
				for (i=week.length; i<7; i++) {
					week.push(false);
				}
				weeks.push(week);
			}
			return weeks;
		}

		function setLocale(locale) {
			if (!locale) {
				$ctrl.locale = "en-GB";
			}
			$ctrl.monthBeforeDay = TwDateService.isMonthBeforeDay($ctrl.locale);
			$ctrl.monthsOfYear = TwDateService.getMonthNamesForLocale($ctrl.locale, 'long');
			$ctrl.shortMonthsOfYear = TwDateService.getMonthNamesForLocale($ctrl.locale, 'short');
			$ctrl.daysOfWeek = TwDateService.getDayNamesForLocale($ctrl.locale, 'short');
			$ctrl.shortDaysOfWeek = TwDateService.getDayNamesForLocale($ctrl.locale, 'narrow');
		}

		function updateCalendar() {
			$ctrl.weeks = getTableStructure();
		}

		function updateModelDate(modelDate, dontSetVal) {
			if (!dontSetVal) {
				ngModelCtrl.$setViewValue(modelDate);
			}
			if (modelDate && modelDate.getUTCDate) {
				$ctrl.selectedDate = modelDate.getUTCDate();
				$ctrl.selectedMonth = modelDate.getUTCMonth();
				$ctrl.selectedYear = modelDate.getUTCFullYear();
			} else {
				$ctrl.selectedDate = null;
				$ctrl.selectedMonth = null;
				$ctrl.selectedYear = null;
			}
		}

		function updateMinDate(minDate) {
			if (minDate && minDate.getUTCDate) {
				minDay = minDate.getUTCDate();
				minMonth = minDate.getUTCMonth();
				minYear = minDate.getUTCFullYear();
			} else {
				minDay = null;
				minMonth = null;
				minYear = null;
			}
		}

		function updateMaxDate(maxDate) {
			if (maxDate && maxDate.getUTCDate) {
				maxDay = maxDate.getUTCDate();
				maxMonth = maxDate.getUTCMonth();
				maxYear = maxDate.getUTCFullYear();
			} else {
				maxDay = null;
				maxMonth = null;
				maxYear = null;
			}
		}

		// Keydown as keypress did not work in chrome/safari
		$ctrl.keyHandler = function(event) {
			var characterCode = event.which || event.charCode || event.keyCode;
			if (!$ctrl.ngModel) {
				$ctrl.resetToToday();
				updateModelDate(
					TwDateService.getUTCDate($ctrl.year, $ctrl.month, $ctrl.day)
				);
				//$ctrl.weeks = getTableStructure();
				return; // TODO
			}

			if (characterCode === 37) { // Left arrow key
				moveLeft();
				event.preventDefault(); // Prevent cursor jumping in input
			} else if (characterCode === 38) { // Up arrow key
				moveUp();
				event.preventDefault(); // Prevent cursor jumping in input
			} else if (characterCode === 39) { // Right arrow key
				moveRight();
				event.preventDefault(); // Prevent cursor jumping in input
			} else if (characterCode === 40) { // Down arrow key
				moveDown();
				event.preventDefault(); // Prevent cursor jumping around in input
			}
			return true;
		};

		function moveUp() {
			// subtract 7 days
			updateModelDate(TwDateService.addDays($ctrl.ngModel, -7));
			// TODO Update month if necessary
			//$ctrl.weeks = getTableStructure();
		}
		function moveDown() {
			// add 7 days
			updateModelDate(TwDateService.addDays($ctrl.ngModel, 7));
			//$ctrl.weeks = getTableStructure();
		}
		function moveLeft() {
			// subtract 1 day
			updateModelDate(TwDateService.addDays($ctrl.ngModel, -1));
			//$ctrl.weeks = getTableStructure();
		}
		function moveRight() {
			// add 1 day
			updateModelDate(TwDateService.addDays($ctrl.ngModel, 1));
			//$ctrl.weeks = getTableStructure();
		}

		init();
	}

})(window.angular);
