

function TwValidation() {
  return {
    restrict: 'AC',
    require: 'ngModel',
    link: validationLink
  };
}

function validationLink(scope, $element, attrs, ngModel) {
  const element = $element[0];
  const formGroup = $element.closest('.form-group')[0];

  element.addEventListener('invalid', (event) => {
    // Prevent default validation tooltips
    event.preventDefault();
  });

  // We could do this in $validators but includes unnecessary DOM manipulation
  ngModel.$validators.validation = () => {
    // Evaluate after ngModel updates, we are still in validation chain
    scope.$evalAsync(() => {
      checkModelAndUpdate(ngModel, formGroup, element);
    });
    return true;
  };

  // The first time we blur, still pristine when model validation occurs, so perform again.
  element.addEventListener('blur', () => {
    // Custom elements must trigger blur manually for correct behaviour
    scope.$evalAsync(() => {
      checkModelAndUpdate(ngModel, formGroup, element);
    });
  });
}

function checkModelAndUpdate(ngModel, formGroup, element) {
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

export default TwValidation;
