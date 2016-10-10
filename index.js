
angular.module('my-app', ['tw.styleguide-components'])
.config(['$compileProvider', function ($compileProvider) {
	$compileProvider.debugInfoEnabled(false);
}])
.controller('PageController', [function() {
	var vm = this;
	this.log = function(message) {
		console.log(message);
	};
	this.radio = {required: true};
	this.checkbox = {required: true};
	this.select = {
		required: true,
		empty: 'Select an option...',
		type: 'standard',
		types: [
			{value: 'standard', label: 'Standard'},
			{value: 'icons', label: 'Icons'},
			{value: 'currencies', label: 'Currencies'},
			{value: 'notes', label: 'Notes'},
			{value: 'headers', label: 'Headers'},
			{value: 'secondary', label: 'Secondary text'},
			{value: 'searchable', label: 'Searchable text'},
			{value: 'circles', label: 'Circles'},
			{value: 'long', label: 'Long list'},
			{value: 'currencySelect', label: 'Example: Currency select'},
			{value: 'accountSelect', label: 'Example: Account select'}
		],
		options: {
			standard: [
				{value: 1, label: 'One'},
				{value: 2, label: 'Two'},
				{value: 3, label: 'Three'}
			],
			icons: [
				{value: {id: '1'}, label: 'Profile', icon: 'icon-profile'},
				{value: {id: '2'}, label: 'Globe', icon: 'icon-globe'},
				{value: {id: '3'}, label: 'Bank', icon: 'icon-bank'}
			],
			currencies: [
				{value: 'eur', label: 'Euro', currency: 'EUR'},
				{value: 'gbp', label: 'British Pound', currency: 'GBP'},
				{value: 'usd', label: 'US Dollar', currency: 'USD'}
			],
			notes: [
				{value: 'eur', label: 'EUR', note: 'Euro'},
				{value: 'gbp', label: 'GBP', note: 'Great British Pound'},
				{value: 'usd', label: 'USD', note: 'United States Dollar'}
			],
			headers: [
				{header: 'Header'},
				{value: 'opt1', label: 'Option 1'},
				{header: 'Another header'},
				{value: 'opt2', label: 'Option 2'}
			],
			secondary: [
				{value: '1', label: 'Bob Smith', secondary: 'Account ending 1234'},
				{value: '2', label: 'James Davies', secondary: 'Account ending 9876'},
				{value: '3', label: 'Helen Williams', secondary: 'Accont ending 4321'}
			],
			searchable: [
				{value: 'eur', label: 'Euro', searchable: 'Austria, France, Germany, Spain'},
				{value: 'usd', label: 'Dollar', searchable: 'United States, Hong Kong, Saudi Arabia'},
				{value: 'gbp', label: 'Pound', searchable: 'Great britain, England, Scotland'}
			],
			circles: [
				{value: '1', label: 'Bob Smith', circleImage: 'images/mike.jpg'},
				{value: '2', label: 'James Davies', circleIcon: 'icon-bank'},
				{value: '3', label: 'Helen Williams', circleText: 'AZ'}
			],
			currencySelect: [
				{header: 'Popular currencies'},
				{value: 'eur', label: 'EUR', note: 'Euro', currency: 'EUR', searchable: 'Spain, Germany, France, Austria, Estonia'},
				{value: 'gbp', label: 'GBP', note: 'Great British Pound', currency: 'GBP', searchable: 'England, Scotland, Wales'},
				{value: 'usd', label: 'USD', note: 'United States Dollar', currency: 'USD', searchable: 'Hong Kong, Saudi Arabia'},
				{header: 'All currencies'},
				{value: 'aud', label: 'AUD', note: 'Australian Dollar', currency: 'AUD'}
			],
			accountSelect: [
				{value: '1', label: 'Bob Smith', note: "GBP", secondary: 'Account ending 1234', circleImage: "images/mike.jpg"},
				{value: '2', label: 'James Davies', note: "GBP", secondary: 'Account ending 9876', circleText: "JD"},
				{value: '3', label: 'Helen Williams', note: "EUR", secondary: 'Accont ending 4321', circleText: "HW"}
			],
			long: [{header: "example header"}]
		}
	};
	for(var i=0; i<999; i++) {
		this.select.options.long.push({value: String(i), label: String(i)});
	}
	this.date = {required: true};
	this.dynamic = {
		required: true,
		options: [
			{value: '1', label: 'One'},
			{value: '2', label: 'Two'},
			{value: '3', label: 'Three'},
		]
	};
}])
.directive('validateRegexp', function($q) {
	return {
		require: 'ngModel',
		link: function(scope, element, attrs, ngModel) {
			ngModel.$asyncValidators.async = function(modelValue, viewValue) {
				try {
					var reg = new RegExp(viewValue);
					return $q.when(true);
				} catch(error) {
					return $q.reject(false);
				}
			};
		}
	};
})
.directive('errorMessages', function() {
	return {
		replace: true,
		template: " \
		<div class='error-messages'> \
			<div class='error-required'>Required</div> \
			<div class='error-minlength'>Too short</div> \
			<div class='error-maxlength'>Too long</div> \
			<div class='error-pattern'>Invalid characters</div> \ \
			<div class='error-async'>Invalid async</div> \
		</div>"
	};
})
.directive('statusMessages', function() {
	return {
		replace: true,
		template: " \
		<div class='status-messages'> \
			<div class='touched'>Touched</div> \
			<div class='untouched'>Untouched</div> \
			<div class='pristine'>Pristine</div> \
			<div class='dirty'>Dirty</div> \
		</div>"
	};
})
.directive('twAmountCurrencySelectDocs', function() {
	return {templateUrl: 'partials/tw-amount-currency-select.html'};
})
.directive('twCheckboxDocs', function() {
	return {templateUrl: 'partials/tw-checkbox.html'};
})
.directive('twRadioDocs', function() {
	return {templateUrl: 'partials/tw-radio.html'};
})
.directive('twSelectDocs', function() {
	return {templateUrl: 'partials/tw-select.html'};
})
.directive('twDateDocs', function() {
	return {templateUrl: 'partials/tw-date.html'};
})
.directive('twCurrencyInputDocs', function() {
	return {templateUrl: 'partials/tw-currency-input.html'};
})
.directive('twDynamicControlDocs', function() {
	return {templateUrl: 'partials/tw-dynamic-control.html'};
})
.directive('twDynamicFormDocs', function() {
	return {
		controllerAs: "$ctrl",
		bindToController: true,
		controller: ['$http', function($http) {
			var $ctrl = this;
			$ctrl.types = [
				{'value': 'account', 'label': 'Account'},
				{'value': 'profile', 'label': 'Profile'}
			];
			$ctrl.type = 'account';
			$http.get('partials/requirements.json').then(function(response) {
				$ctrl.requirements = response.data;
			});
		}],
		scope: {
			model: "="
		},
		templateUrl: 'partials/tw-dynamic-form.html'
	};
})
.directive('twValidationDocs', function() {
	return {templateUrl: 'partials/tw-validation.html'};
})
.directive('twFocusableDocs', function() {
	return {templateUrl: 'partials/tw-focusable.html'};
});
