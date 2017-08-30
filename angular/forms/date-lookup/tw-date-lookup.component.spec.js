'use strict';

describe('Directive: TwDateLookup, ', function() {
  var $compile,
      $rootScope,
      $scope,
      element,
      TwDateService;

  beforeEach(module('tw.styleguide.forms.date-lookup'));
  beforeEach(module('tw.styleguide.services.date'));

  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $compile = $injector.get('$compile');
    TwDateService = $injector.get('TwDateService');
    $scope = $rootScope.$new();
  }));

  var ENGLISH_MONTHS = [
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
  var LOCALES = {
    en: 'en-GB',
    fr: 'fr-FR',
    es: 'es-ES',
    us: 'en-US',
    jp: 'ja-JP'
  };

  var BUTTON_SELECTOR = '.tw-date-lookup-button',
    MODEL_DATE_SELECTOR = '.tw-date-lookup-selected',
    PLACEHOLDER_SELECTOR = '.tw-date-lookup-placeholder',

    YEAR_SCREEN_SELECTOR = '.tw-date-lookup-years',
    MONTH_SCREEN_SELECTOR = '.tw-date-lookup-months',
    DAY_SCREEN_SELECTOR = '.tw-date-lookup-days',

    YEAR_LABEL_SELECTOR = '.tw-date-lookup-year-label',
    MONTH_LABEL_SELECTOR = '.tw-date-lookup-month-label',

    YEARS_LINK_SELECTOR = '.tw-date-lookup-month-label',

    YEAR_OPTIONS_SELECTOR = '.tw-date-lookup-year-option',
    MONTH_OPTIONS_SELECTOR = '.tw-date-lookup-month-option',
    DAY_OPTIONS_SELECTOR = '.tw-date-lookup-day-option',

    PREVIOUS_MONTH_SELECTOR = '.tw-date-lookup-previous-month',
    NEXT_MONTH_SELECTOR = '.tw-date-lookup-next-month',

    PREVIOUS_YEARS_SELECTOR = '.tw-date-lookup-previous-years',
    NEXT_YEARS_SELECTOR = '.tw-date-lookup-next-years',

    DROPDOWN_SELECTOR = '.dropdown-menu';

  describe('given the component is initialised', function() {
    describe('when an empty input $scope is passed', function () {
      beforeEach(function () {
        $scope.ngModel = null;
        element = getCompiledDirectiveElement($scope);
      });
      it('should leave date model undefined', function () {
        expect($scope.ngModel).toBe(null);
      });
      it('should show not show selected date', function () {
        expect(element.find(MODEL_DATE_SELECTOR).length).toBe(0);
      });
      it('should show placeholder', function () {
        expect(element.find(PLACEHOLDER_SELECTOR).length).toBe(1);
      });
      describe('and lookup is opened', function () {
        beforeEach(function () {
          element.find(BUTTON_SELECTOR)[0].click();
        });
        it('should open on current month and year', function () {
          var today = getToday();
          var year = today.getUTCFullYear();
          var month = ENGLISH_MONTHS[today.getUTCMonth()];
          expect(element.find(MONTH_LABEL_SELECTOR).text().trim()).toBe(month + ' ' + year);
        });
      });
    });

    describe('when a date is suplied', function () {
      describe('as a valid Date instance', function () {
        var dateModel;
        beforeEach(function () {
          dateModel = getUTCDate(2000, 0, 10);
          $scope.ngModel = dateModel;
          element = getCompiledDirectiveElement($scope);
        });
        it('should leave date model as it was defined', function () {
          expect($scope.ngModel).toBe(dateModel);
        });
        describe('and lookup is opened', function () {
          beforeEach(function () {
            element.find(BUTTON_SELECTOR)[0].click();
          });
          it('should open on the month and year containing the selected date', function () {
            expect(element.find(MONTH_LABEL_SELECTOR).text().trim()).toBe('January 2000');
          });
          it('should highlight the selected date in calendar', function () {
            expect(element.find('a.active').text().trim()).toBe('10');
          });
        });
      });
      describe('as something other than a valid Date instance', function () {
        it('should ...', function () {
            // TODO
        });
      });
    });

    describe('in a timezone on a different day to UTC', function() {
      beforeEach(function () {
        spyOn(TwDateService, 'getLocaleToday').and.returnValue(getUTCDate(2000,1,1));
        spyOn(TwDateService, 'getUTCToday').and.returnValue(getUTCDate(2000,0,31));
      });
      describe('and no date is supplied', function () {
        beforeEach(function() {
          element = getCompiledDirectiveElement($scope);
          element.find(BUTTON_SELECTOR)[0].click();
        });
        it('should open on the correct month for the user' , function () {
          expect(element.find(MONTH_LABEL_SELECTOR).text().trim()).toBe('February 2000');
        });
        it('should not open with a day highlighted', function () {
          expect(element.find('a.active').text().trim()).toBe('');
        });
      });
      describe('and a UTC date is supplied', function () {
        beforeEach(function() {
          $scope.ngModel = getUTCDate(2000,0,31);
          element = getCompiledDirectiveElement($scope);
          element.find(BUTTON_SELECTOR)[0].click();
        });
        it('should open on the UTC month of the date' , function () {
          expect(element.find(MONTH_LABEL_SELECTOR).text().trim()).toBe('January 2000');
        });
        it('should open with the UTC day highlighted', function () {
          expect(element.find('a.active').text().trim()).toBe('31');
        });
      });
      describe('and a UTC date is supplied below min', function () {
        beforeEach(function() {
          $scope.ngModel = getUTCDate(2000,0,31);
          $scope.ngMin = getUTCDate(2000,3,10);
          element = getCompiledDirectiveElement($scope);
          element.find(BUTTON_SELECTOR)[0].click();
        });
        it('should open on the UTC of min date' , function () {
          expect(element.find(MONTH_LABEL_SELECTOR).text().trim()).toBe('April 2000');
        });
        it('should not have a date highlighted', function () {
          expect(element.find('a.active').text().trim()).toBe('');
        });
      });
    });

    describe('when ngRequired==true', function () {
      var ngModelController;
      it('and model is null, should be $invalid', function () {
        $scope.ngModel = null;
        $scope.ngRequired = true;
        element = getCompiledDirectiveElement($scope);
        ngModelController = element.controller('ngModel');

        expect(ngModelController.$invalid).toBe(true);
        expect(element.hasClass('ng-invalid-required')).toBe(true);
      });
      it('and model is valid, should be $valid', function () {
        $scope.ngModel = getUTCDate(2000, 1, 1);
        $scope.ngRequired = true;
        element = getCompiledDirectiveElement($scope);
        ngModelController = element.controller('ngModel');

        expect(ngModelController.$valid).toBe(true);
        expect(element.hasClass('ng-invalid-required')).toBe(false);
      });
    });

    describe('when ngDisabled==true', function () {
      it('should be disabled', function () {
        $scope.ngModel = null;
        $scope.ngDisabled = true;
        element = getCompiledDirectiveElement($scope);
        expect(element.find(BUTTON_SELECTOR).attr('disabled')).toBeDefined();
      });
    });

    describe('when ngDisabled==false', function () {
      it('should not be disabled', function () {
        $scope.ngModel = null;
        $scope.ngDisabled = false;
        element = getCompiledDirectiveElement($scope);
        expect(element.find(BUTTON_SELECTOR).attr('disabled')).toBeUndefined();
      });
    });

    describe('when locale attribute is passed', function () {
      var twLocale = 'fr';
      beforeEach(function () {
        $scope.ngModel = null;
        $scope.locale = twLocale;
        element = getCompiledDirectiveElement($scope);
      });

      if (isIntlSupportedForLocale(twLocale)) {
        it('should populate vm.months based on vm.locale', function () {
          expectDateMonthsToBeLocalized(element, twLocale);
        });
      } else {
        it('should populate vm.months with default English months', function () {
          expectDateMonthsToBeDefault(element);
        });
      }
    });

    describe('when shortDate==true', function () {
      beforeEach(function () {
        $scope.ngModel = new Date('2000-01-10');
        $scope.shortDate = true;
        element = getCompiledDirectiveElement($scope);

      });
      it('should show short month name', function () {
          expect(element.find(MODEL_DATE_SELECTOR).text().trim()).toBe('10 Jan 2000');
      });
    });

    describe('when ngMin and ngMax are supplied', function () {
      var ngModelController, formGroup, template;
      describe('as a valid date object', function () {
        beforeEach(function() {
          $scope.ngMin = getUTCDate(1990, 0, 1);
          $scope.ngMax = getUTCDate(2015, 11, 31);
          template = " \
            <div class='form-group'> \
              <label class='control-label'>Label</label> \
              <tw-date-lookup \
                ng-model='ngModel' \
                ng-min='ngMin' \
                ng-max='ngMax'> \
              </tw-date-lookup> \
            </div>";
        });
        describe('and ngModel is null', function () {
          beforeEach(function() {
            $scope.ngModel = null;
            formGroup = getCompiledDirectiveElement($scope, template);
            element = formGroup.find('tw-date-lookup');
            ngModelController = element.controller('ngModel');
          });
          it('and ngModel is null, should not set invalid min/max', function() {

            expect(ngModelController.$valid).toBe(true);
            expect(element.hasClass('ng-invalid-min')).toBe(false);
            expect(element.hasClass('ng-invalid-max')).toBe(false);
          });
        });
        describe('and ngModel is earlier than min', function () {
          beforeEach(function() {
            $scope.ngModel = getUTCDate(1980, 0, 1);
            formGroup = getCompiledDirectiveElement($scope, template);
            element = formGroup.find('tw-date-lookup');
            ngModelController = element.controller('ngModel');
          });
          it('should not change ngModel', function() {
            expect($scope.ngModel).toEqual(getUTCDate(1980, 0, 1));
          });
          it('should set ngModel invalid', function() {
            expect(element.hasClass('ng-invalid')).toBe(true);
            expect(element.hasClass('ng-invalid-min')).toBe(true);
          });
          it('should show error state on form-group', function() {
            expect(formGroup.hasClass('has-error')).toBe(true);
          });
        });
        describe('and ngModel is later than max', function () {
          beforeEach(function() {
            $scope.ngModel = getUTCDate(2020, 0, 1);
            formGroup = getCompiledDirectiveElement($scope, template);
            element = formGroup.find('tw-date-lookup');
            ngModelController = element.controller('ngModel');
          });
          it('should not change ngModel', function() {
            expect($scope.ngModel).toEqual(getUTCDate(2020, 0, 1));
          });
          it('should set ngModel to invalid', function() {
            expect(ngModelController.$invalid).toBe(true);
            expect(element.hasClass('ng-invalid')).toBe(true);
            expect(element.hasClass('ng-invalid-max')).toBe(true);
          });
          it('should show error state on form-group', function() {
            expect(formGroup.hasClass('has-error')).toBe(true);
          });
        });
        describe('and ngModel is between min and max', function () {
          beforeEach(function() {
            $scope.ngModel = getUTCDate(2000, 0, 1);
            formGroup = getCompiledDirectiveElement($scope, template);
            element = formGroup.find('tw-date-lookup');
            ngModelController = element.controller('ngModel');
          });
          it('should set ngModel to valid', function() {
            expect($scope.ngModel).toEqual(getUTCDate(2000, 0, 1));
            expect(ngModelController.$valid).toBe(true);
            expect(element.hasClass('ng-valid')).toBe(true);
            expect(element.hasClass('ng-valid-min')).toBe(true);
            expect(element.hasClass('ng-valid-max')).toBe(true);
          });
        });
      });
      describe('as invalid Date objects', function () {
        beforeEach(function() {
          $scope.ngModel = null;
          $scope.ngMin = new Date('invalid');
          $scope.ngMax = new Date('invalid');
          element = getCompiledDirectiveElement($scope);
          ngModelController = element.controller('ngModel');
        });
        it('should set ngModel to valid', function() {
          $scope.ngModel = new Date('2000-01-01');
          $scope.$digest();
          expect(ngModelController.$valid).toBe(true);
          expect(element.hasClass('ng-invalid')).toBe(false);
          expect(element.hasClass('ng-invalid-min')).toBe(false);
          expect(element.hasClass('ng-invalid-max')).toBe(false);
        });
      });
    });
  });

  describe('when the component is already initialised', function() {
    describe('given ngModel changes', function() {
      var dayInput, monthInput, yearInput,
        monthModelController;

      beforeEach(function() {
        $scope.ngModel = getUTCDate(2000,0,1);
        element = getCompiledDirectiveElement($scope);
        $scope.ngModel = getUTCDate(2001,1,1);
        $scope.$digest();
      });
      it('should update selected date if valid', function() {
        expect(element.find(MODEL_DATE_SELECTOR).text().trim().replace(/\s\s+/g, ' ')).toBe('1 February 2001');
      });
    });

    describe('given ngRequired changes', function() {
      var dayInput, monthInput, yearInput, ngModelController;;
      beforeEach(function() {
        $scope.ngModel = null;
        $scope.ngRequired = false;
        element = getCompiledDirectiveElement($scope);
        ngModelController = element.controller('ngModel');
      });
      it('should set control to invalid-required', function() {
        $scope.ngRequired = true;
        $scope.$digest();
        expect(ngModelController.$invalid).toBe(true);
        //expect(element.hasClass('ng-invalid')).toBe(true);
        expect(element.hasClass('ng-invalid-required')).toBe(true);
      });

      it('should set control to valid required', function() {
        $scope.ngRequired = false;
        $scope.$digest();
        expect(ngModelController.$valid).toBe(true);
        //expect(element.hasClass('ng-invalid')).toBe(false);
        expect(element.hasClass('ng-invalid-required')).toBe(false);
      });
    });
    describe('given ngDisabled changes', function() {
      var buttonInput;
      beforeEach(function() {
        $scope.ngModel = null;
        $scope.ngDisabled = true;
        element = getCompiledDirectiveElement($scope);
        buttonInput = element.find(BUTTON_SELECTOR);
      });
      it('should disable controls when true', function() {
        expect(buttonInput.is(':disabled')).toBe(true);
      });
      it('should reenable controls when false', function() {
        $scope.ngDisabled = false;
        $scope.$digest();
        expect(buttonInput.is(':disabled')).toBe(false);
      });
    });

    describe('given ngMin changes', function() {
      beforeEach(function() {
        $scope.ngModel = getUTCDate(2000,0,1);
        element = getCompiledDirectiveElement($scope);
      });
      describe('and ngModel is higher', function() {
        beforeEach(function() {
          $scope.ngMin = getUTCDate(1999,0,1);
          $scope.$digest();
        });
        it('should not change ngModel', function() {
          expect($scope.ngModel).toEqual(getUTCDate(2000,0,1));
        });
        it('should set control as valid', function() {
          expect(element.hasClass('ng-invalid')).toBe(false);
        });
      });
      describe('and ngModel is lower', function() {
        beforeEach(function() {
          $scope.ngMin = getUTCDate(2001,0,1);
          $scope.$digest();
        });
        it('should unset ngModel', function() {
          expect($scope.ngModel).toBeUndefined(); //.toBe(null);
        });
        it('should set control as invalid', function() {
          expect(element.hasClass('ng-invalid')).toBe(true);
          expect(element.hasClass('ng-invalid-min')).toBe(true);
        });
      });
    });
    describe('given ngMax changes', function() {
      beforeEach(function() {
        $scope.ngModel = getUTCDate(2000,0,1);
        $scope.ngRequired = true;
        element = getCompiledDirectiveElement($scope);
      });
      describe('and ngModel is lower', function() {
        beforeEach(function() {
          $scope.ngMax = getUTCDate(2001,0,1);
          $scope.$digest();
        });
        it('should not change ngModel', function() {
          expect($scope.ngModel).toEqual(getUTCDate(2000,0,1));
        });
        it('should not set control as invalid', function() {
          expect(element.hasClass('ng-invalid-max')).toBe(false);
        });
        it('should remain valid-required', function() {
          expect(element.hasClass('ng-valid-required')).toBe(true);
        });
      });
      describe('and ngModel is higher', function() {
        beforeEach(function() {
          $scope.ngMax = getUTCDate(1999,0,1);
          $scope.$digest();
        });
        it('should unset ngModel', function() {
          expect($scope.ngModel).toBeUndefined();
        });
        it('should set control invalid', function() {
          expect(element.hasClass('ng-invalid-max')).toBe(true);
        });
      });
    });

    describe('given locale changes', function() {
      var oldLocale = LOCALES.es,
          newLocale = LOCALES.fr,
          selectedDate;

      beforeEach(function() {
        $scope.ngModel = getUTCDate(2000, 0, 1);
        $scope.locale = oldLocale;
        element = getCompiledDirectiveElement($scope);

        selectedDate = element.find(MODEL_DATE_SELECTOR);

        $scope.locale = newLocale;
        $scope.$digest();
      });

      if (isIntlSupportedForLocale(newLocale)) {
        it('should update $ctrl.months based on locale', function () {
            expectDateMonthsToBeLocalized(element, newLocale);
        });
      } else {
        it('should populate $ctrl.months with default English months', function () {
            expectDateMonthsToBeDefault(element);
        });
      }

      it('should show day before month if locale not US', function () {
        $scope.locale = LOCALES.fr;
        $scope.$digest();
        if (isIntlSupportedForLocale(newLocale)) {
          expect(selectedDate.text().trim().replace(/\s\s+/g, ' ')).toEqual('1 Janvier 2000');
        } else {
          expect(selectedDate.text().trim().replace(/\s\s+/g, ' ')).toEqual('1 January 2000');
        }
      });
      it('should show month before day if locale is US', function () {
        $scope.locale = LOCALES.us;
        $scope.$digest();
        expect(selectedDate.text().trim().replace(/\s\s+/g, ' ')).toEqual('January 1, 2000');
      });
      it('should show date in Japanese format', function () {
          $scope.locale = LOCALES.jp;
          $scope.$digest();
          expect(selectedDate.text().trim().replace(/\s\s+/g, ' ')).toEqual('2000年1月1日');
      });
    });
  });

  describe('given the user clicks on the control', function() {
    var element, ngModelController, dropdown, dropdownToggle, monthLabel, dayOptions;

    beforeEach(function() {
      $scope.ngModel = getUTCDate(2000, 0, 10);
      element = getCompiledDirectiveElement($scope);
      ngModelController = element.controller('ngModel');
      dropdownToggle = element.find('.dropdown');
      element.find(BUTTON_SELECTOR)[0].click();

      dropdown = element.find(DROPDOWN_SELECTOR);
      monthLabel = element.find(MONTH_LABEL_SELECTOR);
      dayOptions = element.find(DAY_OPTIONS_SELECTOR);
    });

    it('should set the control to $touched', function () {
      expect(ngModelController.$touched).toBe(true);
    });

    describe('when the calendar is displayed', function() {
      it('should open on selected month and year', function () {
        var year = $scope.ngModel.getUTCFullYear();
        var month = ENGLISH_MONTHS[$scope.ngModel.getUTCMonth()];
        expect(element.find(MONTH_LABEL_SELECTOR).text().trim()).toBe(month + ' ' + year);
      });
      it('should show the correct number of days for the month', function () {
        var dayOptions = element.find(DAY_OPTIONS_SELECTOR);
        expect(dayOptions.length).toBe(31);
      });
      it('should show the first day on the correct day of the week', function () {
        var firstTableRowCells = element.find('.table-calendar tbody tr:first-child td');
        // First day of Jan 2000 was Saturday (6th column)
        expect($(firstTableRowCells[5]).find('a').text().trim()).toBe('1');
      });

      describe('and there is an ngMin', function() {
        beforeEach(function() {
          $scope.ngMin = getUTCDate(2000, 0, 2);
          $scope.$digest();
        });
        it('should disable any days before ngMin', function () {
          expect($(dayOptions[0]).attr('disabled')).toEqual('disabled');
        });
        it('should not disable the day of ngMin', function () {
          // TODO disabled attr is not natively supported by links
          expect($(dayOptions[1]).attr('disabled')).toBeUndefined();
        });
        it('should not disable any days after ngMin', function () {
          expect($(dayOptions[2]).attr('disabled')).toBeUndefined();
        });
        it('should not allow clicks on disabled days', function () {
          dayOptions[0].click();
          expect($scope.ngModel).toEqual(getUTCDate(2000, 0, 10));
        });
      });

      describe('and there is an ngMax', function() {
        beforeEach(function() {
          $scope.ngMax = getUTCDate(2000, 0, 30);
          $scope.$digest();
        });
        it('should disable any days after ngMax', function () {
          expect($(dayOptions[30]).attr('disabled')).toEqual('disabled');
        });
        it('should not disable the day of ngMax', function () {
          expect($(dayOptions[29]).attr('disabled')).toBeUndefined();
        });
        it('should not disable any days before ngMax', function () {
          expect($(dayOptions[28]).attr('disabled')).toBeUndefined();
        });
        it('should not allow clicks on disabled days', function () {
          dayOptions[30].click();
          expect($scope.ngModel).toEqual(getUTCDate(2000, 0, 10));
        });
        it('should not close the dropdown when disabled link clicked', function () {
          // TODO test not working due to bootstrap.js
          //expect(dropdownToggle.hasClass('open')).toBe(true);
          //expect(dropdown.is(':visible')).toBe(true);
        });
      });
    });

    describe('when the user presses the right arrow key', function() {
      beforeEach(function() {
        element.find('.tw-date-lookup-month-label')
          .trigger({type: "keydown", keyCode: KEYS.right, which: KEYS.right});
      });
      it('should select the next day', function() {
        expect($scope.ngModel).toEqual(getUTCDate(2000, 0, 11));
      });
      // TODO not working
      //it('should move focus to selected link', function() {
      //  expect(element.find('a.active')[0] === document.activeElement).toBe(true);
      //});
    });

    describe('when the user presses the left arrow key', function() {
      beforeEach(function() {
        element.find('a.active')
          .trigger({type: "keydown", keyCode: KEYS.left, which: KEYS.left});
      });
      it('should select the previous day', function() {
        expect($scope.ngModel).toEqual(getUTCDate(2000, 0, 9));
      });
    });

    describe('when the user presses the down arrow key', function() {
      beforeEach(function() {
        element.find('a.active')
          .trigger({type: "keydown", keyCode: KEYS.down, which: KEYS.down});
      });
      it('should select 7 days after current day', function() {
        expect($scope.ngModel).toEqual(getUTCDate(2000, 0, 17));
      });
    });

    describe('when the user presses the up arrow key', function() {
      beforeEach(function() {
        element.find('a.active')
          .trigger({type: "keydown", keyCode: KEYS.up, which: KEYS.up});
      });
      it('should select 7 days before current day', function() {
        expect($scope.ngModel).toEqual(getUTCDate(2000, 0, 3));
      });
    });

    describe('when clicking a valid date', function() {
      beforeEach(function() {
        element.find(DAY_OPTIONS_SELECTOR)[1].click();
      });
      it('should update the displayed value', function() {
        var selectedDate = element.find(MODEL_DATE_SELECTOR).text().trim().replace(/\s\s+/g, ' ');
        expect(selectedDate).toEqual('2 January 2000');
      });
      it('should set the model to the clicked date', function() {
        expect($scope.ngModel).toEqual(getUTCDate(2000, 0, 2));
      });
      it('should close the lookup', function() {
        expect(dropdownToggle.hasClass('open')).toBe(false);
        //expect(dropdown.is(':visible')).toBe(false);
      });
    });

    describe('when clicking the "previous" button', function() {
      beforeEach(function() {
        element.find(PREVIOUS_MONTH_SELECTOR)[0].click();
      });

      it('should show the next earlier month', function() {
        expect(monthLabel.text().trim()).toBe('December 1999');
      });
      it('should not close the lookup', function() {
        // TODO test not working due to bootstrap.js
        //expect(dropdownToggle.hasClass('open')).toBe(true);
        //expect(dropdown.is(':visible')).toBe(true);
      });
    });

    describe('when clicking the "next" button', function() {
      beforeEach(function() {
        element.find(NEXT_MONTH_SELECTOR)[0].click();
      });

      it('should show the next month', function() {
        expect(monthLabel.text().trim()).toBe('February 2000');
      });
      it('should not close the lookup', function() {
        // TODO test not working due to bootstrap.js
        //expect(dropdownToggle.hasClass('open')).toBe(true);
        //expect(dropdown.is(':visible')).toBe(true);
      });
    });

    describe('when clicking the "month and year" link', function() {
      var yearLinks;
      beforeEach(function() {
        element.find(YEARS_LINK_SELECTOR)[0].click();
        yearLinks = element.find(YEAR_OPTIONS_SELECTOR);
      });

      it('should show year selector', function() {
        expect(element.find(YEAR_SCREEN_SELECTOR).length).toBe(1);
      });
      it('should hide days selector', function() {
        expect(element.find(DAY_SCREEN_SELECTOR).length).toBe(0);
      });
      it('should show the twenty year period containing the currently selected year', function() {
        expect(yearLinks.length).toBe(20);
        expect($(yearLinks[0]).text().trim()).toBe('2000');
        expect($(yearLinks[19]).text().trim()).toBe('2019');
      });
      it('should not close the lookup', function() {
        // TODO test not working due to bootstrap.js
        //expect(dropdownToggle.hasClass('open')).toBe(true);
        //expect(dropdown.is(':visible')).toBe(true);
      });

      describe('and a min date is present', function() {
        beforeEach(function() {
          $scope.ngMin = getUTCDate(2010,6,15);
          $scope.$digest();
        });

        it('should display years before min year in disabled state', function() {
          expect($(yearLinks[9]).attr('disabled')).toEqual('disabled');
        });
        it('should display year of min date in enabled state', function() {
          expect($(yearLinks[10]).attr('disabled')).toBeUndefined();
        });
        it('should display years after min date in enabled state', function() {
          expect($(yearLinks[11]).attr('disabled')).toBeUndefined();
        });
      });

      describe('and a max date is present', function() {
        beforeEach(function() {
          $scope.ngMax = getUTCDate(2018,0,1);
          $scope.$digest();
        });
        it('should display years after max year in disabled state', function() {
          expect($(yearLinks[19]).attr('disabled')).toEqual('disabled');
        });
        it('should display year of max date in enabled state', function() {
          expect($(yearLinks[18]).attr('disabled')).toBeUndefined();
        });
        it('should display years before min date in enabled state', function() {
          expect($(yearLinks[17]).attr('disabled')).toBeUndefined();
        });
      });

      describe('and then presses the', function() {
        describe('right arrow key', function() {
          beforeEach(function() {
            element.find('a.active')
              .trigger({type: "keydown", keyCode: KEYS.right, which: KEYS.right});
          });
          it('should highlight 1 year after current year', function() {
            expect(element.find('a.active').text().trim()).toEqual('2001');
          });
          //it('should move focus to selected link', function() {
            // TODO activeElement incorrect for some reason
            //expect(element.find('a.active')[0] === document.activeElement).toBe(true);
          //});
        });

        describe('left arrow key', function() {
          beforeEach(function() {
            $scope.ngModel = getUTCDate(2000, 0, 1);
            $scope.$digest();
            element.find('a.active')
              .trigger({type: "keydown", keyCode: KEYS.left, which: KEYS.down.left});
          });
          it('should highlight 1 years before current year', function() {
            expect($scope.ngModel).toEqual(getUTCDate(1999, 0, 1));
            expect(element.find('a.active').text().trim()).toEqual('1999');
          });
        });

        describe('down arrow key', function() {
          beforeEach(function() {
            $scope.ngModel = getUTCDate(2000, 0, 1);
            $scope.$digest();
            element.find('a.active')
              .trigger({type: "keydown", keyCode: KEYS.down, which: KEYS.down});
          });
          it('should highlight 4 years after current year', function() {
            expect(element.find('a.active').text().trim()).toEqual('2004');
          });
        });

        describe('up arrow key', function() {
          beforeEach(function() {
            $scope.ngModel = getUTCDate(2000, 0, 1);
            $scope.$digest();
            element.find('a.active')
              .trigger({type: "keydown", keyCode: KEYS.up, which: KEYS.up});
          });
          it('should highlight 4 years before current year', function() {
            expect(element.find('a.active').text().trim()).toEqual('1996');
          });
        });
      });

      describe('and then clicking the "previous" button', function() {
        it('should show the preceding set of 20 years', function() {
          element.find(PREVIOUS_YEARS_SELECTOR).click();
          var yearLinks = element.find(YEAR_OPTIONS_SELECTOR);
          expect(yearLinks.length).toBe(20);
          expect($(yearLinks[0]).text().trim()).toBe('1980');
          expect($(yearLinks[19]).text().trim()).toBe('1999');
        });
      });

      describe('and then clicking the "next" button', function() {
        it('should show the following set of 20 years', function() {
          element.find(NEXT_YEARS_SELECTOR).click();
          var yearLinks = element.find(YEAR_OPTIONS_SELECTOR);
          expect(yearLinks.length).toBe(20);
          expect($(yearLinks[0]).text().trim()).toBe('2020');
          expect($(yearLinks[19]).text().trim()).toBe('2039');
        });
      });

      describe('and then clicking a year', function() {
        beforeEach(function() {
          element.find(YEAR_OPTIONS_SELECTOR)[10].click();
        });
        it('should hide the year selector', function() {
          expect(element.find(YEAR_SCREEN_SELECTOR).length).toBe(0);
        });
        it('should show the month selector for the clicked year', function() {
          expect(element.find(MONTH_SCREEN_SELECTOR).length).toBe(1);
        });
        it('should show the clicked year', function() {
          expect(element.find(YEAR_LABEL_SELECTOR).text().trim()).toBe('2010');
        });

        describe('and then clicking a month', function() {
          beforeEach(function() {
            element.find(MONTH_OPTIONS_SELECTOR)[6].click();
          });

          it('should hide the month selector', function() {
            expect(element.find(MONTH_SCREEN_SELECTOR).length).toBe(0);
          });
          it('should show the day selector for the clicked month and year', function() {
            expect(element.find(DAY_SCREEN_SELECTOR).length).toBe(1);
            expect(element.find(MONTH_LABEL_SELECTOR).text().trim()).toBe('July 2010');
          });

          describe('and then clicking a day', function() {
            beforeEach(function() {
              element.find(DAY_OPTIONS_SELECTOR)[15].click();
            });
            it('should set the model to selected year, month and day', function() {
              expect($scope.ngModel).toEqual(getUTCDate(2010, 6, 16));
            });
            it('should close the dropdown', function() {
              // TODO test not working due to bootstrap.js
              // expect(dropdownToggle.hasClass('open')).toBe(false);
              //expect(dropdown.is(':visible')).toBe(false);
            });
          });
        });
      });
    });
  });

  var KEYS = {
    left: 37,
    up: 38,
    right: 39,
    down: 40
  };

  function getToday() {
    var now = new Date();
    return getUTCDate(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  }
  function getUTCDate(year, month, day) {
    var dateModel = new Date();
    dateModel.setUTCFullYear(year, month, day);
    dateModel.setUTCHours(0);
    dateModel.setUTCMinutes(0);
    dateModel.setUTCSeconds(0);
    dateModel.setUTCMilliseconds(0);
    return dateModel;
  }

  function expectDateMonthsToBeLocalized(element, locale) {
    var $ctrl = getViewModel(element);
    var localizedMonthNames = getMonthNamesForLocale(locale);
    localizedMonthNames.forEach(function(monthName, index) {
      var upperCaseMonthName = monthName[0].toUpperCase() + monthName.substring(1);
      expect($ctrl.monthsOfYear[index]).toBe(upperCaseMonthName);
    });
  }
  function expectDateMonthsToBeDefault(element) {
    var $ctrl = getViewModel(element);
    ENGLISH_MONTHS.forEach(function(monthName, index) {
      expect($ctrl.monthsOfYear[index]).toBe(monthName);
    });
  }

  function isIntlSupportedForLocale(locale) {
    return window.Intl &&
      typeof window.Intl === 'object' &&
      window.Intl.DateTimeFormat.supportedLocalesOf([locale]).length > 0;
  }

  function getMonthNamesForLocale(locale) {
    var monthNames = [], date = new Date(1990, 0, 14);
    if (isIntlSupportedForLocale(locale)) {
      for (var i=0; i<12; i++) {
        date.setMonth(i);
        monthNames.push(date.toLocaleDateString(locale, {month: 'long'}));
      }
    }
    return monthNames;
  }

  function getCompiledDirectiveElement(scope, template) {
    if (!template) {
      template = " \
        <tw-date-lookup \
          ng-model='ngModel' \
          ng-required='ngRequired' \
          ng-disabled='ngDisabled' \
          ng-min='ngMin' \
          ng-max='ngMax' \
          short-date='shortDate' \
          locale='{{locale}}'> \
        </tw-date-lookup>";
    }

    var element = angular.element(template);
    var compiledElement = $compile(element)(scope);
    scope.$digest();
    return compiledElement;
  }

  function getViewModel(element) {
    return element.isolateScope().$ctrl;
  }
});
