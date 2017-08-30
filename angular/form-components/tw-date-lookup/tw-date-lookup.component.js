
  const TwDateLookup = {
    require: 'ngModel',
    controller: TwDateLookupController,
    bindings: {
      ngModel: '=',
      ngChange: '&',
      ngMin: '=',
      ngMax: '=',
      ngRequired: '=',
      ngDisabled: '=',
      placeholder: '@',
      size: '@',
      locale: '@',
      label: '@',
      shortDate: '<'
    },
    template: ' \
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
        <span ng-if="!$ctrl.ngModel" \
          class="form-control-placeholder tw-date-lookup-placeholder"> \
          {{$ctrl.placeholder}} \
        </span> \
        <span ng-if="$ctrl.label && $ctrl.ngModel" \
          class="control-label small m-r-1" style="font-size: 14px;" \
          >{{$ctrl.label}}</span \
        ><span ng-if="$ctrl.ngModel" class="tw-date-lookup-selected">\
          {{$ctrl.selectedDateFormatted}}\
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
              {{$ctrl.yearMonthFormatted}} \
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
    </div>'
  };

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

      ngModelCtrl.$formatters.push(function(newDate) {
        updateCalendarView(newDate);
        return newDate;
      });

      $element.find('.btn, .dropdown-menu').on('focusout', function() {
        $timeout(function() {
          // If button isn't focused and dropdown not open, then blur
          if ($element.find('.btn:focus').length === 0 &&
            !$element.find('.btn-group').hasClass('open')) {
            // TODO remove jquery dependency
            $element.parents('.form-group').removeClass('focus');
            // jqLite supprts triggerHandler
            $element.triggerHandler('blur');
          }
        }, 150);   // need timeout because using dropdown.js,
      });

      setLocale($ctrl.locale);

      updateMinDateView($ctrl.ngMin);
      updateMaxDateView($ctrl.ngMax);
    }

    $ctrl.openLookup = function() {
      ngModelCtrl.$setTouched();
      $ctrl.mode = 'day';

      var viewDate = $ctrl.ngModel;
      if ($ctrl.ngMin && $ctrl.ngModel < $ctrl.ngMin) {
        viewDate = $ctrl.ngMin;
      }
      if ($ctrl.ngMax && $ctrl.ngModel > $ctrl.ngMax) {
        viewDate = $ctrl.ngMax;
      }
      updateCalendarView(viewDate);

      $timeout(function () {
        $element.find('.tw-date-lookup-month-label').focus();
      });
    };

    $ctrl.selectDay = function($event, day, month, year) {
      if ($ctrl.isDayDisabled(day, month, year)) {
        // Don't close dropdown, don't set model
        $event.stopPropagation();
        return;
      }
      $ctrl.day = day;
      // Always set model to UTC dates
      setModel(TwDateService.getUTCDateFromParts(year, month, day));
      resetFocus();
      updateCalendarDatePresentation();
    };

    $ctrl.selectMonth = function($event, month, year) {
      $event.stopPropagation();
      if ($ctrl.isMonthDisabled(month, year)) {
        return;
      }
      $ctrl.month = month;
      $ctrl.weeks = getTableStructure();
      $ctrl.mode = 'day';
      updateCalendarDatePresentation();
    };

    $ctrl.selectYear = function($event, year) {
      $event.stopPropagation();
      if ($ctrl.isYearDisabled(year)) {
        return;
      }
      $ctrl.year = year;
      $ctrl.mode = 'month';
      updateCalendarDatePresentation();
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
      updateCalendarDatePresentation();
    };

    $ctrl.yearBefore = function($event) {
      // Prevent dropdown closing
      $event.stopPropagation();
      $ctrl.year--;
      $ctrl.weeks = getTableStructure();
      updateCalendarDatePresentation();
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
      updateCalendarDatePresentation();
    };

    $ctrl.yearAfter = function($event) {
      // Prevent dropdown closing
      $event.stopPropagation();
      $ctrl.year++;
      $ctrl.weeks = getTableStructure();
      updateCalendarDatePresentation();
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
      // TODO remove jquery dependency
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
          // TODO remove jquery dependency
          $element.parents('.form-group').addClass('has-error');
          return false;
        }
        return true;
      };
      ngModelCtrl.$validators.max = function(modelValue, viewValue) {
        var value = modelValue || viewValue;
        if (value && value > $ctrl.ngMax) {
          // TODO remove jquery dependency
          $element.parents('.form-group').addClass('has-error');
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

      $scope.$watch('$ctrl.ngRequired', function(newValue, oldValue) {
        ngModelCtrl.$validate();
      });

      $scope.$watch('$ctrl.ngMin', function(newValue, oldValue) {
        if (newValue !== oldValue) {
          updateMinDateView($ctrl.ngMin);
          ngModelCtrl.$validate();
        }
      });

      $scope.$watch('$ctrl.shortDate', function(newValue, oldValue) {
        updateSelectedDatePresentation();
      });

      $scope.$watch('$ctrl.ngMax', function(newValue, oldValue) {
        if (newValue !== oldValue) {
          updateMaxDateView($ctrl.ngMax);
          ngModelCtrl.$validate();
        }
      });

      $scope.$watch('$ctrl.ngModel', function(newValue, oldValue) {
        if (newValue) {
          $ctrl.selectedDate = TwDateService.getUTCDate(newValue);
          $ctrl.selectedMonth = TwDateService.getUTCMonth(newValue);
          $ctrl.selectedYear = TwDateService.getUTCFullYear(newValue);
          updateSelectedDatePresentation();
        }
      });
    }

    function updateCalendarView(viewDate) {
      if (!viewDate || !viewDate.getUTCDate) {
        // We want user's 'today' in UTC
        viewDate = TwDateService.getLocaleToday();
      }

      // Provided dates should use UTC
      $ctrl.day = TwDateService.getUTCDate(viewDate);
      $ctrl.month = TwDateService.getUTCMonth(viewDate);
      $ctrl.year = TwDateService.getUTCFullYear(viewDate);

      $ctrl.weeks = getTableStructure();

      updateCalendarDatePresentation();
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
      updateSelectedDatePresentation();
    }

    function updateSelectedDatePresentation(){
      var monthsOfYear = $ctrl.shortDate ? $ctrl.shortMonthsOfYear : $ctrl.monthsOfYear;

      $ctrl.selectedDateFormatted = TwDateService.getYearMonthDatePresentation($ctrl.selectedYear,
                                          monthsOfYear[$ctrl.selectedMonth],
                                          $ctrl.selectedDate,
                                          $ctrl.locale);
    }

    function updateCalendarDatePresentation(){
      $ctrl.yearMonthFormatted = TwDateService.getYearAndMonthPresentation($ctrl.year,
                                                                                $ctrl.monthsOfYear[$ctrl.month],
                                                                                $ctrl.locale);
    }

    function moveDateToWithinRange(date, min, max) {
      if (!date) {
        date = TwDateService.getLocaleToday();
      }
      if (min && min > date) {
        return min;
      }
      if (max && max < date) {
        return max;
      }
      return date;
    }

    function setModel(modelDate) {
      modelDate = moveDateToWithinRange(modelDate, $ctrl.ngMin, $ctrl.ngMax);
      ngModelCtrl.$setViewValue(modelDate);
      ngModelCtrl.$setDirty();

      updateCalendarView(modelDate);
    }

    function updateMinDateView(minDate) {
      if (minDate && minDate.getUTCDate) {
        minDay = TwDateService.getUTCDate(minDate);
        minMonth = TwDateService.getUTCMonth(minDate);
        minYear = TwDateService.getUTCFullYear(minDate);
      } else {
        minDay = null;
        minMonth = null;
        minYear = null;
      }
    }

    function updateMaxDateView(maxDate) {
      if (maxDate && maxDate.getUTCDate) {
        maxDay = TwDateService.getUTCDate(maxDate);
        maxMonth = TwDateService.getUTCMonth(maxDate);
        maxYear = TwDateService.getUTCFullYear(maxDate);
      } else {
        maxDay = null;
        maxMonth = null;
        maxYear = null;
      }
    }

    // Keydown as keypress did not work in chrome/safari
    $ctrl.keyHandler = function(event) {
      if (!$ctrl.ngModel) {
        setModel(
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
      setModel(newDate);
    }

    init();
  }

  TwDateLookupController.$inject = [
    '$element',
    '$scope',
    '$timeout',
    'TwDateService'
  ];

  export default angular
    .module('tw.styleguide.forms.date-lookup', [])
    .component('twDateLookup', TwDateLookup).name;
