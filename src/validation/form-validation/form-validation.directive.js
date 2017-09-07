
function FormValidationLink(scope, element) {
  element[0].addEventListener('submit', () => {
    // Submitting the form won't trigger form controls own validation
    const elements = element.querySelectorAll('[tw-validation].ng-invalid');

    // TODO remove jquery
    const formGroup = $(elements).closest('.form-group')[0]; // eslint-disable-line
    const optionLabel = $(elements).closest('.checkbox, .radio')[0]; // eslint-disable-line

    if (formGroup) {
      formGroup.classList.add('has-error');
    }
    if (optionLabel) {
      optionLabel.classList.add('has-error');
    }
    return true;
  });
}

function FormValidation() {
  return {
    restrict: 'E',
    link: FormValidationLink
  };
}

export default FormValidation;
