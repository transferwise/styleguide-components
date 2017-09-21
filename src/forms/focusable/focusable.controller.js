
class FocusableController {
  constructor($element, TwDomService) {
    const element = $element[0];
    const formGroup = TwDomService.getClosestParentByClassName(element, 'form-group');

    if (formGroup && element) {
      element.addEventListener('focus', () => {
        formGroup.classList.add('focus');
      });
      element.addEventListener('blur', () => {
        formGroup.classList.remove('focus');
      });
    }
  }
}

FocusableController.$inject = ['$element', 'TwDomService'];

export default FocusableController;
