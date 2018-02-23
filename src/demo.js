import Forms from './forms/demo.js';

const module = angular.module('tw.styleguide.demo', [
  Forms
]);

module.config(['$compileProvider', function ($compileProvider) {
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
      { value: 'ar-EG', label: 'Eastern Arabic' },
      { value: 'en-IN', label: 'English Indian' },
      { value: 'xx-XX', label: 'Unknown locale' }
    ];
  })
  .directive('validateRegexp', ['$q', function ($q) {
    return {
      require: 'ngModel',
      link(scope, element, attrs, ngModel) {
        ngModel.$asyncValidators.async = function () { // (modelValue, viewValue) {
          try {
            // const reg = new RegExp(viewValue);
            return $q.when(true);
          } catch (error) {
            return $q.reject(false);
          }
        };
      }
    };
  }])
  .directive('docsErrorMessages', () => ({
    replace: true,
    template: `
    <div class='alert alert-danger'>
      <div class='error-required'>Required</div>
      <div class='error-minlength'>Too short</div>
      <div class='error-maxlength'>Too long</div>
      <div class='error-pattern'>Invalid characters</div>
      <div class='error-async'>Invalid async</div>
    </div>`
  }))
  .directive('docsStatusMessages', () => ({
    replace: true,
    template: `
    <div class='status-messages'>
      <div class='touched'>Touched</div>
      <div class='untouched'>Untouched</div>
      <div class='pristine'>Pristine</div>
      <div class='dirty'>Dirty</div>
    </div>`
  }))
  .component('twAmountCurrencySelectDocs', {
    bindings: {
      model: '=',
      currency: '<',
      sizes: '<'
    },
    controller() {
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

      this.log = function (message) { console.log(message); };
    },
    templateUrl: 'partials/forms/amount-currency-select.html'
  })
  .component('twCurrencyInputDocs', {
    bindings: {
      model: '=',
      sizes: '<'
    },
    controller() {
      this.log = function (message) { console.log(message); };
    },
    templateUrl: 'partials/forms/currency-input.html'
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

      $ctrl.onRefreshRequirements = function () {
        console.log('on refresh requirements');
      };

      $scope.$watch('$ctrl.type', (newVal) => {
        $http.get(`json/${newVal}-requirements.json`).then((response) => {
          $ctrl.requirements = response.data;
        });
      });
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
    controller() {
    // Used by twValidation docs
      this.basicSelect = [
        { value: 0, label: 'Zero' },
        { value: 1, label: 'One' },
        { value: 2, label: 'Two' },
        { value: 3, label: 'Three' }
      ];
      this.log = function (msg) { console.log(msg); };
    },
    templateUrl: 'partials/tw-validation.html'
  })
  .component('twFocusableDocs', { templateUrl: 'partials/tw-focusable.html' })
  .component('twTextFormatDocs', {
    controller() {
      const $ctrl = this;
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
    controller() {
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
    controller() {
      this.number = 123456.78;
      this.locale = 'en-GB';
      this.currency = 'GBP';
      this.currencies = [{
        value: 'GBP',
        label: 'Great British Pound',
        note: '2 decimals'
      }, {
        value: 'JPY',
        label: 'Japanese Yen',
        note: '0 decimals'
      }, {
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
    controller() {
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
      this.timeChange = function () {
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
      this.dateChange = function () {
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
    controller() {
      this.log = function (message) { console.log(message); };
    }
  })
  .component('twDefinitionListDocs', {
    bindings: {
      model: '=',
      fields: '='
    },
    templateUrl: 'partials/dynamic-forms/definition-list.html'
  })
  .component('twCardsDocs', { templateUrl: 'partials/tw-cards.html' })
  .component('formExample', {
    template: `
    <div class="row ">
      <div class="col-sm-6 col-lg-4">
        <div class="form-group m-b-0">
          <label class="control-label">Send</label>
          <div class="input-group">
            <span class="input-group-addon ">£</span>
            <input class="form-control text-xs-right p-r-0" type="text">
            <span class="input-group-addon p-l-1 ">USD</span>
          </div>
        </div>
      </div>
      <div class="col-sm-6 col-lg-4 m-b-0">
        <div class="form-group m-b-0">
          <label class="control-label">Receive about </label>
          <div class="input-group">
            <span class="input-group-addon ">£</span>
            <input class="form-control text-xs-right p-r-0" type="text">
            <span class="input-group-addon p-l-1 ">USD</span>
          </div>
        </div>
      </div>
      <div class="col-sm-12 col-lg-4 p-t-3 m-b-0">
        <button class="btn btn-success btn-block">Repeat transfer</button>
      </div>
    </div>`
  })
  .component('expandExample', {
    transclude: {
      expandedHead: 'heading',
      expandedBody: '?middle',
      expandedButtons: 'buttons'
    },
    template: `
    <div>
      <div class="m-t-1 m-b-3 visible-xs-block visible-sm-block" ng-transclude="expandedHead"></div>
      <div ng-transclude="expandedBody"></div>
      <hr class="hidden-xs hidden-sm hidden-md">
      <div class="m-t-2 btn-toolbar" ng-transclude="expandedButtons"></div>
    </div>`
  })
  .component('collapseExample', {
    transclude: {
      collapseBody: '?middle',
      collapseRight: 'right'
    },
    template: `
    <div class="media">
      <div class="media-body" ng-transclude="collapseBody"></div>
      <div class="media-right text-xs-right" ng-transclude="collapseRight"></div>
    </div>`
  });

export default module.name;
