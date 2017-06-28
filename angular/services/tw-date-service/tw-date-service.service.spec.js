describe('TwDateService test', function() {
	'use strict';

	var service, $scope, $rootScope, $window;

	beforeEach(module('tw.form-components'));

	beforeEach(inject(function($injector) {
		service = $injector.get('TwDateService');
		$rootScope = $injector.get('$rootScope');
		$window = $injector.get('$window');
		$scope = $rootScope.$new();
	}));

	describe('fetched correctly', function() {                    
		it('month names for Japanese locale', function () {
			dateFormats.forEach(function(format) {
				var result = service.getMonthNamesForLocale('ja-JP', {month: format});
				expect(result).toEqual(expectedJapaneseMonths);
			});
			
		});
		it('day names for Japanese locale', function () {
			dateFormats.forEach(function(format) {
				var result = service.getDayNamesForLocale('ja-JP', {weekDay: format});
				expect(result).toEqual(expectedJapaneseDays);
			});
		});
	});
	function isPhantomJsBrowser() {
		//PhantomJS can't do translation to Japanese
		return $window.navigator.userAgent.indexOf("PhantomJS") !== -1
	}
	
	var expectedJapaneseMonths = [ '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月' ];
	var expectedJapaneseDays = [ '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日', '日曜日' ];
	var dateFormats = ['narrow', 'short', 'long', null];

});