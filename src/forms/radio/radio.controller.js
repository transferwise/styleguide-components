
class RadioController {
  constructor($scope, $element, TwDomService) {
    const $ngModel = $element.controller('ngModel');

    this.dom = TwDomService;
    this.$element = $element;
    this.element = $element[0];
    this.checked = this.isChecked();
    this.label = this.dom.getClosestParentByTagName(this.element, 'label');

    $element[0].addEventListener('blur', () => {
      $ngModel.$setTouched();
    });

    this.addWatchers($scope, this.element);
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
    this.element.dispatchEvent(new CustomEvent('focus'));
  }

  buttonBlur() {
    if (this.label) {
      this.label.classList.remove('focus');
    }
    this.element.dispatchEvent(new CustomEvent('blur'));
  }

  hiddenInputChange() {
    // This only fires on label click
    // Normal change handler doesn't, so trigger manually
    if (this.ngChange) {
      this.ngChange();
    }
  }

  addWatchers($scope, element) {
    $scope.$watch('$ctrl.ngModel', (newValue, oldValue) => {
      if (newValue !== oldValue) {
        this.$ngModel.$setDirty();
      }
      this.checked = this.isChecked();
    });

    $scope.$watch('$ctrl.ngDisabled', (newValue, oldValue) => {
      const radioLabel = this.dom.getClosestParentByClassName(element, 'radio');

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

RadioController.$inject = ['$scope', '$element', 'TwDomService'];

export default RadioController;
