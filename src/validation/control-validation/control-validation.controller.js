class ValidationController {
  constructor($scope, $element, TwDomService) {
    const element = $element[0];
    const formGroup = TwDomService.getClosestParentByClassName(element, 'form-group');
    const $ngModel = $element.controller('ngModel');

    element.addEventListener('invalid', (event) => {
      // Prevent default validation tooltips
      event.preventDefault();
    });

    $ngModel.$validators.validation = () => {
      // Evaluate after ngModel updates, we are still in validation chain
      $scope.$evalAsync(() => {
        checkModelAndUpdate($ngModel, formGroup, element);
      });
      return true;
    };

    // The first time we blur, model is still pristine when validation occurs, so perform again.
    const onBlur = () => {
      // Custom elements must trigger blur manually for correct behaviour
      $scope.$evalAsync(() => {
        checkModelAndUpdate($ngModel, formGroup, element);
      });
    };

    element.addEventListener('blur', onBlur);
  }
}

function checkModelAndUpdate(ngModel, formGroup, element) {
  // Option to switch off default validators
  if (formGroup.classList.contains('custom-validation')) {
    return;
  }

  if (ngModel.$valid) {
    if (formGroup) {
      formGroup.classList.remove('has-error');
    }
    element.removeAttribute('aria-invalid');
    return;
  }

  if (ngModel.$touched && ngModel.$dirty) {
    if (formGroup) {
      formGroup.classList.add('has-error');
    }
    // Set aria invalid for screen readers
    element.setAttribute('aria-invalid', 'true');
  }
}

ValidationController.$inject = ['$scope', '$element', 'TwDomService'];

export default ValidationController;
