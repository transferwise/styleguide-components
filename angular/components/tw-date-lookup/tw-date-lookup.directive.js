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
			<button class="btn btn-input dropdown-toggle tw-date-lookup-button" data-toggle="dropdown" \
				ng-disabled="$ctrl.ngDisabled" \
				ng-click="$ctrl.openLookup()" \
				ng-focus="$ctrl.buttonFocus()" \
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
			<div class="dropdown-menu" style="min-width: 300px;"> \
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

			addValidators();
			addWatchers();

			$element.find('.btn, .dropdown-menu').on('focusout', function() {
				$timeout(function() {
					// If button isn't focused and dropdown not open, blur
					if ($element.find('.btn:focus').length === 0 &&
						!$element.find('.btn-group').hasClass('open')) {
						// TODO remove jquery dependency
						$element.parents('.form-group').removeClass('focus');
						// jqLite supprts triggerHandler
						$element.triggerHandler('blur');
					}
				}, 150); 	// need timeout because using dropdown.js,
			});


			$ctrl.resetView($ctrl.ngModel);
			setLocale($ctrl.locale);
			 // Don't update viewModel on this call
			updateModelDate($ctrl.ngModel, true);
			updateMinDate($ctrl.ngMin);
			updateMaxDate($ctrl.ngMax);
			ngModelCtrl.$validate();

			$ctrl.weeks = getTableStructure();
		}

		$ctrl.openLookup = function() {
			ngModelCtrl.$setTouched();
			$ctrl.mode = 'day';
			$ctrl.resetView($ctrl.ngModel);

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
			// Always set model to UTC dates
			updateModelDate(TwDateService.getUTCDateFromParts(year, month, day));
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
		$ctrl.resetView = function(focalDate) {
			var reset = false, rangeDate;
			if (!focalDate || !focalDate.getUTCDate) {
				// We want date in user's timezone, not UTC
				focalDate = TwDateService.now();
				reset = true;
			}
			rangeDate = moveDateToWithinRange(focalDate, $ctrl.ngMin, $ctrl.ngMax);

			if (reset && rangeDate === focalDate) {
				// If showing today's date (& we didn't adjust it) we want user's timezone
				$ctrl.day = TwDateService.getLocaleDate(focalDate);
				$ctrl.month = TwDateService.getLocaleMonth(focalDate);
				$ctrl.year = TwDateService.getLocaleFullYear(focalDate);
			} else {
				// If showing a provided date we should use UTC
				$ctrl.day = TwDateService.getUTCDate(rangeDate);
				$ctrl.month = TwDateService.getUTCMonth(rangeDate);
				$ctrl.year = TwDateService.getUTCFullYear(rangeDate);
			}

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

		$ctrl.buttonFocus = function() {
			// remove jquery dependency
			$element.parents('.form-group').addClass('focus');
			// jqLite supports triggerHandler
			$element.triggerHandler('focus');
		};
		$ctrl.blur = function() {
			// jqLite supports triggerHandler
			$element.triggerHandler('focus');
		};

		function resetFocus() {
			// jqLite supports find by tag name
			$element.find('button').focus();
		}

		function addValidators() {
			ngModelCtrl.$validators.min = function(modelValue, viewValue) {
				var value = modelValue || viewValue;
				if (value && value < $ctrl.ngMin) {
					unsetModel();
					return false;
				}
				return true;
			};
			ngModelCtrl.$validators.max = function(modelValue, viewValue) {
				var value = modelValue || viewValue;
				if (value && value > $ctrl.ngMax) {
					unsetModel();
					return false;
				}
				return true;
			};
		}

		function addWatchers() {
			$scope.$watch('$ctrl.locale', function(newValue, oldValue) {
				if (newValue && newValue !== oldValue) {
					setLocale(newValue);
				}
			});
			$scope.$watch('$ctrl.ngModel', function(newValue, oldValue) {
				if (newValue && newValue !== oldValue) {
					updateModelDate(newValue, true);
				}
			});
			$scope.$watch('$ctrl.ngRequired', function(newValue, oldValue) {
				ngModelCtrl.$validate();
			});
			$scope.$watch('$ctrl.ngMin', function(newValue, oldValue) {
				if (newValue !== oldValue) {
					updateMinDate($ctrl.ngMin);

					if ($ctrl.ngModel < $ctrl.ngMin) {
						unsetModel();
					}
				}
			});
			$scope.$watch('$ctrl.ngMax', function(newValue, oldValue) {
				if (newValue !== oldValue) {
					updateMaxDate($ctrl.ngMax);

					if ($ctrl.ngModel > $ctrl.ngMax) {
						unsetModel();
					}
				}
			});
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

		function unsetModel() {
			ngModelCtrl.$setViewValue(null);
			$ctrl.resetView();
			ngModelCtrl.$setDirty();
			ngModelCtrl.$setTouched();
		}

		function updateModelDate(modelDate, dontSetVal) {
			if (modelDate) {
				modelDate = moveDateToWithinRange(modelDate, $ctrl.ngMin, $ctrl.ngMax);
			}

			if (!dontSetVal) {
				ngModelCtrl.$setViewValue(modelDate);
				ngModelCtrl.$setDirty();
				ngModelCtrl.$setTouched();
			} else {
				ngModelCtrl.$validate();
			}

			$ctrl.resetView(modelDate);
		}

		function updateMinDate(minDate) {
			if (minDate && minDate.getUTCDate) {
				// If supplied UTC date, timezoneless function is fine
				// If supplied timzeone date, we want to resepct it.
				minDay = minDate.getDate(); 				// minDate.getUTCDate();
				minMonth = minDate.getMonth(); 			// minDate.getUTCMonth();
				minYear = minDate.getFullYear();		// minDate.getUTCFullYear();
			} else {
				minDay = null;
				minMonth = null;
				minYear = null;
			}
		}

		function updateMaxDate(maxDate) {
			if (maxDate && maxDate.getUTCDate) {
				maxDay = maxDate.getDate();  				// maxDate.getUTCDate();
				maxMonth = maxDate.getMonth();			// maxDate.getUTCMonth();
				maxYear = maxDate.getFullYear();		// maxDate.getUTCFullYear();
			} else {
				maxDay = null;
				maxMonth = null;
				maxYear = null;
			}
		}

		// Keydown as keypress did not work in chrome/safari
		$ctrl.keyHandler = function(event) {
			if (!$ctrl.ngModel) {
				updateModelDate(
					// Always set model to UTC dates
					TwDateService.getUTCDateFromParts($ctrl.year, $ctrl.month, $ctrl.day)
				);
				return;
			}

			var characterCode = event.which || event.charCode || event.keyCode;

			if (characterCode === 37) { // Left arrow key
				adjustDate($ctrl.mode, $ctrl.ngModel, -1, -1, -1);
			} else if (characterCode === 38) { // Up arrow key
				event.preventDefault(); // Prevent browser scroll
				adjustDate($ctrl.mode, $ctrl.ngModel, -7, -4, -4);
			} else if (characterCode === 39) { // Right arrow key
				adjustDate($ctrl.mode, $ctrl.ngModel, 1, 1, 1);
			} else if (characterCode === 40) { // Down arrow key
				event.preventDefault(); // Prevent browser scroll
				adjustDate($ctrl.mode, $ctrl.ngModel, 7, 4, 4);
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

		function adjustDate(mode, date, days, months, years) {
			var newDate = date;
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
