class CheckboxController {
  constructor($scope, $element) {
    const $ngModel = $element.controller('ngModel');

    this.$element = $element;
    this.element = $element[0];
    this.checked = this.isChecked();

    this.addLabelHandler();
    this.addWatchers($scope, $element, $ngModel);

    this.checkboxContainer = this.$element.closest('.checkbox')[0];
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

  buttonClick($event) {
    if (this.checked) {
      this.checked = false;
      this.$ngModel.$setViewValue(this.ngFalseValue || false);
    } else {
      this.checked = true;
      this.$ngModel.$setViewValue(this.ngTrueValue || true);
    }
    this.$ngModel.$setTouched();

    if ($event) {
      // Prevent button click propgation from firing label
      $event.stopPropagation();
    }

    validateCheckbox(
      this.checked,
      this.$element,
      this.$ngModel,
      this.ngRequired
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
      this.ngRequired
    );
  }

  // IE 'clicks' the hidden input when label is clicked
  // eslint-disable-next-line class-methods-use-this
  hiddenClick($event) {
    $event.stopPropagation();
  }

  addLabelHandler() {
    this.$element.closest('label').on('click', (event) => {
      const button = this.element.getElementsByTagName('button')[0];
      // Trigger our button, prevent default label behaviour
      button.dispatchEvent(new Event('click'));
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
          this.ngRequired
        );
        this.checked = this.isChecked();
      }
    });

    $scope.$watch('$ctrl.ngDisabled', (newValue, oldValue) => {
      const checkbox = $element.closest('.checkbox')[0];
      if (!checkbox) {
        return;
      }
      if (newValue && !oldValue) {
        checkbox.classList.add('disabled');
        checkbox.setAttribute('disabled', true);
      } else if (!newValue && oldValue) {
        checkbox.classList.remove('disabled');
        checkbox.removeAttribute('disabled');
      }
    });

    $scope.$watch('$ctrl.ngRequired', (newValue, oldValue) => {
      if (newValue !== oldValue) {
        validateCheckbox(
          this.checked,
          $element,
          $ngModel,
          this.ngRequired
        );
      }
    });
  }
}

function validateCheckbox(isChecked, $element, $ngModel, isRequired) {
  if (!$ngModel.$touched) {
    return;
  }

  const button = $element[0].getElementsByClassName('tw-checkbox-button')[0];
  const checkboxLabel = $element.closest('.checkbox')[0];
  const formGroup = $element.closest('.form-group')[0];

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

CheckboxController.$inject = ['$scope', '$element'];

export default CheckboxController;
