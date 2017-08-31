import TwDateService from '../../services/date/';

class DateController {
  constructor($element, $log, $scope, TwDateService) {
    const $ngModel = $element.controller('ngModel');

    this.DateService = TwDateService;
    this.initialisedWithDate = false;

    if (this.ngModel) {
      this.applyDateModelIfValidOrThrowError();
      this.initialisedWithDate = true;
    } else {
      if (this.modelType) {
        if (this.modelType === STRING_TYPE || this.modelType === OBJECT_TYPE) {
          this.dateModelType = this.modelType;
        } else {
          throw new Error(
            'Invalid modelType, should be ' + STRING_TYPE + ' or ' + OBJECT_TYPE
          );
        }
      } else {
        this.dateModelType = OBJECT_TYPE;
      }

      this.day = null;
      this.month = 0;
      this.year = null;
    }

    this.setDateRequired();
    this.setDateDisabled();
    this.setDateLocale();

    this.setMonths();

    this.addValidators($ngModel);
    this.addWatchers($scope, $ngModel);
    this.addBlurHandlers($element, $ngModel);
  }

  addBlurHandlers($element, $ngModel) {
    var dayTouched, yearTouched;

    $element.find('input[name=day]').on('blur', function() {
      dayTouched = true;
      if (dayTouched && yearTouched) {
        $ngModel.$setTouched();
        $element.triggerHandler('blur');
      }
    });

    $element.find('input[name=year]').on('blur', function() {
      yearTouched = true;

      $ngModel.$setTouched();
      $element.triggerHandler('blur');
    });
  }

  applyDateModelIfValidOrThrowError() {
    if (validDate(this.ngModel)) {
      this.dateModelType =
        typeof this.ngModel === 'string' ? STRING_TYPE : OBJECT_TYPE;

      this.explodeDateModel(this.ngModel);
    } else {
      throw new Error('date model passed should either be instance of ' +
        'Date or valid ISO8601 string');
    }
  }

  setMonths() {
    this.dateMonths = this.getMonthsBasedOnIntlSupportForLocale();
  }

  setDateRequired() {
    this.dateRequired =
      this.ngRequired !== undefined ? this.ngRequired : this.required !== undefined;
  }
  
  setDateDisabled() {
    this.dateDisabled =
      this.ngDisabled !== undefined ? this.ngDisabled : this.disabled !== undefined;
  }

  setDateLocale() {
    if (!this.locale) {
      this.locale = DEFAULT_LOCALE_EN;
    }
    this.monthBeforeDay = this.DateService.isMonthBeforeDay(this.locale);
  }

  explodeDateModel(date) {
    var dateObj = typeof date === 'string' ? new Date(date) : date;

    this.day = dateObj.getUTCDate();
    this.month = dateObj.getUTCMonth();
    this.year = dateObj.getUTCFullYear();
  }

  addValidators($ngModel) {
    $ngModel.$validators.min = (value) => {
      var limit = prepDateLimitForComparison(this.ngMin, this.min);
      var dateValue = prepDateValueForComparison(value);

      return !limit || !dateValue || dateValue >= limit;
    };

    $ngModel.$validators.max = (value) => {
      var limit = prepDateLimitForComparison(this.ngMax, this.max);
      var dateValue = prepDateValueForComparison(value);

      return !limit || !dateValue || dateValue <= limit;
    };
  }

  addWatchers($scope, $ngModel) {
    $scope.$watch('$ctrl.day', (newValue, oldValue) => {
      if (newValue !== oldValue && this.initialisedWithDate) {
        $ngModel.$setDirty();
      }
    });

    $scope.$watch('$ctrl.month', (newValue, oldValue) => {
      if (newValue !== oldValue) {
        this.adjustLastDay();
        $ngModel.$setTouched();  // Input watcher doesn't work for month
        if (this.initialisedWithDate) {
          $ngModel.$setDirty();
        }
      }
    });

    $scope.$watch('$ctrl.year', (newValue, oldValue) => {
      if (newValue !== oldValue && this.initialisedWithDate) {
        $ngModel.$setDirty();
      }
    });

    $scope.$watch('$ctrl.ngModel', (newValue, oldValue) => {
      if (newValue === oldValue) {
        return;
      }

      if (validDate(this.ngModel)) {
        $ngModel.$setDirty();
        this.explodeDateModel(this.ngModel);
      }
    });

    $scope.$watch('$ctrl.ngRequired', (newValue, oldValue) => {
      if (newValue !== oldValue) {
        this.setDateRequired();
      }
    });

    $scope.$watch('$ctrl.ngDisabled', (newValue, oldValue) => {
      if (newValue !== oldValue) {
        this.setDateDisabled();
      }
    });

    $scope.$watch('$ctrl.locale', (newValue, oldValue) => {
      if (newValue !== oldValue) {
        this.setDateLocale();
        this.setMonths();
      }
    });
  }

  getMonthsBasedOnIntlSupportForLocale() {
    var monthNames = this.DateService.getMonthNamesForLocale(this.locale);

    return extendMonthsWithIds(monthNames);
  }

  combineDate() {
    var date = this.DateService.getUTCDateFromParts(
      Number(this.year),
      Number(this.month),
      Number(this.day)
    );
    return date;
  }

  updateDateModelAndValidationClasses() {
    this.adjustLastDay();

    if (!isExplodedDatePatternCorrect(this.year, this.month, this.day)) {
      this.$ngModel.$setViewValue(null);
      return;
    }

    var dateObj = this.combineDate();

    if (this.dateModelType === STRING_TYPE) {
      var isoString = dateObj.toISOString();
      var dateString = isoString.substring(0, isoString.indexOf('T'));

      this.$ngModel.$setViewValue(dateString);
    } else {
      this.$ngModel.$setViewValue(dateObj);
    }
  }

  adjustLastDay() {
    var day = Number(this.day),
      month = Number(this.month),
      year = Number(this.year);

    var lastUTCDayForMonthAndYear = this.DateService.getLastDayOfMonth(year, month);

    if (day > lastUTCDayForMonthAndYear) {
      // Using setViewValue does not update DOM, only model.
      this.day = parseInt(lastUTCDayForMonthAndYear, 10);
    }
  }
}

const DEFAULT_LOCALE_EN = 'en';
const DEFAULT_MONTHS_EN = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const STRING_TYPE = 'string';
const OBJECT_TYPE = 'object';

function isNumber(value) {
  return typeof value === 'number';
}

function isNumericString(value) {
  return typeof value === 'string' && !isNaN(Number(value));
}

function isExplodedDatePatternCorrect(year, month, day) {
  return isNumber(year) &&
    isNumber(day) &&
    (isNumber(month) || isNumericString(month));
}

function validDate(date) {
  return validDateObject(date) || validDateString(date);
}

function validDateObject(dateObj) {
  return Object.prototype.toString.call(dateObj) === '[object Date]'
    && !isNaN(dateObj.getTime());
}

function validDateString(dateString) {
  return typeof dateString === 'string' && validDateObject(new Date(dateString));
}

function prepDateLimitForComparison(ngLimit, attrLimit) {
  var limit = ngLimit ? ngLimit : (attrLimit ? attrLimit : false);
  if (!limit) {
    return false;
  }
  limit = typeof limit === 'string' ? new Date(limit) : limit;
  if (!validDateObject(limit)) {
    return false;
  }
  return limit;
}

function prepDateValueForComparison(dateValue) {
  return typeof dateValue === 'string' ? new Date(dateValue) : dateValue;
}

function extendMonthsWithIds(monthNames) {
  return monthNames.map(function(monthName, index) {
    return {
      value: index,
      label: monthName
    };
  });
}

DateController.$inject = [
  '$element',
  '$log',
  '$scope',
  'TwDateService'
];

export default DateController;
