import angular from 'angular';
import { isArray } from '../../json-schema/validation/type-validators';

class DefinitionListController {
  constructor(TwRequirementsService) {
    this.RequirementsService = TwRequirementsService;

    this.layout = this.layout || 'vertical';
  }

  $onChanges(changes) {
    const fieldsChanged = changes.initialFields;
    if (fieldsChanged) {
      if (!angular.equals(fieldsChanged.currentValue, fieldsChanged.previousValue)) {
        this.fields = this.RequirementsService.prepFields(
          fieldsChanged.currentValue,
          this.model
        );
      }
    }
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

  getCheckboxGroupLabel(options, valuesString) {
    try {
      const values = isArray(valuesString) ? valuesString : JSON.parse(valuesString);
      const labels = values.map(value => this.getValueLabel(options, value));
      return labels.join(', ');
    } catch (error) {
      return valuesString;
    }
  }

  // eslint-disable-next-line
  mask(value) {
    return new Array(value.length + 1).join('*');
  }
}

DefinitionListController.$inject = [
  'TwRequirementsService'
];

export default DefinitionListController;
