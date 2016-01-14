describe('Controller: TwDateController', function() {
	var TwDateController,
		$scope;

	beforeEach(function() {
		// Load the necessary modules
		module('tw.transfer-request.services');
		module('tw.form-components');
	});

	beforeEach(inject(function($injector, $controller) {
		$rootScope = $injector.get('$rootScope');
		$scope = $rootScope.$new();

		TwDateController = $controller('TwDateController', {$scope: $scope});
	}));

	describe('init()', function() {
		beforeEach(function() {
			spyOn(TwDateController, 'explodeDate');
			TwDateController.date = "2000-02-03";
		});

		it("should explode initial date", function() {
			TwDateController.init();

			expect(TwDateController.explodeDate).toHaveBeenCalledWith("2000-02-03");
		});
	});

	describe('explodeDate()', function() {
		it("should split a valid string date into parts", function() {
			TwDateController.explodeDate("2000-02-03");

			expect(TwDateController.day).toBe(3);
			expect(TwDateController.month).toBe(2);
			expect(TwDateController.year).toBe(2000);
		});

		it("should split invalid string date into nulls", function() {
			TwDateController.explodeDate("2000-02-03T");

			expect(TwDateController.day).toBe(null);
			expect(TwDateController.month).toBe(1);
			expect(TwDateController.year).toBe(null);
		});

		it("should split a valid date object into parts", function() {
			TwDateController.explodeDate(new Date("2000-02-03"));

			expect(TwDateController.day).toBe(3);
			expect(TwDateController.month).toBe(2);
			expect(TwDateController.year).toBe(2000);
		});

	});

	describe('updateDate()', function() {

		describe('when string mode', function() {
			beforeEach(function() {
				TwDateController.dateMode = "string";
			});

			it("should join valid parts into a string date", function() {
				TwDateController.day = 31;
				TwDateController.month = 12;
				TwDateController.year = 2000;

				TwDateController.updateDate();

				expect(TwDateController.date).toBe("2000-12-31");
			});


			it("should set date=null when invalid parts", function() {
				TwDateController.day = null;
				TwDateController.month = 13;
				TwDateController.year = 2000;

				TwDateController.updateDate();

				expect(TwDateController.date).toBe(null);
			});

			it("should set date=null when invalid parts", function() {
				TwDateController.day = null;
				TwDateController.month = 13;
				TwDateController.year = 2000;

				TwDateController.updateDate();

				expect(TwDateController.date).toBe(null);
			});

			it("should correct a high day", function() {
				TwDateController.day = 30;
				TwDateController.month = 2;
				TwDateController.year = 2015;

				TwDateController.updateDate();

				expect(TwDateController.date).toBe("2015-02-28");
			});
		});

		describe('when object mode', function() {
			beforeEach(function() {
				TwDateController.dateMode = "object";
			});

			it("should join valid parts into an object date", function() {
				TwDateController.day = 31;
				TwDateController.month = 12;
				TwDateController.year = 2000;

				TwDateController.updateDate();

				expect(TwDateController.date).toEqual(new Date("2000-12-31"));
			});
		});

	});

	describe('validDate()', function() {
		it("should return true for valid sort codes", function() {
			expect(TwDateController.validDate(new Date("2000-01-01"))).toBe(true);
			expect(TwDateController.validDate(new Date("2000-12-31"))).toBe(true);
		});

		it("should return false for invalid sort codes", function() {
			expect(TwDateController.validDate(new Date("2000-01-01T"))).toBe(false);
			expect(TwDateController.validDate(new Date("2000-13-01"))).toBe(false);
		});
	});

	describe('correctHighDay()', function() {
		it("should set last day in Feb to 28 if higher", function() {
			expect(TwDateController.correctHighDay(29,2,2015)).toBe(28);
		});
		it("should set last day in April to 30 if higher", function() {
			expect(TwDateController.correctHighDay(31,4,2015)).toBe(30);
		});
		it("should set last day in Feb to 29 in leap years", function() {
			expect(TwDateController.correctHighDay(30,2,2016)).toBe(29);
			expect(TwDateController.correctHighDay(29,2,2016)).toBe(29);
			expect(TwDateController.correctHighDay(30,2,2000)).toBe(29);
		});
		it("should set last day in December to 31 if higher", function() {
			expect(TwDateController.correctHighDay(32,12,2015)).toBe(31);
		});
	});
});
