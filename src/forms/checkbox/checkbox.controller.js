import DomService from '../../services/dom/'; // eslint-disable-line no-unused-vars

class CheckboxController {
  constructor($scope, $element, TwDomService) {
    const $ngModel = $element.controller('ngModel');

    this.dom = TwDomService;
    this.$element = $element;
    this.element = $element[0];
    this.checked = this.isChecked();

    this.addLabelHandler();
    this.addWatchers($scope, $element, $ngModel);

    this.checkboxContainer = this.dom.getClosestParentByClassName(
      this.element,
      'checkbox'
    );

    this.label =
      this.checkboxContainer ?
        this.checkboxContainer.getElementsByTagName('label')[0] :
        false;
  }

  isChecked() {
    return (this.ngTrueValue && this.ngTrueValue === this.ngModel) ||
      (!this.ngTrueValue && this.ngModel) ||
      false;
  }

  buttonClick(event) {
    if (this.checked) {
      this.checked = false;
      this.$ngModel.$setViewValue(this.ngFalseValue || false);
    } else {
      this.checked = true;
      this.$ngModel.$setViewValue(this.ngTrueValue || true);
    }
    this.$ngModel.$setTouched();

    if (event) {
      // Prevent button click propgation from firing label
      event.stopPropagation();
    }

    validateCheckbox(
      this.checked,
      this.$element,
      this.$ngModel,
      this.ngRequired,
      this.dom
    );
  }

  buttonFocus() {
    if (this.label) {
      this.label.classList.add('focus');
    }

    this.$element.triggerHandler('focus');
  }

  buttonBlur() {
    if (this.label) {
      this.label.classList.remove('focus');
    }

    this.$element.triggerHandler('blur');
    this.$ngModel.$setTouched();

    validateCheckbox(
      this.checked,
      this.$element,
      this.$ngModel,
      this.ngRequired,
      this.dom
    );
  }

  // IE 'clicks' the hidden input when label is clicked
  // eslint-disable-next-line class-methods-use-this
  hiddenClick($event) {
    $event.stopPropagation();
  }

  addLabelHandler() {
    const label = this.dom.getClosestParentByTagName(this.element, 'label');

    if (!label) {
      return;
    }
    label.addEventListener('click', (event) => {
      const isDisabled = label.getAttribute('disabled');
      if (!isDisabled) {
        const button = this.element.getElementsByTagName('button')[0];
        // Trigger our button, prevent default label behaviour
        button.dispatchEvent(new Event('click'));
      }
      event.preventDefault();
      event.stopPropagation();
    });
  }

  addWatchers($scope, $element, $ngModel) {
    $scope.$watch('$ctrl.ngModel', (newValue, oldValue) => {
      if (newValue !== oldValue) {
        $ngModel.$setDirty();
        validateCheckbox(
          this.checked,
          $element,
          $ngModel,
          this.ngRequired,
          this.dom
        );
        this.checked = this.isChecked();
      }
    });

    $scope.$watch('$ctrl.ngDisabled', (newValue, oldValue) => {
      const element = $element[0];
      const checkbox = this.dom.getClosestParentByClassName(element, 'checkbox');
      const label = this.dom.getClosestParentByTagName(element, 'label');

      if (!checkbox) {
        return;
      }
      if (newValue && !oldValue) {
        checkbox.classList.add('disabled');
        // checkbox.setAttribute('disabled', true);
        label.setAttribute('disabled', 'true');
      } else if (!newValue && oldValue) {
        checkbox.classList.remove('disabled');
        // checkbox.removeAttribute('disabled');
        label.removeAttribute('disabled');
      }
    });

    $scope.$watch('$ctrl.ngRequired', (newValue, oldValue) => {
      if (newValue !== oldValue) {
        validateCheckbox(
          this.checked,
          $element,
          $ngModel,
          this.ngRequired,
          this.dom
        );
      }
    });
  }
}

function validateCheckbox(isChecked, $element, $ngModel, isRequired, dom) {
  if (!$ngModel.$touched) {
    return;
  }
  const element = $element[0];
  const button = element.getElementsByClassName('tw-checkbox-button')[0];
  const checkboxLabel = dom.getClosestParentByClassName(element, 'checkbox');
  const formGroup = dom.getClosestParentByClassName(element, 'form-group');

  if (!isChecked && isRequired) {
    $ngModel.$setValidity('required', false);
    button.classList.add('has-error');
    if (checkboxLabel) {
      checkboxLabel.classList.add('has-error');
    }
    if (formGroup) {
      formGroup.classList.add('has-error');
    }
  } else {
    $ngModel.$setValidity('required', true);
    button.classList.remove('has-error');
    if (checkboxLabel) {
      checkboxLabel.classList.remove('has-error');
    }
    if (formGroup) {
      formGroup.classList.remove('has-error');
    }
  }
}

CheckboxController.$inject = ['$scope', '$element', 'TwDomService'];

export default CheckboxController;
