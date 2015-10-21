describe('Controller: TwSortCodeController', function() {
	var TwSortCodeController,
		$scope;

	beforeEach(function() {
		// Load the necessary modules
		module('tw.styleguide-components');
	});

	beforeEach(inject(function($injector, $controller) {
		$rootScope = $injector.get('$rootScope');
		$scope = $rootScope.$new();

		TwSortCodeController = $controller('TwSortCodeController', {$scope: $scope});
	}));

	describe('init()', function() {
		beforeEach(function() {
			spyOn(TwSortCodeController, 'explodeSortCode');
			TwSortCodeController.sortCode = '123456';
		});

		it("should explode initial sort code", function() {
			TwSortCodeController.init();

			expect(TwSortCodeController.explodeSortCode).toHaveBeenCalledWith('123456');
		});
	});

	describe('explodeSortCode()', function() {
		it("should split a valid sort code into parts", function() {
			TwSortCodeController.explodeSortCode('123456');

			expect(TwSortCodeController.firstTwo).toBe('12');
			expect(TwSortCodeController.secondTwo).toBe('34');
			expect(TwSortCodeController.thirdTwo).toBe('56');
		});

		it("should split a valid sort code into parts when begins with 0", function() {
			TwSortCodeController.explodeSortCode('010203');

			expect(TwSortCodeController.firstTwo).toBe('01');
			expect(TwSortCodeController.secondTwo).toBe('02');
			expect(TwSortCodeController.thirdTwo).toBe('03');
		});

		it("should not split invalid sort code into components", function() {
			TwSortCodeController.firstTwo = '98';
			TwSortCodeController.secondTwo = '76';
			TwSortCodeController.thirdTwo = '54';

			TwSortCodeController.explodeSortCode('12345');

			expect(TwSortCodeController.firstTwo).toBe('98');
			expect(TwSortCodeController.secondTwo).toBe('76');
			expect(TwSortCodeController.thirdTwo).toBe('54');
		});
	});

	describe('updateSortCode()', function() {
		it("should join valid parts into a sort code", function() {
			TwSortCodeController.firstTwo = '12';
			TwSortCodeController.secondTwo = '34';
			TwSortCodeController.thirdTwo = '56';

			TwSortCodeController.updateSortCode();

			expect(TwSortCodeController.sortCode).toBe('123456');
		});

		it("should set sortCode=null when invalid parts", function() {
			TwSortCodeController.firstTwo = '12';
			TwSortCodeController.secondTwo = '34';
			TwSortCodeController.thirdTwo = '5';

			TwSortCodeController.updateSortCode();

			expect(TwSortCodeController.sortCode).toBe(null);
		});
	});

	describe('validSortCode()', function() {
		it("should return true for valid sort codes", function() {
			expect(TwSortCodeController.validSortCode("123456")).toBe(true);
			expect(TwSortCodeController.validSortCode("654321")).toBe(true);
		});

		it("should return false for invalid sort codes", function() {
			expect(TwSortCodeController.validSortCode("12345")).toBe(false);
			expect(TwSortCodeController.validSortCode("6543A1")).toBe(false);
		});
	});
});
