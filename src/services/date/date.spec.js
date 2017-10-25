describe('TwDateService test', function() {
  'use strict';

  var service, $scope, $rootScope, $window;

  beforeEach(module('tw.styleguide-components'));

  beforeEach(inject(function($injector) {
    service = $injector.get('TwDateService');
    $rootScope = $injector.get('$rootScope');
    $window = $injector.get('$window');
    $scope = $rootScope.$new();
  }));

  describe('when English locale', function() {
    it('should provide the correct month names', function () {
      dateFormats.forEach(function(format) {
        var result = service.getMonthNamesForLocale('en-GB', {month: format});
        expect(result).toEqual(expectedEnglishMonths);
      });

    });
    it('should provide the correct day names', function () {
      var result = service.getDayNamesForLocale('en-GB');
      expect(result).toEqual(expectedEnglishDays);
    });
  });

  describe('when Japanese locale', function() {
    it('should provide the correct month names', function () {
      dateFormats.forEach(function(format) {
        var result = service.getMonthNamesForLocale('ja-JP', {month: format});
        expect(result).toEqual(expectedJapaneseMonths);
      });

    });
    it('should provide the correct day names', function () {
      dateFormats.forEach(function(format) {
        var result = service.getDayNamesForLocale('ja-JP', {weekDay: format});
        expect(result).toEqual(expectedJapaneseDays);
      });
    });
  });

  describe('when getting locale date string in en-GB locale', function() {
    var locale, date;
    beforeEach(function() {
      locale = 'en-GB';
      var fakeNow = service.getLocaleDateFromParts(2000, 5, 1, 12, 34);
      spyOn(service, 'getLocaleNow').and.returnValue(fakeNow);
    });

    it('and date is in the last hour', function() {
      date = service.getLocaleDateFromParts(2000, 5, 1, 11, 34);
      expect(service.getLocaleDateString(date, locale)).toEqual('Thursday 11:34am');
    });
    it('and date is in the next hour', function() {
      date = service.getLocaleDateFromParts(2000, 5, 1, 13, 34);
      expect(service.getLocaleDateString(date, locale)).toEqual('Thursday 1:34pm');
    });
    it('and date is tomorrow', function() {
      date = service.getLocaleDateFromParts(2000, 5, 2, 12, 34);
      expect(service.getLocaleDateString(date, locale)).toEqual('Friday 12:34pm');
    });
    it('and date is next week', function() {
      date = service.getLocaleDateFromParts(2000, 5, 8, 12, 34);
      expect(service.getLocaleDateString(date, locale)).toEqual('Thursday 8th');
    });
    it('and date is next month', function() {
      date = service.getLocaleDateFromParts(2000, 6, 1, 12, 34);
      expect(service.getLocaleDateString(date, locale)).toEqual('1st July');
    });
    it('and date is next year', function() {
      date = service.getLocaleDateFromParts(2001, 5, 1, 12, 34);
      expect(service.getLocaleDateString(date, locale)).toEqual('1st June 2001');
    });
  });

  describe('when parsing iso dates', function() {
    describe('with just a date component', function() {
      it('should correctly extract the date parts', function() {
        var dateParts = service.getDatePartsFromIso('2001-05-01');
        expect(dateParts).toEqual([2001, 4, 1, 0, 0, 0, 0, 0]);
      });
    });
    describe('with date and time component', function() {
      it('should correctly extract the date parts', function() {
        var dateParts = service.getDatePartsFromIso('2001-05-01T23:45:43Z');
        expect(dateParts).toEqual([2001, 4, 1, 23 , 45, 43, 0, 0]);
      });
    });
    describe('with date, time and timezone information', function() {
      describe('where timezone is ahead', function() {
        it('should correctly extract the date parts', function() {
          var dateParts = service.getDatePartsFromIso('2001-05-01T23:45:43+10:30');
          expect(dateParts).toEqual([2001, 4, 1, 23, 45, 43, 10, 30]);
        });
      });
      describe('where timezone is behind', function() {
        it('should correctly extract the date parts', function() {
          var dateParts = service.getDatePartsFromIso('2001-05-01T23:45:43-10:30');
          expect(dateParts).toEqual([2001, 4, 1, 23, 45, 43, -10, -30]);
        });
      });
    });
  });

  describe('when converting iso dates to UTC', function() {
    describe('with just a date component', function() {
      it('should provide the right date', function() {
        var date = service.getUTCDateFromIso('2001-12-31');
        expect(date.getUTCFullYear()).toEqual(2001);
        expect(date.getUTCMonth()).toEqual(11);
        expect(date.getUTCDate()).toEqual(31);
        expect(date.getUTCHours()).toEqual(0);
        expect(date.getUTCMinutes()).toEqual(0);
        expect(date.getUTCSeconds()).toEqual(0);
      });
    });
    describe('with date and time component', function() {
      it('should correctly extract the date parts', function() {
        var date = service.getUTCDateFromIso('2001-12-31T23:45:43Z');
        expect(date.getUTCFullYear()).toEqual(2001);
        expect(date.getUTCMonth()).toEqual(11);
        expect(date.getUTCDate()).toEqual(31);
        expect(date.getUTCHours()).toEqual(23);
        expect(date.getUTCMinutes()).toEqual(45);
        expect(date.getUTCSeconds()).toEqual(43);
      });
    });
    describe('with date, time and timezone information', function() {
      it('should correctly extract the date parts', function() {
        var date = service.getUTCDateFromIso('2001-12-31T23:45:43+02:30');
        expect(date.getUTCFullYear()).toEqual(2002);
        expect(date.getUTCMonth()).toEqual(0);
        expect(date.getUTCDate()).toEqual(1);
        expect(date.getUTCHours()).toEqual(2);
        expect(date.getUTCMinutes()).toEqual(15);
        expect(date.getUTCSeconds()).toEqual(43);
      });
    });
  });

  describe('when validating an iso date', function() {
    it('should correctly validate an ISO date ', function() {
      expect(service.isIsoStringValid('2001-12-31')).toBe(true);
    });
    it('should correctly validate an ISO date and time', function() {
      expect(service.isIsoStringValid('2001-12-31T12:34:56Z')).toBe(true);
    });
    it('should correctly validate an ISO date, time and timezone', function() {
      expect(service.isIsoStringValid('2001-12-31T12:34:56+10:00')).toBe(true);
      expect(service.isIsoStringValid('2001-12-31T12:34:56-02')).toBe(true);
    });

    it('should return false for invalid strings', function() {
      expect(service.isIsoStringValid('2001-12-3')).toBe(false);
      expect(service.isIsoStringValid('2001-12-31T')).toBe(false);
      expect(service.isIsoStringValid('2001-12-31T12')).toBe(false);
      expect(service.isIsoStringValid('2001-12-31T12:34:56')).toBe(false);
      expect(service.isIsoStringValid('2001-12-31T12:34:56+')).toBe(false);
      expect(service.isIsoStringValid('2001-12-31T12:34:56+10:')).toBe(false);
    });
  });

  function isPhantomJsBrowser() {
    //PhantomJS can't do translation to Japanese
    return $window.navigator.userAgent.indexOf("PhantomJS") !== -1
  }

  var expectedEnglishMonths = [
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
  var expectedEnglishDays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];
  var expectedJapaneseMonths = [
    '1月', '2月', '3月', '4月', '5月', '6月',
    '7月', '8月', '9月', '10月', '11月', '12月'
  ];
  var expectedJapaneseDays = ['日', '月', '火', '水', '木', '金', '土'];
  var dateFormats = ['narrow', 'short', 'long', null];

});
