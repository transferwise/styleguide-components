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
