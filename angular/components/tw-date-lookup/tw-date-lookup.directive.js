(function(angular) {
	'use strict';

	angular
		.module('tw.form-components')
		.directive('twDateLookup', TwDateLookupDirective);

	function TwDateLookupDirective() {
		return {
			require: 'ngModel',
			bindToController: true,
			controller: ['$element', '$scope', '$timeout', 'TwDateService', TwDateLookupController],
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
		<div class="btn-group btn-block dropdown" \
			ng-keydown="$ctrl.keyHandler($event)"> \
			s: {{$ctrl.selectedDate}}/{{$ctrl.selectedMonth + 1}}/{{$ctrl.selectedYear}} \
			v: {{$ctrl.day}}/{{$ctrl.month + 1}}/{{$ctrl.year}} \
			<button class="btn btn-input dropdown-toggle tw-date-lookup-button" data-toggle="dropdown" \
				ng-disabled="$ctrl.ngDisabled" \
				ng-click="$ctrl.openLookup()" \
				ng-class="{ \
					\'btn-sm\': $ctrl.size === \'sm\', \
					\'btn-lg\': $ctrl.size === \'lg\' \
				}"> \
				<span ng-if="!$ctrl.ngModel" class="form-control-placeholder tw-date-lookup-placeholder"> \
					{{$ctrl.placeholder}} \
				</span> \
				<span ng-if="$ctrl.ngModel" class="tw-date-lookup-selected"> \
					<span ng-if="$ctrl.monthBeforeDay">{{$ctrl.monthsOfYear[$ctrl.selectedMonth]}}</span> \
					{{$ctrl.selectedDate}}<span ng-if="$ctrl.monthBeforeDay">,</span> \
					<span ng-if="!$ctrl.monthBeforeDay">{{$ctrl.monthsOfYear[$ctrl.selectedMonth]}}</span> \
					{{$ctrl.selectedYear}} \
				</span> \
				<span class="caret"></span> \
			</button> \
			<div class="dropdown-menu"> \
				\
				<div ng-if="$ctrl.mode === \'year\'" class="tw-date-lookup-years"> \
					<div class="text-xs-center p-t-1 p-b-2"> \
						<div class="pull-xs-left p-b-2"> \
							<a href="" ng-click="$ctrl.setYearOffset($event, -20)" \
								class="text-no-decoration tw-date-lookup-previous-years"> \
								<i class="icon icon-left icon-lg"></i> \
							</a> \
						</div> \
						<div class="pull-xs-right p-b-2"> \
							<a href="" ng-click="$ctrl.setYearOffset($event, 20)" \
								class="text-no-decoration tw-date-lookup-next-years"> \
								<i class="icon icon-right icon-lg"></i> \
							</a> \
						</div> \
					</div> \
					<table class="table table-condensed table-bordered table-calendar m-b-0"> \
						<tbody> \
							<tr ng-repeat="row in [0,4,8,12,16]"> \
								<td ng-repeat="col in [0,1,2,3]"> \
									<a href="" \
										ng-click="$ctrl.selectYear($event, $ctrl.year - ($ctrl.year % 20) + row + col + $ctrl.yearOffset)" \
										ng-disabled="$ctrl.isYearDisabled($ctrl.year - ($ctrl.year % 20) + row + col + $ctrl.yearOffset)" \
										ng-class="{\'active\': $ctrl.selectedYear === ($ctrl.year - ($ctrl.year % 20) + row + col + $ctrl.yearOffset)}" \
										class="tw-date-lookup-year-option"> \
										{{$ctrl.year - ($ctrl.year % 20) + row + col + $ctrl.yearOffset}} \
									</a> \
								</td> \
							</tr> \
						</tbody> \
					</table> \
				</div> \
				\
				<div ng-if="$ctrl.mode === \'month\'" class="tw-date-lookup-months"> \
					<div class="text-xs-center p-t-1 p-b-2"> \
						<div class="pull-xs-left"> \
							<a href="" ng-click="$ctrl.yearBefore($event)" class="text-no-decoration"> \
								<i class="icon icon-left icon-lg"></i> \
							</a> \
						</div> \
						<a href="" ng-click="$ctrl.switchToYears($event)" \
							class="tw-date-lookup-year-label"> \
							{{$ctrl.year}} \
						</a> \
						<div class="pull-xs-right"> \
							<a href="" ng-click="$ctrl.yearAfter($event)" class="text-no-decoration"> \
								<i class="icon icon-right icon-lg"></i> \
							</a> \
						</div> \
					</div> \
					<table class="table table-condensed table-bordered table-calendar m-b-0"> \
						<tbody> \
							<tr ng-repeat="row in [0,4,8]"> \
								<td ng-repeat="col in [0,1,2,3]"> \
									<a href="" \
										ng-click="$ctrl.selectMonth($event, row+col, $ctrl.year)" \
										ng-disabled="$ctrl.isMonthDisabled(row + col, $ctrl.year)" \
										ng-class="{\'active\': $ctrl.selectedMonth === (row + col) && $ctrl.selectedYear === $ctrl.year}" \
										class="tw-date-lookup-month-option"> \
										{{$ctrl.shortMonthsOfYear[row+col] | limitTo:5}} \
									</a> \
								</td> \
							</tr> \
						</tbody> \
					</table> \
				</div> \
				\
				<div ng-if="$ctrl.mode === \'day\'" class="tw-date-lookup-days"> \
					<div class="text-xs-center p-t-1 p-b-2"> \
						<div class="pull-xs-left"> \
							<a href="" ng-click="$ctrl.monthBefore($event)" \
								class="text-no-decoration tw-date-lookup-previous-month"> \
								<i class="icon icon-left icon-lg"></i> \
							</a> \
						</div> \
						<a href="" ng-click="$ctrl.switchToYears($event)" \
							class="tw-date-lookup-month-label"> \
							{{$ctrl.monthsOfYear[$ctrl.month]}} {{$ctrl.year}} \
						</a> \
						<div class="pull-xs-right"> \
							<a href="" ng-click="$ctrl.monthAfter($event)" \
								class="text-no-decoration tw-date-lookup-next-month"> \
								<i class="icon icon-right icon-lg"></i> \
							</a> \
						</div> \
					</div> \
					<table class="table table-condensed table-bordered table-calendar m-b-0"> \
						<thead> \
							<tr> \
								<th ng-repeat="day in $ctrl.daysOfWeek track by $index"> \
									<span class="hidden-xs">{{day | limitTo : 3}}</span> \
									<span class="visible-xs-inline-block">{{$ctrl.shortDaysOfWeek[$index] | limitTo : 2}}</span> \
								</th> \
							</tr> \
						</thead> \
						<tbody> \
							<tr ng-repeat="week in $ctrl.weeks"> \
								<td ng-repeat="day in week track by $index" \
									ng-class="{ \
										\'default\': $index > 4 \
									}"> \
									<a href="" title="{{day}} {{$ctrl.monthsOfYear[$ctrl.month]}} {{$ctrl.year}}" \
										ng-if="day" \
										ng-click="$ctrl.selectDay($event, day, $ctrl.month, $ctrl.year)" \
										ng-disabled="$ctrl.isDayDisabled(day, $ctrl.month, $ctrl.year)" \
										ng-class="{ \
											\'active\': $ctrl.isCurrentlySelected(day, $ctrl.month, $ctrl.year) \
										}" \
										class="tw-date-lookup-day-option" tabindex="0"> \
										{{day}} \
									</a> \
								</td> \
							</tr> \
						</tbody> \
					</table> \
				</div> \
			</div> \
		</div>';

	function TwDateLookupController($element, $scope, $timeout, TwDateService) {
		var $ctrl = this,
			ngModelCtrl,
			minDay, minMonth, minYear,
			maxDay, maxMonth, maxYear;

		function init() {
			$ctrl.yearOffset = 0;

			ngModelCtrl = $element.controller('ngModel');

			ngModelCtrl.$validators.required = function(value) {
				return !($ctrl.ngRequired && !$ctrl.ngModel);
			};
			ngModelCtrl.$validators.min = function(value) {
				return !$ctrl.ngMin || !$ctrl.ngModel || $ctrl.ngModel >= $ctrl.ngMin;
			};
			ngModelCtrl.$validators.max = function(value) {
				return !$ctrl.ngMax || !$ctrl.ngModel || $ctrl.ngModel <= $ctrl.ngMax;
			};

			$scope.$watch('$ctrl.locale', function(newValue, oldValue) {
				if (newValue && newValue !== oldValue) {
					setLocale(newValue);
				}
			});
			$scope.$watch('$ctrl.ngModel', function(newValue, oldValue) {
				if (newValue && newValue !== oldValue) {
					ngModelCtrl.$setDirty();
					ngModelCtrl.$setTouched();
					updateModelDate(newValue, true);
				}
			});
			$scope.$watch('$ctrl.ngRequired', function(newValue, oldValue) {
				if (newValue && newValue !== oldValue) {
					ngModelCtrl.$validate();
				}
			});
			$scope.$watch('$ctrl.ngMin', function(newValue, oldValue) {
				if (newValue !== oldValue) {
					updateMinDate($ctrl.ngMin);

					// If selected value is less than new min, set to min TODO?
					if ($ctrl.ngModel < $ctrl.ngMin) {
						updateModelDate(null);
					}
					ngModelCtrl.$validate();
				}
			});
			$scope.$watch('$ctrl.ngMax', function(newValue, oldValue) {
				if (newValue !== oldValue) {
					updateMaxDate($ctrl.ngMax);

					// If selected value is less than new min, set to min TODO?
					if ($ctrl.ngModel > $ctrl.ngMax) {
						updateModelDate(null);
					}
					ngModelCtrl.$validate();
				}
			});

			if ($ctrl.ngModel && $ctrl.ngModel.getUTCDate) {
				$ctrl.day = $ctrl.ngModel.getUTCDate();
				$ctrl.month = $ctrl.ngModel.getUTCMonth();
				$ctrl.year = $ctrl.ngModel.getUTCFullYear();
			} else {
				$ctrl.resetDate();
			}
			setLocale($ctrl.locale);
			updateModelDate($ctrl.ngModel, true); // Don't want to update viewModel on this call
			updateMinDate($ctrl.ngMin);
			updateMaxDate($ctrl.ngMax);
			ngModelCtrl.$validate();

			$ctrl.weeks = getTableStructure();
		}

		$ctrl.openLookup = function() {
			ngModelCtrl.$setTouched();
			$ctrl.mode = 'day';
			if ($ctrl.ngModel && $ctrl.ngModel.getUTCDate) {
				// Change view to selected month
				$ctrl.day = $ctrl.ngModel.getUTCDate();
				$ctrl.month = $ctrl.ngModel.getUTCMonth();
				$ctrl.year = $ctrl.ngModel.getUTCFullYear();
			} else {
				$ctrl.resetDate();
			}
			$timeout(function () {
				$element.find('.tw-date-lookup-month-label').focus();
			});
		};

		$ctrl.selectDay = function($event, day, month, year) {
			if ($ctrl.isDayDisabled(day, month, year)) {
				// Don't close dropdown
				$event.stopPropagation();
				return;
			}
			$ctrl.day = day;
			updateModelDate(TwDateService.getUTCDate(year, month, day));
			resetFocus();
		};
		$ctrl.selectMonth = function($event, month, year) {
			$event.stopPropagation();
			if ($ctrl.isMonthDisabled(month, year)) {
				return;
			}
			$ctrl.month = month;
			$ctrl.weeks = getTableStructure();
			$ctrl.mode = 'day';
		};
		$ctrl.selectYear = function($event, year) {
			$event.stopPropagation();
			if ($ctrl.isYearDisabled(year)) {
				return;
			}
			$ctrl.year = year;
			$ctrl.mode = 'month';
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
		$ctrl.resetDate = function() {
			var focalDate = new Date();
			focalDate = moveDateToWithinRange(focalDate, $ctrl.ngMin, $ctrl.ngMax);

			$ctrl.day = focalDate.getUTCDate();
			$ctrl.month = focalDate.getUTCMonth();
			$ctrl.year = focalDate.getUTCFullYear();

			$ctrl.selectedDate = $ctrl.day;
			$ctrl.selectedMonth = $ctrl.month;
			$ctrl.selectedYear = $ctrl.year;

			$ctrl.weeks = getTableStructure();
		};

		$ctrl.isCurrentlySelected = function(day, month, year) {
			return day === $ctrl.selectedDate &&
				month === $ctrl.selectedMonth &&
				year === $ctrl.selectedYear;
		};
		$ctrl.isDayDisabled = function(day, month, year) {
			return $ctrl.isYearDisabled(year) ||
				$ctrl.isMonthDisabled(month, year) ||
				(year === minYear && month === minMonth && day < minDay) ||
				(year === maxYear && month === maxMonth && day > maxDay);
		};
		$ctrl.isMonthDisabled = function(month, year) {
			return $ctrl.isYearDisabled(year) ||
				(year === minYear && month < minMonth) ||
				(year === maxYear && month > maxMonth);
		};
		$ctrl.isYearDisabled = function(year) {
			return (minYear && year < minYear) || (maxYear && year > maxYear);
		};

		$ctrl.switchToMonths = function($event) {
			resetFocus($event.target);
			findActiveLink();
			$event.stopPropagation();
			$ctrl.mode = 'month';
		};
		$ctrl.switchToYears = function($event) {
			resetFocus($event.target);
			findActiveLink();
			$event.stopPropagation();
			$ctrl.mode = 'year';
		};
		$ctrl.setYearOffset = function($event, addtionalOffset) {
			$event.stopPropagation();
			$ctrl.yearOffset += addtionalOffset;
		};

		function resetFocus() {
			// TODO remove jquery dependency
			$element.find('button').focus();
		}

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

		function moveDateToWithinRange(date, min, max) {
			if (min && min > date) {
				return min;
			}
			if (max && max < date) {
				return max;
			}
			return date;
		}

		function updateModelDate(modelDate, dontSetVal) {
			modelDate = moveDateToWithinRange(modelDate, $ctrl.ngMin, $ctrl.ngMax);

			if (!dontSetVal) {
				ngModelCtrl.$setViewValue(modelDate);
				ngModelCtrl.$setDirty();
				ngModelCtrl.$setTouched();
			} else {
				ngModelCtrl.$validate();
			}

			if (modelDate && modelDate.getUTCDate) {
				$ctrl.selectedDate = modelDate.getUTCDate();
				$ctrl.selectedMonth = modelDate.getUTCMonth();
				$ctrl.selectedYear = modelDate.getUTCFullYear();

				if ($ctrl.selectedMonth !== $ctrl.month || $ctrl.selectedYear !== $ctrl.year) {
					$ctrl.month = $ctrl.selectedMonth;
					$ctrl.year = $ctrl.selectedYear;
					$ctrl.weeks = getTableStructure();
				}
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
				$ctrl.resetDate();
				updateModelDate(
					TwDateService.getUTCDate($ctrl.year, $ctrl.month, $ctrl.day)
				);
				return;
			}

			if (characterCode === 37) { // Left arrow key
				moveLeft($ctrl.mode);
			} else if (characterCode === 38) { // Up arrow key
				moveUp($ctrl.mode);
			} else if (characterCode === 39) { // Right arrow key
				moveRight($ctrl.mode);
			} else if (characterCode === 40) { // Down arrow key
				moveDown($ctrl.mode);
			}

			findActiveLink();

			return true;
		};

		function findActiveLink() {
			// Perform after current digest
			$timeout(function () {
				$element.find('a.active').focus();
			});
		}

		function moveUp(mode) {
			adjustDate(mode, $ctrl.ngModel, -7, -4, -4);
		}
		function moveDown(mode) {
			adjustDate(mode, $ctrl.ngModel, 7, 4, 4);
		}
		function moveLeft(mode) {
			adjustDate(mode, $ctrl.ngModel, -1, -1, -1);
		}
		function moveRight(mode) {
			adjustDate(mode, $ctrl.ngModel, 1, 1, 1);
		}

		function adjustDate(mode, date, days, months, years) {
			var newDate;
			if (mode === 'day') {
				newDate = TwDateService.addDays(date, days);
			}
			if (mode === 'month') {
				newDate = TwDateService.addMonths(date, months);
			}
			if (mode === 'year') {
				newDate = TwDateService.addYears(date, years);
			}
			updateModelDate(newDate);
		}

		init();
	}

})(window.angular);
