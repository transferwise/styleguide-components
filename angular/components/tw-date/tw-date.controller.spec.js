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
			expect(TwDateController.month).toBe(1);
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
			expect(TwDateController.month).toBe(1);
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
				TwDateController.month = 11;
				TwDateController.year = 2000;

				TwDateController.updateDateModel();

				expect(TwDateController.date).toBe("2000-12-31");
			});

			it("should set date=null when invalid parts", function() {
				TwDateController.day = null;
				TwDateController.month = 12;
				TwDateController.year = 2000;

				TwDateController.updateDateModel();

				expect(TwDateController.date).toBe(null);
			});

			it("should correct a high day", function() {
				TwDateController.day = 30;
				TwDateController.month = 1;
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
				TwDateController.month = 11;
				TwDateController.year = 2001;

				TwDateController.updateDateModel();

				expect(TwDateController.date).toEqual(new Date("2001-12-31"));
			});
		});

	});

	describe('validDateModel()', function() {
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

	describe('adjustLastDay()', function() {
		beforeEach(function() {
			initController({date: "2015-01-31"});
		});

		it('should adjust vm.day correctly for February', function () {
			TwDateController.month = 1;

			TwDateController.adjustLastDay();

			expect(TwDateController.day).toBe(28);
		});
		it('should adjust vm.day correctly for February for a leap year', function () {
			TwDateController.month = 1;
			TwDateController.year = 2000;

			TwDateController.adjustLastDay();

			expect(TwDateController.day).toBe(29);
		});
		it('should adjust vm.day correctly for April', function () {
			TwDateController.month = 3;

			TwDateController.adjustLastDay();

			expect(TwDateController.day).toBe(30);
		});
		it('should adjust vm.day if out of range', function () {
			TwDateController.month = 11;
			TwDateController.day = 32;

			TwDateController.adjustLastDay();

			expect(TwDateController.day).toBe(31);
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
