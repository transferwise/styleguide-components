import DomService from '../../services/dom/'; // eslint-disable-line no-unused-vars

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

        const controls = form.querySelectorAll('[tw-validation].ng-invalid');

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
