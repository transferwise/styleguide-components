  import TwDateService from '../../services/tw-date-service/tw-date-service.service.js';

  function TwDateController($element, $log, $scope, TwDateService) {
    var $ctrl = this,
      ngModel,
      initialisedWithDate = false;

    $ctrl.updateDateModelAndValidationClasses = updateDateModelAndValidationClasses;

    $ctrl.explodeDateModel = explodeDateModel;
    $ctrl.combineDate = combineDate;
    $ctrl.adjustLastDay = adjustLastDay;
    $ctrl.validDate = validDate;

    var DEFAULT_LOCALE_EN = 'en';
    var DEFAULT_MONTHS_EN = [
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

    var STRING_TYPE = 'string';
    var OBJECT_TYPE = 'object';

    function init() {
      if ($ctrl.ngModel) {
        applyDateModelIfValidOrThrowError();
        initialisedWithDate = true;
      } else {
        if ($ctrl.modelType) {
          if ($ctrl.modelType === STRING_TYPE || $ctrl.modelType === OBJECT_TYPE) {
            $ctrl.dateModelType = $ctrl.modelType;
          } else {
            throw new Error('Invalid modelType, should be ' + STRING_TYPE + ' or ' + OBJECT_TYPE);
          }
        } else {
          $ctrl.dateModelType = OBJECT_TYPE;
        }

        $ctrl.day = null;
        $ctrl.month = 0;
        $ctrl.year = null;
      }

      ngModel = $element.controller('ngModel');

      ngModel.$validators.min = function(value) {
        var limit = prepDateLimitForComparison($ctrl.ngMin, $ctrl.min);
        var dateValue = prepDateValueForComparison(value);

        return !limit || !dateValue || dateValue >= limit;
      };
      ngModel.$validators.max = function(value) {
        var limit = prepDateLimitForComparison($ctrl.ngMax, $ctrl.max);
        var dateValue = prepDateValueForComparison(value);

        return !limit || !dateValue || dateValue <= limit;
      };

      setDateRequired();
      setDateDisabled();
      setDateLocale();

      setMonths();

      registerWatchers();
      addBlurHandlers($element);

    }

    function addBlurHandlers($element) {
      var dayTouched, yearTouched;
      $element.find('input[name=day]').on('blur', function() {
        dayTouched = true;
        if (dayTouched && yearTouched) {
          ngModel.$setTouched();
          $element.triggerHandler('blur');
        }
      });
      $element.find('input[name=year]').on('blur', function() {
        yearTouched = true;

        ngModel.$setTouched();
        $element.triggerHandler('blur');
      });
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

    function applyDateModelIfValidOrThrowError() {
      if (validDate($ctrl.ngModel)) {
        $ctrl.dateModelType = typeof $ctrl.ngModel === 'string' ? STRING_TYPE : OBJECT_TYPE;
        $ctrl.explodeDateModel($ctrl.ngModel);
      } else {
        throw new Error('date model passed should either be instance of Date or valid ISO8601 string');
      }
    }

    function setMonths() {
      $ctrl.dateMonths = getMonthsBasedOnIntlSupportForLocale();
    }

    function setDateRequired() {
      $ctrl.dateRequired = $ctrl.ngRequired !== undefined ? $ctrl.ngRequired : $ctrl.required !== undefined;
    }
    function setDateDisabled() {
      $ctrl.dateDisabled = $ctrl.ngDisabled !== undefined ? $ctrl.ngDisabled : $ctrl.disabled !== undefined;
    }

    function setDateLocale() {
      if (!$ctrl.locale) {
        $ctrl.locale = DEFAULT_LOCALE_EN;
      }
      $ctrl.monthBeforeDay = TwDateService.isMonthBeforeDay($ctrl.locale);
    }

    function explodeDateModel(date) {
      var dateObj = typeof date === 'string' ? new Date(date) : date;

      $ctrl.day = dateObj.getUTCDate();
      $ctrl.month = dateObj.getUTCMonth();
      $ctrl.year = dateObj.getUTCFullYear();
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

    function registerWatchers() {
      $scope.$watch('$ctrl.day', function(newValue, oldValue) {
        if (newValue !== oldValue && initialisedWithDate) {
          ngModel.$setDirty();
        }
      });
      $scope.$watch('$ctrl.month', function(newValue, oldValue) {
        if (newValue !== oldValue) {
          $ctrl.adjustLastDay();
          ngModel.$setTouched();  // Input watcher doesn't work for month
          if (initialisedWithDate) {
            ngModel.$setDirty();
          }
        }
      });
      $scope.$watch('$ctrl.year', function(newValue, oldValue) {
        if (newValue !== oldValue && initialisedWithDate) {
          ngModel.$setDirty();
        }
      });

      $scope.$watch('$ctrl.ngModel', function(newValue, oldValue) {
        if (newValue === oldValue) {
          return;
        }

        if (validDate($ctrl.ngModel)) {
          ngModel.$setDirty();
          $ctrl.explodeDateModel($ctrl.ngModel);
        }
      });

      $scope.$watch('$ctrl.ngRequired', function(newValue, oldValue) {
        if (newValue !== oldValue) {
          setDateRequired();
        }
      });

      $scope.$watch('$ctrl.ngDisabled', function(newValue, oldValue) {
        if (newValue !== oldValue) {
          setDateDisabled();
        }
      });

      $scope.$watch('$ctrl.locale', function(newValue, oldValue) {
        if (newValue !== oldValue) {
          setDateLocale();
          setMonths();
        }
      });
    }

    function getMonthsBasedOnIntlSupportForLocale() {
      var monthNames = TwDateService.getMonthNamesForLocale($ctrl.locale);

      return extendMonthsWithIds(monthNames);
    }

    function extendMonthsWithIds(monthNames) {
      return monthNames.map(function(monthName, index) {
        return {
          value: index,
          label: monthName
        };
      });
    }

    function isExplodedDatePatternCorrect() {
      return isNumber($ctrl.year) &&
        isNumber($ctrl.day) &&
        (isNumber($ctrl.month) || isNumericString($ctrl.month));
    }

    function isNumber(value) {
      return typeof value === 'number';
    }
    function isNumericString(value) {
      return typeof value === 'string' && !isNaN(Number($ctrl.month));
    }

    function combineDate() {
      var date = TwDateService.getUTCDateFromParts(
        Number($ctrl.year),
        Number($ctrl.month),
        Number($ctrl.day)
      );
      return date;
    }

    function updateDateModelAndValidationClasses() {
      $ctrl.adjustLastDay();

      if (!isExplodedDatePatternCorrect()) {
        ngModel.$setViewValue(null);
        return;
      }

      var dateObj = combineDate();

      if ($ctrl.dateModelType === STRING_TYPE) {
        var isoString = dateObj.toISOString();
        var dateString = isoString.substring(0, isoString.indexOf('T'));

        ngModel.$setViewValue(dateString);
      } else {
        ngModel.$setViewValue(dateObj);
      }
    }

    function adjustLastDay() {
      var day = Number($ctrl.day),
        month = Number($ctrl.month),
        year = Number($ctrl.year);

      var lastUTCDayForMonthAndYear = TwDateService.getLastDayOfMonth(year, month);

      if (day > lastUTCDayForMonthAndYear) {
        // Using setViewValue does not update DOM, only model.
        $ctrl.day = parseInt(lastUTCDayForMonthAndYear, 10);
      }
    }

    init();
  }

  TwDateController.$inject = ['$element', '$log', '$scope', 'TwDateService'];

  export default TwDateController;
