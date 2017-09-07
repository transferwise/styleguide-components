class RadioController {
  constructor($scope, $element) {
    const $ngModel = $element.controller('ngModel');

    this.$element = $element;
    this.checked = this.isChecked();
    this.label = $element.closest('label')[0];

    $element[0].addEventListener('blur', () => {
      $ngModel.$setTouched();
    });

    this.addWatchers($scope, $element);
  }

  isChecked() {
    return (this.ngValue && this.ngModel === this.ngValue) ||
      this.value === this.ngModel;
  }

  buttonClick() {
    if (this.ngDisabled) {
      return;
    }

    this.checked = true;
    this.$ngModel.$setViewValue(this.ngValue || this.value);
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
  }

  hiddenInputChange() {
    // This only fires on label click
    // Normal change handler doesn't, so trigger manually
    if (this.ngChange) {
      this.ngChange();
    }
  }

  addWatchers($scope, $element) {
    $scope.$watch('$ctrl.ngModel', (newValue, oldValue) => {
      if (newValue !== oldValue) {
        this.$ngModel.$setDirty();
      }
      this.checked = this.isChecked();
    });

    $scope.$watch('$ctrl.ngDisabled', (newValue, oldValue) => {
      const radioLabel = $element.closest('.radio')[0];
      if (!radioLabel) {
        return;
      }
      if (newValue && !oldValue) {
        radioLabel.classList.add('disabled');
        radioLabel.setAttribute('disabled', 'true');
      } else if (!newValue && oldValue) {
        radioLabel.classList.remove('disabled');
        radioLabel.removeAttribute('disabled');
      }
    });
  }
}

RadioController.$inject = ['$scope', '$element'];

export default RadioController;
