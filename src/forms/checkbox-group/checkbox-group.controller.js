
class CheckboxGroupController {
  constructor($scope, $element, TwDomService, $timeout) {
    const $ngModel = $element.controller('ngModel');

    this.dom = TwDomService;
    this.$element = $element;
    this.element = $element[0];
    this.internalModel = {};
    this.$timeout = $timeout;

    this.addWatchers($scope, $element, $ngModel);
    $ngModel.$render = () => this.updateInternalValue($ngModel);
  }

  onInternalModelChange() {
    const transformedModel = Object.keys(this.internalModel)
      .filter(key => this.internalModel[key])
      .map(key => key);
    this.$ngModel.$setViewValue(transformedModel);
    this.$ngModel.$setTouched();
  }

  updateInternalValue($ngModel) {
    if ($ngModel.$modelValue && $ngModel.$modelValue.reduce) {
      this.internalModel = $ngModel.$modelValue.reduce((acc, currentValue) => {
        acc[currentValue] = true;
        return acc;
      }, {});
      $ngModel.$setDirty();
    }
  }

  addWatchers($scope, $element, $ngModel) {
    $scope.$watch('$ctrl.ngModel', (newValue, oldValue) => {
      if (newValue !== oldValue) {
        this.updateInternalValue($ngModel);
        this.$timeout(() => validateCheckbox(
          $element,
          $ngModel,
          this.ngRequired,
          this.dom,
          this.internalModel
        ));
      }
    });

    $scope.$watch('$ctrl.ngRequired', (newValue, oldValue) => {
      if (newValue !== oldValue) {
        this.$timeout(() => validateCheckbox(
          $element,
          $ngModel,
          this.ngRequired,
          this.dom,
          this.internalModel
        ));
      }
    });
  }
}

function validateCheckbox($element, $ngModel, isRequired, dom, internalModel) {
  if (!$ngModel.$touched) {
    return;
  }
  const element = $element[0];
  const formGroup = dom.getClosestParentByClassName(element, 'form-group');
  const isChecked = Object.keys(internalModel)
    .filter(key => internalModel[key]).length > 0;
  if (!isChecked && isRequired) {
    $ngModel.$setValidity('required', false);
    if (formGroup) {
      formGroup.classList.add('has-error');
    }
  } else {
    $ngModel.$setValidity('required', true);
    if (formGroup) {
      formGroup.classList.remove('has-error');
    }
  }
}

CheckboxGroupController.$inject = ['$scope', '$element', 'TwDomService', '$timeout'];

export default CheckboxGroupController;
