
class DateLookupController {
  constructor($element, $scope, $timeout, TwDateService, TwDomService) {
    const $ngModel = $element.controller('ngModel');

    this.DateService = TwDateService;
    this.$element = $element;
    this.element = $element[0];
    this.$timeout = $timeout;
    this.yearOffset = 0;

    this.addValidators($ngModel, $element);
    this.addWatchers($scope, $ngModel);

    $ngModel.$formatters.push((newDate) => {
      this.updateCalendarView(newDate);
      return newDate;
    });

    this.formGroup = TwDomService.getClosestParentByClassName(this.element, 'form-group');

    const button = this.element.getElementsByClassName('btn')[0];
    const buttonGroup = this.element.getElementsByClassName('btn-group')[0];
    const dropdown = this.element.getElementsByClassName('dropdown-menu')[0];

    const onFocusOut = () => {
      $timeout(() => {
        // If button isn't focused and dropdown not open, then blur
        if (button !== document.activeElement
          && !buttonGroup.classList.contains('open')) {
          if (this.formGroup) {
            this.formGroup.classList.remove('focus');
          }
          this.element.dispatchEvent(new CustomEvent('blur'));
        }
      }, 150); // need timeout because using dropdown.js,
    };

    button.addEventListener('focusout', onFocusOut);
    dropdown.addEventListener('focusout', onFocusOut);

    this.setLocale(this.locale);

    this.updateMinDateView(this.ngMin);
    this.updateMaxDateView(this.ngMax);

    this.button = button;
  }

  openLookup() {
    this.$ngModel.$setTouched();
    this.mode = 'day';

    let viewDate = this.ngModel;
    if (this.ngMin && this.ngModel < this.ngMin) {
      viewDate = this.ngMin;
    }
    if (this.ngMax && this.ngModel > this.ngMax) {
      viewDate = this.ngMax;
    }
    this.updateCalendarView(viewDate);

    this.$timeout(() => {
      const monthLabel = this.element.getElementsByClassName('tw-date-lookup-month-label')[0];
      monthLabel.focus();
    });
  }

  selectDay($event, day, month, year) {
    if (this.isDayDisabled(day, month, year)) {
      // Don't close dropdown, don't set model
      $event.stopPropagation();
      return;
    }
    this.day = day;
    // Always set model to UTC dates
    this.setModel(this.DateService.getUTCDateFromParts(year, month, day));
    resetFocus(this.element);
    this.updateCalendarDatePresentation();
  }

  selectMonth($event, month, year) {
    $event.stopPropagation();
    if (this.isMonthDisabled(month, year)) {
      return;
    }
    this.month = month;
    this.weeks = this.getTableStructure();
    this.mode = 'day';
    this.updateCalendarDatePresentation();
  }

  selectYear($event, year) {
    $event.stopPropagation();
    if (this.isYearDisabled(year)) {
      return;
    }
    this.year = year;
    this.mode = 'month';
    this.updateCalendarDatePresentation();
  }

  monthBefore($event) {
    // Prevent dropdown closing
    $event.stopPropagation();
    if (this.month === 0) {
      this.year--;
      this.month = 11;
    } else {
      this.month--;
    }
    this.weeks = this.getTableStructure();
    this.updateCalendarDatePresentation();
  }

  yearBefore($event) {
    // Prevent dropdown closing
    $event.stopPropagation();
    this.year--;
    this.weeks = this.getTableStructure();
    this.updateCalendarDatePresentation();
  }

  monthAfter($event) {
    // Prevent dropdown closing
    $event.stopPropagation();
    if (this.month === 11) {
      this.year++;
      this.month = 0;
    } else {
      this.month++;
    }
    this.weeks = this.getTableStructure();
    this.updateCalendarDatePresentation();
  }

  yearAfter($event) {
    // Prevent dropdown closing
    $event.stopPropagation();
    this.year++;
    this.weeks = this.getTableStructure();
    this.updateCalendarDatePresentation();
  }

  isCurrentlySelected(day, month, year) {
    return day === this.selectedDate
      && month === this.selectedMonth
      && year === this.selectedYear;
  }

  isDayDisabled(day, month, year) {
    return this.isYearDisabled(year)
      || this.isMonthDisabled(month, year)
      || (year === this.minYear && month === this.minMonth && day < this.minDay)
      || (year === this.maxYear && month === this.maxMonth && day > this.maxDay);
  }

  isMonthDisabled(month, year) {
    return this.isYearDisabled(year)
      || (year === this.minYear && month < this.minMonth)
      || (year === this.maxYear && month > this.maxMonth);
  }

  isYearDisabled(year) {
    return (this.minYear && year < this.minYear) || (this.maxYear && year > this.maxYear);
  }

  switchToMonths(event) {
    this.findActiveLink();
    event.stopPropagation();
    this.mode = 'month';
  }

  switchToYears(event) {
    this.findActiveLink();
    event.stopPropagation();
    this.mode = 'year';
  }

  setYearOffset($event, addtionalOffset) {
    $event.stopPropagation();
    this.yearOffset += addtionalOffset;
  }

  buttonFocus() {
    if (this.formGroup) {
      this.formGroup.classList.add('focus');
    }
    this.element.dispatchEvent(new CustomEvent('focus'));
  }

  addValidators($ngModel) {
    $ngModel.$validators.min = (modelValue, viewValue) => {
      const value = modelValue || viewValue;
      if (value && this.ngMin && value < this.ngMin) {
        if (this.formGroup) {
          this.formGroup.classList.add('has-error');
        }
        return false;
      }
      return true;
    };
    $ngModel.$validators.max = (modelValue, viewValue) => {
      const value = modelValue || viewValue;
      if (value && this.ngMax && value > this.ngMax) {
        if (this.formGroup) {
          this.formGroup.classList.add('has-error');
        }
        return false;
      }
      return true;
    };
  }

  addWatchers($scope, $ngModel) {
    $scope.$watch('$ctrl.locale', (newValue, oldValue) => {
      if (newValue && newValue !== oldValue) {
        this.setLocale(newValue);
      }
    });

    $scope.$watch('$ctrl.ngRequired', () => {
      $ngModel.$validate();
    });

    $scope.$watch('$ctrl.ngMin', (newValue, oldValue) => {
      if (newValue !== oldValue) {
        this.updateMinDateView(this.ngMin);
        $ngModel.$validate();
      }
    });

    $scope.$watch('$ctrl.shortDate', () => {
      this.updateSelectedDatePresentation();
    });

    $scope.$watch('$ctrl.ngMax', (newValue, oldValue) => {
      if (newValue !== oldValue) {
        this.updateMaxDateView(this.ngMax);
        $ngModel.$validate();
      }
    });

    $scope.$watch('$ctrl.ngModel', (newValue) => {
      if (newValue) {
        this.selectedDate = this.DateService.getUTCDate(newValue);
        this.selectedMonth = this.DateService.getUTCMonth(newValue);
        this.selectedYear = this.DateService.getUTCFullYear(newValue);
        this.updateSelectedDatePresentation();
      }
    });
  }

  updateCalendarView(viewDate) {
    if (!viewDate || !viewDate.getUTCDate) {
      // We want user's 'today' in UTC
      viewDate = this.DateService.getLocaleToday();
    }

    // Provided dates should use UTC
    this.day = this.DateService.getUTCDate(viewDate);
    this.month = this.DateService.getUTCMonth(viewDate);
    this.year = this.DateService.getUTCFullYear(viewDate);

    this.weeks = this.getTableStructure();

    this.updateCalendarDatePresentation();
  }

  getTableStructure() {
    let firstDayOfMonth = this.DateService.getWeekday(this.year, this.month, 1);
    if (firstDayOfMonth === 0) {
      firstDayOfMonth = 7;
    }
    const daysInMonth = this.DateService.getLastDayOfMonth(this.year, this.month);

    let week = [];
    const weeks = [];
    let i;

    // Pad first week
    for (i = 1; i < firstDayOfMonth; i++) {
      week.push(false);
    }
    // Fill in days
    for (i = 1; i <= daysInMonth; i++) {
      week.push(i);
      if (((firstDayOfMonth + i) - 1) % 7 === 0) {
        weeks.push(week);
        week = [];
      }
    }
    if (week.length) {
      // Pad last week
      for (i = week.length; i < 7; i++) {
        week.push(false);
      }
      weeks.push(week);
    }
    return weeks;
  }

  setLocale(locale) {
    if (!locale) {
      this.locale = 'en-GB';
    }
    this.monthBeforeDay = this.DateService.isMonthBeforeDay(this.locale);
    this.monthsOfYear = this.DateService.getMonthNamesForLocale(this.locale, 'long');
    this.shortMonthsOfYear = this.DateService.getMonthNamesForLocale(this.locale, 'short');

    // JS days start from Sunday, but we present from Monday
    const jsDays = this.DateService.getDayNamesForLocale(this.locale, 'short');
    const jsShortDays = this.DateService.getDayNamesForLocale(this.locale, 'narrow');
    jsDays.push(jsDays.shift());
    jsShortDays.push(jsShortDays.shift());
    this.daysOfWeek = jsDays;
    this.shortDaysOfWeek = jsShortDays;
    this.updateSelectedDatePresentation();
  }

  updateSelectedDatePresentation() {
    this.selectedDateFormatted = this.DateService.getYearMonthDatePresentation(
      this.selectedYear,
      this.selectedMonth,
      this.selectedDate,
      this.locale,
      this.shortDate ? 'short' : 'long'
    );
  }

  updateCalendarDatePresentation() {
    this.yearMonthFormatted = this.DateService.getYearAndMonthPresentation(
      this.year,
      this.month,
      this.locale,
      this.shortDate ? 'short' : 'long'
    );
  }

  moveDateToWithinRange(date, min, max) {
    if (!date) {
      date = this.DateService.getLocaleToday();
    }
    if (min && min > date) {
      return min;
    }
    if (max && max < date) {
      return max;
    }
    return date;
  }

  setModel(modelDate) {
    modelDate = this.moveDateToWithinRange(modelDate, this.ngMin, this.ngMax);
    this.$ngModel.$setViewValue(modelDate);
    this.$ngModel.$setDirty();

    this.updateCalendarView(modelDate);
  }

  updateMinDateView(minDate) {
    if (minDate && minDate.getUTCDate) {
      this.minDay = this.DateService.getUTCDate(minDate);
      this.minMonth = this.DateService.getUTCMonth(minDate);
      this.minYear = this.DateService.getUTCFullYear(minDate);
    } else {
      this.minDay = null;
      this.minMonth = null;
      this.minYear = null;
    }
  }

  updateMaxDateView(maxDate) {
    if (maxDate && maxDate.getUTCDate) {
      this.maxDay = this.DateService.getUTCDate(maxDate);
      this.maxMonth = this.DateService.getUTCMonth(maxDate);
      this.maxYear = this.DateService.getUTCFullYear(maxDate);
    } else {
      this.maxDay = null;
      this.maxMonth = null;
      this.maxYear = null;
    }
  }

  // Keydown as keypress did not work in chrome/safari
  keyHandler(event) {
    if (!this.ngModel) {
      // Always set model to UTC dates
      const newDate = this.DateService.getUTCDateFromParts(
        this.year,
        this.month,
        this.day
      );
      this.setModel(newDate);
      return;
    }

    const characterCode = event.which || event.charCode || event.keyCode;

    if (characterCode === 37) { // Left arrow key
      this.adjustDate(this.mode, this.ngModel, -1, -1, -1);
    } else if (characterCode === 38) { // Up arrow key
      event.preventDefault(); // Prevent browser scroll
      this.adjustDate(this.mode, this.ngModel, -7, -4, -4);
    } else if (characterCode === 39) { // Right arrow key
      this.adjustDate(this.mode, this.ngModel, 1, 1, 1);
    } else if (characterCode === 40) { // Down arrow key
      event.preventDefault(); // Prevent browser scroll
      this.adjustDate(this.mode, this.ngModel, 7, 4, 4);
    }

    this.findActiveLink();
  }

  findActiveLink() {
    // Perform after current digest
    this.$timeout(() => {
      const activeLink = this.element.getElementsByClassName('active')[0];
      if (activeLink) {
        activeLink.focus();
      }
    });
  }

  adjustDate(mode, date, days, months, years) {
    let newDate = date;
    if (mode === 'day') {
      newDate = this.DateService.addDays(date, days);
    }
    if (mode === 'month') {
      newDate = this.DateService.addMonths(date, months);
    }
    if (mode === 'year') {
      newDate = this.DateService.addYears(date, years);
    }
    this.setModel(newDate);
  }

  calculateYear(row, column) {
    return (this.year - (this.year % 20)) + row + column + this.yearOffset;
  }
}

function resetFocus(element) {
  const button = element.getElementsByTagName('button')[0];
  if (button) {
    button.focus();
  }
}

DateLookupController.$inject = [
  '$element',
  '$scope',
  '$timeout',
  'TwDateService',
  'TwDomService'
];

export default DateLookupController;
