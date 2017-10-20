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
          throw new Error(`Invalid modelType, should be ${STRING_TYPE} or ${OBJECT_TYPE}`);
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
    addBlurHandlers($element, $ngModel);
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
    const dateObj = typeof date === 'string' ? new Date(date) : date;

    this.day = dateObj.getUTCDate();
    this.month = dateObj.getUTCMonth();
    this.year = dateObj.getUTCFullYear();
  }

  addValidators($ngModel) {
    $ngModel.$validators.min = (value) => {
      const limit = prepDateLimitForComparison(this.ngMin, this.min);
      const dateValue = prepDateValueForComparison(value);

      return !limit || !dateValue || dateValue >= limit;
    };

    $ngModel.$validators.max = (value) => {
      const limit = prepDateLimitForComparison(this.ngMax, this.max);
      const dateValue = prepDateValueForComparison(value);

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
        $ngModel.$setTouched(); // Input watcher doesn't work for month
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
    const monthNames = this.DateService.getMonthNamesForLocale(this.locale);

    return extendMonthsWithIds(monthNames);
  }

  combineDate() {
    return this.DateService.getUTCDateFromParts(
      Number(this.year),
      Number(this.month),
      Number(this.day)
    );
  }

  updateDateModelAndValidationClasses() {
    this.adjustLastDay();

    if (!isExplodedDatePatternCorrect(this.year, this.month, this.day)) {
      this.$ngModel.$setViewValue(null);
      return;
    }

    const dateObj = this.combineDate();

    if (this.dateModelType === STRING_TYPE) {
      const isoString = dateObj.toISOString();
      const dateString = isoString.substring(0, isoString.indexOf('T'));

      this.$ngModel.$setViewValue(dateString);
    } else {
      this.$ngModel.$setViewValue(dateObj);
    }
  }

  adjustLastDay() {
    const day = Number(this.day);
    const month = Number(this.month);
    const year = Number(this.year);

    const lastUTCDayForMonthAndYear = this.DateService.getLastDayOfMonth(year, month);

    if (day > lastUTCDayForMonthAndYear) {
      // Using setViewValue does not update DOM, only model.
      this.day = parseInt(lastUTCDayForMonthAndYear, 10);
    }
  }
}

const DEFAULT_LOCALE_EN = 'en';
const STRING_TYPE = 'string';
const OBJECT_TYPE = 'object';

function isNumber(value) {
  return typeof value === 'number';
}

function isNumericString(value) {
  // eslint-disable-next-line no-restricted-globals
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
    && !isNaN(dateObj.getTime()); // eslint-disable-line no-restricted-globals
}

function validDateString(dateString) {
  return typeof dateString === 'string' && validDateObject(new Date(dateString));
}

function prepDateLimitForComparison(ngLimit, attrLimit) {
  let limit = ngLimit || attrLimit;

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
  // eslint-disable-next-line arrow-body-style
  return monthNames.map((monthName, index) => {
    return {
      value: index,
      label: monthName
    };
  });
}

function addBlurHandlers($element, $ngModel) {
  let dayTouched;
  let yearTouched;

  const element = $element[0];
  const dayInput = element.querySelector('input[name=day]');
  const yearInput = element.querySelector('input[name=year]');

  dayInput.addEventListener('blur', () => {
    dayTouched = true;
    if (dayTouched && yearTouched) {
      $ngModel.$setTouched();
      element.dispatchEvent(new CustomEvent('blur'));
    }
  });

  yearInput.addEventListener('blur', () => {
    yearTouched = true;
    $ngModel.$setTouched();
    element.dispatchEvent(new CustomEvent('blur'));
  });
}

DateController.$inject = [
  '$element',
  '$log',
  '$scope',
  'TwDateService'
];

export default DateController;
