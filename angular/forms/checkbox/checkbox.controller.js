class CheckboxController {
  constructor($scope, $element) {
    const $ngModel = $element.controller('ngModel');

    this.$element = $element;
    this.checked = this.isChecked();

    this.addLabelHandler();
    this.addWatchers($scope, $element, $ngModel);
  }

  isChecked() {
    return (this.ngTrueValue && this.ngTrueValue === this.ngModel) ||
      !this.ngTrueValue && this.ngModel || false;
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
    this.$element
      .closest('.checkbox')
      .find('label')
      .addClass('focus');

    this.$element.triggerHandler('focus');
  }

  buttonBlur() {
    this.$element
      .closest('.checkbox')
      .find('label')
      .removeClass('focus');

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
  hiddenClick($event) {
    $event.stopPropagation();
  }

  addLabelHandler() {
    this.$element.closest('label').on('click', (event) => {
      // Trigger our button, prevent default label behaviour
      this.$element.find('button').trigger('click');
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
      if (newValue && !oldValue) {
        $element
          .closest('.checkbox')
          .addClass('disabled')
          .attr('disabled', true);
      } else if (!newValue && oldValue) {
        $element
          .closest('.checkbox')
          .removeClass('disabled')
          .removeAttr('disabled');
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

  if (!isChecked && isRequired) {
    $ngModel.$setValidity('required', false);
    $element.find('.tw-checkbox-button').addClass('has-error');
    $element.closest('.checkbox').addClass('has-error');
    $element.closest('.form-group').addClass('has-error');
  } else {
    $ngModel.$setValidity('required', true);
    $element.find('.tw-checkbox-button').removeClass('has-error');
    $element.closest('.checkbox').removeClass('has-error');
    $element.closest('.form-group').removeClass('has-error');
  }
}

CheckboxController.$inject = ['$scope', '$element'];

export default CheckboxController;
