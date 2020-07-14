
class CheckboxGroupController {
  constructor($element, TwDomService) {
    this.$ngModel = $element.controller('ngModel');

    this.dom = TwDomService;
    this.$element = $element;

    this.internalModel = [];
    this.internalOptions = [];
  }

  $onChanges(changes) {
    if (changes.options) {
      this.onExternalOptionsChange(changes.options.currentValue);
    }

    if (changes.ngModel) {
      this.onExternalModelChange(changes.ngModel.currentValue);
    }

    if (changes.ngRequired) {
      this.validate();
    }
  }

  onExternalOptionsChange(newOptions) {
    this.internalOptions = convertModelToOptions(this.ngModel, newOptions);
    this.internalModel = convertOptionsToModel(this.internalOptions);
  }

  onExternalModelChange(newModel) {
    this.internalOptions = convertModelToOptions(
      newModel,
      this.internalOptions
    );
    this.internalModel = convertOptionsToModel(this.internalOptions);
    this.validate();
  }

  onInternalModelChange() {
    this.internalModel = convertOptionsToModel(this.internalOptions);
    this.$ngModel.$setViewValue(this.internalModel);
    this.$ngModel.$setTouched();
    this.$ngModel.$setDirty();
  }

  isCheckboxRequired() {
    return this.internalModel.length === 0 && this.ngRequired;
  }

  validate() {
    if (!this.$ngModel.$touched) {
      return;
    }

    const element = this.$element[0];
    const formGroup = this.dom.getClosestParentByClassName(element, 'form-group');

    const isChecked = this.internalModel && this.internalModel.length > 0;
    const isRequired = this.ngRequired;

    if (!isChecked && isRequired) {
      this.$ngModel.$setValidity('required', false);
      if (formGroup) {
        formGroup.classList.add('has-error');
      }
    } else {
      this.$ngModel.$setValidity('required', true);
      if (formGroup) {
        formGroup.classList.remove('has-error');
      }
    }
  }
}

function convertModelToOptions(model, options) {
  return options.map(option => addSelectedToOption(option, model));
}

function addSelectedToOption(option, model) {
  const selected = isSelected(model, option);
  return { ...option, selected };
}

function convertOptionsToModel(options) {
  return options
    .filter(option => option.selected)
    .map(option => option.value);
}

function isSelected(model, option) {
  return !!(model && model.indexOf && model.indexOf(option.value) >= 0);
}

CheckboxGroupController.$inject = ['$element', 'TwDomService'];

export default CheckboxGroupController;
