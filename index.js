
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

	this.date = {required: true};
	this.dynamic = {
		required: true,
		options: [
			{value: '1', label: 'One'},
			{value: '2', label: 'Two'},
			{value: '3', label: 'Three'},
		]
	};

	this.sizes = [
		{value:'sm',label:'Small'},
		{value:'md',label:'Medium'},
		{value:'lg',label:'Large'}
	];

	// Used by twAmountCurrencySelect docs
	this.currencySelect = [
		{header: 'Popular currencies'},
		{value: 'eur', label: 'EUR', note: 'Euro', currency: 'EUR', searchable: 'Spain, Germany, France, Austria, Estonia'},
		{value: 'gbp', label: 'GBP', note: 'Great British Pound', currency: 'GBP', searchable: 'England, Scotland, Wales'},
		{value: 'usd', label: 'USD', note: 'United States Dollar', currency: 'USD', searchable: 'Hong Kong, Saudi Arabia'},
		{header: 'All currencies'},
		{value: 'aud', label: 'AUD', note: 'Australian Dollar', currency: 'AUD'}
	];

	// Used by twValidation docs
	this.basicSelect = [
		{value: 0, label: 'Zero'},
		{value: 1, label: 'One'},
		{value: 2, label: 'Two'},
		{value: 3, label: 'Three'}
	];

	this.locales = [
		{'value': 'en-GB', 'label': 'English UK'},
		{'value': 'en-US', 'label': 'English US'},
		{'value': 'fr-FR', 'label': 'French'},
		{'value': 'es-ES', 'label': 'Spanish'},
		{'value': 'es-US', 'label': 'Spanish US'},
		{'value': 'pt-BR', 'label': 'Brazillian Portuguese'},
		{'value': 'ja-JP', 'label': 'Japanese'},
		{'value': 'xx-XX', 'label': 'Unknown locale'}
	];

	var initialDate = new Date('2000-01-10');
	this.model = {
		components: {
			dateLookup: initialDate
		}
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
.directive('docsErrorMessages', function() {
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
.directive('docsStatusMessages', function() {
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
.component('twSelectDocs', {
	templateUrl: 'partials/tw-select.html',
	bindings: {
		model: '='
	},
	controller: function() {
		var $ctrl = this;
		$ctrl.select = {
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
				{value: 'disabled', label: 'Disabled option'},
				{value: 'currencySelect', label: 'Example: Currency select'},
				{value: 'accountSelect', label: 'Example: Account select'}
			],
			options: {
				standard: [
					{value: 0, label: 'Zero'},
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
				disabled: [
					{value: '1', label: 'Enabled option'},
					{value: '2', label: 'Disabled option', disabled: true},
					{value: '3', label: 'Second option'}
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
			$ctrl.select.options.long.push({value: String(i), label: String(i)});
		}

		$ctrl.hideOptions = [
			{value: 'true', label: 'All widths'},
			{value: 'xs', label: 'xs grid'},
			{value: 'sm', label: 'sm grid'},
			{value: 'md', label: 'md grid'},
			{value: 'lg', label: 'lg grid'},
			{value: 'xl', label: 'xl grid'},
			{value: 'xs,sm', label: 'xs and sm grid'},
			{value: 'md,lg,xl', label: 'md, lg and xl grid'}
		];

		$ctrl.log = function(message) {
			console.log(message);
		}
	}
})
.component('twUploadDocs', {
		controller: ['$timeout', '$q', '$http', function($timeout, $q, $http) {
			var $ctrl = this;
			$ctrl.onStart = function(file) {
				console.log("File upload starting");
			};
			$ctrl.onSuccess = function(response) {
				console.log('File upload complete');
			};
			$ctrl.onFailure = function(error) {
				console.log('File upload failure');
				if (error.status === 404) {
					$ctrl.errorMessage = 'Bad URL';
				} else {
					$ctrl.errorMessage = 'Unknown error';
				}
			};
			$ctrl.onCancel= function() {
				console.log('File upload cancelled');
			};

			$ctrl.makeFancy = function() {
				$ctrl.description = "Front of your ID document";
				$ctrl.processingText = "Processing...";
				$ctrl.successText = "Upload complete!";
				$ctrl.failureText = "Upload failed!";
				$ctrl.completeText = "Front of ID";
			};

			$ctrl.acceptOptions = [
				{value: '.png', label: 'PNG (.png)'},
				{value: '.jpg,.jpeg', label: 'JPG (.jpg,.jpeg)'},
				{value: 'image/*', label: 'Images (image/*)'},
				{value: 'video/*', label: 'Video (video/*)'},
				{value: 'audio/*', label: 'Audio (audio/*)'}
			];
		}],
		templateUrl: 'partials/tw-upload.html'
})
.directive('twDateDocs', function() {
	return {templateUrl: 'partials/tw-date.html'};
})
.directive('twDateLookupDocs', function() {
	return {templateUrl: 'partials/tw-date-lookup.html'};
})
.directive('twCurrencyInputDocs', function() {
	return {templateUrl: 'partials/tw-currency-input.html'};
})
.directive('twDynamicControlDocs', function() {
	return {templateUrl: 'partials/tw-dynamic-control.html'};
})
.component('twRequirementsFormDocs', {
	controller: ['$scope', '$http', function($scope, $http) {
		var $ctrl = this;
		$ctrl.types = [
			{'value': 'account', 'label': 'Account'},
			{'value': 'profile', 'label': 'Profile'},
			{'value': 'verification', 'label': 'Verification'},
			{'value': 'pay-in', 'label': 'Pay in'}
		];
		$ctrl.type = 'profile';

		$ctrl.model.firstName = '01010101010';

		$scope.$watch('$ctrl.type', function(newVal) {
			$http.get('partials/'+newVal+'-requirements.json').then(function(response) {
				$ctrl.requirements = response.data;
			});
		});

		$ctrl.addError = function() {
			var key = getFirstRequirementKey($ctrl.requirements);
			$ctrl.errorMessages = {};
			$ctrl.errorMessages[key] = "Server doesn't like this value";
		};

		function getFirstRequirementKey(requirements) {
			var key;
			$ctrl.requirements.forEach(function(requirementType) {
				requirementType.fields.forEach(function(fieldGroup) {
					fieldGroup.group.forEach(function(field) {
						if (!key) {
							key = field.key;
						}
					})
				});
			});
			return key;
		}
	}],
	bindings: {
		model: "="
	},
	templateUrl: 'partials/tw-requirements-form.html'
})
.directive('twValidationDocs', function() {
	return {templateUrl: 'partials/tw-validation.html'};
})
.directive('twFocusableDocs', function() {
	return {templateUrl: 'partials/tw-focusable.html'};
})
.component('twTextFormatDocs', {
	controller: function() {
		var $ctrl = this;
		$ctrl.patterns = [
			{
				value: {
					format: '**** **** **** ****',
					minlength: 16,
					maxlength: 20,
					placeholder: 'Number on the front of your card',
					helpText: 'Credit/debit cards have either 16 or 20 digits'
				},
				label: 'Credit card number',
				note: '**** **** **** ****'
			},
			{
				value: {
					format: '** / **',
					minlength: 4,
					maxlength: 4,
					placeholder: 'MM / YY',
					helpText: 'Month, then year'
				},
				label: 'Card expiry',
				note: '** / **'
			},
			{
				value: {
					format: '** - ** - **',
					minlength: 6,
					maxlength: 7,
					placeholder: '** - ** - **',
					helpText: 'UK sort codes have 6 or 7 digits'
				},
				label: 'UK sort code',
				note: '** - ** - **',
			},
			{
				value: {
					format: '(+**) **** *** ***',
					minlength: 10,
					maxlength: 12,
					placeholder: '(+**) **** *** ***'
				},
				label: 'UK phone number',
				note: '(+**) **** *** ***',
			},
			{
				value: {
					format: '***.***.***-**',
					minlength: 11,
					maxlength: 11,
					placeholder: '***.***.***-**'
				},
				label: 'Brazilian CPF ID',
				note: '***.***.***-**',
			},
			{
				value: {
					format: '**.***.*** - *',
					minlength: 9,
					maxlength: 9,
					placeholder: '**.***.*** - *'
				},
				label: 'Chilean RUT ID',
				note: '**.***.*** - *',
			},
			{
				value: {
					format: '** ***||*** ***||**** ***',
					minlength: 5,
					maxlength: 7,
					placeholder: 'UK Postcode'
				},
				label: 'UK post code ',
				note: '** ***||*** ***||**** ***',
			},
		];
	},
	bindings: {
		model: "="
	},
	templateUrl: 'partials/tw-text-format.html'
})
.directive('twPopOverDocs', function() {
	return {templateUrl: 'partials/tw-pop-over.html'};
})
.directive('twToolTipDocs', function() {
	return {templateUrl: 'partials/tw-tool-tip.html'};
})
.directive('twAffixDocs', function() {
	return {templateUrl: 'partials/tw-affix.html'};
})
.directive('twProcessDocs', function() {
	return {templateUrl: 'partials/tw-process.html'};
});
