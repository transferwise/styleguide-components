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
      { value: 'ach-login', label: 'ACH Bank login' }
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
