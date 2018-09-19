import angular from 'angular';
import template from './requirements-form.demo.html';

class RequirementsDocsController {
  constructor($scope, $http) {
    const $ctrl = this;

    $ctrl.types = [
      { value: 'account', label: 'Account' },
      { value: 'profile', label: 'Profile' },
      { value: 'verification', label: 'Verification' },
      { value: 'pay-in', label: 'Pay in' },
      { value: 'transfer', label: 'Transfer' },
      { value: 'ach-login', label: 'ACH Bank login' },
      { value: 'old-recipient', label: 'Old format recipients' },
      { value: 'gbp-recipient', label: 'GBP recipient' },
      { value: 'list-type', label: 'All webapp recipients' },
      { value: 'restgw-sortcode', label: 'RESTGW sortcode recipient' },
      { value: 'restgw-aba', label: 'RESTGW US recipient' },
      { value: 'restgw-jpy', label: 'RESTGW Japan recipient' },
      { value: 'restgw-vnd', label: 'RESTGW Vietnam recipient' },
      { value: 'global-usd', label: 'Global USD' }
    ];

    $ctrl.type = 'profile';

    $ctrl.onRefreshRequirements = () => {
      console.log('on refresh requirements'); // eslint-disable-line
    };

    $scope.$watch('$ctrl.type', (newVal) => {
      $http.get(`json/${newVal}-requirements.json`).then((response) => {
        $ctrl.requirements = response.data;
      });
    });
  }

  $onInit() {
    if (!this.model) {
      this.model = {};
    }

    this.model.firstName = '01010101010';
  }
}

RequirementsDocsController.$inject = ['$scope', '$http'];

export default angular
  .module('tw.styleguide.demo.forms.requirements-form', [])
  .component('twRequirementsFormDocs', {
    controller: RequirementsDocsController,
    bindings: {
      model: '='
    },
    template
  }).name;
