import angular from 'angular';

class DefinitionListController {
  constructor($scope, TwRequirementsService) {
    this.$scope = $scope;
    this.RequirementsService = TwRequirementsService;
  }

  $onInit() {
    this.RequirementsService.prepFields(this.fields, this.model);

    this.$scope.$watch('$ctrl.fields', (newValue, oldValue) => {
      if (!angular.equals(newValue, oldValue)) {
        this.RequirementsService.prepFields(this.fields, this.model);
      }
    });
  }

  // eslint-disable-next-line
  getValueLabel(options, value) {
    for (let i = 0; i < options.length; i++) {
      if (options[i].value === value) {
        return options[i].label;
      }
    }
    return value;
  }

  // eslint-disable-next-line
  mask(value) {
    return new Array(value.length + 1).join('*');
  }
}

DefinitionListController.$inject = [
  '$scope',
  'TwRequirementsService'
];

export default DefinitionListController;
