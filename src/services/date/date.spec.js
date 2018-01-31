describe('TwDateService test', function() {
  'use strict';

  var service;

  var dateFormats = ['narrow', 'short', 'long', null];

  beforeEach(module('tw.styleguide-components'));

  beforeEach(inject(function($injector) {
    service = $injector.get('TwDateService');
  }));

  describe('when English locale', function() {
    dateFormats.forEach(function(format) {
      describe(' and ' + format + ' format', function() {
        it('should provide the correct month names', function () {
          var result = service.getMonthNamesForLocale('en-GB', format);
          if (format) {
            expect(result).toEqual(englishMonths[format]);
          } else {
            expect(result).toEqual(englishMonths['long']);
          }
        });
        it('should provide the correct day names', function () {
          var result = service.getDayNamesForLocale('en-GB', format);
          if (format) {
            expect(result).toEqual(englishDays[format]);
          } else {
            expect(result).toEqual(englishDays['long']);
          }
        });
      });
    });
  });

  describe('when Japanese locale', function() {
    dateFormats.forEach(function(format) {
      describe(' and ' + format + ' format', function() {
        it('should provide the correct month names', function () {
          var result = service.getMonthNamesForLocale('ja-JP', format);
          expect(result).toEqual(expectedJapaneseMonths);
        });
        it('should provide the correct day names', function () {
          var result = service.getDayNamesForLocale('ja-JP', format);
          expect(result).toEqual(expectedJapaneseDays);
        });
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
    describe('with milliseconds', function() {
      it('should correctly extract the date parts', function() {
        var dateParts = service.getDatePartsFromIso('2001-05-01T23:45:43.123+10:30');
        expect(dateParts).toEqual([2001, 4, 1, 23, 45, 43, 10, 30]);
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
      expect(service.isIsoStringValid('2001-12-31T12:34:56-02')).toBe(true);
      expect(service.isIsoStringValid('2001-12-31T12:34:56+10:00')).toBe(true);
    });
    it('should correctly validate a full ISO date with milliseconds', function() {
      expect(service.isIsoStringValid('2001-12-31T12:34:56.789Z')).toBe(true);
      expect(service.isIsoStringValid('2001-12-31T12:34:56.789-02')).toBe(true);
      expect(service.isIsoStringValid('2001-12-31T12:34:56.789+10:00')).toBe(true);
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
    return window.navigator.userAgent.indexOf("PhantomJS") !== -1
  }

  var englishMonths = {
    short: ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sep','Oct','Nov','Dec'],
    long: [
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
    ]
  };

  // Narrow is unsupported for months, so fall back to long names.
  englishMonths.narrow = englishMonths.long;

  var englishDays = {
    narrow: ['S','M','T','W','T','F','S'],
    short: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    long: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ]
  };

  var expectedJapaneseMonths = [
    '1月', '2月', '3月', '4月', '5月', '6月',
    '7月', '8月', '9月', '10月', '11月', '12月'
  ];
  var expectedJapaneseDays = ['日', '月', '火', '水', '木', '金', '土'];

});
