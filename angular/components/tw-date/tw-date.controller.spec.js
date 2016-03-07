describe('Controller: TwDateController', function() {
	var TwDateController,
		_$controller,
		$scope;

	beforeEach(function() {
		module('tw.form-components');
	});

	beforeEach(inject(function($injector, $controller) {
		$rootScope = $injector.get('$rootScope');
		$scope = $rootScope.$new();
		_$controller = $controller;
	}));

	describe('explodeDateModel()', function() {
		it("should split a valid string date into parts", function() {
			var inputDate = "2000-02-03";
			initController({date: inputDate});

			TwDateController.explodeDateModel();

			expect(TwDateController.day).toBe(3);
			expect(TwDateController.month).toBe(2);
			expect(TwDateController.year).toBe(2000);
		});

		it("should split invalid string date into NaN", function() {
			var inputDate = "2000-02-03T";
			initController({date: inputDate});

			TwDateController.explodeDateModel();

			expect(TwDateController.day).toBeNaN();
			expect(TwDateController.month).toBeNaN();
			expect(TwDateController.year).toBeNaN();
		});

		it("should split a valid date object into parts", function() {
			var inputDate = new Date("2000-02-03");
			initController({date: inputDate});

			TwDateController.explodeDateModel();

			expect(TwDateController.day).toBe(3);
			expect(TwDateController.month).toBe(2);
			expect(TwDateController.year).toBe(2000);
		});

	});

	describe('updateDateModel()', function() {

		describe('when string mode', function() {
			var inputDate;
			beforeEach(function() {
				inputDate = "2000-02-03";
				initController({date: inputDate});
			});

			it("should join valid parts into a string date", function() {
				TwDateController.day = 31;
				TwDateController.month = 12;
				TwDateController.year = 2000;

				TwDateController.updateDateModel();

				expect(TwDateController.date).toBe("2000-12-31");
			});

			it("should set date=null when invalid parts", function() {
				TwDateController.day = null;
				TwDateController.month = 13;
				TwDateController.year = 2000;

				TwDateController.updateDateModel();

				expect(TwDateController.date).toBe(null);
			});

			it("should set date=null when invalid parts", function() {
				TwDateController.day = null;
				TwDateController.month = 13;
				TwDateController.year = 2000;

				TwDateController.updateDateModel();

				expect(TwDateController.date).toBe(null);
			});

			it("should correct a high day", function() {
				TwDateController.day = 30;
				TwDateController.month = 2;
				TwDateController.year = 2015;

				TwDateController.updateDateModel();

				expect(TwDateController.date).toBe("2015-02-28");
			});
		});

		describe('when object mode', function() {
			var inputDate;
			beforeEach(function() {
				inputDate = new Date("2000-12-31");
				initController({date: inputDate});
			});

			it("should join valid parts into an object date", function() {
				TwDateController.day = 31;
				TwDateController.month = 12;
				TwDateController.year = 2001;

				TwDateController.updateDateModel();

				expect(TwDateController.date).toEqual(new Date("2001-12-31"));
			});
		});

	});

	fdescribe('validDateModel()', function() {
		beforeEach(function() {
			initController();
		});
		it("should return true for valid Date date", function() {
			TwDateController.date = new Date("2000-01-01");
			expect(TwDateController.validDateModel()).toBe(true);
		});

		it("should return false for invalid Date date", function() {
			TwDateController.date = new Date("2000-01-01T");
			expect(TwDateController.validDateModel()).toBe(false);
		});

		it("should return true for valid ISO8601 date", function() {
			TwDateController.date = "1990-02-28T00:00:00.000Z";
			expect(TwDateController.validDateModel()).toBe(true);
		});

		it("should return false for invalid ISO8601 date", function() {
			TwDateController.date = "1990-02-28T";
			expect(TwDateController.validDateModel()).toBe(false);
		});
	});

	describe('correctHighDay()', function() {
		beforeEach(function() {
			initController();
		});
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

	function initController(inputModel) {
		TwDateController = _$controller(
			'TwDateController',
			{
				'$scope': $scope,
				'$element': angular.element('<div></div>')
			},
			inputModel
		);
		$scope.vm = TwDateController;
		$rootScope.$apply();
	}
});
