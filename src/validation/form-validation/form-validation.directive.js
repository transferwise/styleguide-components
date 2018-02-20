
function FormValidation(TwDomService) {
  return {
    restrict: 'E',
    link: (scope, $element) => {
      const form = $element[0];

      // Submitting the form won't trigger form controls own validation, so check them
      form.addEventListener('submit', () => {
        let formGroup;
        let checkboxContainer;
        let radioContainer;

        const controls = form.querySelectorAll('[tw-validation].ng-invalid, ' +
          'tw-telephone.ng-invalid-required, ' +
          'tw-telephone.ng-invalid-pattern');

        // Shouldn't be necessary, but PhantomJS was complaining
        if (!controls.forEach) {
          return true;
        }

        controls.forEach((control) => {
          formGroup = TwDomService.getClosestParentByClassName(control, 'form-group');
          radioContainer = TwDomService.getClosestParentByClassName(control, 'radio');
          checkboxContainer = TwDomService.getClosestParentByClassName(control, 'checkbox');

          if (formGroup) {
            formGroup.classList.add('has-error');
          }
          if (radioContainer) {
            radioContainer.classList.add('has-error');
          }
          if (checkboxContainer) {
            checkboxContainer.classList.add('has-error');
          }
        });

        return true;
      });
    }
  };
}

FormValidation.$inject = ['TwDomService'];

export default FormValidation;
