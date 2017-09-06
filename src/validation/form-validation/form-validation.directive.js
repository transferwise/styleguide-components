
function FormValidationLink(scope, element) {
  element[0].addEventListener('submit', () => {
    // Submitting the form won't trigger form controls own validation
    const elements = element.querySelectorAll('[tw-validation].ng-invalid');

    $(elements).closest('.form-group').addClass('has-error'); // eslint-disable-line
    $(elements).closest('.checkbox, .radio').addClass('has-error'); // eslint-disable-line

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
