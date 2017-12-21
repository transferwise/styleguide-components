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
      locales: '<',
      sizes: '<'
    },
    templateUrl: 'partials/forms/index.html'
  })
  .component('formattingComponents', {
    bindings: {
      model: '=',
      locales: '<'
    },
    templateUrl: 'partials/formatting/index.html'
  })
  .controller('PageController', function () {
    this.log = function (message) { console.log(message); };

    this.model = {
      components: {}
    };

    this.sizes = [
      { value: 'sm', label: 'Small' },
      { value: 'md', label: 'Medium' },
      { value: 'lg', label: 'Large' }
    ];

    this.locales = [
      { value: 'en-GB', label: 'English UK' },
      { value: 'en-US', label: 'English US' },
      { value: 'fr-FR', label: 'French' },
      { value: 'es-ES', label: 'Spanish' },
      { value: 'es-US', label: 'Spanish US' },
      { value: 'pt-BR', label: 'Brazillian Portuguese' },
      { value: 'ja-JP', label: 'Japanese' },
      { value: 'ar-EG', label: 'Eastern Arabic'},
      { value: 'en-IN', label: 'English Indian'},
      { value: 'xx-XX', label: 'Unknown locale' }
    ];
  })
  .directive('validateRegexp', ['$q', function($q) {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, ngModel) {
        ngModel.$asyncValidators.async = function (modelValue, viewValue) {
          try {
            const reg = new RegExp(viewValue);
            return $q.when(true);
          } catch (error) {
            return $q.reject(false);
          }
        };
      }
    }
  }])
  .directive('docsErrorMessages', function() {
    return {
      replace: true,
      template: " \
      <div class='alert alert-danger'> \
        <div class='error-required'>Required</div> \
        <div class='error-minlength'>Too short</div> \
        <div class='error-maxlength'>Too long</div> \
        <div class='error-pattern'>Invalid characters</div> \ \
        <div class='error-async'>Invalid async</div> \
      </div>"
    }
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
    }
  })
  .component('twAmountCurrencySelectDocs', {
    bindings: {
      model: '=',
      currency: '<',
      sizes: '<'
    },
    controller: function() {
      this.currencySelect = [
        { header: 'Popular currencies' },
        {
          value: 'eur', label: 'EUR', note: 'Euro', currency: 'EUR', searchable: 'Spain, Germany, France, Austria, Estonia'
        },
        {
          value: 'gbp', label: 'GBP', note: 'Great British Pound', currency: 'GBP', searchable: 'England, Scotland, Wales'
        },
        {
          value: 'usd', label: 'USD', note: 'United States Dollar', currency: 'USD', searchable: 'Hong Kong, Saudi Arabia'
        },
        { header: 'All currencies' },
        {
          value: 'aud', label: 'AUD', note: 'Australian Dollar', currency: 'AUD'
        }
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

      this.log = function (message) { console.log(message); };;
    },
    templateUrl: 'partials/forms/amount-currency-select.html'
  })
  .component('twCheckboxDocs', {
    bindings: {
      model: '='
    },
    controller: function() {
      this.checkbox = { required: true };
      this.log = function (message) { console.log(message); };;
    },
    templateUrl: 'partials/forms/checkbox.html'
  })
  .component('twRadioDocs', {
    bindings: {
      model: '='
    },
    controller: function() {
      this.radio = { required: true };
      this.log = function (message) { console.log(message); };;
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
          { value: 'standard', label: 'Standard' },
          { value: 'icons', label: 'Icons' },
          { value: 'currencies', label: 'Currencies' },
          { value: 'notes', label: 'Notes' },
          { value: 'headers', label: 'Headers' },
          { value: 'secondary', label: 'Secondary text' },
          { value: 'searchable', label: 'Searchable text' },
          { value: 'circles', label: 'Circles' },
          { value: 'long', label: 'Long list' },
          { value: 'disabled', label: 'Disabled option' },
          { value: 'currencySelect', label: 'Example: Currency select' },
          { value: 'accountSelect', label: 'Example: Account select' }
        ],
        options: {
          standard: [
            { value: 0, label: 'Zero' },
            { value: 1, label: 'One' },
            { value: 2, label: 'Two' },
            { value: 3, label: 'Three' }
          ],
          icons: [
            { value: { id: '1' }, label: 'Profile', icon: 'icon-profile' },
            { value: { id: '2' }, label: 'Globe', icon: 'icon-globe' },
            { value: { id: '3' }, label: 'Bank', icon: 'icon-bank' }
          ],
          currencies: [
            { value: 'eur', label: 'Euro', currency: 'EUR' },
            { value: 'gbp', label: 'British Pound', currency: 'GBP' },
            { value: 'usd', label: 'US Dollar', currency: 'USD' }
          ],
          notes: [
            { value: 'eur', label: 'EUR', note: 'Euro' },
            { value: 'gbp', label: 'GBP', note: 'Great British Pound' },
            { value: 'usd', label: 'USD', note: 'United States Dollar' }
          ],
          headers: [
            { header: 'Header' },
            { value: 'opt1', label: 'Option 1' },
            { header: 'Another header' },
            { value: 'opt2', label: 'Option 2' }
          ],
          secondary: [
            { value: '1', label: 'Bob Smith', secondary: 'Account ending 1234' },
            { value: '2', label: 'James Davies', secondary: 'Account ending 9876' },
            { value: '3', label: 'Helen Williams', secondary: 'Accont ending 4321' }
          ],
          searchable: [
            { value: 'eur', label: 'Euro', searchable: 'Austria, France, Germany, Spain' },
            { value: 'usd', label: 'Dollar', searchable: 'United States, Hong Kong, Saudi Arabia' },
            { value: 'gbp', label: 'Pound', searchable: 'Great britain, England, Scotland' }
          ],
          circles: [
            { value: '1', label: 'Bob Smith', circleImage: 'images/mike.jpg' },
            { value: '2', label: 'James Davies', circleIcon: 'icon-bank' },
            { value: '3', label: 'Helen Williams', circleText: 'AZ' }
          ],
          disabled: [
            { value: '1', label: 'Enabled option' },
            { value: '2', label: 'Disabled option', disabled: true },
            { value: '3', label: 'Second option' }
          ],
          currencySelect: [
            { header: 'Popular currencies' },
            {
              value: 'eur', label: 'EUR', note: 'Euro', currency: 'EUR', searchable: 'Spain, Germany, France, Austria, Estonia'
            },
            {
              value: 'gbp', label: 'GBP', note: 'Great British Pound', currency: 'GBP', searchable: 'England, Scotland, Wales'
            },
            {
              value: 'usd', label: 'USD', note: 'United States Dollar', currency: 'USD', searchable: 'Hong Kong, Saudi Arabia'
            },
            { header: 'All currencies' },
            {
              value: 'aud', label: 'AUD', note: 'Australian Dollar', currency: 'AUD'
            }
          ],
          accountSelect: [
            {
              value: '1', label: 'Bob Smith', note: 'GBP', secondary: 'Account ending 1234', circleImage: 'images/mike.jpg'
            },
            {
              value: '2', label: 'James Davies', note: 'GBP', secondary: 'Account ending 9876', circleText: 'JD'
            },
            {
              value: '3', label: 'Helen Williams', note: 'EUR', secondary: 'Accont ending 4321', circleText: 'HW'
            }
          ],
          long: [{ header: 'example header' }]
        }
      };
      for (var i = 0; i < 999; i++) {
        this.select.options.long.push({ value: String(i), label: String(i) });
      }

      this.hideOptions = [
        { value: 'true', label: 'All widths' },
        { value: 'xs', label: 'xs grid' },
        { value: 'sm', label: 'sm grid' },
        { value: 'md', label: 'md grid' },
        { value: 'lg', label: 'lg grid' },
        { value: 'xl', label: 'xl grid' },
        { value: 'xs,sm', label: 'xs and sm grid' },
        { value: 'md,lg,xl', label: 'md, lg and xl grid' }
      ];

      this.log = function (message) { console.log(message); };;
    }
  })
  .component('twUploadDocs', {
    bindings: {
      model: '=',
      sizes: '<'
    },
    controller: ['$timeout', '$q', '$http', function ($timeout, $q, $http) {
      const $ctrl = this;

      this.onStart = function (file) {
        console.log('File upload starting');
      };
      this.onSuccess = function (response) {
        console.log('File upload complete');
      };
      this.onFailure = function (error) {
        console.log('File upload failure');
        if (error.status === 404) {
          $ctrl.errorMessage = 'Bad URL';
        } else {
          $ctrl.errorMessage = 'Unknown error';
        }
      };
      this.onCancel = function () {
        console.log('File upload cancelled');
      };

      this.makeFancy = function () {
        $ctrl.label = 'Front of your ID document';
        $ctrl.processingText = 'Processing...';
        $ctrl.successText = 'Upload complete!';
        $ctrl.failureText = 'Upload failed!';
      };

      this.acceptOptions = [
        { value: '.png', label: 'PNG (.png)' },
        { value: '.jpg,.jpeg', label: 'JPG (.jpg,.jpeg)' },
        { value: 'image/*', label: 'Images (image/*)' },
        { value: 'video/*', label: 'Video (video/*)' },
        { value: 'audio/*', label: 'Audio (audio/*)' }
      ];

      this.log = function (message) { console.log(message); };
    }],
    templateUrl: 'partials/forms/upload.html'
  })
  .component('twDateDocs', {
    bindings: {
      model: '=',
      locales: '<',
      sizes: '<'
    },
    controller: function() {
      this.date = { required: true };
      this.log = function (message) { console.log(message); };
    },
    templateUrl: 'partials/forms/date.html'
  })
  .component('twDateLookupDocs', {
    bindings: {
      model: '=',
      locales: '<',
      sizes: '<'
    },
    controller: function() {
      this.log = function (message) { console.log(message); };
    },
    templateUrl: 'partials/forms/date-lookup.html'
  })
  .component('twCurrencyInputDocs', {
    bindings: {
      model: '=',
      sizes: '<'
    },
    controller: function() {
      this.log = function (message) { console.log(message); };
    },
    templateUrl: 'partials/forms/currency-input.html'
  })
  .component('twFormControlDocs', {
    bindings: {
      model: '=',
      locales: '<',
      sizes: '<'
    },
    controller: function() {
      this.dynamic = {
        required: true,
        options: [
          { value: '1', label: 'One' },
          { value: '2', label: 'Two' },
          { value: '3', label: 'Three' },
        ],
        types: [
          { value: 'text', label: 'Text' },
          { value: 'password', label: 'Password' },
          { value: 'number', label: 'Number' },
          { value: 'select', label: 'Select' },
          { value: 'radio', label: 'Radio' },
          { value: 'checkbox', label: 'Checkbox' },
          { value: 'upload', label: 'Upload' },
          { value: 'date', label: 'Date' }
        ]
      };
      this.log = function (message) { console.log(message); };
    },
    templateUrl: 'partials/forms/form-control.html'
  })
  .component('twPhoneNumberDocs', {
    bindings: {
      model: '='
    },
    controller: function() {
      this.updateModel = function(newNumber) {
        this.model = newNumber;
      };
      this.phoneNumber = {
        countries: [
          { callingCode: '1', iso2Code: 'US', iso3Code: 'usa', name: 'United States of America' },
          { callingCode: '44', iso2Code: 'GG', iso3Code: 'ggy', name: 'Guernsey' },
          { callingCode: '44', iso2Code: 'GB', iso3Code: 'gbr', name: 'United Kingdom' },
          { callingCode: '33', iso2Code: 'FR', iso3Code: 'fra', name: 'France' }
        ],
        required: true
      };
      this.log = function (message) { console.log(message); };
    },
    templateUrl: 'partials/forms/phone-number.html'
  })
  .component('twRequirementsFormDocs', {
    controller: ['$scope', '$http', function ($scope, $http) {
      const $ctrl = this;
      $ctrl.types = [
        { value: 'account', label: 'Account' },
        { value: 'profile', label: 'Profile' },
        { value: 'verification', label: 'Verification' },
        { value: 'pay-in', label: 'Pay in' },
        { value: 'transfer', label: 'Transfer' },
        { value: 'ach-login', label: 'ACH Bank login' }
      ];
      $ctrl.type = 'profile';
      if (!$ctrl.model) {
        $ctrl.model = {};
      }

      $ctrl.model.firstName = '01010101010';

      $ctrl.onRefreshRequirements = function() {
        console.log("on refresh requirements");
      }

      $scope.$watch('$ctrl.type', function(newVal) {
        $http.get(`json/${newVal}-requirements.json`).then(function(response){
          $ctrl.requirements = response.data;
        });
      });

      $ctrl.addError = function () {
        const key = getFirstRequirementKey($ctrl.requirements);
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
            });
          });
        });
        return key;
      }
    }],
    bindings: {
      model: '='
    },
    templateUrl: 'partials/forms/requirements-form.html'
  })
  .component('twValidationDocs', {
    bindings: {
      model: '='
    },
    controller: function() {
      // Used by twValidation docs
      this.basicSelect = [
        { value: 0, label: 'Zero' },
        { value: 1, label: 'One' },
        { value: 2, label: 'Two' },
        { value: 3, label: 'Three' }
      ];
    },
    templateUrl: 'partials/tw-validation.html'
  })
  .component('twFocusableDocs', { templateUrl: 'partials/tw-focusable.html' })
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
      model: '='
    },
    templateUrl: 'partials/formatting/text-format.html'
  })
  .component('twNumberFormatDocs', {
    bindings: {
      locales: '<'
    },
    controller: function() {
      this.number = 123456.78;
      this.locale = 'en-GB';
      this.precision = null;
    },
    templateUrl: 'partials/formatting/number-format.html'
  })
  .component('twCurrencyFormatDocs', {
    bindings: {
      locales: '<'
    },
    controller: function() {
      this.number = 123456.78;
      this.locale = 'en-GB';
      this.currency = 'GBP';
      this.currencies = [{
        value: 'GBP',
        label: 'Great British Pound',
        note: '2 decimals'
      },{
        value: 'JPY',
        label: 'Japanese Yen',
        note: '0 decimals'
      },{
        value: 'JOD',
        label: 'Jordanian Dinar',
        note: '3 decimals'
      }];
    },
    templateUrl: 'partials/formatting/currency-format.html'
  })
  .component('twDateFormatDocs', {
    bindings: {
      locales: '<'
    },
    controller: function() {
      this.formats = [
        { value: 'short', label: 'short' },
        { value: 'medium', label: 'medium' },
        { value: 'long', label: 'long' }
      ];
      const now = new Date();
      this.dates = {
        now,

        lastHour: new Date(now.getTime() - (60 * 60 * 1000)),
        lastDay: new Date(now.getTime() - (24 * 60 * 60 * 1000)),
        lastWeek: new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000)),
        lastMonth: new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000)),
        lastYear: new Date(now.getTime() - (365 * 24 * 60 * 60 * 1000)),

        nextHour: new Date(now.getTime() + (60 * 60 * 1000)),
        nextDay: new Date(now.getTime() + (24 * 60 * 60 * 1000)),
        nextWeek: new Date(now.getTime() + (7 * 24 * 60 * 60 * 1000)),
        nextMonth: new Date(now.getTime() + (30 * 24 * 60 * 60 * 1000)),
        nextYear: new Date(now.getTime() + (365 * 24 * 60 * 60 * 1000))
      };
      this.timeChange = function() {
        if (!this.time) {
          return;
        }
        this.hours = parseInt(this.time.substring(0, 2), 10);
        this.minutes = parseInt(this.time.substring(2, 4), 10);

        if (this.model) {
          this.model.setHours(this.hours);
          this.model.setMinutes(this.minutes);
        }
      };
      this.dateChange = function() {
        this.model.setHours(this.hours);
        this.model.setMinutes(this.minutes);
      };
      this.hours = 12;
      this.minutes = 0;
    },
    templateUrl: 'partials/formatting/date-format.html'
  })
  .component('twPopOverDocs', { templateUrl: 'partials/tw-pop-over.html' })
  .component('twToolTipDocs', { templateUrl: 'partials/tw-tool-tip.html' })
  .component('twAffixDocs', { templateUrl: 'partials/tw-affix.html' })
  .component('twProcessDocs', {
    templateUrl: 'partials/tw-process.html',
    controller: function() {
      this.log = function (message) { console.log(message); };
    }
  })
  .component('twFieldsetDocs', {
    bindings: {
      model: '=',
      fields: '='
    },
    templateUrl: 'partials/forms/fieldset.html' ,
    controller: function() {
      this.model = {
        'text': 'helloworld',
        'number': 123456,
        'select': '1',
        'date': '2000-01-01T00:00:00.000Z',
        'checkbox': true,
        'radio': '2',
        'password': 'qwerty'
      };

      this.refresh = function() {
        console.log('onRefreshRequirements');
      };

      this.fields = [
        {
          'name': 'Text',
          'key': 'text',
          'type': 'text',
          'displayFormat': '***** - *****||*-*-*',
          'width': 'md',
          'refreshRequirementsOnChange': true
        },
        {
          'name': 'Number',
          'key': 'number',
          'type': 'number',
          'width': 'md',
          'refreshRequirementsOnChange': true
        },
        {
          'name': 'Select',
          'key': 'select',
          'type': 'select',
          'width': 'md',
          'refreshRequirementsOnChange': true,
          'valuesAllowed': [
            {
              'key': '1',
              'name': 'One'
            },
            {
              'key': '2',
              'name': 'Two'
            }
          ]
        },
        {
          'name': 'Date',
          'key': 'date',
          'type': 'date',
          'width': 'md',
          'refreshRequirementsOnChange': true
        },
        {
          'name': 'Password',
          'key': 'password',
          'type': 'password',
          'width': 'md',
          'refreshRequirementsOnChange': true
        },
        {
          'name': 'Checkbox',
          'key': 'checkbox',
          'type': 'checkbox',
          'placeholder': 'Label',
          'width': 'md',
          'refreshRequirementsOnChange': true
        },
        {
          'name': 'Radio',
          'key': 'radio',
          'type': 'radio',
          'width': 'md',
          'refreshRequirementsOnChange': true,
          'valuesAllowed': [
            {
              'key': '1',
              'name': 'One'
            },
            {
              'key': '2',
              'name': 'Two'
            }
          ]
        },
        {
          'name': 'File',
          'key': 'file',
          'type': 'upload',
          'width': 'md',
          'refreshRequirementsOnChange': true
        },
      ];
    }
  })
  .component('twDefinitionListDocs', {
    bindings: {
      model: '=',
      fields: '='
    },
    templateUrl: 'partials/forms/definition-list.html'
  })
  .component('twCardsDocs', { templateUrl: 'partials/tw-cards.html' })
  .component('formExample', {
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
          </div> \
        </div> \
        <div class="col-sm-12 col-lg-4 p-t-3 m-b-0"> \
          <button class="btn btn-success btn-block">Repeat transfer</button> \
        </div> \
      </div>'
  })
  .component('expandExample', {
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
  })
  .component('collapseExample', {
    transclude: {
      collapseBody: '?middle',
      collapseRight: 'right'
    },
    template: ' \
      <div class="media"> \
        <div class="media-body" ng-transclude="collapseBody"></div> \
        <div class="media-right text-xs-right" ng-transclude="collapseRight"></div> \
      </div>'
  });
