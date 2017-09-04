import $ from 'jquery';

function FormValidation() {
  return {
    restrict: 'E',
    link: FormValidationLink
  };
}

function FormValidationLink(scope, element) {
  $(element).on('submit', () => {
    // Submitting the form won't trigger form controls own validation
    const elements = $(element).find('[tw-validation].ng-invalid');

    elements.closest('.form-group').addClass('has-error');
    elements.closest('.checkbox, .radio').addClass('has-error');

    return true;
  });
}

export default FormValidation;
