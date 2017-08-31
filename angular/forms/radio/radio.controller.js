class RadioController {
  constructor($scope, $element) {
    const $ngModel = $element.controller('ngModel');

    this.$element = $element;
    this.checked = this.isChecked();

    $element.on('blur', (event) => {
      $ngModel.$setTouched();
    });

    this.addWatchers($scope, $element, $ngModel);
  }

  isChecked() {
    return (this.ngValue && this.ngModel === this.ngValue) ||
      this.value === this.ngModel;
  }

  buttonClick($event) {
    if (this.ngDisabled) {
      return;
    }

    this.checked = true;
    this.$ngModel.$setViewValue(this.ngValue || this.value);
  }

  buttonFocus() {
    this.$element.closest('label').addClass('focus');
    this.$element.triggerHandler('focus');
  }

  buttonBlur() {
    this.$element.closest('label').removeClass('focus');
    this.$element.triggerHandler('blur');
  }

  hiddenInputChange() {
    // This only fires on label click
    // Normal change handler doesn't, so trigger manually
    if (this.ngChange) {
      this.ngChange();
    }
  }

  addWatchers($scope, $element, $ngModel) {
    $scope.$watch('$ctrl.ngModel', (newValue, oldValue) => {
      if (newValue !== oldValue) {
        this.$ngModel.$setDirty();
      }
      this.checked = this.isChecked();
    });

    $scope.$watch('$ctrl.ngDisabled', (newValue, oldValue) => {
      if (newValue && !oldValue) {
        this.$element
          .closest('.radio')
          .addClass('disabled')
          .attr('disabled', true);
      } else if (!newValue && oldValue) {
        this.$element
          .closest('.radio')
          .removeClass('disabled')
          .removeAttr('disabled');
      }
    });
  }
}

RadioController.$inject = ['$scope', '$element'];

export default RadioController;
