
angular.module('tw.styleguide.docs', [])
.config(['$compileProvider', function ($compileProvider) {
  $compileProvider.debugInfoEnabled(false);
}])
.component('docsNavigation', {
  templateUrl: 'partials/navigation.html'
})
.component('formComponents', {
  bindings: {
    model: '=',
    locales: '=',
    sizes: '='
  },
  templateUrl: 'partials/forms/index.html'
})
.controller('PageController', function() {
  this.log = function(message) { console.log(message); };

  this.model = {
    components: {}
  };

  this.sizes = [
    {value:'sm', label:'Small'},
    {value:'md', label:'Medium'},
    {value:'lg', label:'Large'}
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
})
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
.component('twAmountCurrencySelectDocs', {
  bindings: {
    model: '=',
    currency: '=',
    sizes: '='
  },
  controller: function() {
    this.currencySelect = [
      {header: 'Popular currencies'},
      {value: 'eur', label: 'EUR', note: 'Euro', currency: 'EUR', searchable: 'Spain, Germany, France, Austria, Estonia'},
      {value: 'gbp', label: 'GBP', note: 'Great British Pound', currency: 'GBP', searchable: 'England, Scotland, Wales'},
      {value: 'usd', label: 'USD', note: 'United States Dollar', currency: 'USD', searchable: 'Hong Kong, Saudi Arabia'},
      {header: 'All currencies'},
      {value: 'aud', label: 'AUD', note: 'Australian Dollar', currency: 'AUD'}
    ];

    this.currency = 'eur';

    this.amountCurrencySelect = {
      size: 'md',
      required: false,
      disabled: false,
      customActionLabel: 'Can\'t find your currency?',
      currencyFilterPlaceholder: 'Search...',
      lockTooltipTitle: 'some title',
      lockTooltipContent: 'some content'
    };

    this.log = function(message) { console.log(message); };
  },
  templateUrl: 'partials/forms/amount-currency-select.html'
})
.component('twCheckboxDocs', {
  bindings: {
    model: '='
  },
  controller: function() {
    this.checkbox = { required: true };
    this.log = function(message) { console.log(message); };
  },
  templateUrl: 'partials/forms/checkbox.html'
})
.component('twRadioDocs', {
  bindings: {
    model: '='
  },
  controller: function() {
    this.radio = { required: true };
    this.log = function(message) { console.log(message); };
  },
  templateUrl: 'partials/forms/radio.html'
})
.component('twSelectDocs', {
  templateUrl: 'partials/forms/select.html',
  bindings: {
    model: '='
  },
  controller: function() {
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
      this.select.options.long.push({value: String(i), label: String(i)});
    }

    this.hideOptions = [
      {value: 'true', label: 'All widths'},
      {value: 'xs', label: 'xs grid'},
      {value: 'sm', label: 'sm grid'},
      {value: 'md', label: 'md grid'},
      {value: 'lg', label: 'lg grid'},
      {value: 'xl', label: 'xl grid'},
      {value: 'xs,sm', label: 'xs and sm grid'},
      {value: 'md,lg,xl', label: 'md, lg and xl grid'}
    ];

    this.log = function(message) { console.log(message); };
  }
})
.component('twUploadDocs', {
  bindings: {
    model: '=',
    sizes: '='
  },
  controller: ['$timeout', '$q', '$http', function($timeout, $q, $http) {
    var $ctrl = this;
    this.onStart = function(file) {
      console.log("File upload starting");
    };
    this.onSuccess = function(response) {
      console.log('File upload complete');
    };
    this.onFailure = function(error) {
      console.log('File upload failure');
      if (error.status === 404) {
        $ctrl.errorMessage = 'Bad URL';
      } else {
        $ctrl.errorMessage = 'Unknown error';
      }
    };
    this.onCancel= function() {
      console.log('File upload cancelled');
    };

    this.makeFancy = function() {
      $ctrl.label = "Front of your ID document";
      $ctrl.processingText = "Processing...";
      $ctrl.successText = "Upload complete!";
      $ctrl.failureText = "Upload failed!";
    };

    this.acceptOptions = [
      {value: '.png', label: 'PNG (.png)'},
      {value: '.jpg,.jpeg', label: 'JPG (.jpg,.jpeg)'},
      {value: 'image/*', label: 'Images (image/*)'},
      {value: 'video/*', label: 'Video (video/*)'},
      {value: 'audio/*', label: 'Audio (audio/*)'}
    ];

    this.log = function(message) { console.log(message); };
  }],
  templateUrl: 'partials/forms/upload.html'
})
.component('twDateDocs', {
  bindings: {
    model: '=',
    locales: '=',
    sizes: '='
  },
  controller: function() {
    this.date = {required: true};
    this.log = function(message) { console.log(message); };
  },
  templateUrl: 'partials/forms/date.html'
})
.component('twDateLookupDocs', {
  bindings: {
    model: '=',
    locales: '=',
    sizes: '='
  },
  controller: function() {
    this.log = function(message) { console.log(message); };
  },
  templateUrl: 'partials/forms/date-lookup.html'
})
.component('twCurrencyInputDocs', {
  bindings: {
    model: '=',
    sizes: '='
  },
  controller: function() {
    this.log = function(message) { console.log(message); };
  },
  templateUrl: 'partials/forms/currency-input.html'
})
.component('twDynamicControlDocs', {
  bindings: {
    model: '=',
    locales: '=',
    sizes: '='
  },
  controller: function() {
    this.dynamic = {
      required: true,
      options: [
        {value: '1', label: 'One'},
        {value: '2', label: 'Two'},
        {value: '3', label: 'Three'},
      ],
      types: [
        {'value': 'text', 'label': 'Text'},
        {'value': 'password', 'label': 'Password'},
        {'value': 'number', 'label': 'Number'},
        {'value': 'select', 'label': 'Select'},
        {'value': 'radio', 'label': 'Radio'},
        {'value': 'checkbox', 'label': 'Checkbox'},
        {'value': 'upload', 'label': 'Upload'},
        {'value': 'date', 'label': 'Date'}
      ]
    };
    this.log = function(message) { console.log(message); };
  },
  templateUrl: 'partials/forms/dynamic-control.html'
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
      $http.get('json/'+newVal+'-requirements.json').then(function(response) {
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
  templateUrl: 'partials/forms/requirements-form.html'
})
.component('twValidationDocs', {
  bindings: {
    model: "="
  },
  templateUrl: 'partials/tw-validation.html'
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
          pattern: '^[0-9]*$',
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
          pattern: '^[0-9]*$',
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
          pattern: '^[0-9]*$',
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
          pattern: '^[0-9]*$',
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
})
.directive('twCardsDocs', function() {
  return {templateUrl: 'partials/tw-cards.html'};
})
.directive('formExample', function() {
    return {
        template: ' \
            <div class="row "> \
                <div class="col-sm-6 col-lg-4"> \
                    <div class="form-group m-b-0"> \
                        <label class="control-label">Send</label> \
                        <div class="input-group"> \
                            <span class="input-group-addon ">£</span> \
                            <input class="form-control text-xs-right p-r-0" type="text"> \
                            <span class="input-group-addon p-l-1 ">USD</span> \
                        </div> \
                        <div class="help-block m-b-0 ">Rate £1 = £1.2345</div> \
                    </div> \
                </div> \
                <div class="col-sm-6 col-lg-4 m-b-0"> \
                    <div class="form-group m-b-0"> \
                        <label class="control-label">Receive about </label> \
                        <div class="input-group"> \
                            <span class="input-group-addon ">£</span> \
                            <input class="form-control text-xs-right p-r-0" type="text"> \
                            <span class="input-group-addon p-l-1 ">USD</span> \
                        </div> \
                        <div class="help-block m-b-0 ">Fee £1.00 USD</div> \
                    </div> \
                </div> \
                <div class="col-sm-12 col-lg-4 p-t-3 m-b-0"> \
                    <button class="btn btn-success btn-block">Repeat transfer</button> \
                </div> \
            </div>'
    };
})
.directive('expandExample', function () {
    return {
        transclude: {
            expandedHead: 'heading',
            expandedBody: '?middle',
            expandedButtons: 'buttons'
        },
        template: ' \
            <div> \
                <div class="m-t-1 m-b-3 visible-xs-block visible-sm-block" ng-transclude="expandedHead"></div> \
                <div ng-transclude="expandedBody"></div> \
                <hr class="hidden-xs hidden-sm hidden-md"> \
                <div class="m-t-2 btn-toolbar" ng-transclude="expandedButtons"></div> \
            </div>'
    };
})
.directive('collapseExample', function () {
    return {
        transclude: {
            collapseBody: '?middle',
            collapseRight: 'right'
        },
        template: ' \
            <div class="media"> \
                <div class="media-body" ng-transclude="collapseBody"></div> \
                <div class="media-right text-xs-right" ng-transclude="collapseRight"></div> \
            </div>'
    };
});
